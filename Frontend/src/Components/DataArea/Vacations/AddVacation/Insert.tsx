import { useForm } from "react-hook-form";
import "./Insert.css";
import VacationModel from "../../../../Models/VacationModel";
import dataService from "../../../../Services/DataService";
import { NavLink, useNavigate } from "react-router-dom";
import notifyService from "../../../../Services/NotifyService";
import { Avatar, Box, Container, Fab, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import AddCardIcon from '@mui/icons-material/AddCard';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import UpgradeIcon from '@mui/icons-material/Upgrade';

// Add a new vacation

function Insert(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationModel>();

    const navigate = useNavigate();

    // Send form and navigate back to list
    async function sendForm(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await dataService.addVacation(vacation);
            navigate("/admin/list");

        } catch (err: any) {
            notifyService.error(err);
        }
    }

    return (

    <div className="Insert Box">

        <Container component="main" maxWidth="xs">

        {/* Wrap abd style component */}
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

                <AddCardIcon color="primary"/>

            </Avatar>

            {/* Title */}
            <Typography component="h1" variant="h4">
                Add Vacation
            </Typography>

            {/* Form */}
            <Box component="form"  onSubmit={handleSubmit(sendForm)} sx={{ mt: 3, m:1, }}>

                {/* Image uploader */}
                <Grid item xs={12} sm={6} sx={{ mt:3 }} >

                    <label>Image: </label>
                    <input type="file" accept ="image/*" {...register("image")} required/>

                </Grid>
                
                {/* Destination */}
                <Grid item xs={12} sx={{ mt:3 }}>

                    <TextField 
                    type="text"
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

                    <Fab color="primary">
                        <KeyboardReturnIcon />
                    </Fab>

                </NavLink>
                                        
            </Box>

        </Box>

        </Container>

    </div>
    );
}

export default Insert;
