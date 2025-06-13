// src/services/api.ts
import axios from 'axios';
import type { AuthResponse } from '../types/types'; // asegúrate que existe

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

export default api;

// Funciones individuales tipadas correctamente
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
};

export const registerUser = async (data: any): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
};

