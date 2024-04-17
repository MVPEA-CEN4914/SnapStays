import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import TempListing from "../images/TempListing.jpg";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

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

function MyCard({ listing }) {
  const [isFavorite, setIsFavorite] = useState(true); // Initialize as favorite
  const [addToFavorites, { loading, error }] = useMutation(FAVORITE, {
    variables: { listingId: listing.id },
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    },
    onCompleted: () => setIsFavorite(!isFavorite), // Toggle favorite status on completion
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
        display: "flex",
        maxHeight: "8.5rem",
        margin: "8px",
        borderRadius: "1rem",
        border: "2px solid black",
      }}
    >
      <CardMedia>
        <img
          src={
            listing.images && listing.images.length > 0
              ? listing.images[0]
              : TempListing
          }
          alt="Listing"
          style={{
            borderRadius: "1rem",
            height: "8rem",
            width: "8rem",
            objectFit: "cover",
            padding: "0.5rem",
          }}
        />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h6">
          {listing.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Location: </b>
          {listing.location}
          <br></br>
          <b>Lease Dates: </b>
          {`${formatDate(listing.leaseStartDate)} - ${formatDate(
            listing.leaseEndDate
          )}`}
          <br></br>
          <b>Price: </b>${listing.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignSelf: "stretch" }}>
      <Link to={`/listing/${listing.id}`} style={{ textDecoration: "none" }}>
          <IconButton variant="contained" color="primary" font="medium">
            <InfoIcon fontSize="large" />
          </IconButton>
        </Link>
        <IconButton variant="contained" color="error" onClick={handleFavorite}>
          <DeleteIcon fontSize="large" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MyCard;