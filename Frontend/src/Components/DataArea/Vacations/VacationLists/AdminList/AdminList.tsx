import { useEffect, useState } from "react";
import VacationModel from "../../../../../Models/VacationModel";
import dataService from "../../../../../Services/DataService";
import notifyService from "../../../../../Services/NotifyService";
import Spinner from "../../../../SharedArea/Spinner/Spinner";
import { Pagination } from "antd";
import Header from "../../../../LayoutArea/Headers/Header";
import AdminCard from "../../VacationCards/AdminCard/AdminCard";
import { Box, Container, Fab, Grid, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import AddCardIcon from '@mui/icons-material/AddCard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { vacationsStore } from "../../../../../Redux/VacationsState";

// List of vacations for admins

function AdminList(): JSX.Element {

  // Vacations
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  // Pagination 
  const [total, setTotal] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [vacationsPerPage] = useState<number>(9);

  // Pagination params
  const indexOfLastPage = page * vacationsPerPage;
  const indexOfFirstPage = indexOfLastPage - vacationsPerPage;
  const paginatedVacations = vacations.slice(indexOfFirstPage, indexOfLastPage);

  // Render pagination only if vacations exceed displayed amount per page
  const shouldDisplayPagination =  vacations.length > vacationsPerPage;

  // on Mount render vacation list and fetch current user to pass to the card
  useEffect(() => {

    // Fetch vacations
      dataService.getAllVacations()
      .then((dbVacations) => {
        // Sort by descending order of the dates
        const sortedVacations = dbVacations.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
        setVacations(sortedVacations);
        setTotal(sortedVacations.length);
      })
      .catch((err) => notifyService.error(err));

      // re-Render list when user deletes a vacation
      const unsubscribe = vacationsStore.subscribe(() => {
        const duplicatedVacations = [...vacationsStore.getState().vacations];
        setVacations(duplicatedVacations);
      })

      return () => unsubscribe();

  }, []);


  return (
    
    <div className="AdminList">

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
            Welcome Admin
          </Typography>

          {/* Explanation text */}
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Below are the vacations, you can edit or delete each vacation, Below are buttons for adding a vacation,
            or viewing the current statistic about them.
          </Typography>

          {/* Organize admin buttons */}
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >

            <NavLink to="/admin/insert">

              <Fab color="success">
                <AddCardIcon />
              </Fab>

            </NavLink>

            <NavLink to="/admin/charts/followersChart">

              <Fab color="primary">
                <BarChartIcon />
              </Fab>

            </NavLink> 
            
          </Stack>

        </Container>

      </Box>

      {/* If nothing loaded yet, display loading spinner */}
      {vacations.length === 0 && <Spinner />}

      {/* Grid wrapper for the list */}
      <Grid container sx={{ width: '80%', alignItems: 'center', ml: '10%'}}>

        {paginatedVacations.map((v) => (

          // Grid wrapper for each card in the list
          <Grid item key={v.vacationId} xs={12} sm={6} md={4}  sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>

            <AdminCard
              vacation={v}
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
  
  export default AdminList;
