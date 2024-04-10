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


import Upload from "../component/Upload";
import { Cloudinary } from "@cloudinary/url-gen";

const nums = ["1", "2", "3", "4"];

//import IconButton from '@material-ui/core/IconButton';
//import CloseIcon from '@material-ui/icons/Close';



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
      images: values.images
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
      navigate('/find-stay');
    },
    onError: (apiError) => {
      // Handle API call errors
      console.error('Error listing the apartment:', apiError);
    }
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
    uploadPreset
  });
  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
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
            <TextField
              sx={{ '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '15px', // Adjust this value to your liking
                },
                '&:hover fieldset': {
                  borderColor: 'black', // Change this to your desired hover color
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', // Change this to your desired focus color
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'grey',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'grey',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'grey',
              }
            }}
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              value={values.description}
              error={errors.description ? true : false}
              onChange={onChange}
              multiline // Add this
              rows={4}
            />
            {/* TODO: Add file input for images */}
            


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
          
       <Grid item xs={12} sm={6}>
        {/*leave empty space for upload images*/}
       </Grid>

       <Grid item xs={12} sm={6} style={{ marginLeft: 'auto', marginTop: '-600px' ,  justifyContent: 'flex-end' }}>
       <Grid container direction="column" alignItems="center" >
          <Upload uwConfig={uwConfig} setImageUrl={setImageUrl}/>
        </Grid>
        {/* Display uploaded pictures here */}
        <Grid container spacing={2} paddingTop={'10px'}>   
        {values.images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} >
             <img src={image} alt={`Uploaded ${index}`} style={{ width: '100%', height: 'auto' }} />
             <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(index)}>
                Delete
              </Button>
             
             
               </Grid>
          ))}
        </Grid>
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
