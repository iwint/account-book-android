import AsyncStorage from "@react-native-async-storage/async-storage"
import { User, UserLoginPayload, UserRegisterPayload } from "../@types/user"
import { GET_API, POST_API } from "../api/api"
import { Routes } from "../api/request.type"

export interface useUserStoreProps {
    user: User,
    userToken: string | null,
    isLoggedIn: boolean,
    isLoading: boolean,
    authenticateUser: (endpoint: Routes, payload: UserLoginPayload | UserRegisterPayload) => Promise<any>,
    getUserData: () => Promise<any>,
    checkIsAuthorized: () => Promise<void>,
    logOutUser: () => Promise<any>
}

export const useUserStore = (set: any, get: any): useUserStoreProps => {
    return {
        userToken: null,
        isLoggedIn: false,
        isLoading: true,
        user: {} as User,
        authenticateUser: (endpoint, payload) => {
            return new Promise((resolve, reject) => {
                POST_API(endpoint, payload).then(async (response: any) => {
                    if (response.token) {
                        set({ userToken: response.token, isLoggedIn: true, isLoading: false })
                        await AsyncStorage.setItem('token', response?.token)
                        resolve(response)
                    } else {
                        reject(response)
                    }
                }).catch(error => reject(error))
            })
        },
        checkIsAuthorized: async () => {
            await AsyncStorage.getItem('token').then((token) => {
                if (token != null) {
                    set({ userToken: token, isLoggedIn: true, isLoading: false })
                } else {
                    set({ userToken: null, isLoggedIn: false, isLoading: false })
                }
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
        },
        logOutUser: () => {
            return new Promise((resolve, reject) => {
                AsyncStorage.clear().then(() => {
                    set({
                        userToken: null,
                        isLoggedIn: false,
                        isLoading: false
                    })
                })
                resolve(true)

            }).catch(() => { })
        }


    }
} 