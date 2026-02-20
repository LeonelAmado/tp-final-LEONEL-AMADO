import { useEffect, useState } from "react";

const API = "http://localhost:3000/auth/users";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(API, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }, [token]);

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Gestión de Usuarios</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {usuarios.map(u => (
          <li key={u._id} style={{ marginBottom: "1rem", background: "#fff", padding: "1rem", borderRadius: "8px", boxShadow: "0 2px 8px #eee" }}>
            <span style={{ fontWeight: "bold" }}>{u.name}</span> - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
