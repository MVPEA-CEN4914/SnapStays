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
import UploadIcon from "@mui/icons-material/Upload";
import useMediaQuery from "@mui/material/useMediaQuery";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Upload from "../component/Upload";
import { Cloudinary } from "@cloudinary/url-gen";

const nums = ["1", "2", "3", "4"];

function ListStay() {
  const theme = useTheme();
  const mobileSize = useMediaQuery("(max-width:500px)");
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
    setValues((prevFilters) => ({
      ...prevFilters,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
      images: values.images,
    };

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
      navigate("/find-stay");
    },
    onError: (apiError) => {
      // Handle API call errors
      console.error("Error listing the apartment:", apiError);
    },
  });

  const handleDelete = (index) => {
    setValues((prevValues) => {
      const newImages = [...prevValues.images];
      newImages.splice(index, 1);
      return { ...prevValues, images: newImages };
    });
  };

  const [cloudName] = useState("dyv2ynif2");
  const [uploadPreset] = useState("snapstayup");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
  });
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const setImageUrl = (imageUrl) => {
    console.log("Image URL:", imageUrl); // Log the image URL
    setValues((prevValues) => ({
      ...prevValues,
      images: [...prevValues.images, imageUrl], // Append the new image URL to the existing list
    }));
  };

  return (
    <Grid container sx={{ backgroundColor: theme.palette.background.default }}>
      {/*Form Section*/}
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
            inputProps={{ maxLength: 40 }}
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
          <Grid display={mobileSize ? "column" : "flex"}>
            <Grid item xs={12} sm={3}>
              <TextField
                id="price"
                label="Montly Rent"
                name="price"
                autoComplete="monthlyRent"
                required
                fullWidth
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
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ paddingTop: "1rem", paddingLeft: "1rem" }}
                >
                  <DatePicker
                    label="Lease Start Date *"
                    value={dateStart}
                    onChange={(newDate) => setDateStart(newDate)}
                    sx={{ width: mobileSize ? "3rem" : "auto" }}
                  />
                  {!mobileSize && (
                    <Typography variant="h3" sx={{ color: "grey" }}>
                      -
                    </Typography>
                  )}
                  <DatePicker
                    label="Lease End Date *"
                    value={dateEnd}
                    onChange={(newDate) => setDateEnd(newDate)}
                    sx={{ width: mobileSize ? "3rem" : "auto" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Divider variant="middle" sx={{ width: "100%", paddingY: "1rem" }}>
            <Typography component="h1" variant="h5">
              Details
            </Typography>
          </Divider>
          <Grid container>
            <Grid item xs={false} sm={2} />
            <Grid item xs={12} sm={5}>
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
            <Grid item xs={12} sm={4}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            List Apartment
          </Button>
        </Box>
      </Grid>
      {/*Images Section*/}
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
            <Grid item xs={12} sm={6} md={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                }}
              >
                {values.images.length < 12 && (
                  <Upload uwConfig={uwConfig} setImageUrl={setImageUrl} />
                )}
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
                  src={image}
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
              <UploadIcon
                sx={{
                  fontSize: "10rem",
                  color: theme.palette.secondary.main,
                }}
              />
              <Typography gutterBottom variant="h6">
                Upload up to 12 pictures of your place
              </Typography>
              <Upload uwConfig={uwConfig} setImageUrl={setImageUrl} />
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
      images
    }
  }
`;

export default ListStay;
