import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import TempListing from "../images/TempListing.jpg";
import { gql, useMutation } from "@apollo/client";
import { purple } from '@mui/material/colors';

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
    },
    onError: () => {
      console.log("not successful");
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

  return (
    <Card sx={{ display:"flex", maxHeight: "120px", width:"76%", borderRadius:"20px", margin:"8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",}}>
    <CardMedia>
    {listing.images && listing.images.length > 0 ? (
  <img
    src={listing.images[0]} // Display the first image URL
    alt="Listing"
    style={{
      borderRadius: '1rem',
      height: '100px',
      width: '100px',
      objectFit: 'cover',
      padding: '0.5rem',
    }}
  />
) : (
  <img
    src={TempListing} // Fallback to TempListing image if no images are present
    alt="Listing"
    style={{
      borderRadius: '1rem',
      height: '100px',
      width: '100px',
      objectFit: 'cover',
      padding: '0.5rem',
    }}
  />
)}
    </CardMedia>
  <CardContent>
    <Typography gutterBottom variant="h6">
      {listing.title} 
    </Typography>
    <Typography variant="body2" color="text.secondary">
     <b>Lease Dates: </b>{`${formatDate(
          listing.leaseStartDate
        )} - ${formatDate(listing.leaseEndDate)}`}
     <br></br>
     <b>Price: </b>${listing.price}
    </Typography>
  </CardContent>
  <CardActions sx={{justifyContent:'flex-end'}}>
    <Button size="small">Edit</Button>
    <Button size="small" onClick={handleDelete}>Delete</Button>
  </CardActions>
</Card>
  )
}

export default MyListCard;
