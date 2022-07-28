import React, { useEffect, useState } from 'react';
import PopupFab from '../popupFab';
import CreateGroupPanel from './createGroupPanel';
import Grid from '@mui/material/Grid';
import GroupCard from './groupCard';
import { Box } from '@mui/system';

const TeamSelectionPage = ({teams, setTeams}) => {

    return (
        <Box mt={2}>
            <Grid container spacing={2}>
                {teams.map((team) => (
                    <Grid item xs={3} key={team.team_id}>
                        <GroupCard teamId={team.team_id} teamName={team.team_name}/>
                    </Grid>
                ))}
            </Grid>
            <PopupFab 
            style={{
                position:"absolute",
                bottom:30,
                right:20,
            }}
            title='New Group'
            >
                <CreateGroupPanel onNewTeam={team=>setTeams(currentTeams=>[...currentTeams,team])}/>
            </PopupFab>
        </Box>
    )
}

export default TeamSelectionPage;
