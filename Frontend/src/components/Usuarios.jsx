import { useEffect, useState } from "react";
import { decodeJwtPayload } from "../lib/auth";
import { apiRequest } from "../lib/api";

const getPetId = (pet) => pet?.id || pet?._id;

export default function Usuarios() {
  const token = localStorage.getItem("token");
  
  const user = decodeJwtPayload(token);
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    let cancelled = false;

    apiRequest("/api/mascotas")
      .then((data) => {
        if (!cancelled) {
          const allPets = Array.isArray(data) ? data : [];
          const ownerPets = allPets.filter((pet) => {
            const ownerId =
              typeof pet.duenoId === "string"
                ? pet.duenoId
                : pet.duenoId?.id || pet.duenoId?._id;

            return ownerId === user?.id;
          });

          setMascotas(ownerPets);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMascotas([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  return (
    <main className="page">
      <h1>Mi perfil</h1>

      <section className="list-card profile-card">
        <p>
          <strong>Username:</strong> {user?.username || "-"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || "-"}
        </p>
        <p>
          <strong>Nombre:</strong> {user?.nombre || "-"}
        </p>
        <p>
          <strong>Apellido:</strong> {user?.apellido || "-"}
        </p>
        <p>
          <strong>Rol:</strong> {user?.role || "-"}
        </p>
      </section>

      <section className="list-card section-gap">
        <h2>Mis mascotas</h2>
        {mascotas.length === 0 ? (
          <p className="muted">No tenés mascotas creadas.</p>
        ) : (
          <ul>
            {mascotas.map((pet) => (
              <li key={getPetId(pet)}>
                {pet.name} - {pet.especie}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
