import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import { NavLink, useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Container, Fab, Grid, TextField, Typography } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import LockOpenIcon from '@mui/icons-material/LockOpen';

function Register(): JSX.Element {

  const { register, handleSubmit } = useForm<UserModel>();

  const navigate = useNavigate();

  // Send form and register user, alert user of success and navigate to home
  async function sendForm(user: UserModel) {
      try {
          await authService.register(user);
          notifyService.success("Welcome!")
          navigate("/user/list");
      } catch (err: any) {
          notifyService.error(err);
      }
  }

  return (

    <div className="Register Box">

      <Container component="main" maxWidth="xs">

      {/* Wrap component and style */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Avatar */}
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        {/* Title */}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit(sendForm)} sx={{ mt: 3 }}>

          <Grid container spacing={2}>

            {/* First Name */}
            <Grid item xs={12} sm={6}>

              <TextField
                {...register("firstName")}
                required
                fullWidth
                label="First Name"
              />

            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>

              <TextField
                required
                fullWidth
                {...register("lastName")}
                label="Last Name"
                
              />

            </Grid>

            {/* Email */}
            <Grid item xs={12}>

              <TextField
                type="email"
                required
                fullWidth
                {...register("email")}
                label="Email Address"
              />

            </Grid>

            {/* Password */}
            <Grid item xs={12}>

              <TextField
                required
                fullWidth
                {...register("password")}
                label="Password"
                type="password"
              />

            </Grid>
            
          </Grid>
  
          {/* Submit */}
          <Fab color="success" type="submit">
              <LockOpenIcon />
          </Fab>
            
          
          {/* Return */}
          <NavLink to="/landingPage">

            <Fab color="primary" sx={{ m:2 }}>
              <KeyboardReturnIcon />
            </Fab>

          </NavLink>
              
          
        </Box>
        
      </Box>

      </Container>
    
    </div>

  );

}

export default Register;
