import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../lib/api";
import { decodeJwtPayload } from "../lib/auth";

type Mascota = {
  _id?: string;
  id?: string;
  name: string;
  duenoId: string;
  edad: number;
  especie: string;
  raza: string;
  fecha?: string;
};

type MascotaForm = {
  name: string;
  duenoId: string;
  edad: string;
  especie: string;
  raza: string;
  fecha: string;
};

type JwtUser = {
  role?: string;
};

type SpeciesVisual = {
  emoji: string;
  badge: string;
};

const initialForm: MascotaForm = {
  name: "",
  duenoId: "",
  edad: "",
  especie: "Perro",
  raza: "",
  fecha: "",
};

const speciesStyles: Record<string, SpeciesVisual> = {
  perro: { emoji: "🐶", badge: "Canino" },
  gato: { emoji: "🐱", badge: "Felino" },
  ave: { emoji: "🐦", badge: "Ave" },
  conejo: { emoji: "🐰", badge: "Conejo" },
  default: { emoji: "🐾", badge: "Mascota" },
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error inesperado";
};

const getSpeciesVisual = (species = ""): SpeciesVisual => {
  const normalized = species.toLowerCase();
  return speciesStyles[normalized] ?? speciesStyles.default;
};

export default function Mascotas() {
  const [items, setItems] = useState<Mascota[]>([]);
  const [form, setForm] = useState<MascotaForm>(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");
  const user = decodeJwtPayload(token) as JwtUser | null;
  const isAdmin = user?.role === "admin";

  const loadData = async () => {
    try {
      const data = await apiRequest<Mascota[] | unknown>("/api/mascotas");
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  useEffect(() => {
    let cancelled = false;

    apiRequest<Mascota[] | unknown>("/api/mascotas")
      .then((data) => {
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(getErrorMessage(err));
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const speciesCount = useMemo<Record<string, number>>(() => {
    return items.reduce<Record<string, number>>((acc, pet) => {
      const key = (pet.especie || "sin especie").toLowerCase();
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});
  }, [items]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name as keyof MascotaForm]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await apiRequest("/api/mascotas", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          edad: Number(form.edad),
          fecha: form.fecha || undefined,
        }),
      });
      setSuccess("Mascota creada con éxito.");
      setForm(initialForm);
      await loadData();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <main className="page">
      <section className="hero-card pets-hero">
        <h1>Mascotas y dueños</h1>
        <p className="muted">
          Consultá las mascotas registradas y su dueño asociado para hacer un
          seguimiento rápido en recepción.
        </p>
        <div className="chips-wrap">
          <span className="chip">Total: {items.length}</span>
          {Object.entries(speciesCount).map(([species, amount]) => (
            <span key={species} className="chip chip-soft">
              {species}: {amount}
            </span>
          ))}
        </div>
      </section>

      {isAdmin && (
        <section className="list-card section-gap">
          <h2>Nueva mascota</h2>
          <form className="grid-form" onSubmit={onSubmit}>
            <input
              name="name"
              placeholder="Nombre de la mascota"
              value={form.name}
              onChange={onChange}
              required
            />
            <input
              name="duenoId"
              placeholder="ID del dueño"
              value={form.duenoId}
              onChange={onChange}
              required
            />
            <input
              type="number"
              min="0"
              name="edad"
              placeholder="Edad"
              value={form.edad}
              onChange={onChange}
              required
            />
            <select
              name="especie"
              value={form.especie}
              onChange={onChange}
              required
            >
              <option>Perro</option>
              <option>Gato</option>
              <option>Ave</option>
              <option>Conejo</option>
              <option>Otro</option>
            </select>
            <input
              name="raza"
              placeholder="Raza"
              value={form.raza}
              onChange={onChange}
              required
            />
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={onChange}
              required
            />
            <button className="btn-primary" type="submit">
              Guardar mascota
            </button>
          </form>
        </section>
      )}

      {!isAdmin && (
        <p className="muted section-gap">
          Solo usuarios administradores pueden crear mascotas nuevas.
        </p>
      )}

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <section className="pet-grid section-gap">
        {items.map((pet) => {
          const visual = getSpeciesVisual(pet.especie);
          return (
            <article key={pet._id || pet.id} className="pet-card">
              <div className="pet-header">
                <div className="pet-avatar" aria-hidden="true">
                  {visual.emoji}
                </div>
                <div>
                  <h3>{pet.name}</h3>
                  <span className="chip">{visual.badge}</span>
                </div>
              </div>
              <p>
                <strong>Dueño:</strong> {pet.duenoId}
              </p>
              <p>
                <strong>Edad:</strong> {pet.edad} años
              </p>
              <p>
                <strong>Raza:</strong> {pet.raza}
              </p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
