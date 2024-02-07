import React from "react";
import houseImage from "../images/Houses.png";
import dogImage from "../images/DogImage.png";
import { Button } from "@mui/material";
import { Router, Link as RouterLink } from "react-router-dom";

function Landing() {
  return (
    <div
      style={{
        width: "100vw",
        height: "5vh",
        //top: "50%",
        position: "relative",
        background: "#E6E6DD",
        paddingTop: "20px"
      }}
    >
      <div
        style={{
          width: "100vw",
          height: "5vh",
          top: "100%",
          position: "absolute",
        }}
      >
        <div
          style={{
            width: "50vw",
            height: "10vh",
            top: "50%",
            position: "absolute",
          }}
        >
          <div>
            <span
              style={{
                display: "block",
                color: "black",
                fontSize: "6vw",
                fontFamily: "Josefin Sans",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              Subleases and short-term housing{" "}
            </span>
            <span
              style={{
                display: "block",
                color: "#AF8C53",
                fontSize: "5vw",
                fontFamily: "Josefin Sans",
                fontStyle: "italic",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              in a snap
            </span>
          </div>
        </div>
        <div
          style={{
            width: "5vw",
            height: "10vh",
            left: "5%",
            top: "60vh",
            position: "absolute",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            component={RouterLink}
            to="/FindStay"
            sx={{
              width: "17vw",
              height: "10vh",
              position: "absolute",
              textAlign: "center",
              fontSize: "2vw",
              fontFamily: "Josefin Sans",
              fontWeight: "300",
              wordWrap: "break-word",
              borderRadius: "37.5px",
              border: "2px solid black",
            }}
          >
            Find a Stay
          </Button>
        </div>
        <div
          style={{
            width: "75vw",
            height: "100vw",
            left: "25%",
            top: "60vh",
            position: "absolute",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            component={RouterLink}
            to="/ListStay"
            sx={{
              width: "17vw",
              height: "10vh",
              position: "absolute",
              left: "0px",
              top: "0px",
              textAlign: "center",
              fontSize: "2vw",
              fontFamily: "Josefin Sans",
              fontWeight: "300",
              wordWrap: "break-word",
              borderRadius: "37.5px",
              border: "2px solid black",
            }}
          >
            List a Stay
          </Button>
        </div>
        <img
          style={{
            width: "45vw",
            left: "50vw",
            top: "5vh",
            position: "absolute",
          }}
          src={houseImage}
          alt="House Image"
        />
      </div>
      <div
        style={{
          width: "100vw",
          height: "3vh",
          left: "0%",
          top: "100vh",
          position: "absolute",
        }}
      >
        <div //tan background
          style={{
            width: "100vw",
            height: "200vh",
            top: "13.4vh",
            position: "absolute",
            background: "#AF8C53",
          }}
        ></div>
        <div
          style={{
            width: "0vw",
            height: "3vh",
            left: "3vw",
            top: "0px",
            position: "absolute",
          }}
        >
          <div //bottom of 3 bars
            style={{
              width: "96vw",
              height: "5vh",
              top: "13vh",
              position: "absolute",
              background: "#AF8C53",
              borderRadius: "10px",
              border: "3px #2B2B2B solid",
            }}
          ></div>
          <div //middle of 3 bars
            style={{
              width: "93vw",
              height: "5vh",
              left: "2vw",
              top: "9vh",
              position: "absolute",
              background: "#AF8C53",
              borderRadius: "10px",
              border: "3px #2B2B2B solid",
            }}
          ></div>
          <div
            style={{ //top of 3 bars
              width: "89vw",
              height: "5vh",
              left: "4vw",
              top: "5vh",
              position: "absolute",
              background: "#AF8C53",
              borderRadius: "10px",
              border: "3px #2B2B2B solid",
            }}
          ></div>
          <div //left dark brown bar
            style={{
              width: "14vw",
              height: "5vh",
              left: "0vw",
              top: "12vh",
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
              width: "14vw",
              height: "5vh",
              left: "83vw",
              top: "7vw",
              position: "absolute",
              transform: "rotate(65deg)",
              transformOrigin: "center",
              background: "#2B2B2B",
              borderRadius: "10px",
              border: "3px #2B2B2B solid",
            }}
          ></div>
        </div>
        <div //grey box on second page
          style={{
            width: "80vw",
            height: "2.5vh",
            left: "8vw",
            top: "35vh",
            position: "absolute",
          }}
        >
          <div
            style={{
              width: "86vw",
              height: "0vh",
              left: "28vw",
              top: "0vh",
              position: "absolute",
              background: "black",
              borderRadius: "30px",
            }}
          ></div>
          <div //grey box on second page
            style={{
              width: "73vw",
              height: "75vh",
              left: "5vw",
              //top: "0vh",
              position: "absolute",
              background: "#2B2B2B",
              borderRadius: "10vh",
              border: "5px black solid",
            }}
          ></div>
        </div>
        <div //"welcome in enjoy your stay" text
          style={{
            width: "70vw",
            left: "15vw",
            top: "40vh",
            position: "absolute",
            color: "#E6E6DD",
            fontSize: "4vw",
            fontFamily: "Josefin Sans",
            fontStyle: "italic",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          Welcome In, Enjoy Your Stay!
        </div>
        <div //paragraph text
          style={{
            width: "65vw",
            left: "17vw",
            top: "50vh",
            position: "absolute",
            color: "#E6E6DD",
            fontSize: "3vw",
            fontFamily: "Josefin Sans",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          We aim to streamline and simplify the process of renting and
          subletting for college students by providing a platform tailored to
          meet student’s short-term accommodation needs. We aim to alleviate the
          stress associated with finding temporary housing solutions, so our
          users can focus on their education and enjoy their college experience.
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "220%",
          left: "0px",
          top: "1691px",
          position: "absolute",
        }}
      >
        <div
        //grey background on bottom
          style={{
            width: "100%",
            height: "120vh",
            position: "absolute",
            background: "#2B2B2B",
          }}
        ></div>
        <img //dog image
          style={{
            width: "40vw",
            height: "70vh",
            left: "5vw",
            top: "30vh",
            position: "absolute",
          }}
          src={dogImage}
          alt="Dog Image"
        />
        <div
          style={{
            width: "80vw",
            left: "10vw",
            top: "10vh",
            position: "absolute",
            textAlign: "right",
            color: "#E6E6DD",
            fontSize: "5vw",
            fontFamily: "Josefin Sans",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          Something something use this app yay slay whatever
        </div>
        <div
          style={{
            width: "40vw",
            left: "50vw",
            top: "40vh",
            position: "absolute",
            textAlign: "right",
            color: "#E6E6DD",
            fontSize: "4vw",
            fontFamily: "Josefin Sans",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          fs hsdfohu fhsod sdh dudh fdhh dufho jhsdfou fh fh hd hhf diufh uds
        </div>
      </div>
    </div>
  );
}

export default Landing;
