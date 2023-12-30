import { Box, IconButton,Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/icons-material/Menu';
import './styles/navbar.css'

const Navbar = () => {
    return (
    <AppBar className="appBar">
    <Toolbar>
      <IconButton>
        <Menu />
      </IconButton>
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