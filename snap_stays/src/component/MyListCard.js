import React from 'react'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import TempListing from "../images/TempListing.jpg";
import { gql, useMutation } from "@apollo/client";

const DELETE = gql`
mutation DeleteListing($listingId: ID!){
  deleteListing(listingId: $listingId)
}
`;

function MyListCard({listing}) {
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
    onError: () =>{
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

  return (
    <Card sx={{ display:"flex", maxHeight: "120px", width:"76%", borderRadius:"20px", margin:"8px" }}>
    <CardMedia>
        <img
        src={TempListing}
        style={{
            borderRadius:'1rem' ,
            height:"100px" ,
            width:"100px",
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
     <b>Lease Dates: </b>{`${listing.leaseStartDate} - ${listing.leaseEndDate}`}
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

export default MyListCard