import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import PasswordIcon from "@mui/icons-material/Password";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Houses from "../images/Houses.png";
import { gql } from "graphql-tag";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";

/*TO DO: Make the 5rem padding less or none for smaller screens*/

function ResetPassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  let { id } = useParams(); //gets the id from the unique link
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    id: id,
    password: "",
    confirmPassword: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from event.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Update the corresponding state property using computed property syntax
    }));
  };

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
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
    resetPassword();
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
            Reset Password
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
              id="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              required
              type={showPassword ? "text" : "password"}
              value={values.password}
              error={errors.password ? true : false}
              onChange={onChange}
              helperText={errors.password ? errors.password : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ marginRight: "0rem" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              autoComplete="new-password"
              required
              type={showPassword ? "text" : "password"}
              value={values.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={onChange}
              helperText={errors.confirmPassword ? errors.confirmPassword : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ marginRight: "0rem" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
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
              Reset Password
            </Button>
            {errors.message && (
              <Alert variant="filled" severity="error">
                {"Error: " + errors.message}
              </Alert>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $id: ID!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetPasswordInput: {
        id: $id
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      fullName
      password
    }
  }
`;

export default ResetPassword;
