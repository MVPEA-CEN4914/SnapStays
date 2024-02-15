import * as React from 'react';
import Button from '@mui/material/Button';
import { Router, Link as RouterLink } from "react-router-dom";

export default function Verify() {
    //TO DO: write logic to confirm user using gql mutation in the backend
  
    return (
      <>
        <p>Thank you for verifying your email :D</p>
        <Button
            variant="outlined"
            color="secondary"
            component={RouterLink}
            to="/"
            sx={{
              width: "10vw",
              height: "7vh",
              left: "0px",
              top: "0px",
              textAlign: "center",
              fontSize: "0.8vw",
              fontFamily: "Josefin Sans",
              fontWeight: "300",
              wordWrap: "break-word",
              borderRadius: "37.5px",
              border: "2px solid black",
            }}
          >
            Return to Home
          </Button>
      </>
    );
  }  