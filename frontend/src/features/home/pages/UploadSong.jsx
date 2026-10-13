import React, { useState, useRef , useEffect } from 'react'
import uploadsong from "../../../assets/upload-song.jpg"
import "../styles/Upload.scss"
import useSong from '../hooks/useSong'
import jsmediatags from "jsmediatags/dist/jsmediatags.min.js";
import { useNavigate } from 'react-router'

const UploadSong = () => {
    const [mood, setMood] = useState("")
    const [title, setTitle] = useState("")
    const [preview, setPreview] = useState(null);   // cover image URL
    const songFile = useRef(null)
    const navigate = useNavigate()


    const { handleUploadSong, loading } = useSong()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const file = songFile.current?.files?.[0];
        if (!file) {
            alert("Please choose a song file.");
            return;
        }

        const song = await handleUploadSong({ mood, title, file });
        navigate("/")

    }

    const handleFile = (e) => {
        const picked = e.target.files[0];
        if (!picked) return;

        setPreview(null);   // clear the old cover

        jsmediatags.read(picked, {
            onSuccess: ({ tags }) => {
                // optional: fill the title from the song's tags if the field is empty
                if (tags.title) setTitle(tags.title);

                if (tags.picture) {
                    const { data, format } = tags.picture;
                    const blob = new Blob([new Uint8Array(data)], { type: format });
                    setPreview(URL.createObjectURL(blob));
                }
            },
            onError: (err) => console.log("No tags found:", err.type),
        });
    };

    // free the memory of the old preview URL
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);


    if (loading) {
        return <h1>Song is uploading wait...</h1>
    }


    return (
        <main id='upload-song' >
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <div className="song-upload-container">
                    <div className="hover-text">upload Song</div>
                    <label htmlFor="song">
                        {songFile.current?.files?.[0] ? <img className='upload-img' src={preview} alt="" /> : <img className='upload-img' src={uploadsong} alt="" />}
                    </label>
                </div>
                <input onChange={(e)=>{handleFile(e)}} ref={songFile} hidden type="file" name="song" id="song" />
                <input value={mood} onChange={(e) => { setMood(e.target.value) }} className='mood' type="text" placeholder='Enter mood (happy,surprised,sad)' />
                <input value={title} onChange={(e) => { setTitle(e.target.value) }} className='mood' type="text" placeholder='Enter title' />

                <button type="submit">Upload Song</button>
            </form>
        </main>
    )
}

export default UploadSong
