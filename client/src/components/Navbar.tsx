import { Box, IconButton,Link,Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import './styles/navbar.css'
import { MenuItem, Menu } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
import { useCookies } from 'react-cookie';

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
        }});
        setCookie("accessToken", "", { path: "/" });
        setCookie("refreshToken", "", { path: "/"});
        setAuthToken({accessToken:"", refreshToken:""});
        handleClose();
    }

    return (
    <AppBar className="appBar">
    <Toolbar>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
      <MenuItem>
          <Link underline="none" color="black" href='/'>Find homes</Link>
        </MenuItem>
        {cookies.refreshToken && <MenuItem>
          <Link underline="none" color="black" href='/Profile'>Your Profile</Link>
        </MenuItem>}
        <MenuItem onClick={handleClose}>
        <Link underline="none" color="black" href='/'>Create a post</Link>
          </MenuItem>
        <MenuItem onClick={logout}>
        <Link underline="none" color="black" href='/'>Log out</Link>
          </MenuItem>
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