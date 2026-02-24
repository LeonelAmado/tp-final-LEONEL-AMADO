import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";
const initialForm = {
  paciente: "",
  duenoId: "",
  edad: "",
  raza: "",
  peso: "",
  motivoConsulta: "",
  diagnostico: "",
  tratamiento: "",
  fecha: "",
};
export default function HClinicas() {  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
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
      await apiRequest("/api/historiaClinica", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          duenoId: Number(form.duenoId),
          edad: Number(form.edad),
          peso: Number(form.peso),
        }),
      });
      setForm(initialForm);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (  <main className="page">
      <h1>Historiales clínicos</h1>

      <form className="grid-form" onSubmit={onSubmit}>
        <input name="paciente" placeholder="Paciente" value={form.paciente} onChange={onChange} required />
        <input name="duenoId" placeholder="ID dueño" value={form.duenoId} onChange={onChange} required />
        <input name="edad" placeholder="Edad" value={form.edad} onChange={onChange} required />
        <input name="raza" placeholder="Raza" value={form.raza} onChange={onChange} required />
        <input name="peso" placeholder="Peso" value={form.peso} onChange={onChange} required />
        <input name="motivoConsulta" placeholder="Motivo" value={form.motivoConsulta} onChange={onChange} required />
        <input name="diagnostico" placeholder="Diagnóstico" value={form.diagnostico} onChange={onChange} required />
        <input name="tratamiento" placeholder="Tratamiento" value={form.tratamiento} onChange={onChange} required />
        <input type="date" name="fecha" value={form.fecha} onChange={onChange} required />

        <button className="btn-primary" type="submit">
          Crear historial
        </button>
      </form>
      {error && <p className="error">{error}</p>}

      <div className="list-grid">
        {items.map((h) => (
          <article key={h._id} className="list-card">
            <h3>{h.paciente}</h3>
            <p>Raza: {h.raza}</p>
            <p>Edad: {h.edad}</p>
            <p>Peso: {h.peso} kg</p>
            <p>Diagnóstico: {h.diagnostico}</p>
          </article>
        ))};
    </div>
    </main>
  );
}