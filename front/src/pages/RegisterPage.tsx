import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';


const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', apellido: '', compania: '', pais: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(form); // ✅ más limpio
      navigate('/login');
    } catch {
      alert('Error al registrarse');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-2xl text-blue-700 font-bold mb-4">Registro</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="nombre" onChange={handleChange} value={form.nombre} className="border p-2 rounded" placeholder="Nombre" required />
        <input name="apellido" onChange={handleChange} value={form.apellido} className="border p-2 rounded" placeholder="Apellido" required />
        <input name="compania" onChange={handleChange} value={form.compania} className="border p-2 rounded" placeholder="Compañía" required />
        <input name="pais" onChange={handleChange} value={form.pais} className="border p-2 rounded" placeholder="País" required />
        <input name="email" onChange={handleChange} value={form.email} className="border p-2 rounded" placeholder="Correo" type="email" required />
        <input name="password" onChange={handleChange} value={form.password} className="border p-2 rounded" placeholder="Contraseña" type="password" required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
