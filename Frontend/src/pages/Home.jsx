import { Link } from "react-router-dom";

const highlights = [
  { title: "Gestión centralizada", text: "Veterinarias, mascotas e historiales en un mismo lugar." },
  { title: "Flujo de trabajo", text: "Accedé rápido a lo importante con rutas claras y protegidas." },
  { title: "Vista amigable", text: "Interfaz más visual para recepción, atención y seguimiento." },
];

export default function Home() {
  
  const token = localStorage.getItem("token");

  return (
    <main className="page page-home">
      <section className="hero-card">
        <h1>Plataforma de gestión veterinaria</h1>
        <p>
       Administrá veterinarias, mascotas e historiales clínicos desde un panel
          moderno, claro y conectado a tu backend Node + Express.
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
                 <Link to="/mascotas" className="btn-primary">
                Ver mascotas
              </Link>
              <Link to="/hclinicas" className="btn-secondary">
                Ver historiales
              </Link>
            </>
          )}
        </div>
      </section>
      
      <section className="feature-grid">
        {highlights.map((item) => (
          <article className="list-card" key={item.title}>
            <h3>{item.title}</h3>
            <p className="muted">{item.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}