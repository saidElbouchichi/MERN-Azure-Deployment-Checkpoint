import { useEffect, useState } from 'react';

// Interface React : liste, ajout et suppression d'utilisateurs via l'API Express
function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [error, setError] = useState('');

  const load = () =>
    fetch('/api/users')
      .then((r) => r.json())
      .then(setUsers)
      .catch(() => setError("Impossible de joindre l'API"));

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, age: form.age ? Number(form.age) : undefined }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.message);
    setError('');
    setForm({ name: '', email: '', age: '' });
    load();
  };

  const remove = async (id) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    load();
  };

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <main className="app">
      <h1>👥 Utilisateurs — MERN sur Azure</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nom" value={form.name} onChange={change} required />
        <input name="email" type="email" placeholder="E-mail" value={form.email} onChange={change} required />
        <input name="age" type="number" placeholder="Âge" value={form.age} onChange={change} />
        <button type="submit">Ajouter</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            <span>
              <strong>{u.name}</strong> — {u.email} {u.age ? `(${u.age} ans)` : ''}
            </span>
            <button onClick={() => remove(u._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
