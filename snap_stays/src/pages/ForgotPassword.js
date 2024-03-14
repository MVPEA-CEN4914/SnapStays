import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import PasswordIcon from "@mui/icons-material/Password";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Typography from "@mui/material/Typography";
import Houses from "../images/Houses.png";
import { gql } from "graphql-tag";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useTheme } from "@mui/material/styles";

/*TO DO: Make the 5rem padding less or none for smaller screens*/

function ForgotPassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from event.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Update the corresponding state property using computed property syntax
    }));
  };

  const [sendRecoveryEmail, { loading }] = useMutation(FORGOT_PASSWORD, {
    update(_, result) {
      console.log("Mutation result:", result);
      navigate("/login");
    },
    onError(err) {
      console.log("Mutation error:", err);
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        const extensionErrors = err.graphQLErrors[0]?.extensions?.errors;
        if (extensionErrors) {
          // Populate errors state with extension error messages
          setErrors(extensionErrors);
        } else {
          // If extension errors not found, prob bad user input, show actual error message
          setErrors(err.graphQLErrors[0]);
        }
      } else {
        // If there are no GraphQL errors, set a generic error message
        setErrors({ general: "An error occurred" });
      }
    },
    variables: values,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form values:", values);
    sendRecoveryEmail();
  };
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "90vh",
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
            <PasswordIcon />
          </Avatar>
          <Typography
            variant="h4"
            sx={{ paddingY: "1rem", fontWeight: "bold" }}
          >
            Forgot Password
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Input your email to receive a recovery email.
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
            <TextField
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={onChange}
              error={errors.email || errors.message ? true : false}
              helperText={errors.email ? errors.email : errors.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon color="red" />
                  </InputAdornment>
                ),
                endAdornment: <InputAdornment position="end" sx={{ marginRight: "2.5rem"}} />,
              }}
            />
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
              Send Recovery Email
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      id
      password
    }
  }
`;

export default ForgotPassword;
