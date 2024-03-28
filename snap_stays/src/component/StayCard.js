import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import TempListing from "../images/TempListing.jpg";

function StayCard({ listing }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        maxWidth: "16rem",
        border: "3px solid black",
        borderRadius: "1rem",
        margin: "0.5rem",
      }}
    >
      <CardMedia component="div" sx={{ position: "relative" }}>
        <IconButton
          aria-label="add to favorites"
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        >
          <StarBorderIcon />
        </IconButton>
        <img
          src={TempListing}
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
      </CardMedia>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: theme.palette.primary.main }}
            aria-label="user profile picture"
          >
            R
          </Avatar>
        }
        title={listing.title}
        subheader={listing.location}
        sx={{ paddingY: "0" }}
      />
      <CardContent sx={{ paddingBottom: "0" }}>
        <Typography variant="body2" color="text.secondary">
          {listing.leaseStartDate} - {listing.leaseEndDate}
        </Typography>
        <Typography variant="h5">${listing.price}/month</Typography>
      </CardContent>
    </Card>
  );
}

export default StayCard;
