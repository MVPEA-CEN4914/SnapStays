import * as React from "react";
import { Container, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import StayCard from "../component/StayCard";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { useQuery, gql } from "@apollo/client";
import { useTheme } from "@mui/material/styles";

function FindStay() {
  const theme = useTheme();
  const { loading, error, data } = useQuery(GET_LISTINGS_QUERY);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const filteredData = data.getListings;
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
              md={3}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TuneIcon sx={{ paddingLeft: "5px" }} />
              <Typography variant="h6"> All Filters</Typography>
            </Grid>
            <Grid item xs={4} md={6}>
              <Autocomplete
                id="listing-search-bar"
                freeSolo
                options={data.getListings.map((listing) => listing.title)}
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
          <div
            className="search-list"
            style={{
              display: "flex",
              margin: "0 10px 10px 10px",
            }}
          >
            {data.getListings.map((listing) => (
              <StayCard listing={listing} />
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="map">
            Map content here
          </div>
        </Grid>
      </Grid>
    </Box>
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
