import { Box } from '@mui/system';
import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListIcon from '@mui/icons-material/List';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupIcon from '@mui/icons-material/Groups';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HelpIcon from '@mui/icons-material/Help';
import { useNavigate } from 'react-router';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

const Sidebar = () => {
    let navigate = useNavigate();

    return (
        <Box flex={1} p={2}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>{navigate("./")}}>
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tasks" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>{navigate("members")}}>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <   ListItemText primary="Members" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HistoryEduIcon />
                        </ListItemIcon>
                        <ListItemText primary="History" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <BarChartOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Analysis" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}

export default Sidebar;