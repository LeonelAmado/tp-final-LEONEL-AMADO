import { useEffect, useState } from "react";

const API = "http://localhost:3000/veterinarias";

export default function Veterinarias() {
  const [vets, setVets] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editId, setEditId] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(API, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setVets(data));
  }, [token]);

  const handleAdd = async e => {
    e.preventDefault();
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ nombre })
    });
    if (res.ok) {
      setNombre("");
      fetch(API, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => setVets(data));
    }
  };

  const handleEdit = id => {
    setEditId(id);
    const vet = vets.find(v => v._id === id);
    setEditNombre(vet.nombre);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    const res = await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ nombre: editNombre })
    });
    if (res.ok) {
      setEditId(null);
      setEditNombre("");
      fetch(API, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => setVets(data));
    }
  };

  const handleDelete = async id => {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setVets(vets.filter(v => v._id !== id));
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Gestión de Veterinarias</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Nombre de veterinaria"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
          style={{ width: "70%", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem", background: "#1976d2", color: "#fff", border: "none", fontWeight: "bold", marginLeft: "1rem" }}>
          Agregar
        </button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {vets.map(v => (
          <li key={v._id} style={{ marginBottom: "1rem", background: "#fff", padding: "1rem", borderRadius: "8px", boxShadow: "0 2px 8px #eee" }}>
            {editId === v._id ? (
              <form onSubmit={handleUpdate} style={{ display: "inline" }}>
                <input
                  type="text"
                  value={editNombre}
                  onChange={e => setEditNombre(e.target.value)}
                  required
                  style={{ padding: "0.5rem" }}
                />
                <button type="submit" style={{ marginLeft: "1rem", padding: "0.5rem", background: "#1976d2", color: "#fff", border: "none", fontWeight: "bold" }}>
                  Guardar
                </button>
                <button type="button" onClick={() => setEditId(null)} style={{ marginLeft: "0.5rem", padding: "0.5rem", background: "#ccc", border: "none" }}>
                  Cancelar
                </button>
              </form>
            ) : (
              <>
                <span style={{ fontWeight: "bold" }}>{v.nombre}</span>
                <button onClick={() => handleEdit(v._id)} style={{ marginLeft: "1rem", padding: "0.5rem", background: "#ffd600", border: "none", fontWeight: "bold" }}>
                  Editar
                </button>
                <button onClick={() => handleDelete(v._id)} style={{ marginLeft: "0.5rem", padding: "0.5rem", background: "#d32f2f", color: "#fff", border: "none", fontWeight: "bold" }}>
                  Eliminar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
