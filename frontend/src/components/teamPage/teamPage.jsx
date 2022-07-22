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
import Settings from '../settings';

const TeamPage = ()=>{

    const getTeamId = () => {
        return sessionStorage.getItem('teamId');
    }

    const getTeamName = () => {
        return sessionStorage.getItem('teamName');
    }

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
                        <Route path="settings" element={<Settings teamId={getTeamId()} teamName={getTeamName()}/>}/>
                    </Routes>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TeamPage;
