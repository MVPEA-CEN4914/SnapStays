
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Houses from '../images/Houses.png'
import { useTheme } from "@mui/material/styles";
import axios from 'axios';
import { useForm } from '../hooks/hooks';
import { gql } from 'graphql-tag';
import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/auth';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Login(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
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
  const[loginUser, {loading}] = useMutation(LOGIN, {
    update(_, {data:{login: userData}}){
      context.login(userData);
      navigate('/');
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
    loginUser();
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            variant="h4"
            sx={{ paddingY: "1rem", fontWeight: "bold" }}
          >
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              required
              value={values.email}
              error={errors.email ? true : false}
              onChange={onChange}
              helperText={errors.email ? errors.email : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ marginRight: "2.5rem" }}
                  />
                ),
              }}
            />
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
            <Grid container sx={{mb: 1}}>
              <Grid item xs={12}>
                {/*if there's going to be a remember me check, don't we need the functionality for it?*/}
                <FormControlLabel
                  control={<Checkbox value="remember" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 1,
                    mb: 2,
                    bgcolor: theme.palette.primary.main,
                    "&:hover": {
                      bgcolor: theme.palette.primary.light,
                    },
                  }}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs>
                <Link
                  href="/forgot-password"
                  variant="body2"
                  sx={{ color: "black" }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2" sx={{ color: "black" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
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

const LOGIN = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
      fullName
    }
  }
`;
export default Login;
