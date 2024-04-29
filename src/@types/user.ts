export interface UserRegisterPayload {
    username: string;
    phone: number;
    shopname: string;
    password: string;
    image: {
        url: string;
        public_id: string;
    } | string
}

export interface UserLoginPayload {
    username: string;
    password: string;
}
export interface User extends UserRegisterPayload {
    _id: string;
    created_at: string;
    updated_at: string;
}

