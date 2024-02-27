import './App.css';
import ReactDom from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { AuthProvider } from './context/auth';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './pages/Layout';
import FindStay from './pages/FindStay';
import ListStay from './pages/ListStay';
import Verify from "./pages/Verify";
import {ThemeProvider, createTheme} from '@mui/material/styles'
import { CssBaseline } from '@mui/material';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const theme = createTheme({
  palette:{
    background: {
      default:'#E6E6DD' // Beige
    },
    primary: {
      light: '#E6E6DD',
      main: '#AF8C53', // Mustard
    },
    secondary:{
      main:'#2B2B2B' // Black
    }
    
  }
});

function App() {
  return (
    <AuthProvider>
    <ApolloProvider>
    <div className="App">
      <ThemeProvider theme = {theme}>
        <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="FindStay" element = {<FindStay/>} />
        <Route path="ListStay" element = {<ListStay/>} />
        <Route exact path="/verify/:id" element={<Verify/>} />
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
