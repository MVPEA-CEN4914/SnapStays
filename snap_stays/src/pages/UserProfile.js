import { useQuery, gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Container, Typography, makeStyles } from "@mui/material";
import MyCard from "../component/MyCard";
import MyListCard from "../component/MyListCard";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Upload from "../component/Upload";
import { useTheme } from "@mui/material/styles";
import { Cloudinary } from "@cloudinary/url-gen";

const EDIT_PROFILE = gql`
  mutation EditUserProfile(
    $id: ID!
    $fullName: String
    $username: String
    $about: String
    $image: String
  ) {
    editUserProfile(
      id: $id
      fullName: $fullName
      username: $username
      about: $about
      image: $image
    ) {
      id
      fullName
      username
      about
      image
    }
  }
`;

function UserProfile() {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const [editUserProfile] = useMutation(EDIT_PROFILE);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutContent, setAboutContent] = useState("");
  const [currentFavoritesPage, setCurrentFavoritesPage] = useState(1);
  const [currentUserListingsPage, setCurrentUserListingsPage] = useState(1);
  const [fullName, setFullName] = useState(user.fullName || "");
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [newImageUrl, setNewImageUrl] = useState(null);
  const [isImageRemoved, setIsImageRemoved] = useState(false);

  const setImageUrl = (imageUrl) => {
   // console.log("Setting image URL:", imageUrl); 
    setNewImageUrl(imageUrl);
  };


  //const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dyv2ynif2");
  const [uploadPreset] = useState("snapstayup");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
  });
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
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
  const currentFavorites = favorites.slice(
    indexOfFirstFavorite,
    indexOfLastFavorite
  );

  const handleEditAbout = () => {
    setIsEditingAbout(true);
    setAboutContent(userDetail.about || ""); // Set the initial value of about content
  };
  const handleDeleteImage = () => {
    
    setNewImageUrl(null); // Also set newImageUrl to null to ensure consistency
    setIsImageRemoved(true);
  };

  const handleSaveAbout = async () => {
    try {
      const result = await editUserProfile({
        variables: {
          id: user.id,
          fullName: fullName || userDetail.fullName,
          username: username || userDetail.username,
          about: about || userDetail.about,
          image: isImageRemoved ? null : newImageUrl || userDetail.image,
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
    setIsImageRemoved(false);
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
    <div
      style={{
        padding: "1rem 2rem 1rem 2rem",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="600">
        <b>My Profile Information</b>
      </Typography>

      <Grid container item xs={6} md={12}>
        {/*Avatar and Edit Button*/}
        <Grid
          container item 
          direction="row"
          xs={12}
          sm={12}
          spacing={1}
          style={{ paddingTop: "1rem" }}
        >
          <Grid item container sm direction="column" alignItems="center" display="flex">
            <Grid item>
            {userDetail.image ? ( // Check if userDetail.image is not null
    <Avatar
      src={userDetail.image}
      style={{
        width: "150px",
        height: "150px",
        border: "3px solid black",
      }}
    />
  ) : (
    <Avatar
      style={{
        width: "150px",
        height: "150px",
        border: "3px solid black",
      }}
    >
      {/* You can add alternative content here, like initials or an icon */}
    </Avatar>
  )}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditAbout}
                sx={{ margin: "1rem" }}
              >
                {isEditingAbout ? "Cancel" : "Edit"}
              </Button>
              <Dialog open={isEditingAbout} onClose={handleClose}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                  <Box
                    display="flex" justifyContent="center" alignItems="center"
                  >
                    <Avatar
                      alt={userDetail.name}
                      src={isImageRemoved ? null : newImageUrl || userDetail.image}
                      sx={{ width: 100, height: 100, borderRadius: '50%', marginBottom: '1rem' }}
                      //style={{ marginRight: "20px" }}
                    />       
                  </Box>
                  <Box display="flex" justifyContent="center" >
                  <Upload uwConfig={uwConfig} setImageUrl={setImageUrl} />
                  <Button onClick={handleDeleteImage}  sx={{ marginLeft: '8px' }}>
      Remove 
    </Button>
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
          </Grid>
          <Grid sm={7} item container direction="column">
            <Typography variant="h5" fontFamily="Josefin Sans">
              <b>Name:</b> {userDetail.fullName}
            </Typography>
            <Typography variant="h5" fontFamily="Josefin Sans">
              <b>Username:</b> {userDetail.username}
            </Typography>
            <Typography variant="h5" fontFamily="Josefin Sans">
              <b>Email:</b> {userDetail.email}
            </Typography>
            <Typography
              variant="h5"
              fontFamily="Josefin Sans"
              //sx={{ paddingTop: "1rem" }}
            >
              <b>About:</b>{" "}
              {userDetail.about ||
                "Enter your About information by clicking the Edit button"}
            </Typography>
          </Grid>
          <Grid
            sm={3}
            item container 
            direction="column"
            
            sx={{
              
              borderRadius: "1rem",
              border: "2px solid black",
              backgroundColor: theme.palette.secondary.light,
              padding: "2rem", // Add padding to make the box just around the text
              width: "fit-content", // Adjust width to fit the content
              height: "70px",
              
            }}
          >
            <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="500">
              Messages
              <IconButton
                variant="contained"
                href="/messages"
                sx={{
                  color: theme.palette.background.default,
                  bgcolor: theme.palette.primary.main,
                  "&:hover": {
                    bgcolor: theme.palette.primary.light,
                  },
                  marginLeft: "7.6rem",
                }}
              >
                <AddIcon />
              </IconButton>
            </Typography>
          </Grid>
        </Grid>

        {/*My Listings grid*/}
        <Grid container item xs={12} md={6} style={{ padding: "1rem" }}>
          <Grid item md={12} display="flex">
            <Grid item md={11}>
              <Typography
                variant="h4"
                fontFamily="Josefin Sans"
                fontWeight="500"
              >
                My Listings
              </Typography>
            </Grid>
            <Grid item md={1}>
              <IconButton
                variant="contained"
                href="/list-stay"
                sx={{
                  color: theme.palette.background.default,
                  bgcolor: theme.palette.primary.main,
                  "&:hover": {
                    bgcolor: theme.palette.primary.light,
                    
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item md={12}>
            {currentUserListings.map((listing) => (
              <MyListCard key={listing.id} listing={listing} />
            ))}
          </Grid>
          {/* Pagination for My Listings */}
          <Grid
            item
            xs={12}
            md={12}
            style={{ marginTop: "10px" }} // Adjust marginTop as needed
            display="flex"
            justifyContent="center"
          >
            {currentUserListings.length > 0 ? (
              <Pagination
                count={Math.ceil(userOwnedListings.length / listingsPerPage)}
                page={currentUserListingsPage}
                onChange={(event, value) => setCurrentUserListingsPage(value)}
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "1rem",
                  },
                  "& .MuiPaginationItem-page": {
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.primary.main,
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                      },
                    },
                  },
                }}
              />
            ) : (
              <Typography variant="h6" fontFamily="Josefin Sans">
                You have no listings yet
              </Typography>
            )}
          </Grid>
        </Grid>

        {/*Favorites grid*/}
        <Grid container item xs={12} md={6} style={{ padding: "1rem" }}>
          <Grid item md={12} display="flex">
            <Grid item md={11}>
              <Typography
                variant="h4"
                fontFamily="Josefin Sans"
                fontWeight="500"
              >
                My Favorites
              </Typography>
            </Grid>
            <Grid item md={1}>
              <IconButton
                variant="contained"
                href="/find-stay"
                sx={{
                  color: theme.palette.background.default,
                  bgcolor: theme.palette.primary.main,
                  "&:hover": {
                    bgcolor: theme.palette.primary.light,
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item md={12} alignItems="flex-start">
            {currentFavorites.map((favorite) => (
              <MyCard key={favorite.id} listing={favorite} />
            ))}
          </Grid>
          {/* Pagination for Favorites */}
          <Grid
            item
            xs={12}
            md={12}
            style={{ marginTop: "10px" }} // Adjust marginTop as needed
            display="flex"
            justifyContent="center"
          >
            {currentFavorites.length > 0 ? (
              <Pagination
                count={Math.ceil(favorites.length / favoritesPerPage)}
                page={currentFavoritesPage}
                onChange={(event, value) => setCurrentFavoritesPage(value)}
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "1rem",
                  },
                  "& .MuiPaginationItem-page": {
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.primary.main,
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                      },
                    },
                  },
                }}
              />
            ) : (
              <Typography variant="h6" fontFamily="Josefin Sans">
                You have no favorites yet
              </Typography>
            )}
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
      favorites {
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
      user {
        id
        fullName
      }
    }
  }
`;

export default UserProfile;