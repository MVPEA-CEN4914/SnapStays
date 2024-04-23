import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import TempListing from "../images/TempListing.jpg";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const DELETE = gql`
  mutation DeleteListing($listingId: ID!) {
    deleteListing(listingId: $listingId)
  }
`;

function MyListCard({ listing }) {
  const [deleteList] = useMutation(DELETE, {
    variables: { listingId: listing.id },
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Ensure you have the JWT stored in localStorage
      },
    },
    onCompleted: () => {
      console.log("delete successful");
      window.location.reload();
    },
    onError: (err) => {
      console.log("not successful: ", err);
    },
  });

  const handleDelete = () => {
    if (!localStorage.getItem("jwtToken")) {
      console.log("No JWT found. User might not be logged in.");
      return;
    }
    console.log("JWT Token:", localStorage.getItem("jwtToken"));
    deleteList();
  };

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  let titleShort = listing.title;
  if (titleShort.length > 35) {
    titleShort = titleShort.substring(0, 35) + "...";
  }
  let locShort = listing.location;
  if (locShort.length > 45) {
    locShort = locShort.substring(0, 45) + "...";
  }

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
          {titleShort}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Location: </b>
          {locShort}
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
        <IconButton variant="contained" color="primary">
          <EditIcon fontSize="large"/>
        </IconButton>
        </Link>
        <IconButton variant="contained" color="error" onClick={handleDelete}>
          <DeleteIcon fontSize="large"/>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MyListCard;
