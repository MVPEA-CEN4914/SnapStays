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
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

const nums = ["1", "2", "3", "4", "5+", "any"];

function Filter({ onClose, selectedFilters, open }) {
  const theme = useTheme();
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
    <Dialog fullWidth={true} maxWidth="xs" open={open}>
      <DialogTitle>Select Filter(s):</DialogTitle>
      <DialogContent dividers sx={{ paddingX: "2rem" }}>
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
            value={filters.numberOfRoommates}
            exclusive
            onChange={handleChange}
            aria-label="number of roommates"
          >
            {nums.map((num) => (
              <ToggleButton name="numberOfRoommates" value={num} key={num}>
                {num}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Typography variant="p" sx={{ paddingTop: "0.5rem" }}>
            Bathrooms:{" "}
          </Typography>
          <ToggleButtonGroup
            value={filters.bathroomType}
            exclusive
            onChange={handleChange}
            aria-label="type of bathroom"
            sx={{ paddingBottom: "0.5rem" }}
          >
            <ToggleButton name="bathroomType" value="personal" key="personal">
              Personal
            </ToggleButton>
            <ToggleButton name="bathroomType" value="shared" key="shared">
              Shared
            </ToggleButton>
            <ToggleButton name="bathroomType" value="any" key="any">
              Any
            </ToggleButton>
          </ToggleButtonGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.isFurnished}
                onChange={handleChangeCheck}
                name="isFurnished"
              />
            }
            label="Furnished"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.utilitiesIncluded}
                onChange={handleChangeCheck}
                name="utilitiesIncluded"
              />
            }
            label="Utilities Included"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.petsAllowed}
                onChange={handleChangeCheck}
                name="petsAllowed"
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
