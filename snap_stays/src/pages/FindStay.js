import { Container, Grid } from "@mui/material";
import React from "react";
import StayCard from "../component/StayCard";
import { useQuery, gql } from "@apollo/client";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

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
          <div className="map"> Map content here
          <LoadScript googleMapsApiKey="AIzaSyC6S5cWS_2Bt8JurLZuM3VOWTtGaWkRXyU">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={{ lat: -34.397, lng: 150.644 }}
                zoom={10}
              >
                {/* You can add markers here using the Marker component */}
              </GoogleMap>
            </LoadScript>
          </div>
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

export default FindStay;
