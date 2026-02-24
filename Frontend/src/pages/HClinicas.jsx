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

const getMascotaName = (mascota) => {
  if (!mascota) return "-";
  if (typeof mascota === "string") return mascota;
  return mascota.name || mascota.id || mascota._id || "-";
};

const getDuenoName = (mascota) => {
  const owner = mascota?.duenoId;

  if (!owner) return "-";
  if (typeof owner === "string") return owner;

  const fullName = `${owner.nombre || ""} ${owner.apellido || ""}`.trim();
  return fullName || owner.username || owner.id || owner._id || "-";
};

export default function HClinicas() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");


  const isValidMongoId = (value) => /^[a-f\d]{24}$/i.test(value);

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

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const onSubmit = async (e) => {
    e.preventDefault();

     setError("");

    if (!isValidMongoId(form.mascotaId)) {
     setError(
        "El ID de mascota debe ser un ObjectId válido (24 caracteres hexadecimales)",
      );
      return;
    }

    try {
      await apiRequest("/api/historiaClinica", {
        method: "POST",
        body: JSON.stringify({
          ...form,

          fecha: form.fecha || undefined,
        }),
      });

      setForm(initialForm);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

 
  return (
    <main className="page">
      <h1>Historiales clínicos</h1>

      <form className="grid-form" onSubmit={onSubmit}>
  
        <input
          name="mascotaId"
          placeholder="ID de mascota"
          value={form.mascotaId}
          onChange={onChange}
          required
        />
        <input
          name="peso"
          placeholder="Peso"
          value={form.peso}
          onChange={onChange}
          required
        />
        <input
          name="motivoConsulta"
          placeholder="Motivo"
          value={form.motivoConsulta}
          onChange={onChange}
          required
        />
        <input
          name="diagnostico"
          placeholder="Diagnóstico"
          value={form.diagnostico}
          onChange={onChange}
          required
        />
        <input
          name="tratamiento"
          placeholder="Tratamiento"
          value={form.tratamiento}
          onChange={onChange}
          required
        />
        <input
          name="notas"
          placeholder="Notas"
          value={form.notas}
          onChange={onChange}
        />
           <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={onChange}
          required
        />

        <button className="btn-primary" type="submit">
          Crear historial
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="list-grid">
        {items.map((h) => (
          <article key={h._id} className="list-card">
            <h3>Historia clínica</h3>
           <p>Mascota: {getMascotaName(h.mascotaId)}</p>
            <p>Dueño: {getDuenoName(h.mascotaId)}</p>
            <p>Peso: {h.peso} kg</p>
            <p>Motivo: {h.motivoConsulta}</p>
            <p>Diagnóstico: {h.diagnostico}</p>
            <p>Tratamiento: {h.tratamiento}</p>
            <p>fecha: {h.fecha}</p>

          </article>

        ))}
      </div>
    </main>
  );
}
