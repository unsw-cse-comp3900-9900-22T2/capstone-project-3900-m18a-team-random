import { Stack } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import Feed from './feed';
import Navbar from './navbar';
import Rightbar from './rightbar';
import Sidebar from './sidebar';

const Main = () => {
    return (
        <Box>
            <Navbar/>
            <Stack direction='row' spacing={2} justifyContent="space-between">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </Stack>
        </Box>
    )
}

export default Main;