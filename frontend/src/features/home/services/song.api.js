import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true
})


export const getSongs = async () => {
    const response = await api.get("/song/get")
    return response.data;
}

export const uploadSong = async ({mood,title,file}) =>{
    console.log(mood,title,file)
    const formData = new FormData()
    formData.append("title",title)
    formData.append("song",file)
    console.log(formData)
    const response = await api.post("/song/upload?mood=" + mood , formData)
    return response.data;
}

export const deleteSong = async(songId) =>{
    const response = await api.delete("/song/delete/" + songId);
    return response.data;
}
