import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Card, CardHeader, CardMedia, CardContent, IconButton, Typography, Avatar } from "@mui/material";
import StarIcon from '@mui/icons-material/Star'; // Import for filled star
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

function StayCard({ listing }) {
  console.log("Listing images:", listing.images);
  const [isFavorite, setIsFavorite] = useState(false); // Initialize as not favorite
  const [addToFavorites, { loading, error }] = useMutation(FAVORITE, {
    variables: { listingId: listing.id },
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
      }
    },
    onCompleted: () => setIsFavorite(!isFavorite) // Toggle favorite status on completion
  });

  const handleFavorite = () => {
    if (!localStorage.getItem("jwtToken")) {
      console.log("No JWT found. User might not be logged in.");
      return;
    }
    addToFavorites();
  };

  return (
    <Card sx={{ maxWidth: "16rem", border: "3px solid black", borderRadius: "1rem", margin: "0.5rem" }}>
      <CardMedia component="div" sx={{ position: "relative" }}>
        <IconButton
          aria-label="add to favorites"
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
          onClick={handleFavorite}
        >
          {isFavorite ? <StarIcon style={{ color: "yellow" }} /> : <StarBorderIcon />}
        </IconButton>
        {listing.images && listing.images.length > 0 ? (
    <img
      src={listing.images[0]} // Display the first image URL
      alt="Listing"
      style={{
        height: "15rem",
        width: "15rem",
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
        height: "15rem",
        width: "100%",
        objectFit: "cover",
        borderRadius: "1rem",
        position: "center",
        padding: "0.5rem",
      }}
    />
  )}
      </CardMedia>
      <CardHeader avatar={<Avatar sx={{ bgcolor: "red" }}>R</Avatar>} title={listing.title} subheader={listing.location} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">{`${listing.leaseStartDate} - ${listing.leaseEndDate}`}</Typography>
        <Typography variant="h5">${listing.price}/month</Typography>
      </CardContent>
    </Card>
  );
}

export default StayCard;
