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
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth";
import Filter from "../component/Filter";
import StayCard from "../component/StayCard";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

function ListingMarker({ listing , isOpen, setIsOpen}) {
  const { loading, error, data } = useQuery(GET_GEOCODE, {
    variables: { address: listing.location },
  });
  if (loading) return null;
  if (error) return `Error! ${error.message}`;
  const { latitude, longitude } = data.getGeocode;
  return (
    <Marker 
      position={{ lat: latitude, lng: longitude }} 
      onClick={() => setIsOpen(listing.id)}
    >
      {isOpen == listing.id && (
        <InfoWindow onCloseClick={() => setIsOpen(null)}>
          <StayCard listing={listing} />
        </InfoWindow>
      )}
    </Marker>
  );
}

function FindStay() {
  const [isOpen, setIsOpen] = useState(null);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
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

  const { user } = useContext(AuthContext);
  const currentUserId = user ? user.id : null; // handle case where user is null 
  const [userFavorites, setUserFavorites] = useState([]);

  const { data: userData } = useQuery(GET_USER_QUERY, {
    variables: { userId: currentUserId },
    skip: !currentUserId, //skip query if user is not logged in 
  });

  useEffect(() => {
    if (userData && userData.getUser && userData.getUser.favorites) {
      const favoriteIds = userData.getUser.favorites.map((fav) => fav.id);
      setUserFavorites(favoriteIds);
    }
  }, [userData]);

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

  let { loading, error, data } = useQuery(GET_FILTERED_LISTINGS_QUERY, {
    variables: selectedFilters,
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const filteredData = data.getFilteredListings;
  return (
    <Box
      sx={{ boxShadow: 0, backgroundColor: theme.palette.background.default }}
    >
      <Grid container>
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
              paddingLeft: "1rem",
              //justifyContent: "space-evenly",
              //justifyItems: "center",
              //alignContent: "space-evenly",
              //alignItems: "center",
            }}
          >
            {data.getFilteredListings.map((listing) => (
              <StayCard
                key={listing.id}
                listing={listing}
                isFavorited={userFavorites.includes(listing.id)}
              />
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
                  <ListingMarker key={index} listing={listing} isOpen={isOpen} setIsOpen={setIsOpen}/>
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
      user{
        fullName
        image
      }
      images
    }
  }
`;

const GET_USER_QUERY = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      fullName
      username
      favorites {
        id
        title
        price
        location
        leaseStartDate
        leaseEndDate
      }
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
