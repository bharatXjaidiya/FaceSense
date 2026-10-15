import axios from "axios"


const baseURL = "/api";

const api = axios.create({ baseURL, withCredentials: true });


export const register = async ({ username, email, password, gender }) => {
    const response = await api.post("/auth/register", { username, email, password, gender });

    return response.data
}

export const login = async ({ username, email, password }) => {
    const response = await api.post("/auth/login", { username, email, password })

    return response.data
}

export async function getMe() {
    try {
        const response = await api.get("/auth/get-me")
        return response.data
    }
    catch(err){
        console.log(err)
    }
    
}

export async function logout() {
    const response = await api.get("/auth/logout")
    return response.data
}