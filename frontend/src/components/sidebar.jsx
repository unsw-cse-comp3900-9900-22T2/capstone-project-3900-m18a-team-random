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
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const Sidebar = ({teamId, teamName, onLeaveTeam}) => {
    let navigate = useNavigate();
    
    const handleLeaveTeam = async (e) => {
        e.preventDefault();
        const tokenAndTeam = {'token':sessionStorage.getItem('token'), 'team_id':teamId};
        console.log(tokenAndTeam);
        const response = await fetch('/leave_team', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(tokenAndTeam)
        });

        if(response.ok){
            onLeaveTeam(teamId);
            navigate("../");
        } else {
        }
    }
    
    const handleLogout = async (e) => {
        e.preventDefault()
        const token = {'token':sessionStorage.getItem('token')};
        const response = await fetch('/logout', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(token)
        });
        
        if(response.ok){
            navigate("/")
        }
    }

    return (
        <Box flex={1} p={2}>
            <List>
            <ListItem disablePadding>
                    <ListItemButton onClick={()=>{navigate("../")}}>
                        <ListItemIcon>
                            <GroupsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Teams" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>{navigate("./", {state:{teamId:teamId,teamName:teamName}}) }}>
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
                    <ListItemButton onClick={()=>{navigate("analysis")}}>
                        <ListItemIcon>
                            <BarChartOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Analysis" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLeaveTeam}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Leave" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}

export default Sidebar;