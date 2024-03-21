import * as React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
//import IconButton from '@material-ui/core/IconButton';
//import CloseIcon from '@material-ui/icons/Close';


const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#AF8C53', // Mustard
    },
    secondary: {
      main: '#2B2B2B', // Black
    },
  },
});

function ListStay() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    title: '',
    description: '',
    address: '',
    monthlyRent: '',
    roommates: '',
    furnished: '',
    bathroom: '',
    pets: '',
    images: [],
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [listStay, { loading }] = useMutation(LIST_STAY, {
    update(_, result) {
      navigate('/');
    },
    onError(err) {
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        const extensionErrors = err.graphQLErrors[0]?.extensions?.errors;
        if (extensionErrors) {
          setErrors(extensionErrors);
        } else {
          setErrors({ general: 'An error occurred' });
        }
      } else {
        setErrors({ general: 'An error occurred' });
      }
    },
    variables: values,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    listStay();
  };

  const handleFileChange = (event) => {
    //const files = event.target.files;
    // Handle the files...
    const files = Array.from(event.target.files);
    setValues((prevValues) => ({
    ...prevValues,
    images: files,
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
    <ThemeProvider theme={defaultTheme}>
      <Grid container >
        <Grid item xs={12} sm={6}>
      
          <Box component="form" noValidate onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            >
            <Typography component="h1" variant="h4" sx={{ fontFamily: "Josefin Sans" }}>
              List an Apartment for Sublease
            </Typography>
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
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              value={values.title}
              error={errors.title ? true : false}
              onChange={onChange}
            />
            
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
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              value={values.address}
              error={errors.address ? true : false}
              onChange={onChange}
            />
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
              id="monthlyRent"
              label="Monthly Rent"
              name="monthlyRent"
              autoComplete="monthlyRent"
              value={values.monthlyRent}
              error={errors.monthlyRent ? true : false}
              onChange={onChange}
            />
            <Typography component="h1" variant="h5" sx={{ fontFamily: "Josefin Sans" }}>
              Details
            </Typography>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={4}>
            
            <FormControl variant="outlined" sx={{width: "100%", marginTop: '16px'}}>
              
            <InputLabel id="demo-simple-select-label" required>Roomates</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={values.roommates}
            label="Roommates"
            onChange={onChange}
            name="roommates"
            input={
              <OutlinedInput
                name="roommates"
                id="outlined-roommates"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderRadius: '15px',
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
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
                  },
                }}
              />
            }
          >
            <MenuItem value={10}>Yes</MenuItem>
            <MenuItem value={20}>No</MenuItem>
            </Select>
          </FormControl>
            </Grid>
            <Grid item xs={5}>
          
              <FormControl variant="outlined" sx={{width: "100%", marginTop: '16px'}}>
              
                <InputLabel id="demo-simple-select-label" required>Furnished</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.furnished}
                label="Furnished"
                onChange={onChange}
                name="furnished"
                input={
                  <OutlinedInput
                    name="furnished"
                    id="outlined-furnished"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderRadius: '15px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'black',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'black',
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
                      },
                    }}
                  />
                }
              >
                <MenuItem value={10}>Yes</MenuItem>
                <MenuItem value={20}>No</MenuItem>
                </Select>
              </FormControl>
              </Grid>

              <Grid item xs={4}>
          
              <FormControl variant="outlined" sx={{width: "100%", marginTop: '16px'}}>
              
                <InputLabel id="demo-simple-select-label" required>Bathroom Type</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.bathroom}
                label="Bathroom"
                onChange={onChange}
                name="bathroom"
                input={
                  <OutlinedInput
                    name="bathroom"
                    id="outlined-bathroom"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderRadius: '15px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'black',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'black',
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
                      },
                    }}
                  />
                }
              >
                <MenuItem value={10}>Shared</MenuItem>
                <MenuItem value={20}>Private</MenuItem>
                </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
              <FormControl variant="outlined" sx={{width: "100%", marginTop: '16px'}}>
              
                <InputLabel id="demo-simple-select-label" required>Pets</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.pets}
                label="Pets"
                onChange={onChange}
                name="pets"
                input={
                  <OutlinedInput
                    name="pets"
                    id="outlined-pets"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderRadius: '15px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'black',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'black',
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
                      },
                    }}
                  />
                }
              >
                <MenuItem value={10}>Allowed</MenuItem>
                <MenuItem value={20}>Not Allowed</MenuItem>
                </Select>
              </FormControl>
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
        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' , alignItems: 'center'}}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            Upload Images
          </Button>
        </label>
        </Grid>
        {/* Display uploaded pictures here */}
        <Grid container spacing={2} paddingTop={'10px'}>
          {values.images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} >
              <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} style={{ width: '100%', height: 'auto' }} />
              <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(index)}>
                Delete
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
           
    </ThemeProvider>
  );
}

const LIST_STAY = gql`
  mutation listStay(
    $title: String!
    $description: String!
    $address: String!
    $monthlyRent: String!
    $roommates: String!
    $furnished: String!
    $bathroom: String!
    $pets: String!
    $images: [Upload!]!
  ) {
    listStay(
      listStayInput: {
        title: $title
        description: $description
        address: $address
        monthlyRent: $monthlyRent
        roommates: $roommates
        furnished: $furnished
        bathroom: $bathroom
        pets: $pets
        images: $images
      }
    ) {
      id
      title
      description
      address
      monthlyRent
      roommates
      furnished
      bathroom
      pets
      images
    }
  }
`;

export default ListStay;