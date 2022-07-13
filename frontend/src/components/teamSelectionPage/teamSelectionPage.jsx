import React, { useEffect } from 'react';
import PopupFab from '../popupFab';
import CreateGroupPanel from './createGroupPanel';
import Grid from '@mui/material/Grid';
import GroupCard from './groupCard';
import { Box } from '@mui/system';

const TeamSelectionPage = () => {
    const token = {'token':sessionStorage.getItem('token')}
    useEffect(() => {
        const fetchTeamData = async () => {
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
                })
            }
        }
        fetchTeamData();
    }, []);

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
