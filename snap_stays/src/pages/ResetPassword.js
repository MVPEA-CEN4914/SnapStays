import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PasswordIcon from "@mui/icons-material/Password";
import Typography from "@mui/material/Typography";
import Houses from "../images/Houses.png";
import { gql } from "graphql-tag";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";

/*TO DO: Make the 5rem padding less or none for smaller screens*/

function ResetPassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  let { id } = useParams(); //gets the id from the unique link
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    id: id,
    password: "",
    confirmPassword: "",
  });

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
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              value={values.password}
              onChange={onChange}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password : ""}
              InputProps={{
                style: {
                  borderRadius: "30px",
                },
              }}
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
              value={values.confirmPassword}
              onChange={onChange}
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword ? errors.confirmPassword : ""}
              InputProps={{
                style: {
                  borderRadius: "30px",
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                paddingY: "0.5rem",
                paddingX: "1rem",
                borderRadius: "30px",
                bgcolor: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: theme.palette.primary.light,
                },
              }}
            >
              Reset Password
            </Button>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              {errors.message}
            </Typography>
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
