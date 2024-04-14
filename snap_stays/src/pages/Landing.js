import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Houses from "../images/Houses.png";
import dogImage from "../images/DogImage.png";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Router, Link as RouterLink } from "react-router-dom";

import { AuthContext } from "../context/auth";

function Landing() {
  const theme = useTheme();
  const mobileSize = useMediaQuery("(max-width:500px)");
  const { user } = useContext(AuthContext);
  return (
    <>
      <Grid
        container
        component="main"
        sx={{
          height: mobileSize ? "55vh" : "90vh",
          paddingX: mobileSize ? "0rem" : "5rem",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          component={Paper}
          square
          sx={{
            backgroundColor: theme.palette.background.default,
            boxShadow: 0,
          }}
        >
          <Box
            sx={{
              mt: 5,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography
              variant={mobileSize ? "h2" : "h1"}
              sx={{ lineHeight: "100%", fontWeight: 500 }}
            >
              Subleases and short-term housing
            </Typography>
            <Typography
              variant={mobileSize ? "h2" : "h1"}
              sx={{
                fontStyle: "italic",
                lineHeight: "100%",
                fontWeight: "bold",
                color: theme.palette.primary.main,
              }}
            >
              in a snap
            </Typography>
            <Grid container sx={{ mt: mobileSize ? 3 : 5 }}>
              <Grid item xs={6} sm={6} sx={{ paddingX: mobileSize ? 0 : 3 }}>
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth={mobileSize ? false : true}
                  href="/find-stay"
                  sx={{
                    padding: mobileSize ? 1.5 : 1,
                    fontSize: mobileSize ? "1rem" : "1.5rem",
                    color: theme.palette.secondary.main,
                    borderWidth: 3,
                    borderColor: theme.palette.secondary.main,
                    "&:hover": {
                      borderWidth: 3,
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Find a Stay
                </Button>
              </Grid>
              <Grid item xs={6} sm={6} sx={{ paddingX: mobileSize ? 0 : 3 }}>
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth={mobileSize ? false : true}
                  href={user ? "/list-stay" : "/login"}
                  sx={{
                    padding: mobileSize ? 1.5 : 1,
                    fontSize: mobileSize ? "1rem" : "1.5rem",
                    color: theme.palette.secondary.main,
                    borderWidth: 3,
                    borderColor: theme.palette.secondary.main,
                    "&:hover": {
                      borderWidth: 3,
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  List a Stay
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={6}
          md={6}
          sx={{
            backgroundImage: `url(${Houses})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </Grid>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {!mobileSize && (
          <>
            <div //left dark brown bar
              style={{
                width: "12vw",
                height: "5vh",
                left: "0vw",
                top: "110vh",
                position: "absolute",
                transform: "rotate(-65deg)",
                transformOrigin: "center",
                background: "#2B2B2B",
                borderRadius: "10px",
                border: "3px #2B2B2B solid",
              }}
            ></div>
            <div //right dark brown bar
              style={{
                width: "12vw",
                height: "5vh",
                left: "87vw",
                top: "50vw",
                position: "absolute",
                transform: "rotate(65deg)",
                transformOrigin: "center",
                background: "#2B2B2B",
                borderRadius: "10px",
                border: "3px #2B2B2B solid",
              }}
            ></div>
          </>
        )}
        <Grid //a bit of white space for stair transition
          item
          xs={12}
          style={{
            height: "5vh",
            background: theme.palette.background.default,
          }}
        ></Grid>
        <Grid //top bar
          item
          xs={12}
          sx={{
            height: "5vh",
            background: theme.palette.primary.main,
            borderRadius: "10px",
            border: "3px #2B2B2B solid",
            marginLeft: 8,
            marginRight: 8,
          }}
        ></Grid>
        <Grid //middle bar
          item
          xs={12}
          sx={{
            height: "5vh",
            background: theme.palette.primary.main,
            borderRadius: "10px",
            border: "3px #2B2B2B solid",
            marginLeft: 4,
            marginRight: 4,
          }}
        ></Grid>
        <Grid //bottom bar
          item
          xs={12}
          style={{
            height: "5vh",
            background: theme.palette.primary.main,
            borderRadius: "10px",
            border: "3px #2B2B2B solid",
            marginLeft: 2,
            marginRight: 2,
          }}
        ></Grid>
        <Grid //floor
          item
          xs={12}
          style={{
            height: mobileSize ? "80vh" : "80vh",
            background: theme.palette.primary.main,
          }}
        >
          <Box
            sx={{
              marginX: mobileSize ? "1rem" : "15rem",
              marginY: mobileSize ? "2rem" : "5rem",
              padding: mobileSize ? "1rem" : "2rem",
              boxShadow: mobileSize ? "5px 5px" : "10px 10px",
              borderRadius: "30px",
              border: "5px black solid",
              background: theme.palette.secondary.main,
            }}
          >
            <Typography
              variant={mobileSize ? "h4" : "h3"}
              align="center"
              sx={{
                fontWeight: "bold",
                fontStyle: "italic",
                color: theme.palette.background.default,
              }}
            >
              Welcome In, Enjoy Your Stay!
            </Typography>
            <Typography
              sx={{
                paddingTop: "1rem",
                color: theme.palette.background.default,
              }}
              variant={mobileSize ? "h5" : "h4"}
            >
              We aim to streamline and simplify the process of renting and
              subletting for college students by providing a platform tailored
              to meet student’s short-term accommodation needs. We aim to
              alleviate the stress associated with finding temporary housing
              solutions, so our users can focus on their education and enjoy
              their college experience.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        component="main"
        sx={{
          width: mobileSize ? "auto" : "100%",
          height: mobileSize ? "80vh" : "110vh",
          paddingX: mobileSize ? "0rem" : "5rem",
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Grid
          item
          xs={false}
          sm={6}
          md={6}
          sx={{
            backgroundImage: `url(${dogImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundColor: theme.palette.secondary.main,
            boxShadow: 0,
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              textAlign: mobileSize ? "center" : "right",
            }}
          >
            <Typography
              gutterBottom
              variant={mobileSize ? "h2" : "h1"}
              sx={{
                paddingY: "1rem",
                fontSize: mobileSize ? "4rem" : "9rem",
                fontWeight: "bold",
                fontStyle: "italic",
                whiteSpace: "pre-line",
                color: theme.palette.background.default,
              }}
            >
              Connect. Unlock. Live.
            </Typography>
            {mobileSize && <img src={dogImage} width={"300px"} />}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Landing;
