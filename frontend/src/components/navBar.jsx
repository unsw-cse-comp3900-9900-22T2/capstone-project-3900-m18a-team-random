import * as React from 'react';
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
import InvitationNotification from './invitationNotification';

const NavBar = () => {
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        ATeam
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <InvitationNotification/>
                        <PopupIcon icon={<AccountCircle/>} title='Profile'>
                            <ProfilePanel/>
                        </PopupIcon>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar;
