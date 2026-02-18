import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HClinicas from "./pages/HClinicas";
import Veterinarias from "./pages/Veterinarias";
import Usuarios from "./pages/Usuarios";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hclinicas" element={<PrivateRoute><HClinicas /></PrivateRoute>} />
        <Route path="/veterinarias" element={<PrivateRoute><Veterinarias /></PrivateRoute>} />
        <Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
