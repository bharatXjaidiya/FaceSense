import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import FaceExpression from '../../expression/pages/FaceExpression'
import "../styles/Home.scss"
import useSong from '../hooks/useSong'

const Home = () => {
    const {songList} = useSong()

    console.log(songList)      
    
    return (
        <main id="home">
            <Navbar/>

            <div className="home-left">
                <FaceExpression />
            </div>

            <div className="home-right">
                <div className="song-playlist">

                </div>
            </div>

        </main>
    )
}

export default Home
