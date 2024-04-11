import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link as RouterLink } from "react-router-dom";
import BlackLogo from "../images/BlackLogo.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import { useQuery, gql } from "@apollo/client";

import { AuthContext } from "../context/auth";

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

  const { user, logout } = useContext(AuthContext);
  const currentUserId = user ? user.id : null; // handle case where user is null
  const { data: userData } = useQuery(GET_USER_QUERY, {
    variables: { userId: currentUserId },
    skip: !currentUserId, //skip query if user is not logged in
  });

  let navBar;
  if (user && userData && userData.getUser && userData.getUser.verified) {
    const userDetail = userData.getUser;
    navBar = (
      <AppBar position="static" sx={{ bgcolor: "#E6E6DD" }}>
        <Toolbar>
          <IconButton edge="start" component={RouterLink} to="/">
            <img
              src={BlackLogo}
              alt="House Logo"
              style={{ width: "50px", height: "auto" }}
            />
          </IconButton>
          <Stack direction="row" spacing={2} sx={{ ml: "auto" }}>
            <Button
              variant="text"
              component={RouterLink}
              to="/find-stay"
              sx={{
                color: theme.palette.secondary.main,
                "&:hover": {
                  bgcolor: theme.palette.background.default,
                  fontWeight: "bold",
                  textDecoration: "underline",
                },
              }}
            >
              Find A Stay
            </Button>
            <Button
              variant="text"
              component={RouterLink}
              to="/list-stay"
              sx={{
                color: theme.palette.secondary.main,
                "&:hover": {
                  bgcolor: theme.palette.background.default,
                  fontWeight: "bold",
                  textDecoration: "underline",
                },
              }}
            >
              List A Stay
            </Button>
            <Tooltip title="My profile">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                style={{ padding: "6px" }}
              >
                <Avatar
                  style={{
                    backgroundColor: "#AF8C53",
                    width: "32px",
                    height: "32px",
                  }}
                  src={userDetail.image}
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
                  bgcolor: "#E6E6DD",
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "#E6E6DD",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem component={RouterLink} to="userprofile">
                <Avatar src={userDetail.image} /> {user.fullName}
              </MenuItem>
              <Divider />
              <MenuItem onClick={logout} component={RouterLink} to="/">
                {" "}
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
    );
  } else {
    navBar = (
      <AppBar position="static" sx={{ bgcolor: "#E6E6DD", height: "10vh" }}>
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
              to="/find-stay"
              sx={{
                color: theme.palette.secondary.main,
                "&:hover": {
                  bgcolor: theme.palette.background.default,
                  fontWeight: "bold",
                  textDecoration: "underline",
                },
              }}
            >
              Find A Stay
            </Button>
            <Button
              variant="text"
              component={RouterLink}
              to="/login"
              sx={{
                color: theme.palette.secondary.main,
                "&:hover": {
                  bgcolor: theme.palette.background.default,
                  fontWeight: "bold",
                  textDecoration: "underline",
                },
              }}
            >
              List A Stay
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

const GET_USER_QUERY = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      fullName
      username
      image
      verified
    }
  }
`;

export default HomeNavbar;
