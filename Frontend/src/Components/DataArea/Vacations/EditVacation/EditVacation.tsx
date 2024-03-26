 import { useForm } from "react-hook-form";
import "./EditVacation.css";
import VacationModel from "../../../../Models/VacationModel";
import dataService from "../../../../Services/DataService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import notifyService from "../../../../Services/NotifyService";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Avatar, Box, CardMedia, Container, Fab, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Spinner from "../../../SharedArea/Spinner/Spinner";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

// Update a vacation

function EditVacation(): JSX.Element {

  const [ vacation, setVacation ] = useState<VacationModel>();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  const { register, handleSubmit, setValue } = useForm<VacationModel>();

  const params = useParams();

  const navigate = useNavigate();

  // on Mount, retrieve the wanted vacation and fill the fields with the relevant properties
  useEffect(() => {
      let vacationId = +params.vacationId;
      dataService.getSpecificVacation(vacationId)
      .then(responseVacation => {
          setVacation(responseVacation)
          setValue("vacationId", responseVacation.vacationId);
          setValue("destination", responseVacation.destination);
          setValue("description", responseVacation.description);
          setValue("start", formatDate(responseVacation.start));
          setValue("end",formatDate(responseVacation.end));
          setValue("price", responseVacation.price);
          
      })
      .catch(err => notifyService.error(err));
      setIsLoading(false);
  }, []);

  function formatDate(date: string) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      return formattedDate;
  }

  // Sends form and navigate back to list
  async function sendForm(vacation: VacationModel) {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];
      await dataService.editVacation(vacation);
      notifyService.success("Vacation updated successfully");
      navigate("/admin/list");

    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (

    <div className="EditVacation Box">

      {isLoading && <Spinner />}

      <Container component="main" maxWidth="xs">

       {/* Wrap and style component */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          m:1,
        }}
      >
      
        {/* Avatar */}
        <Avatar sx={{ m: 1 }}>

            <EditIcon color="primary"/>

        </Avatar>
      
        {/* Title */}
        <Typography component="h1" variant="h4">
          Edit Vacation
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit(sendForm)} sx={{ mt: 3, m:1, }}>
        
          {/* Image */}
          <Grid item xs={12} sm={6} sx={{ mt:3 }}>

            {vacation?.imageUrl && 
              <CardMedia
                sx={{
                  // 16:9
                  pt: '56.25%'
                }}
                image={vacation.imageUrl}
              /> 
            }

          </Grid>

          {/* Image uploader */}
          <Grid item xs={12} sm={6} sx={{ mt:3 }} >

            <label>Image: </label>
            <input type="file" accept ="image/*" {...register("image")}/>

          </Grid>
          
          {/* Destination */}
          <Grid item xs={12} sx={{ mt:3 }}>

              <TextField 
                required
                fullWidth
                label="Destination"
                {...register("destination")}
                InputLabelProps={{
                  shrink: true,
                }}
              />

          </Grid>

          <Grid container spacing={2}>
            
            {/* Starting date */}
            <Grid item xs={12} sm={6} sx={{ mt:3 }}>

              <label>Start: </label>
              <input type="date" {...register("start")} required/>  

            </Grid>
            
            {/* Ending date */}
            <Grid item xs={12} sm={6} sx={{ mt:3 }}>

              <label>End: </label>
              <input type="date" {...register("end")} required/>
              
            </Grid>
            
            {/* Description */}
            <Grid item xs={12} sx={{ mt:3 }}>
              
              <TextField
                required
                fullWidth
                label="Description"
                {...register("description")} 
                multiline
                rows={4}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              
            </Grid>

            {/* Price */}
            <Grid item xs={12} sx={{ mt:3 }}>

              <TextField
                id="outlined-number"
                label="Price"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                {...register("price")}
              />

              </Grid>

          </Grid>
          
          {/* Submit */}
          <Fab color="success" type="submit" sx={{ m:1 }}>
              <UpgradeIcon />
          </Fab>
          
          {/* Return */}
          <NavLink to="/admin/list">

            <Fab color="primary" >
              <KeyboardReturnIcon />
            </Fab>

          </NavLink>
          
        </Box>

      </Box>

    </Container>

    </div>
  );
}

export default EditVacation;
