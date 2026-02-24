import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";


const initialForm = {
  mascotaId: "",
  peso: "",
  motivoConsulta: "",
  diagnostico: "",
  tratamiento: "",
  notas: "",
  fecha: "",
};

export default function HClinicas() {

  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  
  const loadData = async () => {
    try {
      const data = await apiRequest("/api/historiaClinica");
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    }
  };


  useEffect(() => {
    let cancelled = false;

    apiRequest("/api/historiaClinica")
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

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));


  const onSubmit = async (e) => {
    e.preventDefault();
    
    setError("");

    try {
      if (editId) {
        await apiRequest(`/api/historiaClinica/${editId}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await apiRequest("/api/historiaClinica", {
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

  
  const onDelete = async (id) => {
    setError("");
    try {
      await apiRequest(`/api/historiaClinica/${id}`, { method: "DELETE" });
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    
    <main className="page">
      <h1>Historiales clínicos</h1>

      <form className="grid-form" onSubmit={onSubmit}>
        <input name="mascotaId" placeholder="ID Mascota (MongoID)" value={form.mascotaId} onChange={onChange} required />
        <input name="peso" placeholder="Peso" value={form.peso} onChange={onChange} required />
        <input name="motivoConsulta" placeholder="Motivo" value={form.motivoConsulta} onChange={onChange} required />
        <input name="diagnostico" placeholder="Diagnóstico" value={form.diagnostico} onChange={onChange} required />
        <input name="tratamiento" placeholder="Tratamiento" value={form.tratamiento} onChange={onChange} required />
        <input name="notas" placeholder="Notas" value={form.notas} onChange={onChange} />
        <input type="date" name="fecha" value={form.fecha} onChange={onChange} required />

        <button className="btn-primary" type="submit">
          {editId ? "Guardar cambios" : "Crear historial"}
        </button>
      </form>
      
      {error && <p className="error">{error}</p>}

      <div className="list-grid">
        {items.map((h) => (
          <article key={h._id} className="list-card">
            <h3>Historial {h._id.slice(-6)}</h3>
            <p>Mascota: {h.mascotaId}</p>
            <p>Peso: {h.peso}</p>
            <p>Motivo: {h.motivoConsulta}</p>
            <p>Diagnóstico: {h.diagnostico}</p>
            <p>Tratamiento: {h.tratamiento}</p>
            <div className="card-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setEditId(h._id);
                  setForm({
                    mascotaId: h.mascotaId || "",
                    peso: h.peso || "",
                    motivoConsulta: h.motivoConsulta || "",
                    diagnostico: h.diagnostico || "",
                    tratamiento: h.tratamiento || "",
                    notas: h.notas || "",
                    fecha: (h.fecha || "").slice(0, 10),
                  });
                }}
              >
                Editar
              </button>
              <button type="button" className="btn-ghost" onClick={() => onDelete(h._id)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
     
      </div>
    </main>
  );
}