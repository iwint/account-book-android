
type authRoutes = 'auth/register' | 'auth/userData' | 'auth/login'
type statRoutes<U extends string, T extends string> = `statics/get?userid=${U}&type=${T}`;
type partiesRoutes<S extends string, U extends string, C extends string> = `party/get/${S}?userid=${U}` | `party/create?userid=${U}` | `collection/create?userid=${U}` | `collection/get/${S}?userid=${U}` | `collection/delete/${C}?userid=${U}&partyID=${S}` | `collection/update/${C}?userid=${U}` | `party/getinit/${S}?userid=${U}`

export type Routes = authRoutes | statRoutes<string, "CUSTOMER" | "SUPPLIER"> | partiesRoutes<string, string, string>;

export type ResponsePayload<T> = {
    status: "ok" | "error";
    message: string;
    token?: string;
    data?: T;
} 