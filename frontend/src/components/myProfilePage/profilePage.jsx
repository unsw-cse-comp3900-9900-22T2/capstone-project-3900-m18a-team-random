import { Box } from '@mui/system';
import React from 'react';
import Sidebar from '../sidebar';
import Grid from '@mui/material/Grid';
import Profile from './profile';
import NavBar from '../navBar';

const ProfilePage = () => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={10}>
                    <Profile/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProfilePage;