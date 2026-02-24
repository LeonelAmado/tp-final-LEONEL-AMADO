import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { apiRequest } from "../lib/api";

interface Mascota {
  id?: string;
  _id?: string;
  name: string;
  duenoId: string;
  edad: number;
  especie: string;
  raza: string;
  fecha: string;
}

interface MascotaForm {
  name: string;
  duenoId: string;
  edad: string;
  especie: string;
  raza: string;
  fecha: string;
}

const initialForm: MascotaForm = {
  name: "",
  duenoId: "",
  edad: "",
  especie: "",
  raza: "",
  fecha: "",
};

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "Ocurrió un error inesperado";
};

export default function Mascotas() {
  const [items, setItems] = useState<Mascota[]>([]);
  const [form, setForm] = useState<MascotaForm>(initialForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const data = await apiRequest<Mascota[]>("/api/mascotas");
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(toErrorMessage(err));
    }
  };

  useEffect(() => {
    let cancelled = false;

    apiRequest<Mascota[]>("/api/mascotas")
      .then((data) => {
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(toErrorMessage(err));
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      edad: Number(form.edad),
    };

    try {
      if (editId) {
        await apiRequest(`/api/mascotas/${editId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest("/api/mascotas", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      setForm(initialForm);
      setEditId(null);
      await loadData();
    } catch (err) {
      setError(toErrorMessage(err));
    }
  };

  const onDelete = async (id: string) => {
    setError("");
    try {
      await apiRequest(`/api/mascotas/${id}`, { method: "DELETE" });
      await loadData();
    } catch (err) {
      setError(toErrorMessage(err));
    }
  };

  return (
    <main className="page">
      <h1>Mascotas</h1>

      <form className="grid-form" onSubmit={onSubmit}>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={onChange}
          required
        />
        <input
          name="duenoId"
          placeholder="ID del dueño (MongoID)"
          value={form.duenoId}
          onChange={onChange}
          required
        />
        <input
          name="edad"
          type="number"
          placeholder="Edad"
          value={form.edad}
          onChange={onChange}
          required
        />
        <input
          name="especie"
          placeholder="Especie"
          value={form.especie}
          onChange={onChange}
          required
        />
        <input
          name="raza"
          placeholder="Raza"
          value={form.raza}
          onChange={onChange}
          required
        />
        <input
          name="fecha"
          type="date"
          value={form.fecha}
          onChange={onChange}
          required
        />

        <button className="btn-primary" type="submit">
          {editId ? "Guardar cambios" : "Crear mascota"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="list-grid">
        {items.map((mascota) => {
          const id = mascota.id || mascota._id;
          if (!id) return null;

          return (
            <article key={id} className="list-card">
              <h3>{mascota.name}</h3>
              <p>Especie: {mascota.especie}</p>
              <p>Raza: {mascota.raza}</p>
              <p>Edad: {mascota.edad}</p>
              <p>Dueño: {mascota.duenoId}</p>
              <div className="card-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setEditId(id);
                    setForm({
                      name: mascota.name || "",
                      duenoId: mascota.duenoId || "",
                      edad: String(mascota.edad ?? ""),
                      especie: mascota.especie || "",
                      raza: mascota.raza || "",
                      fecha: (mascota.fecha || "").slice(0, 10),
                    });
                  }}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => onDelete(id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
