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
import { Fab, Grid, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

const InvitationRequest = ({teamName}) => {
    return (
        <MenuItem>
            <ListItemText>
                You are invited to {teamName}
            </ListItemText>
            <IconButton>
                <CheckCircleOutlineIcon/>
            </IconButton>
            <IconButton>
                <CancelIcon/>
            </IconButton>
        </MenuItem>
    )
}

export default InvitationRequest;
