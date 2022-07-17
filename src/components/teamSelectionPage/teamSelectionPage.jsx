import React, { useEffect, useState } from 'react';
import PopupFab from '../popupFab';
import CreateGroupPanel from './createGroupPanel';
import Grid from '@mui/material/Grid';
import GroupCard from './groupCard';
import { Box } from '@mui/system';

const TeamSelectionPage = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeamData = async () => {
            const token = {'token':sessionStorage.getItem('token')}
            console.log(token);
            const response = await fetch('/get_team', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(token)
            });
            
            if(response.ok){
                response.json().then(data =>{
                    console.log(data);
                    setTeams(data);
                })
            }
        }

        fetchTeamData();
    }, []);

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
