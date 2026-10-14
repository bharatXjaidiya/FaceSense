import { memo, useEffect, useRef, useState } from "react";
import { init, detectStable } from "../utils/utils";
import "../styles/FaceExpression.scss"

function FaceExpression({ onChange = () => { } }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [ready, setReady] = useState(false);      // camera and model loaded
  const [detecting, setDetecting] = useState(false);
  const [expression, setExpression] = useState("Click the button to detect");

  useEffect(() => {
    let cancelled = false;

    init({ landmarkerRef, videoRef, streamRef, isCancelled: () => cancelled })
      .then((ok) => {
        if (ok && !cancelled) setReady(true);
      })
      .catch((err) => {
        console.error("Camera or model failed:", err);
        if (!cancelled) setExpression("Could not start the camera");
      });

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      landmarkerRef.current?.close();
      landmarkerRef.current = null;
    };
  }, []);

  const handleDetect = async () => {
    if (!ready || detecting) return;

    setDetecting(true);
    setExpression("Detecting...");

    try {
      const mood = await detectStable({ landmarkerRef, videoRef });

      if (mood === "no-face") {
        setExpression("No face found, try again");
        return;                       // do not tell Home, so the song stays
      }

      setExpression(mood);
      onChange(mood);                 // send the mood to Home
    } finally {
      setDetecting(false);
    }
  };

  return (
    <div className="face-expression" style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        muted
        playsInline
        style={{ borderRadius: 12, transform: "scaleX(-1)" }}
      />
      <div className="bottom">

        <h2>{expression}</h2>
        <button type="button" onClick={handleDetect} disabled={!ready || detecting}>
          {!ready ? "Starting camera..." : detecting ? "Detecting..." : "Detect expression"}
        </button>
      </div>
    </div>
  );
}

export default memo(FaceExpression);