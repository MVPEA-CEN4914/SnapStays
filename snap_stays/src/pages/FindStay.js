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
import { useState } from "react";

import Filter from "../component/Filter";
import StayCard from "../component/StayCard";

function FindStay() {
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
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={8}>
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
          <Grid container className="search-list" sx={{ padding: "1rem" }}>
            {data.getFilteredListings.map((listing) => (
              <StayCard listing={listing} />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="map">Map content here</div>
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

export default FindStay;
