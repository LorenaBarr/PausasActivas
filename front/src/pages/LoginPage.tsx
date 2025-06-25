import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../services/api';
import { loginSuccess } from '../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import type { AuthResponse } from '../types/types'; 

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data: AuthResponse = await loginUser(email, password);
      if (!data || !data.token || !data.usuario) {
        throw new Error('Respuesta inválida del servidor');
      }

      dispatch(
        loginSuccess({
          user: {
            id: data.usuario.id_usuario,
            nombre: data.usuario.nombre,
            email: data.usuario.email,
            score: data.usuario.puntaje_total,
            streak: data.usuario.streak_actual,
            isFirstTime: data.usuario.primer_ingreso,
          },
          token: data.token,
        })
      );
      navigate('/home');
    } catch {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">ActivaTuPausa</h1>
        <p className="text-gray-600 text-lg">Renueva tu energía, mejora tu día</p>
      </div>

      {/* Formulario */}
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            type="email"
            required
          />
          <input
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            type="password"
            required
          />
          <button
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
            type="submit"
          >
            Ingresar
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>

        {/* Links */}
        <div className="mt-4 flex justify-between text-sm text-blue-600">
          <Link to="/forgot-password" className="hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
          <Link to="/register" className="hover:underline">
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

