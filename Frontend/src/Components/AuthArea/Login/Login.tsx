import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import cyberService from "../../../Services/CyberService";
import { NavLink } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

function Login(): JSX.Element {

  const { register, handleSubmit } = useForm<CredentialsModel>();

  const navigate = useNavigate();

  // Send form, navigate User/Admin accordingly
  async function sendForm(credentials: CredentialsModel) {
    try {

      await authService.login(credentials);
      const isUser = await cyberService.verifyAdmin();

      if (!isUser) {
        notifyService.success("Welcome back User!");
        navigate("/user/list");

      } else {
        notifyService.success("Welcome back Admin!");
        navigate("/admin/list");
      }

    } catch (err: any) {
      notifyService.error(err);
    }
  };

  return (

    <div className="Login Box">

      {/* Title */}
      <Typography variant="h4">
        Log in
      </Typography> 

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit(sendForm)} sx={{ mt: 3, m:1, }}>

        {/* Email */}
        <TextField
        {...register("email")}
          margin="normal"
          required
          fullWidth
          label="Email Address"
        />

        {/* Password */}
        <TextField
          {...register("password")}
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
        />

        {/* Submit */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >Login</Button>

        {/* Register */}
        <NavLink to="/auth/register">

          <Typography>Don't have an account yet? Sign up</Typography>
          
        </NavLink>


      </Box>
  
    </div>

  );

}

export default Login;
