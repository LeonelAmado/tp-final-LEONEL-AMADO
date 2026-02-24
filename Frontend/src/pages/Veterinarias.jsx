import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

const initialForm = { name: "", direccion: "", telefono: "", email: "" };

export default function Veterinarias() {
const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
    const [error, setError] = useState("");
  const loadData = async () => {
    try {
      const data = await apiRequest("/api/veterinaria");
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    }
  };
    useEffect(() => {
    let cancelled = false;

    apiRequest("/api/veterinaria")
      .then((data) => {
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
     setError("");
 try {
      if (editId) {
        await apiRequest(`/api/veterinaria/${editId}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await apiRequest("/api/veterinaria", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }

      setForm(initialForm);
      setEditId(null);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
     <main className="page">
      <h1>Veterinarias</h1>
      <form className="grid-form" onSubmit={onSubmit}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={onChange} required />
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={onChange} required />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={onChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} required />

        <button className="btn-primary" type="submit">
          {editId ? "Guardar cambios" : "Crear veterinaria"}
        </button>
      </form>
    
      {error && <p className="error">{error}</p>}

      <div className="list-grid">
        {items.map((v) => (
          <article key={v.id || v._id} className="list-card">
            <h3>{v.name}</h3>
            <p>{v.direccion}</p>
            <p>{v.telefono}</p>
            <p>{v.email}</p>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setEditId(v.id || v._id);
                setForm({
                  name: v.name || "",
                  direccion: v.direccion || "",
                  telefono: v.telefono || "",
                  email: v.email || "",
                });
              }}
            >
              Editar
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}