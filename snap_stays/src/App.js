import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import FindStay from "./pages/FindStay";
import ListStay from "./pages/ListStay";
import Verify from "./pages/Verify";
import IndividualStay from "./pages/IndividualStay.js";
import UserProfile from "./pages/UserProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ApolloProvider } from "@apollo/client";

import PrivateRoute from "./component/PrivateRoute";
import { AuthProvider } from "./context/auth";

const theme = createTheme({
  typography: {
    fontFamily: ['"Josefin Sans"'].join(","),
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          paddingY: "0.5rem",
          paddingX: "1rem",
          borderRadius: "30px",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: "outlined",
        margin: "normal",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderWidth: 2,
              borderRadius: "30px",
            },
          },
        },
      },
    },
  },
  palette: {
    background: {
      default: "#E6E6DD", // Beige
    },
    primary: {
      light: "#CDB285", // Light Mustard (for hover effect)
      main: "#AF8C53", // Mustard
    },
    secondary: {
      light: "#D9D9D9", // Gray
      main: "#2B2B2B", // Black
    },
    error: {
      light: "#ff7961", // Light red
      main: "#f44336", // Red
      dark: "#ba000d", // Dark red
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ApolloProvider>
        <div className="App">
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Landing />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="find-stay" element={<FindStay />} />
                  <Route
                    path="list-stay"
                    element={
                      <PrivateRoute>
                        <ListStay />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="userprofile"
                    element={
                      <PrivateRoute>
                        <UserProfile />
                      </PrivateRoute>
                    }
                  />
                  <Route exact path="/verify/:id" element={<Verify />} />
                  <Route
                    exact
                    path="listing/:listingid"
                    element={<IndividualStay />}
                  />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    exact
                    path="/reset-password/:id"
                    element={<ResetPassword />}
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </div>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
