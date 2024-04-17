import React from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Card,
  Avatar,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Box,
  TextField,
  Toolbar,
  AppBar,
  Paper
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StayCard from "../component/StayCard";
import TempListing from "../images/TempListing.jpg";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Upload from "../component/Upload";
import ClearIcon from "@mui/icons-material/Clear";
import { Cloudinary } from "@cloudinary/url-gen";


function IndividualStay() {

    const { user } = useContext(AuthContext);
    const currentUserId = user ? user.id : null; // handle case where user is null 
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
    const [sendMessage] = useMutation(SEND_MESSAGE);
    const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editedListing, setEditedListing] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editListing] = useMutation(EDIT_LISTING, {
    onError: (error) => {
      console.error("Edit listing mutation error:", error);
      // Handle error
    },
    onCompleted: (data) => {
      console.log("Listing edited successfully:", data);
      // Handle successful edit
      // Optionally, navigate back to the listing page or perform any other action
    },
  });
 
  const Spacer = ({ height }) => (
    <Box style={{ height }} />
  )
  const theme = useTheme();
  const { listingid } = useParams();
  const listingId = listingid;
  console.log("listing id: ", listingId);
  const { loading, error, data } = useQuery(GET_LISTING_QUERY, {
    variables: { listingId: listingId }, // Pass the listing ID as a variable to the query
  });
  if (loading) return <CircularProgress />;
  if (error)
    return <Typography variant="body1">Error: {error.message}</Typography>;
    const listing = data.getListing;
    const isListingOwner = currentUserId === listing.user.id;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedListing(listing); // Initialize editedListing with current listing data
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue;
    
    // Parse values based on field names
    switch (name) {
      case "price":
        parsedValue = parseFloat(value);
        break;
      case "numberOfRoommates":
        parsedValue = parseInt(value);
        break;
    case "leaseStartDate":
    case "leaseEndDate":
      // Convert the value to a Date object if it's not already
      if (!(value instanceof Date)) {
        parsedValue = new Date(value);
      } else {
        parsedValue = value;
      }
      break;
      default:
        parsedValue = value;
    }
  
    // Update the editedListing state
    setEditedListing((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };



  const handleSave = () => {
    editListing({ variables: editedListing });
    setIsEditing(false);
  };
  
  
   const handleMessageClick = async () => {
    const receiverId = listing.user.id;
    const message = `Hi, I'm interested in your listing "${listing.title}"`;
    try {
      await sendMessage({
        variables: { message: message, receiverId: receiverId },
        context: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Include the token in the headers
          },
        },
      });
      navigate("/messages");
    } catch (error) {
      console.log("Error sending message: ", error);
    }
  };

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };



  const handleDelete = (index) => {
    const newImages = [...editedListing.images];
    newImages.splice(index, 1);
    setEditedListing((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const setImageUrl = (imageUrl) => {
    setEditedListing((prevState) => ({
      ...prevState,
      images: [...prevState.images, imageUrl],
    }));
  };
  let bathroomType = "";

  if (listing.bathroomType === "personal"){
    bathroomType = "Personal";
  }
  else{
    bathroomType = "Shared";
  }

  let furnished = "";

  if (listing.isFurnished)
  {
    furnished = "Yes";
  }
  else{
    furnished = "No";
  }

  let petsAllowed = "";

  if (listing.petsAllowed)
  {
    petsAllowed = "Yes";
  }
  else{
    petsAllowed = "No";
  }
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div style={{
      padding: "1rem 2rem 1rem 2rem",
      backgroundColor: theme.palette.background.default,
    }}>
      <Grid container spacing={10}>
      <Grid item xs={6}>
    <Box display="flex" alignItems="center">
  {isEditing ? (
        <>
          {/* Render text fields for editing */}
          <TextField
            name="title"
            label="Title"
            value={editedListing.title}
            onChange={handleChange}
          />
          <Button onClick={handleSave}>Save</Button>
        </>
      ) : (
        <>
          {/* Render listing details */}
          <Typography variant="h4">{listing.title}</Typography>
          {!isEditing && isListingOwner && (
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        )}
        </>
      )}
  </Box>
      {isEditing ? (
        <>
         <TextField
    label="Price"
    variant="outlined"
    value={editedListing.price}
    onChange={handleChange}
    name="price"
    type="number"
    fullWidth
  />
  <TextField
    label="Lease Start Date"
    variant="outlined"
    value={new Date(listing.leaseStartDate).toLocaleDateString("en-US")}
    disabled
    fullWidth
  />
  <TextField
    label="Lease End Date"
    variant="outlined"
    value={new Date(listing.leaseEndDate).toLocaleDateString("en-US")}
    disabled
    fullWidth
  />
  <TextField
    label="Location"
    variant="outlined"
    value={editedListing.location}
    onChange={handleChange}
    name="location"
    fullWidth
  />
  <TextField
    label="Roommates"
    variant="outlined"
    value={editedListing.numberOfRoommates}
    onChange={handleChange}
    name="numberOfRoommates"
    type="number"
    fullWidth
  />
  <TextField
    label="Bathroom Type"
    variant="outlined"
    value={editedListing.bathroomType}
    onChange={handleChange}
    name="bathroomType"
    fullWidth
  />
  <TextField
    label="Furnished"
    variant="outlined"
    value={editedListing.isFurnished ? "Yes" : "No"}
    onChange={handleChange}
    name="isFurnished"
    fullWidth
  />
  <TextField
    label="Pets Allowed"
    variant="outlined"
    value={editedListing.petsAllowed ? "Yes" : "No"}
    onChange={handleChange}
    name="petsAllowed"
    fullWidth
  />
        </>

      ):(
       <>
        <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="500">
            {/* <b>{listing.user.image}</b> */}
            ${listing.price}/month
          </Typography>
          <Typography variant="h4" color="text.secondary">{`${formatDate(
            listing.leaseStartDate
          )} - ${formatDate(listing.leaseEndDate)}`}</Typography>

          <Typography> <LocationOnIcon sx={{ color: '#af8c53' }}/> {listing.location}</Typography>
          <Divider style={{ backgroundColor: 'black', height: '2px' }} />
          <Spacer height="20px" />
          <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="500">
            Details: 
          </Typography>
          <Typography variant="h5" fontFamily="Josefin Sans" fontWeight="500">
            Roommates: {listing.numberOfRoommates}
          </Typography>
          <Typography variant="h5" fontFamily="Josefin Sans" fontWeight="500">
            Bathroom: {bathroomType}
          </Typography>
          <Typography variant="h5" fontFamily="Josefin Sans" fontWeight="500">
            Furnished: {furnished}
          </Typography>
          <Typography variant="h5" fontFamily="Josefin Sans" fontWeight="500">
            Pets Allowed: {petsAllowed}
          </Typography>
          <Divider style={{ backgroundColor: 'black', height: '2px' }} />   
       
       </>
      )}         
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
        {isEditing ? (
      <Grid container spacing={2} padding={"1rem"}>
        <Grid item xs={12} sm={6} md={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            {editedListing.images.length < 12 && (
              <Upload uwConfig={uwConfig} setImageUrl={setImageUrl} />
            )}
          </Box>
        </Grid>
        {editedListing.images.map((image, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{ position: "relative" }}
          >
            <img
              src={image}
              alt={`Uploaded ${index}`}
              style={{
                width: "100%",
                height: "12rem",
                objectFit: "cover",
                borderRadius: "1rem",
                border: "2px solid black",
              }}
            />
            <IconButton
              variant="contained"
              onClick={() => handleDelete(index)}
              sx={{
                position: "absolute",
                top: "1.3rem",
                right: "0.3rem",
                height: "2rem",
                width: "2rem",
                color: theme.palette.background.default,
                bgcolor: theme.palette.error.main,
                "&:hover": {
                  bgcolor: theme.palette.error.light,
                },
              }}
            >
              <ClearIcon />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Box
        sx={{
          width: 400,
          height: 350,
          borderRadius: 4,
          overflow: "hidden",
          marginLeft: "auto",
          position: "relative", // Add this line
        }}
      >
        <img
          src={listing.images[currentImageIndex]}
          alt="Top Right"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            border: "3px solid #000",
          }}
        />
        {/* Add pagination buttons */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            color="inherit"
            variant="contained"
            onClick={handlePreviousImage}
          >
            &#8249;
          </Button>
          <Box
            sx={{
              margin: "0 10px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "4px",
              padding: "4px 8px",
            }}
          >
            {currentImageIndex + 1}/{listing.images.length}
          </Box>
          <Button
            color="inherit"
            variant="contained"
            onClick={handleNextImage}
          >
            &#8250;
          </Button>
        </div>
      </Box>
    )}
        </Grid>
      </Grid>
      <Spacer height="20px" />
      <Container style={{ maxWidth: '100%', paddingLeft: 0 }}>
      {isEditing ? (
  // Render a text field for editing the description
  <TextField
    label="Description"
    variant="outlined"
    value={editedListing.description}
    onChange={handleChange}
    name="description"
    multiline
    fullWidth
  />
) : (
  // Render the description as a Typography component
  <Typography variant="body1" align="left" gutterBottom>
    {listing.description}
  </Typography>
)}
        <Divider style={{ backgroundColor: 'black', height: '2px' }} />
      </Container>
    <Container style={{ maxWidth: '100%', paddingLeft: 0 }}>
      <Card sx={{ maxWidth: "md", mx: "auto", my: 2 , bgcolor: '#d9d9d9' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}sx={{ display: 'flex', justifyContent: 'center' }}>
            {/* <CardMedia
            component="img"
            height="140"
            image={listing.user.image}
          /> */}
            <Avatar
              src={listing.user.image}
              style={{
                width: "150px",
                height: "150px",
                border: "2px solid black",
                alignSelf: 'center'
              }}
            />
            {/* <Divider orientation="vertical" flexItem/> */}
          </Grid>
          {/* <Divider orientation="vertical" flexItem /> */}
          <Grid item xs={8}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" align="center">
                Owner: {listing.user.fullName}
              </Typography>
              <Typography variant="body2">
                {/* Some description given by the user about themselves, it comes
                from their profile. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. */}
                {listing.user.about}
              </Typography>
              <Box textAlign="center">
                <Button size="small" variant="contained"onClick={handleMessageClick}>Message: I am interested in your listing</Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
    </div>
  );
}

const GET_LISTING_QUERY = gql`
  query GetListing($listingId: ID!) {
    getListing(listingId: $listingId) {
      id
      title
      price
      numberOfRoommates
      bathroomType
      location
      images
      leaseStartDate
      leaseEndDate
      isFurnished
      utilitiesIncluded
      petsAllowed
      description
      createdAt
      user {
        id
        fullName
        image
        about
      }
    }
  }
`;
const SEND_MESSAGE = gql`
  mutation sendMessage(
    $message: String!,
    $receiverId: ID!
  ) {
    sendMessage(
      message: $message
      receiverId: $receiverId
    ){
      message
    }
  }
`;
const EDIT_LISTING = gql`
  mutation EditListing(
    $id: ID!,
    $title: String,
    $price: Float,
    $location: String,
    $numberOfRoommates: Int,
    $bathroomType: String,
    $leaseStartDate: Date,
    $leaseEndDate: Date,
    $isFurnished: Boolean,
    $utilitiesIncluded: Boolean,
    $petsAllowed: Boolean,
    $description: String,
    $images: [String]
  ) {
    editListing(
      id: $id,
      title: $title,
      price: $price,
      location: $location,
      numberOfRoommates: $numberOfRoommates,
      bathroomType: $bathroomType,
      leaseStartDate: $leaseStartDate,
      leaseEndDate: $leaseEndDate,
      isFurnished: $isFurnished,
      utilitiesIncluded: $utilitiesIncluded,
      petsAllowed: $petsAllowed,
      description: $description,
      images: $images
    ) {
      id
      title
      price
      location
      numberOfRoommates
      bathroomType
      leaseStartDate
      leaseEndDate
      isFurnished
      utilitiesIncluded
      petsAllowed
      description
      images
      createdAt
      user {
        id
        fullName
        email
      }
    }
  }
`;

export default IndividualStay;
