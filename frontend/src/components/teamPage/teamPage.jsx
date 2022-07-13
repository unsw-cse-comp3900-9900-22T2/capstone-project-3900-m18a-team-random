import { Box, Container } from '@mui/system';
import React from 'react';
import Sidebar from '../sidebar';
import Grid from '@mui/material/Grid';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import MyTaskPage from '../myTaskPage/myTaskPage';
import MemberPage from '../memberPage/memberPage';
import MyTask from '../myTaskPage/myTask';
import Members from '../memberPage/members';
import HistoryPage from '../history/historyPage';

const TeamPage = ()=>{
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={10}>
                    <Routes>
                        <Route path="/" element={<MyTask/>}/>
                        <Route path="members" element={<Members/>}/>
                        <Route path="history" element={<HistoryPage/>}/>
                    </Routes>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TeamPage;
