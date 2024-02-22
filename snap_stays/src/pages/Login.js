
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Houses from '../images/Houses.png'
import axios from 'axios';
import { useForm } from '../hooks/hooks';
import { gql } from 'graphql-tag';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

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
  const navigate = useNavigate();
  const[errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email:'',
    password: '',
  });

  const onChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from event.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Update the corresponding state property using computed property syntax
    }));
  }; 
  const[loginUser, {loading}] = useMutation(LOGIN, {
    update(_,result){
      console.log('Mutation result:', result);
      navigate('/');
    },
    onError(err){
      console.log('Mutation error:', err);
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        const extensionErrors = err.graphQLErrors[0]?.extensions?.errors;
        if (extensionErrors) {
          // Populate errors state with extension error messages
          setErrors(extensionErrors);
        } else {
          // If extension errors not found, set a generic error message
          setErrors({ general: 'An error occurred' });
        }
      } else {
        // If there are no GraphQL errors, set a generic error message
        setErrors({ general: 'An error occurred' });
      }
    },
    variables:values
  });
  const handleSubmit = (event) => {
    event.preventDefault();  
    console.log('Form values:', values);
    loginUser();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Houses})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: '75% 75%',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'black' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value = {values.email}
                error = {errors.email ? true :false}
                onChange={onChange}
                helperText={errors.email ? errors.email:''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value = {values.password}
                error = {errors.password ? true : false}
                onChange = {onChange}
                helperText={errors.email ? errors.email:''}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: 'black', '&:hover': {
                  bgcolor: 'grey',
                },}}
                
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" sx={{color:'black'}}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2" sx={{color:'black'}}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {Object.keys(errors).length > 0 && (
  <div className="ui error message">
    <ul className="list" sx={{ color: 'red' }}>
      {Object.entries(errors).map(([fieldName, errorMessage], index) => (
        <li key={index}>{errorMessage}</li>
      ))}
    </ul>
  </div>
)}
              <Copyright sx={{ mt: 5, color: 'black' }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
const LOGIN = gql`
mutation loginUser(
  $email: String!
  $password: String!
  ){
    login(
      email: $email
      password: $password
    ){
      id
      token
      fullName
    }
  }
 
`;

export default Login; 