import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Router, Link as RouterLink } from "react-router-dom";
import BlackLogo from "../images/BlackLogo.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

function HomeNavbar() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
          <Button
            variant="text"
            component={RouterLink}
            to="/list-stay"
            sx={{
              color: theme.palette.secondary.main,
              "&:hover": {
                bgcolor: theme.palette.background.default,
                fontWeight: "bold",
                textDecoration: "underline"
              },
            }}
          >
            List A Stay
          </Button>
          <Button
            variant="text"
            component={RouterLink}
            to="/find-stay"
            sx={{
              color: theme.palette.secondary.main,
              "&:hover": {
                bgcolor: theme.palette.background.default,
                fontWeight: "bold",
                textDecoration: "underline"
              },
            }}
          >
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

export default HomeNavbar;
