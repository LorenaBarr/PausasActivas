import axios from 'axios';
import type { AuthResponse } from '../types';

export const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginUser = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
};
