import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    axios.get(API).then(res => setContacts(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(API, form);
    setContacts([...contacts, res.data]);
    setForm({ name: '', email: '', phone: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    setContacts(contacts.filter(c => c._id !== id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📇 Contact Book</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        <button type="submit">Add Contact</button>
      </form>

      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            {contact.name} - {contact.email} - {contact.phone}
            <button onClick={() => handleDelete(contact._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

