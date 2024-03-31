import { useQuery, gql } from "@apollo/client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Container, Typography, makeStyles } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyCard from "../component/MyCard";
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutContent, setAboutContent] = useState("");
  
  
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

  const handleEditAbout = () => {
    setIsEditingAbout(!isEditingAbout);
    setAboutContent(userDetail.about || ""); // Set the initial value of about content
  };

  const handleSaveAbout = () => {
    // You would typically perform an API call here to update the user's about content in the backend
    setIsEditingAbout(false);
    // Update the user's about content in the backend with the value of aboutContent
  };

  return (
    <div style={{ padding: "16px" }}>
      
      <Typography variant="h4" textAlign="center" fontFamily="Josefin Sans" fontWeight="600">
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
              <Button variant="contained" color="primary" onClick={handleEditAbout}>
              {isEditingAbout ? "Cancel" : "Edit"}
              </Button>
            </Grid>

            <Typography variant="h5" fontFamily="Josefin Sans">
              <b>Name:</b> {userDetail.fullName}
            </Typography>
            <Typography variant="h5" fontFamily="Josefin Sans">
              <b>Username:</b> {userDetail.username}
            </Typography>
            <Typography variant="h5" fontFamily="Josefin Sans">
              <b>Email:</b> {userDetail.email}
            </Typography>
            {isEditingAbout ? (
            <TextField
              value={aboutContent}
              onChange={(e) => setAboutContent(e.target.value)}
              variant="outlined"
              fullWidth
            />
          ) : (
            <Typography variant="body1" align="center" fontFamily="Josefin Sans">
              <b>About:</b> {userDetail.about || "No information available because we need to add about to user DB model"}
            </Typography>
          )}
          {isEditingAbout && (
            <Button variant="contained" color="primary" onClick={handleSaveAbout}>
              Save
            </Button>
          )}
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
            <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="500">My Listing(s)  </Typography>
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
            justifyContent={"center"}
          >
            <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="500">Messages</Typography>
            
          </Grid>
          
          {/*Favorites grid*/}
          <Grid
            container
            spacing={1}
            xs={12}
            md={6}
            style={{ border: "1px solid orange" , marginTop: "50px"}}
            justifyContent={"center"}
          >
            <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="500">My Favorites</Typography>
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
