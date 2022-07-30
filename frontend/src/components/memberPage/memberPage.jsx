import { Box } from '@mui/system';
import React from 'react';
import Sidebar from '../sidebar';
import Grid from '@mui/material/Grid';
import Members from './members';

const MemberPage = () => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={10}>
                    <Members/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MemberPage;