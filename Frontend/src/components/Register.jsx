import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/api";

export default function Register() {
    const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nombre: "",
    apellido: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
            await apiRequest("/auth/register", {
              method: "POST",
                    body: JSON.stringify(formData),
            });
           setSuccess("Cuenta creada correctamente. Ahora inicia sesión.");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
           setError(err.message || "No se pudo crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
        <main className="auth-shell">
      <section className="auth-aside">
        <div>
          <h2>VetCare</h2>
          <h1>Crea tu cuenta profesional</h1>
          <p>Conecta tu veterinaria y comienza a gestionar pacientes.</p>
        </div>
      </section>

      <section className="auth-panel">
        <h2>Registro</h2>

        <form onSubmit={handleSubmit} className="stack-form">
          <input name="username" placeholder="Username" value={formData.username} onChange={onChange} required />
          <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={onChange} />
          <input name="apellido" placeholder="Apellido" value={formData.apellido} onChange={onChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={onChange} required />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={onChange} required />

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Registrando..." : "Crear cuenta"}
          </button>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>

        <p className="muted">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </section>
    </main>
  );
}