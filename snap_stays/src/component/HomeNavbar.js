import React, {useContext, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from "@mui/icons-material/Menu";
import { Router, Link as RouterLink } from "react-router-dom";
import BlackLogo from "../images/BlackLogo.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from "@mui/material/styles";

import { AuthContext } from '../context/auth';


function HomeNavbar() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const{user, logout} = useContext(AuthContext);

  let navBar; 
  if (user) {
    navBar = (
      <AppBar position="static" sx={{ bgcolor: "#E6E6DD" }}>
        <Toolbar>
          <IconButton edge="start" component={RouterLink} to="/">
            <img
              src={BlackLogo}
              alt="BlackLogo"
              style={{ width: "50px", height: "auto" }}
            />
          </IconButton>
          <Stack direction="row" spacing={2} sx={{ ml: "auto" }}>
          <Button variant="text" component={RouterLink} to="/list-stay">
            List A Stay
          </Button>
          <Button variant="text" component={RouterLink} to="/find-stay">
            Find A Stay
          </Button>
          <Tooltip title= "My profile">
          <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              style={{ padding: '6px' }} 
            >
           <Avatar
           style={{backgroundColor: '#AF8C53', width: '32px', 
           height: '32px'}}
           />
            </IconButton>
          </Tooltip>
          <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              bgcolor:'#E6E6DD',
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: '#E6E6DD',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem component={RouterLink} to ="userprofile">
          <Avatar />  My Profile
        </MenuItem>
          <Divider/>
          <MenuItem onClick={logout}> Logout 
          </MenuItem>
          </Menu>

          </Stack>
        </Toolbar>
      </AppBar>
    );
  } 
  else{
    navBar = (
      <AppBar position="static" sx={{ bgcolor: "#E6E6DD" }}>
      <Toolbar>
        <IconButton edge="start" component={RouterLink} to="/">
          <img
            src={BlackLogo}
            alt="BlackLogo"
            style={{ width: "50px", height: "auto" }}
          />
        </IconButton>

        <Stack direction="row" spacing={2} sx={{ ml: "auto" }}>
          <Button variant="text" component={RouterLink} to="/list-stay">
            List A Stay
          </Button>
          <Button variant="text" component={RouterLink} to="/find-stay">
            Find A Stay
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to="/login"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.light,
              },
            }}
          >
            Login
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>

    );
  }  
  return navBar; 
}

export default HomeNavbar;
