import React from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Card,
  Avatar,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Box,
  Toolbar,
  AppBar,
  Paper
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StayCard from "../component/StayCard";
import TempListing from "../images/TempListing.jpg";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function IndividualStay() {
  const Spacer = ({ height }) => (
    <Box style={{ height }} />
  )
  const theme = useTheme();
  const { listingid } = useParams();
  const listingId = listingid;
  console.log("listing id: ", listingId);
  const { loading, error, data } = useQuery(GET_LISTING_QUERY, {
    variables: { listingId: listingId }, // Pass the listing ID as a variable to the query
  });
  if (loading) return <CircularProgress />;
  if (error)
    return <Typography variant="body1">Error: {error.message}</Typography>;

  const listing = data.getListing;

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  let bathroomType = "";

  if (listing.bathroomType === "personal"){
    bathroomType = "Personal";
  }
  else{
    bathroomType = "Shared";
  }

  let furnished = "";

  if (listing.isFurnished)
  {
    furnished = "Yes";
  }
  else{
    furnished = "No";
  }

  let petsAllowed = "";

  if (listing.petsAllowed)
  {
    petsAllowed = "Yes";
  }
  else{
    petsAllowed = "No";
  }


  return (
    <div style={{
      padding: "1rem 2rem 1rem 2rem",
      backgroundColor: theme.palette.background.default,
    }}>
      {/* <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="600">
        <b>{listing.title}</b>
      </Typography> */}
      <Grid container spacing={10}>
        <Grid item xs={6}>
          <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="600">
            <b>{listing.title}</b>
          </Typography>
          <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="500">
            {/* <b>{listing.user.image}</b> */}
            ${listing.price}/month
          </Typography>
          <Typography variant="h4" color="text.secondary">{`${formatDate(
            listing.leaseStartDate
          )} - ${formatDate(listing.leaseEndDate)}`}</Typography>

          <Typography> <LocationOnIcon sx={{ color: '#af8c53' }}/> {listing.location}</Typography>
          <Divider style={{ backgroundColor: 'black', height: '2px' }} />
          <Spacer height="20px" />
          <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="500">
            Details: 
          </Typography>
          <Typography variant="h5" fontFamily="Josefin Sans" fontWeight="500">
            Roommates: {listing.numberOfRoommates}
          </Typography>
          <Typography variant="h5" fontFamily="Josefin Sans" fontWeight="500">
            Bathroom: {bathroomType}
          </Typography>
          <Typography variant="h5" fontFamily="Josefin Sans" fontWeight="500">
            Furnished: {furnished}
          </Typography>
          <Typography variant="h5" fontFamily="Josefin Sans" fontWeight="500">
            Pets Allowed: {petsAllowed}
          </Typography>
          <Divider style={{ backgroundColor: 'black', height: '2px' }} />          
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end" p={1}>
            {/* <img src={listing.images} alt="Top Right" style={{ maxWidth: '400px', maxHeight: '400px' }} /> */}
            <img 
            src={listing.images[0]} 
            alt="Top Right" 
            style={{
            maxWidth: '400px',
            maxHeight: '400px',
            borderRadius: '20px', // This makes the image rounded
            border: '3px solid #000' // This adds a black border with a thickness of 3px
            }} 
            />
          </Box>
        </Grid>
      </Grid>
      <Spacer height="20px" />
      <Container style={{ maxWidth: '100%', paddingLeft: 0 }}>
        <Typography variant="body1" align="left" gutterBottom>
          Some description given by the user about this listing and extra details not covered above. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Dui vivamus arcu felis bibendum ut tristique et egestas. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus. Facilisis volutpat est velit egestas. Nunc sed id semper risus in hendrerit gravida. Amet risus nullam eget felis eget nunc lobortis. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Convallis aenean et tortor at risus viverra adipiscing at.
        </Typography>
        <Divider style={{ backgroundColor: 'black', height: '2px' }} />
      </Container>
    <Container style={{ maxWidth: '100%', paddingLeft: 0 }}>
      <Card sx={{ maxWidth: "md", mx: "auto", my: 2 , bgcolor: '#d9d9d9' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}sx={{ display: 'flex', justifyContent: 'center' }}>
            {/* <CardMedia
            component="img"
            height="140"
            image={listing.user.image}
          /> */}
            <Avatar
              src={listing.user.image}
              style={{
                width: "150px",
                height: "150px",
                border: "2px solid black",
                alignSelf: 'center'
              }}
            />
            {/* <Divider orientation="vertical" flexItem/> */}
          </Grid>
          {/* <Divider orientation="vertical" flexItem /> */}
          <Grid item xs={8}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" align="center">
                Owner: {listing.user.fullName}
              </Typography>
              <Typography variant="body2">
                Some description given by the user about themselves, it comes
                from their profile. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </Typography>
              <Box textAlign="center">
              <Link to={`/messages`}>
                <Button size="small" variant="contained" >Message</Button>
              </Link>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
    </div>
  );
}

const GET_LISTING_QUERY = gql`
  query GetListing($listingId: ID!) {
    getListing(listingId: $listingId) {
      id
      title
      price
      numberOfRoommates
      bathroomType
      location
      images
      leaseStartDate
      leaseEndDate
      isFurnished
      utilitiesIncluded
      petsAllowed
      description
      createdAt
      user {
        id
        fullName
        image
      }
    }
  }
`;

export default IndividualStay;
