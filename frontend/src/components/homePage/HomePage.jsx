import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import NavBar from '../navBar';
import Box from '@mui/material/Box';
import MyTaskPage from '../myTaskPage/myTaskPage';
import TeamSelectionPage from '../teamSelectionPage/teamSelectionPage';
import TeamPage from '../teamPage/teamPage';

const HomePage = () => {
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
        <Box>
            <NavBar onInvitationAccepted={(team)=>{setTeams(currentTeams=>[...currentTeams,team])}}/>            
            <Routes>
                <Route path="/" element={<TeamSelectionPage teams={teams} setTeams={setTeams}/>}/>
                <Route path=":teamName/*" element={<TeamPage onLeaveTeam={teamId=>setTeams(teams.filter(team=>team['team_id']!=teamId))}/>}/>
            </Routes>
        </Box>
    )
}

export default HomePage;
