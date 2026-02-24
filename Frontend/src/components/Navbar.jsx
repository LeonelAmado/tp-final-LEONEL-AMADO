import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return ( <header className="topbar">
      <Link to="/" className="brand">
        🐾 VetCare
      </Link>

      <nav className="topbar-nav">
        <Link to="/">Inicio</Link>
        {token && <Link to="/veterinarias">Veterinarias</Link>}
        {token && <Link to="/hclinicas">Historiales</Link>}
        {token && <Link to="/usuarios">Perfil</Link>}
        {!token && <Link to="/login">Ingresar</Link>}
        {!token && <Link to="/register">Registrarse</Link>}
        {token && (
          <button type="button" className="btn-ghost" onClick={handleLogout}>
            Cerrar sesión
          </button>
        )}
      </nav>
    </header>
  );
}