import React, {useState,useEffect} from 'react';
import NavBaar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import PopupIcon from './popupIcon';
import ProfilePanel from './profilePanel';
import { Button } from '@mui/material';
import InvitationRequest from './InvitationRequest';
import MenuIconButton from './menuIconButton';


const InvitationNotification = () => {
    const [invitations, setInvitations] = useState([]);

    const getInviationCount = () => {
        let count = 0;
        invitations.map((i) => count++);
        return count;
    }

    useEffect(() => {
        const fetchInvitationData = async () => {
            const token = {'token':sessionStorage.getItem('token')}
            console.log(token);
            const response = await fetch('/get-invitation', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(token)
            });
            
            if(response.ok){
                response.json().then(data =>{
                    console.log(data);
                    setInvitations(data);
                })
            }
        }

        fetchInvitationData();
    }, []);

    return (
        <MenuIconButton menuItems={
            <div>
                {invitations.map((invitation) => (
                    <InvitationRequest 
                    key={invitation['team_name']}
                    teamName={invitation['team_name']}
                    invitationId={invitation['invitation_id']}
                    deleteInvitation={(teamName)=>{invitations.filter(invitation=>invitation['team_name'] != teamName)}}
                    />
                ))}
            </div>
        }>
            <Badge badgeContent={getInviationCount()} color="error">
                <MailIcon />
            </Badge>
        </MenuIconButton>
    )
}

export default InvitationNotification;
