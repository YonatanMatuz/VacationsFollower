import { useEffect, useState } from "react";
import VacationModel from "../../../../../Models/VacationModel";
import dataService from "../../../../../Services/DataService";
import notifyService from "../../../../../Services/NotifyService";
import moment from "moment";
import { VacationsActionType, vacationsStore } from "../../../../../Redux/VacationsState";
import Spinner from "../../../../SharedArea/Spinner/Spinner";
import UserCard from "../../VacationCards/UserCard/UserCard";
import cyberService from "../../../../../Services/CyberService";
import UserModel from "../../../../../Models/UserModel";
import { Pagination } from "antd";
import Header from "../../../../LayoutArea/Headers/Header";
import { Box, Chip, Container, Grid, Stack, Typography } from "@mui/material";


// List of vacations for users

function UserList(): JSX.Element {

  // Vacations/Users state
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [user, setUser] = useState<UserModel>();

  // States for filter features
  const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>([]);
  const [filterActiveVacations, setFilterActiveVacations] = useState<boolean>(false);
  const [filterFutureVacations, setFilterFutureVacations] = useState<boolean>(false);
  const [followStatus, setFollowStatus] = useState<{ [key: number]: boolean }>({});

  // Pagination 
  const [total, setTotal] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [vacationsPerPage] = useState<number>(9);

  // Pagination params
  const indexOfLastPage = page * vacationsPerPage;
  const indexOfFirstPage = indexOfLastPage - vacationsPerPage;
  const paginatedVacations = vacations.slice(indexOfFirstPage, indexOfLastPage);

  // Ensures pagination works with the filters
  const paginatedFilteredVacations = filteredVacations.slice(indexOfFirstPage, indexOfLastPage);

  // Decide which vacations to render, global state, or the currently filtered by user
  const vacationsToRender = filteredVacations.length > 0 ? paginatedFilteredVacations : paginatedVacations;

  // Render pagination only if vacations exceed displayed amount per page
  const shouldDisplayPagination =  filteredVacations.length > vacationsPerPage || filteredVacations.length === 0;

  // Variable to format various dates
  const today = moment().startOf('day');

  // Reset the list filter
  function resetVacationList() {
    const vacations = vacationsStore.getState().vacations;
    setVacations(vacations);
    setFilteredVacations(vacations);
    setFilterActiveVacations(false);
    setFilterFutureVacations(false);
  };

  // on Mount render vacation list and fetch current user to pass to the card
  useEffect(() => {

    // Fetch vacations
      dataService.getAllVacations()
      .then((dbVacations) => {

        // Sort by descending order of the dates of each vacations
        const sortedVacations = dbVacations.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
        setVacations(sortedVacations);
        setTotal(sortedVacations.length);

      })
      .catch((err) => notifyService.error(err));

    // Fetch user
    cyberService.fetchUser().then((user) => {
        setUser(user);
    }     
    ).catch((err) => notifyService.error(err));
    
  }, []);

  // Triggered if user filters vacations
  useEffect(() => {

    // If state is true, retrieve vacations from redux, and filter them
    if (filterFutureVacations) {
    let filtered = vacationsStore.getState().vacations;
    filtered = filtered.filter((v) => moment(v.start).isSameOrAfter(today));
    setFilteredVacations(filtered);
    }
  },  [filterFutureVacations]);

  // Triggered if user filters vacations
  useEffect(() => {

    // If state is true, retrieve vacations from redux, and filter them
    if (filterActiveVacations) {
    let filtered = vacationsStore.getState().vacations;
    filtered = filtered.filter((v) => moment(v.start).isSameOrBefore(today));
    setFilteredVacations(filtered);
    }
  }, [filterActiveVacations]);

  // This function is sent as a prop to the card component, when called upon it will update the follower count for the follow button of the given vacation
  // I attempted to only render the card itself instead of the list because of performance, this is why i duplicate the vacation and not the vacation array itself to trigger a render
  // I was told this was possible if done in this way
  // I am aware after all of this that this isn't possible, but it works fine regardless and renders the list to show the accurate follower count

  function handleUpdateFollowerCount(vacationId: number, updatedFollowerCount: number)  {

    // Recieve current vacations local state
    setVacations(prevVacations => {

      // Define the outcome as updated vacations, and map over each vacation
      const updatedVacations = prevVacations.map(v => {

        // Find the vacation with the changed follower count
        if (v.vacationId === vacationId) {

          // Return the vacation duplicated, with the follower count property updated accordingly
          return { ...v, followerCount: updatedFollowerCount };
        }
        return v;
      });

      // Set the filtered vacations state so the function works while in filtered state
      setFilteredVacations(updatedVacations);

      // Update the global state
      vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: updatedVacations });

      // Return the updated vacations to the set vacations local state
      return updatedVacations;

    });
  };

  // Passed as prop to card, get notified when the follow status changes
  function handleFollowStatusChange(vacationId: number, isFollowing: boolean) {
    setFollowStatus((prevStatus) => ({
      ...prevStatus,
      [vacationId]: isFollowing,
    }));
  };

  function handleFilterFollowedVacations() {
    const followedVacations = vacations.filter((vacation) => followStatus[vacation.vacationId]);
    setFilteredVacations(followedVacations);
    if (followedVacations.length === 0) {
      notifyService.error('No followed vacations found');
      return;
    }
  };

  return (

    <div className="UserList">

      <Header />

      {vacations.length === 0 && <Spinner />}

      {/* Wraps top part of the list */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">

          {/* Title */}
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
          >
            Welcome User
          </Typography>

          {/* Explanation text */}
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Below are the vacations, you can follow each vacation and it will remember it for you
            the next time you log in, there are also 4 filters for your convenience.
          </Typography>

          {/* Organize filter buttons */}
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Chip label="Followed Vacations" variant="outlined" onClick={handleFilterFollowedVacations} />
            <Chip label="Active Vacations" variant="outlined" onClick={() => setFilterActiveVacations(!filterActiveVacations)} />
            <Chip label="Future Vacations" variant="outlined" onClick={() => setFilterFutureVacations(!filterFutureVacations)} />
            <Chip label="Reset Vacations List" variant="outlined" onClick={() => resetVacationList()} />
            
          </Stack>

        </Container>

      </Box>

      {vacations.length === 0 && <Spinner />}
      
      {/* Grid wrapper for the list */}
      <Grid container sx={{ width: '80%', alignItems: 'center', ml: '10%'}}>

        {vacationsToRender.map((v) => (

          // Grid wrapper for each card in the list
          <Grid item key={v.vacationId} xs={12} sm={6} md={4}  sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>

            <UserCard
              vacation={v}
              updateFollowerCount={handleUpdateFollowerCount}
              isFollowing={followStatus[v.vacationId] || false}
              followStatusChange={handleFollowStatusChange}
              user={user}
            />

          </Grid>

        ))}

      </Grid>

      {/* Doesn't display if vacations are below the maximum of the first page */}
      {shouldDisplayPagination &&
        <Pagination
        onChange={(value) => setPage(value)}
        pageSize={vacationsPerPage}
        total={total}
        current={page}
        responsive
      />}
      
    </div>
  );
  }
  
  export default UserList;
