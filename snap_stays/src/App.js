import './App.css';
import ReactDom from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './pages/Layout';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
   
  );
}

export default App;
