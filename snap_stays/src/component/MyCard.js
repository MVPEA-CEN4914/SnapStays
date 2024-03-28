import React from 'react'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import TempListing from "../images/TempListing.jpg";

function MyCard() {
  return (
    <Card sx={{ display:"flex", maxHeight: "120px", width:"76%", borderRadius:"20px" }}>
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
        <Typography gutterBottom variant="h5">
          Name of Listing 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price of Listing + Length of Stay 
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent:'flex-end'}}>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  )
}

export default MyCard