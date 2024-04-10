import React from 'react'
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Grid, Card } from '@mui/material';
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

  return (
    <div>
     <Grid>
     <Typography variant="h4" textAlign="center" fontFamily="Josefin Sans" fontWeight="600">
        <b>{listing.title}</b>
      </Typography>
     </Grid>
    
    
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
      }
    }
  }
`;

export default IndividualStay;