import * as React from "react";
import Typography from "@mui/material/Typography";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

function Footer() {
  const theme = useTheme();

  return (
    <Paper>
      <BottomNavigation
        onChange={(event, newValue) => {}}
        sx={{ background: theme.palette.primary.main }}
      >
        <Typography
          variant="h6"
          sx={{ color: theme.palette.background.default, paddingTop: "10px" }}
        >
          Copyright 2024. All rights reserved
        </Typography>
        <BottomNavigationAction
          label=""
          component={Link}
          to="https://github.com/MVPEA-CEN4914/SnapStays"
          sx={{
            color: theme.palette.background.default,
            "&:hover": {
              color: theme.palette.primary.light,
            },
          }}
          icon={<GitHubIcon />}
        />
        <Typography
          variant="h6"
          sx={{ color: theme.palette.background.default, paddingTop: "10px" }}
        >
          {"Made with <3 at UF"}
        </Typography>
      </BottomNavigation>
    </Paper>
  );
}

export default Footer;
