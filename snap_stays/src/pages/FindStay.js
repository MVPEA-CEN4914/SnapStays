import { Container, Grid } from "@mui/material";
import React from "react";
import StayCard from "../component/StayCard";

function FindStay() {
  return (
    <div>
      <div style={{ paddingBottom: "15px" }}>
        Search bar content here with filtering stuff
      </div>
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={6}>
          <div className="search-list" style={{ marginLeft: "10px" }}>
            <StayCard />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="map"> Map content here</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default FindStay;
