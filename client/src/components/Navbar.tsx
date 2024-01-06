import { Box, IconButton,Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import './styles/navbar.css'
import { Select, MenuItem, Menu } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../App';
import React from 'react';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {setAuthToken} = useContext(AuthContext);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    const logout = () => {
      setAuthToken("");
      handleClose();
    }

    return (
    <AppBar className="appBar">
    <Toolbar>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem onClick={handleClose}>Your Profile</MenuItem>
        <MenuItem onClick={handleClose}>Create a post</MenuItem>
        <MenuItem onClick={logout}>Log out</MenuItem>
      </Menu>
      <Typography className='title' variant="h4">
        Your Next Home
      </Typography>
      <Box
        className="logo"
        component="img"
        src="/public/logo.png"
    />
    </Toolbar>
  </AppBar>
    );
};

export default Navbar;