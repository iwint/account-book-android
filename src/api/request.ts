import AsyncStorage from "@react-native-async-storage/async-storage"
import { ROUTE_BASE_URL } from '@env'
console.log(ROUTE_BASE_URL);
import axios from "axios"

const BASE_URL = ROUTE_BASE_URL


export const request = axios.create()

let headers: any = {}

request.defaults.baseURL = BASE_URL

const token = AsyncStorage.getItem('token')

headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": '*',
    Accept: 'application/json',
}

if (token != null) {
    headers['Authorization'] = `Bearer ${token}`
}

request.defaults.headers = headers
request.defaults.withCredentials = true