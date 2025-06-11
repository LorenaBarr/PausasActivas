// Opción 1 (interface)
export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
  