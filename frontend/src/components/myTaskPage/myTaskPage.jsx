import { Box, Container } from '@mui/system';
import React from 'react';
import MyTask from './myTask';
import Sidebar from '../sidebar';
import Grid from '@mui/material/Grid';

const MyTaskPage = ({email}) => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={10}>
                    <MyTask email={email}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MyTaskPage;