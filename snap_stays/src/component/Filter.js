import * as React from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Slider from "@mui/material/Slider";
import { useQuery, gql } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

const nums = ["1", "2", "3", "4"];

function Filter({ onClose, selectedFilters, open }) {
  const [filters, setFilters] = useState(selectedFilters);

  const handleChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeCheck = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleCancel = () => {
    setFilters(selectedFilters);
    onClose(selectedFilters);
  };

  const handleOk = () => {
    onClose(filters);
  };

  return (
    <Dialog fullWidth="true" maxWidth="xs" open={open}>
      <DialogTitle>Select Filter(s):</DialogTitle>
      <DialogContent dividers sx={{paddingX: "2rem"}}>
        <FormGroup aria-label="filters" name="filters">
          <Typography variant="p">Price Range: </Typography>
          <Slider
            name="price"
            getAriaLabel={() => "Price range"}
            value={filters.price}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={100}
            max={5000}
            step={50}
            sx={{ width: "15rem" }}
          />
          <Typography variant="p">Roommates: </Typography>
          <ToggleButtonGroup
            value={filters.roommates}
            exclusive
            onChange={handleChange}
            aria-label="number of roommates"
          >
            {nums.map((num) => (
              <ToggleButton name="roommates" value={num} key={"r" + num}>
                {num}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Typography variant="p" sx={{ paddingTop: "0.5rem" }}>
            Bathrooms:{" "}
          </Typography>
          <ToggleButtonGroup
            value={filters.bathrooms}
            exclusive
            onChange={handleChange}
            aria-label="number of bathrooms"
            sx={{ paddingBottom: "0.5rem" }}
          >
            {nums.map((num) => (
              <ToggleButton name="bathrooms" value={num} key={"b" + num}>
                {num}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.furnished}
                onChange={handleChangeCheck}
                name="furnished"
              />
            }
            label="Furnished"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.utilities}
                onChange={handleChangeCheck}
                name="utilities"
              />
            }
            label="Utilities Included"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.pets}
                onChange={handleChangeCheck}
                name="pets"
              />
            }
            label="Pets Allowed"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Filter;
