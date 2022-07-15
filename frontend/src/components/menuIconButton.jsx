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
import { Fab } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InvitationRequest from './InvitationRequest';


const MenuIconButton = ({children}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
            <InvitationRequest teamName='Team Random'/>
            <InvitationRequest teamName='Team otz'/>
        </Menu>
    );

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                {children}
            </IconButton>
            {renderMenu}
        </div>
    )
}

export default MenuIconButton;
