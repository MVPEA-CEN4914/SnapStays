import { useQuery, gql,useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Container, Typography, makeStyles } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyCard from "../component/MyCard";
import MyListCard from "../component/MyListCard";
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Pagination from "@mui/material/Pagination";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box'
import Upload from "../component/Upload";
import { Cloudinary } from "@cloudinary/url-gen";


const EDIT_PROFILE = gql `
  mutation EditUserProfile($id: ID!, $fullName: String, $username: String, $about: String, $image: String) {
    editUserProfile(id: $id, fullName: $fullName, username: $username, about: $about, image: $image) {
      id
      fullName
      username
      about
      image
    }
  }
`;

function UserProfile() {
const { user } = useContext(AuthContext);
const [editUserProfile] = useMutation(EDIT_PROFILE);
const [isEditingAbout, setIsEditingAbout] = useState(false);
const [aboutContent, setAboutContent] = useState("");
const [currentFavoritesPage, setCurrentFavoritesPage] = useState(1);
const [currentUserListingsPage, setCurrentUserListingsPage] = useState(1);
const [fullName, setFullName] = useState(user.fullName || "");
const [username, setUsername] = useState(user.username||"");
const [email, setEmail] = useState("");
const [about, setAbout] = useState("");
const [newImageUrl, setNewImageUrl] = useState(null);

const setImageUrl = (imageUrl) => {
  setNewImageUrl(imageUrl);
}

const handleDeleteImage = () => {
  setImageUrl(null);
};
  //const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dyv2ynif2");
  const [uploadPreset] = useState("snapstayup");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset
  });
  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

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
  if (userError) return <p>Error: {userError.message} user </p>;
  if (listingsError) return <p>Error: {listingsError.message} listing </p>;

  const userDetail = userData.getUser;

const favorites = userDetail.favorites || [];
const favoritesPerPage = 2;
const indexOfLastFavorite = currentFavoritesPage * favoritesPerPage;
const indexOfFirstFavorite = indexOfLastFavorite - favoritesPerPage;
const currentFavorites = favorites.slice(indexOfFirstFavorite, indexOfLastFavorite);

const handleEditAbout = () => {
  setIsEditingAbout(true);
  setAboutContent(userDetail.about || ""); // Set the initial value of about content
  
};



const handleSaveAbout = async () => {
  try {
    const result = await editUserProfile({
      variables: {
        id: user.id,
        fullName: fullName || userDetail.fullName,
        username: username || userDetail.username,
        about: about || userDetail.about,
        image: newImageUrl || userDetail.image, 
      },
    });
    const updatedUserProfile = result.data.editUserProfile;
    // Update the local state with the updated user profile data
    setFullName(updatedUserProfile.fullName);
    setUsername(updatedUserProfile.username);
    setAbout(updatedUserProfile.about);
    setNewImageUrl(updatedUserProfile.image);
    setIsEditingAbout(false);
  } catch (error) {
    console.error("Error updating user profile:", error);
    // Handle error, show a message to the user, etc.
  }
};

const handleClose = () => {
  setIsEditingAbout(false);
};
    // Filter user's listings
    const userOwnedListings = listingsData.getListings.filter(
      (listing) => listing.user.id === user.id
    );
    //Pagination for the User Listings 
    const listingsPerPage = 2;
  const indexOfLastListing = currentUserListingsPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentUserListings = userOwnedListings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );



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
              <Avatar  src={userDetail.image} style={{ width: "100px", height: "100px" }} />
            </Grid>
            <Grid item paddingBottom={"15px"}>
              <Button variant="contained" color="primary" onClick={handleEditAbout}>
              {isEditingAbout ? "Cancel" : "Edit"}
              </Button>
              <Dialog open={isEditingAbout} onClose={handleClose}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                <Box display="flex" justifyContent="center" alignItems="center">
            <Avatar
              alt={userDetail.name}
              src={newImageUrl || userDetail.image}
              sx={{ width: 100, height: 100 }}
              style={{ marginRight: '20px' }}
            />
            <Upload uwConfig={uwConfig} setImageUrl={setImageUrl} />
          </Box>
                   <TextField
                      label="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      label="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      label="About"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      variant="outlined"
                      fullWidth
                    />

                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleSaveAbout} color="primary">
                    Save
                  </Button>
                </DialogActions>
              </Dialog>


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

            <Typography variant="body1" align="center" fontFamily="Josefin Sans">
              <b>About:</b> {userDetail.about || "No information available because we need to add about to user DB model"}
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
            <div style={{ display: 'flex', justifyContent: 'space-between' , width: '45%' }}>
              <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="500">My Listing(s)</Typography>
              <Button variant="contained" color="primary" href="/list-stay"> <AddIcon /></Button>
            </div>
            {currentUserListings.map((listing) => (
          <MyListCard key={listing.id} listing={listing} />
        ))}
{/* Pagination for My Listings */}
<Grid
  container
  spacing={1}
  xs={12}
  md={6}
  style={{ border: "1px solid black", marginTop: "10px" }} // Adjust marginTop as needed
  justifyContent="center"
>
  <Pagination
    count={Math.ceil(userOwnedListings.length / listingsPerPage)}
    page={currentUserListingsPage}
    onChange={(event, value) => setCurrentUserListingsPage(value)}
    sx={{
      "& .MuiPaginationItem-root": {
        borderRadius: 1,
      },
      "& .MuiPaginationItem-page": {
        "&.Mui-selected": {
          backgroundColor: "#AF8C53",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#CDB285",
          },
        },
      },
    }}
  />
</Grid>

          </Grid>

          {/*Messages grid*/}
          <Grid
            container
            spacing={1}
            xs={12}
            md={6}
            style={{ border: "1px solid black" , marginTop: "10px"}}
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
            style={{ border: "1px solid orange" , marginTop: "10px"}}
            justifyContent={"center"}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' , width: '45%' }}>
              <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="500">My Favorites</Typography>
              <Button variant="contained" color="primary" href="/find-stay"> <AddIcon /></Button>
            </div>

            {currentFavorites.map((favorite) => (
                   <MyCard listing={favorite} />   
            ))}
            {/* Pagination for Favorites */}
<Grid
  container
  spacing={1}
  xs={12}
  md={6}
  style={{ border: "1px solid orange", marginTop: "10px" }} // Adjust marginTop as needed
  justifyContent={"center"}
>
  <Pagination
    count={Math.ceil(favorites.length / favoritesPerPage)}
    page={currentFavoritesPage}
    onChange={(event, value) => setCurrentFavoritesPage(value)}
    sx={{
      '& .MuiPaginationItem-root': {
        borderRadius: 1,
      },
      '& .MuiPaginationItem-page': {
        '&.Mui-selected': {
          backgroundColor: '#AF8C53',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#CDB285',
          },
        },
      },
    }}
  />
</Grid>
          
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
      about 
      image
      favorites{
        id
        title
        price
        location
        leaseStartDate
        leaseEndDate
        images
      }
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
      images
      user{
        id
        fullName
      }
    }
  }
`;



export default UserProfile;
