import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star"; // Import for filled star
import { gql, useMutation } from "@apollo/client";
import TempListing from "../images/TempListing.jpg";

const FAVORITE = gql`
  mutation AddListingToFavorites($listingId: ID!) {
    addListingToFavorites(listingId: $listingId) {
      favorites {
        id
        title
      }
    }
  }
`;

function StayCard({ listing, isFavorited }) {
  const theme = useTheme();
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  const [addToFavorites] = useMutation(FAVORITE, {
    variables: { listingId: listing.id },
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    },
    onCompleted: () => setIsFavorite(!isFavorite),
  });

  const handleFavorite = () => {
    if (!localStorage.getItem("jwtToken")) {
      console.log("No JWT found. User might not be logged in.");
      return;
    }
    addToFavorites();
  };

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Card
      sx={{
        maxWidth: "16rem", height:"26rem",
        border: "3px solid black",
        borderRadius: "1rem",
        margin: "0.5rem",
      }}
    >
      <CardMedia component="div"  sx={{
    position: "relative",
    height: "15rem",
    width: "15rem", // Set both height and width to desired dimensions
  }}>
        <IconButton
          aria-label="add to favorites"
          sx={{ position: "absolute", right: "0.5rem" }}
          onClick={handleFavorite}
        >
          {isFavorited ? (
            <StarIcon style={{ color: theme.palette.primary.main }} />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
        {listing.images && listing.images.length > 0 ? (
    <img
      src={listing.images[0]} // Display the first image URL
      alt="Listing"
      style={{
        height: "100%",
        width: "100%",
        objectFit: "cover",
        borderRadius: "1rem",
        position: "center",
        padding: "0.5rem",
      }}
    />
  ) : (
    <img
      src={TempListing} // Fallback to TempListing image if no images are present
      alt="Listing"
      style={{
        height: "100%",
        width: "100%",
        objectFit: "cover",
        borderRadius: "1rem",
        position: "center",
        padding: "0.5rem",
      }}
    />
  )}
      </CardMedia>
      <CardHeader avatar={
        listing.user.image ? (
          <Avatar src={listing.user.image} />
        ) : ( <Avatar sx={{ bgcolor: "#AF8C53" }}>{listing.user.fullName[0]}</Avatar>)
      } title={listing.title} subheader={listing.location} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">{`${formatDate(
          listing.leaseStartDate
        )} - ${formatDate(listing.leaseEndDate)}`}</Typography>
        <Typography variant="h5">${listing.price}/month</Typography>
      </CardContent>
    </Card>
  );
}

export default StayCard;
