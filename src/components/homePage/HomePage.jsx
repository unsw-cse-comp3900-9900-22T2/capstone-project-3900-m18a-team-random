import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import NavBar from '../navBar';
import Box from '@mui/material/Box';
import MyTaskPage from '../myTaskPage/myTaskPage';
import TeamSelectionPage from '../teamSelectionPage/teamSelectionPage';
import TeamPage from '../teamPage/teamPage';

const HomePage = () => {
    return (
        <Box>
            <NavBar/>            
            <Routes>
                <Route path="/" element={<TeamSelectionPage/>}/>
                <Route path=":teamId/*" element={<TeamPage/>}/>
            </Routes>
        </Box>
    )
}

export default HomePage;
