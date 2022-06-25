import React from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PopupButton from '../popupButton';
import EditProfilePanel from './editProfilePanel';

const Profile = () => {
    return (
        <Grid container direction='column' spacing={4}>
            <Grid item xs={12}>
                <Typography variant="h2">My Profile</Typography>
            </Grid>
            <Grid item xs={12} container>
                <Grid item xs={3}>
                    <Typography variant="h5">User Name:</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h5">Kai</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} container spacing={3}>
                <Grid item xs={3}>
                    <Typography variant="h5">Email:</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h5">z5232434@ad.unsw.edu.au</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} container spacing={3}>
                <Grid item xs={3}>
                    <Typography variant="h5">Reset Password:</Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField placeholder='New Password' type='password'/>
                </Grid>
                <Grid item xs={3}>
                    <TextField placeholder='Confirm Password' type='password'/>
                </Grid>
                <Grid item xs={3}>
                    <Button variant='outlined'>Reset</Button>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <PopupButton buttonTitle='Edit' title='Edit'>
                    <EditProfilePanel/>
                </PopupButton>
            </Grid>
        </Grid>
    )
}

export default Profile;