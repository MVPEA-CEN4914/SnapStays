import React from 'react'
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Router, Link as RouterLink} from "react-router-dom";
import BlackLogo from "../images/BlackLogo.png"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function HomeNavbar() {
  
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };



  return (
    <AppBar position="static" sx={{bgcolor: '#E6E6DD'}}>
      <Toolbar>
       <IconButton edge = 'start' component = {RouterLink} to = "/">
          <img src = {BlackLogo} alt = "BlackLogo"style={{ width: '50px', height: 'auto' }} />
          </IconButton>

        <Stack direction = 'row' spacing={2} sx={{ ml: 'auto' }}>
          <Button variant = 'text' component= {RouterLink} to= "/ListStay">List A Stay</Button>
          <Button variant = 'text' component= {RouterLink} to= "/FindStay">Find A Stay</Button>
          <Button variant = 'contained' component= {RouterLink} to= "/login">Login</Button>
        </Stack>
        
      </Toolbar>
    </AppBar>

  )
}

export default HomeNavbar