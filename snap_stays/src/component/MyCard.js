import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import TempListing from "../images/TempListing.jpg";
import { gql, useMutation } from "@apollo/client";

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

function MyCard({listing}) {
  const [isFavorite, setIsFavorite] = useState(true); // Initialize as favorite
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
    <Card sx={{ display:"flex", maxHeight: "120px", width:"76%", borderRadius:"20px", margin:"8px"}}>
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
          <b>Price $</b>{listing.price}
        <br></br>  <b>Location</b> {listing.location}
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent:'flex-end'}}>
        <Button size="small">View</Button>
        <Button size="small" onClick={handleFavorite}>Delete</Button>
      </CardActions>
    </Card>
  )
}

export default MyCard