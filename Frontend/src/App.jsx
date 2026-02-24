import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import HClinicas from "./pages/HClinicas";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Usuarios from "./components/Usuarios";
import Veterinarias from "./pages/Veterinarias";


function AppLayout() {
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hclinicas" element={<PrivateRoute><HClinicas /></PrivateRoute>} />
        <Route path="/veterinarias" element={<PrivateRoute><Veterinarias /></PrivateRoute>} />
     <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <Usuarios />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}