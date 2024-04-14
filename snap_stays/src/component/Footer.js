import * as React from "react";
import Typography from "@mui/material/Typography";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import GitHubIcon from "@mui/icons-material/GitHub";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

function Footer() {
  const theme = useTheme();
  const mobileSize = useMediaQuery("(max-width:500px)");
  return (
    <Paper>
      <BottomNavigation
        onChange={(event, newValue) => {}}
        sx={{
          height: "7vh",
          background: theme.palette.primary.main,
        }}
      >
        <Typography
          variant={mobileSize ? "caption" : "h6"}
          sx={{ color: theme.palette.background.default, paddingTop: mobileSize ? "35px" : "10px" }}
        >
          Copyright 2024. All rights reserved
        </Typography>
        <BottomNavigationAction
          label=""
          component={Link}
          to="https://github.com/MVPEA-CEN4914/SnapStays"
          sx={{
            paddingTop: mobileSize ? "25px" : "0px",
            color: theme.palette.background.default,
            "&:hover": {
              color: theme.palette.primary.light,
            },
          }}
          icon={<GitHubIcon />}
        />
        <Typography
          variant={mobileSize ? "caption" : "h6"}
          sx={{ color: theme.palette.background.default, paddingTop: mobileSize ? "35px" : "10px" }}
        >
          {"Made with <3 at UF"}
        </Typography>
      </BottomNavigation>
    </Paper>
  );
}

export default Footer;
