import React from 'react';
import PopupFab from '../popupFab';
import CreateGroupPanel from './createGroupPanel';
import Grid from '@mui/material/Grid';
import GroupCard from './groupCard';
import { Box } from '@mui/system';

const TeamSelectionPage = () => {
    return (
        <Box mt={2}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <GroupCard/>
                </Grid>
                <Grid item xs={3}>
                    <GroupCard/>
                </Grid>
                <Grid item xs={3}>
                    <GroupCard/>
                </Grid>
                <Grid item xs={3}>
                    <GroupCard/>
                </Grid>
                <Grid item xs={3}>
                    <GroupCard/>
                </Grid>
                <Grid item xs={3}>
                    <GroupCard/>
                </Grid>
                <Grid item xs={3}>
                    <GroupCard/>
                </Grid>
            </Grid>
            <PopupFab 
            style={{
                position:"absolute",
                bottom:30,
                right:20,
            }}
            title='New Group'
            >
                <CreateGroupPanel/>
            </PopupFab>
        </Box>
    )
}

export default TeamSelectionPage;
