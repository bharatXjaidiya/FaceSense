import React, { useContext, useEffect } from 'react'
import { SongContext } from '../song.context'
import { deleteSong, getSongs, uploadSong } from '../services/song.api'

const useSong = () => {
    const { songList, setSongList, loading, setLoading } = useContext(SongContext)

    const handleGetSongs = async () => {
        setLoading(true)

        const data = await getSongs();

        setSongList(data.songs);

        setLoading(false)
    }

    const handleDeleteSong = async (songId) =>{
        setLoading(true)
        
        const data = await deleteSong(songId)

        setLoading(false)

        return data.message;
    }

    const handleUploadSong = async (song) => {
        setLoading(true)

        const data = await uploadSongs(song);

        setSongList((prev)=> [...prev , data.song])

        setLoading(false)
    }

    useEffect(() => {
        handleGetSongs()
    }, [])
    


    return { songList, loading };
}

export default useSong
