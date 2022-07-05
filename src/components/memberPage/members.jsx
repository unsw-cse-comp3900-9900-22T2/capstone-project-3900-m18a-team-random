import React from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TeamMemberTable from './teamMemberTable';
import PopupButton from '../popupButton';
import AddMemberPanel from './addMemberPanel';

const Members = () => {
    return(
        <Grid container direction='column' spacing={4}>
            <Grid item xs={12}>
                <Typography variant="h2">My Team</Typography>
            </Grid>
            <Grid item xs={12} spacing={2} container>
                <Grid item xs={3}>
                    <Typography variant="h5">Team Name:</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h5">3900-Team Random-M18A</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} spacing={2} container>
                <Grid item xs={3}>
                    <Typography variant="h5">Members</Typography>
                </Grid>
                <Grid item xs={3}>
                    <PopupButton buttonTitle='Add New Member' title='Add New Member'>
                        <AddMemberPanel/>
                    </PopupButton>
                </Grid>
            </Grid>
            <Grid item>
                <TeamMemberTable/>
            </Grid>
        </Grid>
    )
}

export default Members;
