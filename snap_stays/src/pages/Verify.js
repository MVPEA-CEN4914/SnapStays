import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from '@mui/material/Snackbar';
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';
import VerifiedIcon from "@mui/icons-material/Verified";
import Houses from "../images/Houses.png";
import { gql } from "graphql-tag";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";

function Verify() {
  const theme = useTheme();
  const navigate = useNavigate();
  let { id } = useParams(); //gets the id from the unique link
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    navigate("/login");
  };

  const [verifyUser, { loading }] = useMutation(VERIFY_USER, {
    update(_, result) {
      console.log("Mutation result:", result);
      setOpen(true);
    },
    onError(err) {
      console.log("Mutation error:", err);
    },
    variables: {
      verifyUserId: id,
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    verifyUser();
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        GO TO LOGIN
      </Button>
    </React.Fragment>
  );

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "83vh",
        paddingX: "5rem",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid
        item
        xs={false}
        sm={6}
        md={6}
        sx={{
          backgroundImage: `url(${Houses})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        component={Paper}
        elevation={6}
        square
        sx={{ backgroundColor: theme.palette.background.default, boxShadow: 0 }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
            <VerifiedIcon />
          </Avatar>
          <Typography
            variant="h4"
            sx={{ paddingY: "1rem", fontWeight: "bold" }}
          >
            Verify Your Account
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Click below to finish verifying your account!
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            You will be redirected to the login page after.
          </Typography>
          <Box
            component="form"
            noValidate
            textAlign="center"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: theme.palette.primary.light,
                },
              }}
            >
              Verify
            </Button>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
                action={action}
              >
                Your account is now verified!
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

const VERIFY_USER = gql`
  mutation verify($verifyUserId: ID!) {
    verifyUser(id: $verifyUserId) {
      id
      fullName
      verified
    }
  }
`;
export default Verify;
