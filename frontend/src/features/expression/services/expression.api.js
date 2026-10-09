import axios from "axios";

const baseURL = "http://localhost:3000";

const api = axios.create({ baseURL, withCredentials: true })


export const getMe = async () => {
    const response = await api.get("/api/auth/get-me")

    return response.data
}