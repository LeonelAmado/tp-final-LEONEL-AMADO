import { Link } from "react-router-dom";
export default function Home() {
  
  const token = localStorage.getItem("token");

  return (
    <main className="page page-home">
      <section className="hero-card">
        <h1>Plataforma de gestión veterinaria</h1>
        <p>
          Administra veterinarias e historiales clínicos desde una interfaz clara y
          conectada a tu backend Node + Express.
        </p>

        <div className="hero-actions">
          {!token ? (
            <>
              <Link to="/login" className="btn-primary">
                Ingresar
              </Link>
              <Link to="/register" className="btn-secondary">
                Crear cuenta
              </Link>
            </>
          ) : (
            <>
              <Link to="/veterinarias" className="btn-primary">
                Ver veterinarias
              </Link>
              <Link to="/hclinicas" className="btn-secondary">
                Ver historiales
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}