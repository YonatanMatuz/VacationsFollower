import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Login from '../../AuthArea/Login/Login';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

function LandingPage(): JSX.Element {

  return (

    <div className='LandingPage'>
      
      {/* Main Wrapper */}
      <Grid container component="main" sx={{ height: '100vh' }}>

        <CssBaseline />

        {/* Grid in charge of the image */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Grid in charge of the right hand side content */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>

          {/* Organize everything in a box */}
          <Box
            sx={{
              my: 5,
              mx: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                my: 1.4, // Add vertical margin to every item
              },
            }}
          >

            {/* Title */}
            <Typography variant='h5'>
                Welcome to the vacation following website.
            </Typography>

            <Login />

            {/* Guest explanation text */}
            <Typography sx={{ mt:1 }}>
                In order to access features, please Register, or Login if you have already done so. <br/>
                For ease of examination, here is a registered user account, and a admin account, you can also register a user account yourself if you wish,
                but registering a admin account is not possible.
            </Typography>
            <br/>

            {/* Admin Accordion */}
            <Accordion>
                <AccordionSummary>

                    <Typography>Admin Account</Typography>

                </AccordionSummary>

                <AccordionDetails>

                    <Typography>Email : admin@gmail.com</Typography>
                    <Typography>Password : 12345</Typography>

                </AccordionDetails>
            </Accordion>

            {/* User Accordion */}
            <Accordion>
                <AccordionSummary>

                    <Typography>User Account</Typography>

                </AccordionSummary>

                <AccordionDetails>

                    <Typography>Email : tester@gmail.com</Typography>
                    <Typography>Password : 12345</Typography>

                </AccordionDetails>
            </Accordion>

          </Box>

        </Grid>

      </Grid>

    </div>

  );
}

export default LandingPage;
