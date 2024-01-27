import './App.css';
import ReactDom from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './pages/Layout';
import {ThemeProvider, createTheme} from '@mui/material/styles'

const theme = createTheme({
  palette:{
    primary: {
      light: '#E6E6DD',
      main: '#AF8C53'
    }
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme = {theme}>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
    </div>
   
  );
}

export default App;
