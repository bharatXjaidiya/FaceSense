import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})


export const getSongs = async () => {
    const response = await api.get("/api/song/get")
    return response.data;
}

export const uploadSong = async (song) =>{
    const response = await api.post("/api/song/upload" , song)
    return response.data;
}

export const deleteSong = async(songId) =>{
    const response = await api.delete("/api/song/delete/" + songId);
    return response.data;
}
