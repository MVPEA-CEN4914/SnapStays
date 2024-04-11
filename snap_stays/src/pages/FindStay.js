import * as React from "react";
import { Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { useQuery, gql } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Filter from "../component/Filter";
import StayCard from "../component/StayCard";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";


function ListingMarker({ listing }) {
  const { loading, error, data } = useQuery(GET_GEOCODE, {
    variables: { address: listing.location },
  });
  const [isOpen, setIsOpen] = useState(false);
  if (loading) return null;
  if (error) return `Error! ${error.message}`;

  const { latitude, longitude } = data.getGeocode;

  return (
    <Marker 
      position={{ lat: latitude, lng: longitude }} 
      onClick={() => setIsOpen(true)}
    >
      {isOpen && (
        <InfoWindow onCloseClick={() => setIsOpen(false)}>
          <StayCard listing={listing} />
        </InfoWindow>
      )}
    </Marker>
  );
}

function FindStay() {
  
  const [coordinates, setCoordinates] = useState([]);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    title: null,
    price: [100, 5000],
    numberOfRoommates: "any",
    bathroomType: "any",
    isFurnished: false,
    utilitiesIncluded: false,
    petsAllowed: false,
  });
  let { loading, error, data } = useQuery(GET_FILTERED_LISTINGS_QUERY, {
    variables: selectedFilters,
  });
  
  const handleSearch = (event, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      title: value,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (filters) => {
    setOpen(false);
    setSelectedFilters(filters);
  };
  /*
  function ListingMarker({ location }) {
    const { loading, error, data } = useQuery(GET_GEOCODE, {
      variables: { address: location },
    });
    
    if (loading) return null;
    if (error) return `Error! ${error.message}`;
  
    const { latitude, longitude } = data.getGeocode;
  
    return <Marker position={{ lat: latitude, lng: longitude }} />;
    
  }
*/
  /*const getCoordinates = async (location) => {
    try {
      const response = await fetch(`http://localhost:3000/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
      if (response.headers.get('Content-Type') !== 'application/json') {
        console.log('Received non-JSON response');
      }
      const data = await response.json();
      console.log('data from getCoordinate:' ,data);
      //return data;
      if (!data || !data.lat || !data.lng) {
        throw new Error('Invalid data received from server');
      }
      return [
        parseFloat(data.lat),
        parseFloat(data.lng),
      ];
    } catch (error) {
      console.error(`Failed to fetch coordinates for location ${location}:`, error);
    }*/
    /*const response = await fetch(
      `http://localhost:3000/geocode?address=${location}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };*/
  /*
  useEffect(() => {
    if (data && data.getFilteredListings) {
    const fetchCoordinates = async () => {
      try {
        const coords = await Promise.all(
          data.getFilteredListings.map((listing) =>
            getCoordinates(listing.location)
          )
        );
        console.log('coordinates:' ,coords); 
        setCoordinates(coords);
      } catch (error) {
        console.error("Failed to fetch all coordinates:", error);
      }
    };
    fetchCoordinates();
  }
  }, [data]); */
 
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const filteredData = data.getFilteredListings;

  return (
    <Box
      sx={{ boxShadow: 0, backgroundColor: theme.palette.background.default }}
    >
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={7}>
          <Grid
            container
            alignItems={"center"}
            style={{
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
            }}
          >
            <Grid
              item
              xs={4}
              md={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                aria-label="Select a filter"
                onClick={handleClickOpen}
              >
                <TuneIcon sx={{ color: theme.palette.secondary.main }} />
              </IconButton>
              <Typography variant="h6">Filters</Typography>
              <Filter
                selectedFilters={selectedFilters}
                open={open}
                onClose={handleClose}
              />
            </Grid>
            <Grid item xs={4} md={7}>
              <Autocomplete
                name="title"
                freeSolo
                onChange={handleSearch}
                value={selectedFilters.title}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                options={data.getFilteredListings.map(
                  (listing) => listing.title
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Listings"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <SearchIcon
                          sx={{ paddingLeft: "5px", color: "grey" }}
                        />
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4} md={3}>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {"Showing " + filteredData.length + " Results"}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            className="search-list"
            sx={{
              paddingTop: "1rem",
              justifyContent: "space-evenly",
              justifyItems: "center",
              alignContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {data.getFilteredListings.map((listing) => (
              <StayCard listing={listing} />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <div className="map">
            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "900px" }}
                center={{ lat: 29.652, lng: -82.325 }}
                zoom={11}
              >
                {/*{coordinates.map((coord, index) => (
                  <Marker key={index} position={{ lat: coord.lat, lng: coord.lng }} />
                ))}
                */}
                {data.getFilteredListings.map((listing, index) => (
                  //<ListingMarker key={index} location={listing.location} />
                  <ListingMarker key={index} listing={listing} />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

const GET_FILTERED_LISTINGS_QUERY = gql`
  query getFilteredListings(
    $title: String
    $price: [Int]!
    $numberOfRoommates: String!
    $bathroomType: String!
    $isFurnished: Boolean!
    $utilitiesIncluded: Boolean!
    $petsAllowed: Boolean!
  ) {
    getFilteredListings(
      filteredInput: {
        title: $title
        price: $price
        numberOfRoommates: $numberOfRoommates
        bathroomType: $bathroomType
        isFurnished: $isFurnished
        utilitiesIncluded: $utilitiesIncluded
        petsAllowed: $petsAllowed
      }
    ) {
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
const GET_GEOCODE = gql`
  query GetGeocode($address: String!) {
    getGeocode(address: $address) {
      latitude
      longitude
    }
  }
`;

export default FindStay;
