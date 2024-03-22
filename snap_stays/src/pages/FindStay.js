import { Container, Grid } from "@mui/material";
import React from "react";
import StayCard from "../component/StayCard";
import { useQuery, gql } from "@apollo/client";

function FindStay() {
  const { loading, error, data } = useQuery(GET_LISTINGS_QUERY);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <div style={{ paddingBottom: "15px" }}>
        Search bar content here with filtering stuff
      </div>
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={8}>
          <div className="search-list" style={{ display: "flex", marginLeft: "0.5rem", marginRight: "0.5rem" }}>
            {data.getListings.map((listing) => (
              <StayCard listing={listing}/>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="map"> Map content here</div>
        </Grid>
      </Grid>
    </div>
  );
}

const GET_LISTINGS_QUERY = gql`
  {
    getListings {
      id
      createdAt
      title
      price
      leaseStartDate
      leaseEndDate
      location
    }
  }
`;

// const GET_USER_FAVORITES = gql`
//   query GetUserFavorites($userId: ID!) {
//     getFavorites(id: $userId) {
//       id
//       // add other necessary fields
//     }
//   }
// `;

export default FindStay;
