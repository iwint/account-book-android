import { User, UserLoginPayload, UserRegisterPayload } from "../@types/user"
import { POST_API } from "../api/api"
import { Routes } from "../api/request.type"

export interface useUserStoreProps {
    user: User,
    authenticateUser: (endpoint: Routes, payload: UserLoginPayload | UserRegisterPayload) => Promise<any>
}

export const useUserStore = (set: any, get: any): useUserStoreProps => {
    return {
        user: {} as User,
        authenticateUser: (endpoint, payload) => {
            return new Promise((resolve, reject) => {
                POST_API(endpoint, payload).then(response => {
                    console.log(response);
                    resolve(response)
                }).catch(error => reject(error))
            })
        }

    }
} 