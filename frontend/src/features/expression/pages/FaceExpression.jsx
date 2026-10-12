import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import useExpression from "../hook/useExpression";


export default function FaceExpression({ onClick = () => { } }) {

    const { user, loading } = useExpression()

    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");

    useEffect(() => {


        init({ landmarkerRef, videoRef, streamRef }).then(() => {
            handleClick()
        });

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


    async function handleClick() {
        const expression = detect({ landmarkerRef, videoRef, setExpression })
        console.log("expression is " + expression)
        onClick(expression)
    }

    if (loading) {
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