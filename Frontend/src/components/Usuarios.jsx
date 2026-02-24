import { decodeJwtPayload } from "../lib/auth";

export default function Usuarios() {
  const token = localStorage.getItem("token");
    const user = decodeJwtPayload(token);

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
    </main>
  );
}