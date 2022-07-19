import { Box, Container } from '@mui/system';
import React, {useEffect,useState} from 'react';
import Sidebar from '../sidebar';
import Grid from '@mui/material/Grid';
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import MyTaskPage from '../myTaskPage/myTaskPage';
import MemberPage from '../memberPage/memberPage';
import MyTask from '../myTaskPage/myTask';
import Members from '../memberPage/members';
import HistoryPage from '../history/historyPage';

const TeamPage = ()=>{
    const location = useLocation();
    const [teamId, setTeamId] = useState("");
    const [teamName, setTeamName] = useState("");

    const getTeamId = () => {
        if(teamId === "")
            return location.state.teamId;
        else
            return teamId;
    }

    const getTeamName = () => {
        if(teamName === "")
            return location.state.teamName;
        else
            return teamName;
    }

    useEffect(() => {
        console.log(location.state.teamId);
        console.log(location.state.teamName);
        setTeamId(location.state.teamId);
        setTeamName(location.state.teamName);
    }, []);

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Sidebar teamId={teamId} teamName={teamName}/>
                </Grid>
                <Grid item xs={10}>
                    <Routes>
                        <Route path="/" element={<MyTask teamId={getTeamId()} teamName={getTeamName()}/>}/>
                        <Route path="members" element={<Members teamId={getTeamId()} teamName={getTeamName()}/>}/>
                        <Route path="history" element={<HistoryPage teamId={getTeamId()} teamName={getTeamName()}/>}/>
                    </Routes>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TeamPage;
