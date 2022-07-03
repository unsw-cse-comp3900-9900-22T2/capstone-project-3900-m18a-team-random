import { Box, Container } from '@mui/system';
import React from 'react';
import Feed from './myTask';
import Sidebar from '../sidebar';
import Grid from '@mui/material/Grid';

const MyTaskPage = () => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={10}>
                    <Feed/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MyTaskPage;