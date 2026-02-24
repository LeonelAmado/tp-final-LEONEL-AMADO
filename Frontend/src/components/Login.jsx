import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
     
      const data = await apiRequest("/auth/login", {
        method: "POST",
        
        body: JSON.stringify({ email, password }),
      });
     

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      
      }
    } catch (err) {
    
      setError(err.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <main className="auth-shell">
      <section className="auth-aside">
        <div>
          <h2>VetCare</h2>
          <h1>El mejor cuidado para tus mejores amigos.</h1>
          <p>Accede a historiales clínicos y gestión profesional en segundos.</p>
        </div>
      </section>

      <section className="auth-panel">
        <h2>Bienvenido de nuevo</h2>
        <p className="muted">Ingresa con tu correo y contraseña.</p>

        <form onSubmit={handleSubmit} className="stack-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          {error && <p className="error">{error}</p>}
        </form>

        <p className="muted">
          ¿No tienes cuenta? <Link to="/register">Regístrate gratis</Link>
        </p>
      </section>
    </main>
  );
}