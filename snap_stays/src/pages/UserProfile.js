import { useQuery, gql } from "@apollo/client";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Container, Typography, makeStyles } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyCard from "../component/MyCard";
import AddIcon from '@mui/icons-material/Add';

function UserProfile() {
  const { user } = useContext(AuthContext);
  
  
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER_QUERY, {
    variables: { userId: user.id },
  });
  const {
    loading: listingsLoading,
    error: listingsError,
    data: listingsData,
  } = useQuery(GET_LISTINGS_QUERY);

  if (userLoading || listingsLoading) return <p>Loading...</p>;
  if (userError) return <p>Error: {userError.message}</p>;
  if (listingsError) return <p>Error: {listingsError.message}</p>;

  const userDetail = userData.getUser;
  const userListing = listingsData.getListings.filter(
    (listing) => listing.userId === user.id
  );

  return (
    <div style={{ padding: "16px" }}>
      
      <Typography variant="h4" textAlign="center">
        <b>Your Profile Information</b>
      </Typography>
      
      <Grid container
        style={{
          padding: "16px",
          backgroundColor: "#E6E6DD",
          marginBottom: "16px",
          border: "1px solid red",
        }}
        xs={6}
        md={12}
        justifyContent="center"
      >
          {/*Avatar and Edit Button*/}
          <Grid
            container
            direction="column"
            alignItems="center"
            xs={12}
            sm={6}
            spacing={1}
            style={{ border: "2px solid purple" }}
          >
            <Grid item paddingTop={"15px"}>
              <Avatar style={{ width: "100px", height: "100px" }} />
            </Grid>
            <Grid item paddingBottom={"15px"}>
              <Button variant="contained" color="primary">
                Edit
              </Button>
            </Grid>

            <Typography variant="h5">
              <b>Name:</b> {userDetail.fullName}
            </Typography>
            <Typography variant="h5">
              <b>Username:</b> {userDetail.username}
            </Typography>
            <Typography variant="h5">
              <b>Email:</b> {userDetail.email}
            </Typography>
            <Typography variant="body1" align="center">
              <b>About:</b> About information will be loaded here when we add
              database functionality to it paragraph explaining who I am and why I love where I live 
            </Typography>
          </Grid>

          {/*My Listings grid*/}
          <Grid
            container
            spacing={1}
            xs={12}
            md={6}
            style={{ border: "1px solid black" }}
            alignItems="center"
            
            justifyContent="center"
          >
            <Typography variant="h4" >My Listings  </Typography>
            
            <Button variant="contained" color="primary" href="/list-stay" startIcon={<AddIcon />} >
                
            </Button>
            <MyCard/>
            <MyCard/> 
          </Grid>

          {/*Messages grid*/}
          <Grid
            container
            spacing={1}
            xs={12}
            md={6}
            style={{ border: "1px solid black" , marginTop: "50px"}}
          >
            <Typography>Messages</Typography>
            
          </Grid>
          
          {/*Favorites grid*/}
          <Grid
            container
            spacing={1}
            xs={12}
            md={6}
            style={{ border: "1px solid orange" , marginTop: "50px"}}
          >
            <Typography>Favorites</Typography>
          </Grid>
        </Grid>
    </div>
  );
}

const GET_USER_QUERY = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      fullName
      username
    }
  }
`;
const GET_LISTINGS_QUERY = gql`
  {
    getListings {
      id
      createdAt
      title
      price
      leaseStartDate
      leaseEndDate
      location
    }
  }
`;

export default UserProfile;
