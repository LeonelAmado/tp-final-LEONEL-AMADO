import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/hclinicas">HClinicas</Link></li>
        <li><Link to="/veterinarias">Veterinarias</Link></li>
        <li><Link to="/usuarios">Usuarios</Link></li>
        {!token && <li><Link to="/login">Login</Link></li>}
        {!token && <li><Link to="/register">Registro</Link></li>}
        {token && <li><button onClick={handleLogout} style={{ background: "#d32f2f", color: "#fff", border: "none", fontWeight: "bold", padding: "0.5rem 1rem", cursor: "pointer" }}>Cerrar sesión</button></li>}
      </ul>
    </nav>
  );
}
