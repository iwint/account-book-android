
type authRoutes = 'auth/register' | 'auth/userData' | 'auth/login'

export type Routes = authRoutes

export type ResponsePayload<T> = {
    status: "ok" | "error";
    message: string;
    token?: string;
    data?: T;
} 