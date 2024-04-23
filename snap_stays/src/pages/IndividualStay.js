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
  Button,
  Divider,
  Box,
  TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Upload from "../component/Upload";
import ClearIcon from "@mui/icons-material/Clear";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InputAdornment from "@mui/material/InputAdornment";
import { Cloudinary } from "@cloudinary/url-gen";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const nums = ["1", "2", "3", "4", "+5"];

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

  const Spacer = ({ height }) => <Box style={{ height }} />;
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
        parsedValue = value == "+5" ? 5 : parseInt(value);
        break;
      case "isFurnished":
      case "utilitiesIncluded":
      case "petsAllowed":
        parsedValue = e.target.checked;
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

  if (listing.bathroomType === "personal") {
    bathroomType = "Personal";
  } else {
    bathroomType = "Shared";
  }

  let furnished = "";

  if (listing.isFurnished) {
    furnished = "Yes";
  } else {
    furnished = "No";
  }

  let petsAllowed = "";

  if (listing.petsAllowed) {
    petsAllowed = "Yes";
  } else {
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
    <div
      style={{
        padding: "1rem 2rem 1rem 2rem",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid container spacing={10}>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center">
            {isEditing ? (
              <>
                <TextField
                  name="title"
                  label="Title"
                  value={editedListing.title}
                  onChange={handleChange}
                  sx={{ paddingRight: "1rem" }}
                />
                <Button variant="contained" onClick={handleSave}>
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/userprofile")}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    marginLeft: "1rem",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.light,
                    },
                  }}
                >
                  Cancel
                </Button>
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
              <Grid display="flex">
                <TextField
                  id="price"
                  label="Montly Rent"
                  name="price"
                  autoComplete="monthlyRent"
                  type="number"
                  value={editedListing.price}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: "10rem" }}
                />
                <TextField
                  label="Lease Start Date"
                  variant="outlined"
                  value={new Date(listing.leaseStartDate).toLocaleDateString(
                    "en-US"
                  )}
                  disabled
                  sx={{ width: "15rem", marginX: "1rem" }}
                />
                <TextField
                  label="Lease End Date"
                  variant="outlined"
                  value={new Date(listing.leaseEndDate).toLocaleDateString(
                    "en-US"
                  )}
                  disabled
                  sx={{ width: "15rem" }}
                />
              </Grid>
              <TextField
                label="Location"
                variant="outlined"
                value={editedListing.location}
                onChange={handleChange}
                name="location"
                fullWidth
              />
              <Divider
                variant="middle"
                sx={{ width: "100%", paddingY: "1rem" }}
              >
                <Typography component="h1" variant="h5">
                  Details
                </Typography>
              </Divider>
              <Grid container>
                <Grid item xs={2} />
                <Grid item xs={5}>
                  <Grid item>
                    <Typography variant="p" sx={{ paddingRight: "1rem" }}>
                      Roommates:{" "}
                    </Typography>
                    <ToggleButtonGroup
                      value={editedListing.numberOfRoommates.toString()}
                      exclusive
                      onChange={handleChange}
                      aria-label="number of roommates"
                    >
                      {nums.map((num) => (
                        <ToggleButton
                          name="numberOfRoommates"
                          value={num}
                          key={num}
                        >
                          {num}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Grid>
                  <Grid item sx={{ paddingTop: "1rem" }}>
                    <Typography variant="p" sx={{ paddingRight: "1rem" }}>
                      Bathrooms:
                    </Typography>
                    <ToggleButtonGroup
                      value={editedListing.bathroomType}
                      exclusive
                      onChange={handleChange}
                      aria-label="type of bathroom"
                    >
                      <ToggleButton
                        name="bathroomType"
                        value="personal"
                        key="personal"
                      >
                        Personal
                      </ToggleButton>
                      <ToggleButton
                        name="bathroomType"
                        value="shared"
                        key="shared"
                      >
                        Shared
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={editedListing.isFurnished}
                          onChange={handleChange}
                          name="isFurnished"
                        />
                      }
                      label="Furnished"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={editedListing.utilitiesIncluded}
                          onChange={handleChange}
                          name="utilitiesIncluded"
                        />
                      }
                      label="Utilities Included"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={editedListing.petsAllowed}
                          onChange={handleChange}
                          name="petsAllowed"
                        />
                      }
                      label="Pets Allowed"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                fontFamily="Josefin Sans"
                fontWeight="500"
              >
                ${listing.price}/month
              </Typography>
              <Typography variant="h4">{`${formatDate(
                listing.leaseStartDate
              )} - ${formatDate(listing.leaseEndDate)}`}</Typography>
              <Typography variant="h4">
                <LocationOnIcon sx={{ color: theme.palette.primary.main }} />
                {listing.location}
              </Typography>
              <Spacer height="20px" />
              <Divider style={{ backgroundColor: "black", height: "2px" }} />
              <Spacer height="20px" />
              <Typography
                variant="h4"
                fontFamily="Josefin Sans"
                fontWeight="500"
              >
                Details:
              </Typography>
              <Typography
                variant="h5"
                fontFamily="Josefin Sans"
                fontWeight="500"
              >
                Roommates: {listing.numberOfRoommates}
              </Typography>
              <Typography
                variant="h5"
                fontFamily="Josefin Sans"
                fontWeight="500"
              >
                Bathroom: {bathroomType}
              </Typography>
              <Typography
                variant="h5"
                fontFamily="Josefin Sans"
                fontWeight="500"
                sx={{
                  textDecoration: listing.isFurnished ? "none" : "line-through",
                  color: listing.isFurnished ? "black" : "grey",
                }}
              >
                Furnished: {furnished}
              </Typography>
              <Typography
                variant="h5"
                fontFamily="Josefin Sans"
                fontWeight="500"
                sx={{
                  textDecoration: listing.utilitiesIncluded
                    ? "none"
                    : "line-through",
                  color: listing.utilitiesIncluded ? "black" : "grey",
                }}
              >
                Furnished: {furnished}
              </Typography>
              <Typography
                variant="h5"
                fontFamily="Josefin Sans"
                fontWeight="500"
                sx={{
                  textDecoration: listing.petsAllowed ? "none" : "line-through",
                  color: listing.petsAllowed ? "black" : "grey",
                }}
              >
                Pets Allowed: {petsAllowed}
              </Typography>
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
                width: 600,
                height: 400,
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
                  borderRadius: "1rem",
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
                    borderRadius: "1rem",
                    padding: "0.5rem 1rem",
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
      <Container style={{ maxWidth: "100%", paddingLeft: 0 }}>
        {isEditing ? (
          <>
            <Divider
              variant="middle"
              sx={{ width: "100%", paddingBottom: "1rem" }}
            />
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "15px",
                  },
                },
              }}
              required
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              value={editedListing.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </>
        ) : (
          <>
            <Spacer height="20px" />
            <Divider
              style={{
                backgroundColor: "black",
                height: "2px",
                paddingY: "1rem",
              }}
            />
            <Spacer height="20px" />
            <Typography variant="h5" align="left" gutterBottom>
              {listing.description}
            </Typography>
          </>
        )}
        <Divider
          variant="middle"
          sx={{ width: "100%", paddingBottom: "1rem" }}
        />
      </Container>
      <Container style={{ maxWidth: "100%", paddingLeft: 0 }}>
        <Card
          sx={{
            maxWidth: "md",
            mx: "auto",
            my: 2,
            padding: "2rem 1rem",
            bgcolor: "#d9d9d9",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Avatar
                src={listing.user.image}
                style={{
                  width: "150px",
                  height: "150px",
                  border: "3px solid black",
                  alignSelf: "center",
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="left"
                >
                  Owner: {listing.user.fullName}
                </Typography>
                <Typography variant="h6">{listing.user.about}</Typography>
                {!isListingOwner && (
                  <Button
                    size="medium"
                    variant="contained"
                    onClick={handleMessageClick}
                    sx={{ marginTop: "1rem" }}
                  >
                    Message: I am interested in your listing
                  </Button>
                )}
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
  mutation sendMessage($message: String!, $receiverId: ID!) {
    sendMessage(message: $message, receiverId: $receiverId) {
      message
    }
  }
`;
const EDIT_LISTING = gql`
  mutation EditListing(
    $id: ID!
    $title: String
    $price: Float
    $location: String
    $numberOfRoommates: Int
    $bathroomType: String
    $leaseStartDate: Date
    $leaseEndDate: Date
    $isFurnished: Boolean
    $utilitiesIncluded: Boolean
    $petsAllowed: Boolean
    $description: String
    $images: [String]
  ) {
    editListing(
      id: $id
      title: $title
      price: $price
      location: $location
      numberOfRoommates: $numberOfRoommates
      bathroomType: $bathroomType
      leaseStartDate: $leaseStartDate
      leaseEndDate: $leaseEndDate
      isFurnished: $isFurnished
      utilitiesIncluded: $utilitiesIncluded
      petsAllowed: $petsAllowed
      description: $description
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
