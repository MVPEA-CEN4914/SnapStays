import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Houses from '../images/Houses.png'
import axios from 'axios';
import { gql } from 'graphql-tag';
import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/auth';
import { useForm } from '../hooks/hooks';
import { pink } from '@mui/material/colors';

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

const defaultTheme = createTheme();

function Register(props) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const[errors, setErrors] = useState({});
  const[values, setValues] = useState({
    fullName:'',
    username:'',
    email:'',
    password: '',
    confirmPassword: '',
  });

  const onChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from event.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Update the corresponding state property using computed property syntax
    }));
  };  
  const [registerUser, {loading}] = useMutation(REGISTER, {
    update(_,{data:{register: userData}}){
      //console.log('Mutation result:', result);
      context.login(userData);
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
  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log('Form values:', values);
    registerUser();
    
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
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="fullName"
                //autoFocus
                value={values.fullName}
                error={errors.fullName ? true : false}
                onChange={onChange}
                helperText={errors.fullName ? errors.fullName: ''}
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={values.username} // Use the value from state
                error={errors.username ? true : false}
                onChange={onChange} // Update the state when the input changes
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="School Email Address"
                name="email"
                autoComplete="email"
                value={values.email} // Use the value from state
                onChange={onChange} // Update the state when the input changes
                error={errors.email ? true : false}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={values.password} // Use the value from state
                onChange={onChange} // Update the state when the input changes
                error={errors.password ? true : false}
              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={values.confirmPassword} // Use the value from state
                onChange={onChange} // Update the state when the input changes
                error={errors.confirmPassword ? true : false}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: 'black', '&:hover': {
                  bgcolor: 'grey',
                }}}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2" sx={{color:'black'}}>
                    {"Have an account? Sign In"}
                  </Link>
                </Grid>
                <Box>
                {Object.keys(errors).length > 0 && (
  <div className="ui error message">
    <ul className="list" sx={{ color: 'red' }}>
      {Object.entries(errors).map(([fieldName, errorMessage], index) => (
        <li key={index}>{errorMessage}</li>
      ))}
    </ul>
  </div>
)}
                </Box>
              </Grid>
              <Copyright sx={{ mt: 5, color: 'black' }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
const REGISTER = gql`
  mutation register(
    $fullName: String!
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
    
  ){
    register(
      registerInput: {
        fullName: $fullName
        email: $email
        username: $username
        password: $password
        confirmPassword: $confirmPassword
      }
    ){
      id
      email
      username
      createdAt
      token
      fullName
    }
  }
  `;

export default Register;