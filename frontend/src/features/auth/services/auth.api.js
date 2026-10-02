import axios from "axios"


const baseURL = "http://localhost:3000";

const api = axios.create({baseURL, withCredentials : true});


export const register = async({username , email , password , gender})=>{
    const response = await api.post("/api/auth/register",{username , email , password , gender});

    return response.data
}

export const login = async({username , email , password}) =>{
    const response = await api.post("/api/auth/login" ,{username,email,password})
}

export async function getMe() {
    const response = await api.get("/api/auth/get-me")
    return response.data
}

export async function logout() {
    const response = await api.get("/api/auth/logout")
    return response.data
}