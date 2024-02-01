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
            top: "450px",
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
            width: "75%",
            height: "100%",
            left: "25%",
            top: "450px",
            position: "absolute",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            component={RouterLink}
            to="/ListStay"
            sx={{
              width: "225px",
              height: "75px",
              position: "absolute",
              left: "0px",
              top: "0px",
              textAlign: "center",
              fontSize: "24px",
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
            width: "45%",
            left: "50%",
            top: "50px",
            position: "absolute",
          }}
          src={houseImage}
          alt="House Image"
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          left: "0%",
          top: "700px",
          position: "absolute",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100vh",
            top: "13.4vh",
            position: "absolute",
            background: "#AF8C53",
          }}
        ></div>
        <div
          style={{
            width: "90%",
            height: "100%",
            left: "3%",
            top: "0px",
            position: "absolute",
          }}
        >
          <div
            style={{
              width: "106%",
              height: "190%",
              top: "97px",
              position: "absolute",
              background: "#AF8C53",
              borderRadius: "10px",
              border: "3px #2B2B2B solid",
            }}
          ></div>
          <div
            style={{
              width: "103%",
              height: "190%",
              left: "20px",
              top: "60px",
              position: "absolute",
              background: "#AF8C53",
              borderRadius: "10px",
              border: "3px #2B2B2B solid",
            }}
          ></div>
          <div
            style={{
              width: "100%",
              height: "190%",
              left: "40px",
              top: "23px",
              position: "absolute",
              background: "#AF8C53",
              borderRadius: "10px",
              border: "3px #2B2B2B solid",
            }}
          ></div>
          <div
            style={{
              width: "15%",
              height: "150%",
              left: "0px",
              top: "181.31px",
              position: "absolute",
              transform: "rotate(-65deg)",
              transformOrigin: "0 0",
              background: "#2B2B2B",
              borderRadius: "10px",
              border: "3px #2B2B2B solid",
            }}
          ></div>
          <div
            style={{
              width: "15%",
              height: "150%",
              left: "1300px",
              top: "0px",
              position: "absolute",
              transform: "rotate(65deg)",
              transformOrigin: "0 0",
              background: "#2B2B2B",
              borderRadius: "10px",
              border: "3px #2B2B2B solid",
            }}
          ></div>
        </div>
        <div
          style={{
            width: "80%",
            height: "100%",
            left: "125px",
            top: "277px",
            position: "absolute",
          }}
        >
          <div
            style={{
              width: "86%",
              height: "0%",
              left: "28px",
              top: "0px",
              position: "absolute",
              background: "black",
              borderRadius: "30px",
            }}
          ></div>
          <div
            style={{
              width: "90%",
              height: "2900%",
              left: "50px",
              top: "0px",
              position: "absolute",
              background: "#2B2B2B",
              borderRadius: "30px",
              border: "5px black solid",
            }}
          ></div>
        </div>
        <div
          style={{
            width: "666px",
            left: "360px",
            top: "318px",
            position: "absolute",
            color: "#E6E6DD",
            fontSize: "48px",
            fontFamily: "Josefin Sans",
            fontStyle: "italic",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          Welcome In, Enjoy Your Stay!
        </div>
        <div
          style={{
            width: "65%",
            left: "15%",
            top: "382px",
            position: "absolute",
            color: "#E6E6DD",
            fontSize: "40px",
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
          height: "200%",
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
            width: "555px",
            height: "559px",
            left: "78px",
            top: "229px",
            position: "absolute",
          }}
          src={dogImage}
          alt="Dog Image"
        />
        <div
          style={{
            width: "80%",
            left: "%",
            top: "99px",
            position: "absolute",
            textAlign: "right",
            color: "#E6E6DD",
            fontSize: "65px",
            fontFamily: "Josefin Sans",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          Something something use this app yay slay whatever
        </div>
        <div
          style={{
            width: "508px",
            left: "685px",
            top: "300px",
            position: "absolute",
            textAlign: "right",
            color: "#E6E6DD",
            fontSize: "65px",
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
