import React from 'react'
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Grid, Card, Avatar, CardContent, CardMedia, Button, Divider} from '@mui/material';
import StayCard from "../component/StayCard";
import TempListing from "../images/TempListing.jpg";


function IndividualStay() {
    const{listingid} = useParams();
    const listingId = listingid;
    console.log("listing id: ", listingId);
    const { loading, error, data } = useQuery(GET_LISTING_QUERY, {
        variables: { listingId: listingId }, // Pass the listing ID as a variable to the query
      });
      if (loading) return <CircularProgress />;
  if (error) return <Typography variant="body1">Error: {error.message}</Typography>;

  const listing = data.getListing;

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
     <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="600">
        <b>{listing.title}</b>
      </Typography>
      <Grid container xs={6} md={12}>
      <Grid>
      <Typography variant="h4" fontFamily="Josefin Sans" fontWeight="600">
        {/* <b>{listing.user.image}</b> */}
        {listing.price}/month 
      </Typography>
      <Typography variant="body2" color="text.secondary">{`${formatDate(
            listing.leaseStartDate
          )} - ${formatDate(listing.leaseEndDate)}`}</Typography>
      {/* <Typography>
        {listing.leaseStartDate} - {listing.leaseEndDate}
      </Typography> */}
      <Typography>
        {listing.location}
      </Typography>
      {/* <Avatar
                src={listing.user.image}
                style={{
                  width: "175px",
                  height: "175px",
                  border: "2px solid black",
                }}
              /> */}
      </Grid>
      <Grid item sm direction="column" alignItems="center" display="flex">

      </Grid>
      <Grid item xs={12} md={4}>
      <Avatar variant="rounded"
                src={listing.images}
                style={{
                  width: "175px",
                  height: "175px",
                  border: "2px solid black",
                }}
      />
        {/* <img src={listing.images} alt="Description" style={{ width: '90%' }} /> */}
      </Grid>
      </Grid>
      <Card sx={{ maxWidth: 500, mx: 'auto', my: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
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
                }}
              />
        </Grid>
        {/* <Divider orientation="vertical" flexItem /> */}
        <Grid item xs={8}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Owner: {listing.user.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Some description given by the user about themselves, it comes from their profile. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Button size="small">Message</Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
    </div>
  )
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
      user{
        id 
        fullName
        image
      }
    }
  }
`;

export default IndividualStay;