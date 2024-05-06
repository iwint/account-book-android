import { ROUTE_BASE_URL } from '@env'
import axios from "axios"
import { ToastAndroid } from "react-native"
import { trackPromise } from "react-promise-tracker"
import { getAuthToken } from "../utils/storage-funtions"
import { Routes } from "./request.type"


const BASE_URL = `${ROUTE_BASE_URL}/api/v1`


const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": '*',
    'Accept': 'application/json',
}


export const GET_API = async (endpoint: Routes) => {
    const token = await getAuthToken()
    console.log("TOKEN", token);

    return trackPromise(new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/${endpoint}`, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            console.log(headers);

            if (res.data?.status === 'ok') {
                resolve(res.data)
            } else {
                reject(res)
            }
            if (res?.data?.message) {
                ToastAndroid.show(res?.data?.message, ToastAndroid.SHORT)
            }
        }).catch(err => {
            console.log("GET REQUEST ERROR=>>>", err);
            reject(err)
        }
        )
    }))
}

export const POST_API = async (endpoint: string, data: any) => {
    const token = await getAuthToken()
    return trackPromise(new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/${endpoint}`, data, {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.data?.status === 'ok') {
                resolve(res.data ? res.data : res)
            } else {
                reject(res)
            }
            if (res?.data?.message) {
                ToastAndroid.show(res?.data?.message, ToastAndroid.SHORT)
            }
        }).catch(err => reject(err))
    }))
}

export const PUT_API = async (endpoint: Routes, data: any) => {
    const token = await getAuthToken()
    return trackPromise(new Promise((resolve, reject) => {
        axios.put(`${BASE_URL}/${endpoint}`, data, {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.data?.status === 'ok') {
                resolve(res.data)
            } else {
                reject(res)
            }
            if (res?.data?.message) {
                ToastAndroid.show(res?.data?.message, ToastAndroid.SHORT)
            }
        }).catch(err => reject(err))
    }))
}

export const DELETE_API = async (endpoint: Routes) => {
    const token = await getAuthToken()
    return trackPromise(new Promise((resolve, reject) => {
        axios.delete(`${BASE_URL}/${endpoint}`, {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.data?.status === 'ok') {
                resolve(res.data)
            } else {
                reject(res)
            }
            if (res?.data?.message) {
                ToastAndroid.show(res?.data?.message, ToastAndroid.SHORT)
            }
        }).catch(err => reject(err))
    }))
}