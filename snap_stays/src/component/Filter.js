import * as React from "react";
import { Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import StayCard from "../component/StayCard";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { useQuery, gql } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

const filters = ["Furnished", "Utilities Included", "Pets Allowed"];

function Filter({ onClose, selectedValue, open }) {
    const [value, setValue] = useState(selectedValue);
    const radioGroupRef = React.useRef(null);
    React.useEffect(() => {
      if (!open) {
        setValue(selectedValue);
      }
    }, [selectedValue, open]);
    const handleEntering = () => {
      if (radioGroupRef.current != null) {
        radioGroupRef.current.focus();
      }
    };
    const handleCancel = () => {
      onClose(selectedValue);
    };
    const handleOk = () => {
      onClose(value);
    };
    const handleChange = (event) => {
      setValue(event.target.value);
    };
    return (
      <Dialog TransitionProps={{ onEntering: handleEntering }} open={open}>
        <DialogTitle>Select Filter(s):</DialogTitle>
        <DialogContent dividers>
          <RadioGroup
            ref={radioGroupRef}
            aria-label="filters"
            name="filters"
            value={value}
            onChange={handleChange}
          >
            {filters.map((filter) => (
              <FormControlLabel
                value={filter}
                key={filter}
                control={<Radio />}
                label={filter}
              />
            ))}
          </RadioGroup>
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
  
  Filter.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  export default Filter;