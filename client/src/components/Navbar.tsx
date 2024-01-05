import { Box, IconButton,Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import './styles/navbar.css'
import { Select, MenuItem, Menu } from '@mui/material';
import { useState } from 'react';

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const handleCloseMenu = () => setOpenMenu(false);

    const logout = () => {
      handleCloseMenu()
    }

    return (
    <AppBar className="appBar">
    <Toolbar>
      <IconButton onClick={() => setOpenMenu(true)}>
        <MenuIcon />
      </IconButton>
      <Menu open={openMenu} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>Your Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Create a post</MenuItem>
        <MenuItem onClick={logout}>Log out</MenuItem>
      </Menu>
      <Typography variant="h4" className="title">
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