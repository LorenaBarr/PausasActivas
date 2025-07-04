import axios from 'axios';
import type { AuthResponse, Activity } from '../types/types'; // asegúrate que existe

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

export default api;

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
};

export const registerUser = async (data: any): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
};

export const getActivities = async (userId: number): Promise<Activity[]> => {
    const response = await api.get<Activity[]>(`/activities/${userId}`);
    return response.data;
};

export const getUserAchievements = async (userId: number) => {
  const response = await api.get(`/achievements/${userId}`);
  return response.data;
};