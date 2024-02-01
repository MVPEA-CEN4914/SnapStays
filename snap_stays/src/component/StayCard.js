import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import TempListing from "../images/TempListing.jpg";

function StayCard() {
  return (
    <Card
      sx={{ maxWidth: 240, border: "1px solid black", borderRadius: "15px" }}
    >
      <CardMedia component="div" sx={{ position: "relative" }}>
        <IconButton
          aria-label="add to favorites"
          sx={{ position: "absolute", top: "8px", right: "8px" }}
        >
          <FavoriteIcon />
        </IconButton>
        <img
          src={TempListing}
          height={230}
          maxWidth={200}
          style={{ borderRadius: "5px" }}
        />
      </CardMedia>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="$650/month 1BR"
        subheader="Your Mom's House | University Park"
      />
    </Card>
  );
}

export default StayCard;
