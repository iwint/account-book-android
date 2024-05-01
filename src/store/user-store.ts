import AsyncStorage from "@react-native-async-storage/async-storage"
import { User, UserLoginPayload, UserRegisterPayload } from "../@types/user"
import { GET_API, POST_API } from "../api/api"
import { Routes } from "../api/request.type"

export interface useUserStoreProps {
    user: User,
    authenticateUser: (endpoint: Routes, payload: UserLoginPayload | UserRegisterPayload) => Promise<any>,
    getUserData: () => Promise<any>
}

export const useUserStore = (set: any, get: any): useUserStoreProps => {
    return {
        user: {} as User,
        authenticateUser: (endpoint, payload) => {
            return new Promise((resolve, reject) => {
                POST_API(endpoint, payload).then(async (response: any) => {
                    if (response.token) {
                        await AsyncStorage.setItem('token', response?.token)
                        resolve(response)
                    } else {
                        reject(response)
                    }
                }).catch(error => reject(error))
            })
        },
        getUserData: () => {
            return new Promise((resolve, reject) => {
                GET_API('auth/userData').then((response: any) => {
                    if (response.data) {
                        set({ user: response.data })
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
            })
        }

    }
} 