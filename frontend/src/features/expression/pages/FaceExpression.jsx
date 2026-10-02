import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import useExpression from "../hook/useExpression";


export default function FaceExpression({ onClick = () => { } }) {

    const {user,loading,handleGetMe} = useExpression()

    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");

    useEffect(() => {

        handleGetMe()
        
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    console.log(user)

    async function handleClick() {
        const expression = detect({ landmarkerRef, videoRef, setExpression })
    
    }

    if(loading){
        return <h1>Loading...</h1>
    }


    return (
        <div style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                style={{ width: "400px", borderRadius: "12px" }}
                playsInline
            />
            <h2>{expression}</h2>
            <button onClick={handleClick} >Detect expression</button>
        </div>
    );
}