import { createContext ,  useState} from "react";

export const SongContext = createContext();

export const SongProvider = ({children}) =>{

    const [songList, setSongList] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    return(
        <SongContext.Provider value={{songList,setSongList,loading,setLoading,user,setUser}}>
            {children}
        </SongContext.Provider>
    )
}