import * as React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const nums = ["1", "2", "3", "4"];

function ListStay() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    title: "",
    location: "",
    price: "",
    leaseStartDate: new Date(),
    leaseEndDate: new Date(),
    numberOfRoommates: "1",
    bathroomType: "personal",
    isFurnished: false,
    utilitiesIncluded: false,
    petsAllowed: false,
    description: "",
    images: [],
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChangeCheck = (event) => {
    console.log(dateStart);
    setValues((prevFilters) => ({
      ...prevFilters,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log(values);

    const listingInput = {
      title: values.title,
      location: values.location,
      price: parseFloat(values.price),
      leaseStartDate: dateStart,
      leaseEndDate: dateEnd,
      numberOfRoommates: parseInt(values.numberOfRoommates),
      bathroomType: values.bathroomType,
      isFurnished: values.isFurnished,
      utilitiesIncluded: values.utilitiesIncluded,
      petsAllowed: values.petsAllowed,
      description: values.description,
      images: values.images.map(image => image.url), // Assuming you have image URLs
    };

    console.log(listingInput);

    createListing({ variables: { listingInput } });
  };

  const [createListing, { loading, error }] = useMutation(CREATE_LISTING, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Ensure you have the JWT stored in localStorage
      },
    },
    onCompleted: () => {
      // Handle successful listing creation
      console.log("Listing created: ", values);
      navigate('/find-stay');
    },
    onError: (apiError) => {
      // Handle API call errors
      console.error('Error listing the apartment:', apiError);
    }
  });

  const handleFileChange = (event) => {
    let newFile = Array.from(event.target.files);
    if (values.images.length > 0) {
      newFile = values.images.concat(newFile);
    }
    setValues((prevValues) => ({
      ...prevValues,
      images: newFile.length > 10 ? newFile.slice(0, 10) : newFile, // to avoid glitch of adding more at once
    }));
  };
  
  const handleDelete = (index) => {
    setValues((prevValues) => {
      const newImages = [...prevValues.images];
      newImages.splice(index, 1);
      return { ...prevValues, images: newImages };
    });
  };

  return (
    <Grid container sx={{ backgroundColor: theme.palette.background.default }}>
      <Grid item xs={12} sm={7}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ paddingY: "1rem", fontWeight: "bold" }}
          >
            List an Apartment for Sublease
          </Typography>
          <TextField
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            fullWidth
            required
            value={values.title}
            error={errors.title ? true : false}
            onChange={onChange}
          />
          <TextField
            id="location"
            label="Address"
            name="location"
            autoComplete="address"
            fullWidth
            required
            value={values.address}
            error={errors.address ? true : false}
            onChange={onChange}
          />
          <Grid display="flex">
            <TextField
              id="price"
              label="Montly Rent"
              name="price"
              autoComplete="monthlyRent"
              required
              value={values.price}
              error={errors.price ? true : false}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "10rem" }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{ paddingTop: "1rem", paddingLeft: "1rem" }}
              >
                <DatePicker
                  label="Lease Start Date *"
                  value={dateStart}
                  onChange={(newDate) => setDateStart(newDate)}
                />
                <Typography variant="h3" sx={{ color: "grey" }}>
                  -
                </Typography>
                <DatePicker
                  label="Lease End Date *"
                  value={dateEnd}
                  onChange={(newDate) => setDateEnd(newDate)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Divider variant="middle" sx={{ width: "100%", paddingY: "1rem" }}>
            <Typography component="h1" variant="h5">
              Details
            </Typography>
          </Divider>
          <Grid container>
            <Grid item xs={2} />
            <Grid item xs={5}>
              <Grid item>
                <Typography variant="p" sx={{ paddingRight: "1rem" }}>
                  Roommates:{" "}
                </Typography>
                <ToggleButtonGroup
                  value={values.numberOfRoommates}
                  exclusive
                  onChange={onChange}
                  aria-label="number of roommates"
                >
                  {nums.map((num) => (
                    <ToggleButton
                      name="numberOfRoommates"
                      value={num}
                      key={num}
                    >
                      {num}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Grid>
              <Grid item sx={{ paddingTop: "1rem" }}>
                <Typography variant="p" sx={{ paddingRight: "1rem" }}>
                  Bathrooms:
                </Typography>
                <ToggleButtonGroup
                  value={values.bathroomType}
                  exclusive
                  onChange={onChange}
                  aria-label="type of bathroom"
                >
                  <ToggleButton
                    name="bathroomType"
                    value="personal"
                    key="personal"
                  >
                    Personal
                  </ToggleButton>
                  <ToggleButton name="bathroomType" value="shared" key="shared">
                    Shared
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.isFurnished}
                      onChange={handleChangeCheck}
                      name="isFurnished"
                    />
                  }
                  label="Furnished"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.utilitiesIncluded}
                      onChange={handleChangeCheck}
                      name="utilitiesIncluded"
                    />
                  }
                  label="Utilities Included"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.petsAllowed}
                      onChange={handleChangeCheck}
                      name="petsAllowed"
                    />
                  }
                  label="Pets Allowed"
                />
              </Grid>
            </Grid>
            <Grid item xs={1} />
          </Grid>
          <Divider
            variant="middle"
            sx={{ width: "100%", paddingBottom: "1rem" }}
          />
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "15px",
                },
              },
            }}
            required
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            value={values.description}
            error={errors.description ? true : false}
            onChange={onChange}
            multiline
            rows={4}
          />
          {/* TODO: Add file input for images */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              mb: 1,
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.light,
              },
            }}
          >
            List Apartment
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={5}
        style={{
          marginLeft: "auto",
          justifyContent: "flex-end",
        }}
      >
        {values.images.length > 0 ? (
          <Grid container spacing={2} padding={"1rem"}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "3rem",
                }}
              >
                <input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  disabled={values.images.length > 9 ? true : false} // 10 pics max
                  onChange={handleFileChange}
                  style={{ display: "none", alignItems: "center" }}
                />
                <label htmlFor="contained-button-file">
                  <IconButton
                    variant="contained"
                    component="span"
                    disabled={values.images.length > 9 ? true : false} // 10 pics max
                    sx={{
                      height: "5rem",
                      width: "5rem",
                      color: theme.palette.background.default,
                      bgcolor: theme.palette.primary.main,
                      "&:hover": {
                        bgcolor: theme.palette.primary.light,
                      },
                    }}
                  >
                    <AddIcon fontSize="large" />
                  </IconButton>
                </label>
              </Box>
            </Grid>
            {values.images.map((image, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                sx={{ position: "relative" }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                  style={{
                    width: "100%",
                    height: "12rem",
                    objectFit: "cover",
                    borderRadius: "1rem",
                    border: "2px solid black",
                  }}
                />
                <IconButton
                  variant="contained"
                  onClick={() => handleDelete(index)}
                  sx={{
                    position: "absolute",
                    top: "1.3rem",
                    right: "0.3rem",
                    height: "2rem",
                    width: "2rem",
                    color: theme.palette.background.default,
                    bgcolor: theme.palette.error.main,
                    "&:hover": {
                      bgcolor: theme.palette.error.light,
                    },
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2} sx={{ height: "90vh" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "3rem",
                width: "100vh",
                borderRadius: "1rem",
                border: "2px solid black",
                backgroundColor: theme.palette.secondary.light,
              }}
            >
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
                style={{ display: "none", alignItems: "center" }}
              />
              <label htmlFor="contained-button-file">
                <IconButton variant="contained" component="span">
                  <UploadIcon
                    sx={{
                      fontSize: "10rem",
                      color: theme.palette.secondary.main,
                    }}
                  />
                </IconButton>
              </label>
              <Typography variant="h6">
                Upload up to 10 pictures of your place
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

const CREATE_LISTING = gql`
mutation CreateListing($listingInput: ListingInput!) {
  createListing(listingInput: $listingInput) {
    id
    title
    price
    location
    numberOfRoommates
    bathroomType
    leaseStartDate
    leaseEndDate
    isFurnished
    utilitiesIncluded
    petsAllowed
  }
}
`;

export default ListStay;
