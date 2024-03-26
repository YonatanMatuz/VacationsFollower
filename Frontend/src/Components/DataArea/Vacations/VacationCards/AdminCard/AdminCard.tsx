import { NavLink } from "react-router-dom";
import VacationModel from "../../../../../Models/VacationModel";
import "./AdminCard.css";
import dataService from "../../../../../Services/DataService";
import notifyService from "../../../../../Services/NotifyService";
import { Card, CardContent, CardMedia, Fab, Typography } from "@mui/material";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface AdminCardProps {
	vacation: VacationModel;
}

function AdminCard(props: AdminCardProps): JSX.Element {

  const formattedStartDate = moment(props.vacation.start).format('YYYY-MM-DD');
  const formattedEndDate = moment(props.vacation.end).format('YYYY-MM-DD');


  async function deleteMe() {
      try {
          const ok = window.confirm("Are you sure you want to delete this vacation?");
          if (!ok) return;

          await dataService.deleteVacation(props.vacation.vacationId);
          notifyService.success("Vacation has been deleted successfully");
      } catch (error) {
          notifyService.error(error);
      }
  }

  return (

    <div className="AdminCard Box">

      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* Display image */}
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: '56.25%'
          }}
          image={props.vacation.imageUrl}
        />

        <CardContent sx={{ flexGrow: 1 }}>

          {/* Destination */}
          <Typography gutterBottom variant="h5" component="h2" sx={{ zIndex: 2 }}>

            {props.vacation.destination}
            
          </Typography>

          {/* Dates */}
          <Typography sx={{ zIndex: 3 }}>

            📅{formattedStartDate} ~ 📅{formattedEndDate}

          </Typography>

          {/* Description */}
          {/* Wrapped in css class to allow scrolling */}
          <div className="descriptionStyler">

            <Typography sx={{ m: 1, zIndex: 4 }}>

              {props.vacation.description}

            </Typography>

          </div>

          {/* Price */}
          <Fab color="success" sx={{ m: 1, zIndex: 5 }}>

            ${props.vacation.price}

          </Fab>

          {/* Edit */}
          <NavLink to={"/admin/edit/" + props.vacation.vacationId}>

            <Fab color="primary" sx={{ m: 1, zIndex: 5 }}>
            <EditIcon />
            </Fab>

          </NavLink>

          {/* Delete */}
          <Fab color="secondary" sx={{ m: 1, zIndex: 5 }}>

            <DeleteIcon onClick={deleteMe}/>

          </Fab>


        </CardContent>

    </Card>

  </div>
  );
}

export default AdminCard;
