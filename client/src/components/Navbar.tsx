import { Box, IconButton,Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import './styles/navbar.css'
import { MenuItem, Menu } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {authToken, setAuthToken} = useContext(AuthContext);
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    const logout = () => {
      axios.post('http://localhost:8080/auth/logout', {} ,{headers:{
            authorization: authToken.refreshToken
        }}).then(() => {
          setCookie("accessToken", "", { path: "/" });
          setCookie("refreshToken", "", { path: "/"});
          setAuthToken({accessToken:"", refreshToken:""});
        }); 
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
        <MenuItem onClick={logout} href='/'>Log out</MenuItem>
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