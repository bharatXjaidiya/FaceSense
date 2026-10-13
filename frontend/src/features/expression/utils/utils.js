import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const init = async ({ landmarkerRef, videoRef, streamRef, isCancelled }) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
  );

  const landmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  });

  // the component was removed while the model was loading
  if (isCancelled()) {
    landmarker.close();
    return false;
  }
  landmarkerRef.current = landmarker;

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  if (isCancelled()) {
    stream.getTracks().forEach((t) => t.stop());
    return false;
  }
  streamRef.current = stream;

  videoRef.current.srcObject = stream;
  await videoRef.current.play();
  return true;
};

const DEBUG = false; // true = print the average scores in the console after each click

// lower = easier to trigger
const THRESHOLDS = {
  happy: 0.3,
  surprised: 0.2,
  angry: 0.4,
  sad: 0.2,
};

// read the blendshape scores of one frame, or null when there is no face
const readScores = ({ landmarkerRef, videoRef }) => {
  const landmarker = landmarkerRef.current;
  const video = videoRef.current;
  if (!landmarker || !video || video.readyState < 2) return null;

  const results = landmarker.detectForVideo(video, performance.now());
  const shapes = results.faceBlendshapes?.[0]?.categories;
  if (!shapes) return null;

  const get = (name) => shapes.find((b) => b.categoryName === name)?.score ?? 0;
  const avg = (name) => (get(name + "Left") + get(name + "Right")) / 2;

  return {
    smile: avg("mouthSmile"),
    frown: avg("mouthFrown"),
    browDown: avg("browDown"),
    eyeWide: avg("eyeWide"),
    browOuterUp: avg("browOuterUp"),
    browInnerUp: get("browInnerUp"),
    jawOpen: get("jawOpen"),
  };
};

// averaged scores in, mood name out
const classify = (s) => {
  const browRaise = Math.max(s.browInnerUp, s.browOuterUp, s.eyeWide);

  const scores = {
    happy: s.smile,
    // an open mouth alone is not surprise: brows or eyes must go up too
    surprised:
      browRaise > 0.15 ? 0.5 * s.jawOpen + 0.25 * browRaise + 0.25 * s.eyeWide : 0,
    angry: s.browDown,
    sad: s.frown,
  };

  let best = "neutral";
  let bestRatio = 1;
  for (const mood in scores) {
    const ratio = scores[mood] / THRESHOLDS[mood];
    if (ratio >= bestRatio) {
      best = mood;
      bestRatio = ratio;
    }
  }
  return best;
};

// one click = 8 frames over about half a second
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const detectStable = async ({ landmarkerRef, videoRef, frames = 1, gap = 60 }) => {
  const samples = [];

  for (let i = 0; i < frames; i++) {
    const s = readScores({ landmarkerRef, videoRef });
    if (s) samples.push(s);
    await wait(gap);
  }

  if (samples.length < frames / 2) return "no-face";

  const average = {};
  for (const key of Object.keys(samples[0])) {
    average[key] = samples.reduce((sum, s) => sum + s[key], 0) / samples.length;
  }

  if (DEBUG) console.table(average);
  return classify(average);
};