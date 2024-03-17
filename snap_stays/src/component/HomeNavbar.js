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
import { useTheme } from "@mui/material/styles";

import { AuthContext } from '../context/auth';


function HomeNavbar() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="black"
              component = {RouterLink} to = "/UserProfile"

            >
            <AccountCircle />
            </IconButton>
            <Button variant="contained" onClick={logout}>
              Logout 
            </Button>
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
