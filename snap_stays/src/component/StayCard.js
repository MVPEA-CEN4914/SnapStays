import React, { useState, useEffect } from "react";
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

  const handleFavorite = (e) => {
    e.preventDefault(); // prevent link behavior
    e.stopPropagation(); // prevent event propogation
    if (!localStorage.getItem("jwtToken")) {
      console.log("No JWT found. User might not be logged in.");
      return;
    }
    addToFavorites({ variables: { listingId: listing.id } });
  };

  useEffect(() => {
    setIsFavorite(isFavorited);
  }, [isFavorited]);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  let titleShort = listing.title;
  if (titleShort.length > 18) {
    titleShort = titleShort.substring(0, 18) + "...";
  }
  let locShort = listing.location;
  if (locShort.length > 45) {
    locShort = locShort.substring(0, 45) + "...";
  }

  return (
    <Link to={`/listing/${listing.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          maxWidth: "16rem",
          height: "25rem",
          border: "3px solid black",
          borderRadius: "1rem",
          margin: "0.5rem",
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <CardMedia
          component="div"
          sx={{
            position: "relative",
            height: "15rem",
            width: "15rem",
          }}
        >
          <IconButton
            aria-label="add to favorites"
            sx={{ position: "absolute", right: "0.5rem", top: "0.5rem" }}
            onClick={handleFavorite}
          >
            {isFavorited ? (
              <StarIcon style={{ color: theme.palette.background.default }} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
          <img
            src={
              listing.images && listing.images.length > 0
                ? listing.images[0]
                : TempListing
            }
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
        </CardMedia>
        <CardHeader
          avatar={
            listing.user.image ? (
              <Avatar src={listing.user.image} />
            ) : (
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                {listing.user.fullName[0]}
              </Avatar>
            )
          }
          title={titleShort}
          subheader={locShort}
          sx={{ maxWidth: "15rem", paddingY: "0.5rem" }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">{`${formatDate(
            listing.leaseStartDate
          )} - ${formatDate(listing.leaseEndDate)}`}</Typography>
          <Typography variant="h5">${listing.price}/month</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default StayCard;
