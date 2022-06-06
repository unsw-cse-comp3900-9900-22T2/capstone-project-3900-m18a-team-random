import { AppBar, Toolbar, styled, Typography, InputBase, Avatar, Menu, MenuItem } from '@mui/material';
import { borderRadius, Box } from '@mui/system';
import React, { useState } from 'react';

const StyledToolbar = styled(Toolbar)({
    display:"flex",
    justifyContent:"space-between",
});

const Search = styled("div")(({theme}) => ({
    backgroundColor:"white",
    padding:"0 10px",
    width:"40%"   
}));

const Icons = styled(Box)(({theme}) => ({
}));


const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <AppBar position="sticky">
            <StyledToolbar>
                <Typography>BLABLABLABLA</Typography>
                <Search><InputBase placeholder="search"/></Search>
                <Icons>
                    <Avatar onClick={e=>setOpen(true)}/>
                </Icons>
            </StyledToolbar>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={(e)=>setOpen(false)}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
            </Menu>
        </AppBar>
    )
}

export default Navbar;