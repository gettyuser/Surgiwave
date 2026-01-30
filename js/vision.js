import { HandLandmarker, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.mjs";
import { state } from './state.js';
import { CONFIG } from './config.js';

export async function initVision(isReceiver) {
    const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm");
    const landmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task", delegate: "GPU" },
        runningMode: "VIDEO", numHands: 1
    });
    const video = document.createElement("video");
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        video.srcObject = stream; video.play();
        video.addEventListener("loadeddata", () => loop(landmarker, video));
    });
}

function loop(landmarker, video) {
    if (!state.connected) { requestAnimationFrame(() => loop(landmarker, video)); return; }
    const now = performance.now();
    const results = landmarker.detectForVideo(video, now);
    
    if (results.landmarks.length > 0) {
        const lm = results.landmarks[0];
        const wrist = lm[0];
        const fingers = [8,12,16,20].filter(i => Math.hypot(lm[i].x-wrist.x, lm[i].y-wrist.y) > Math.hypot(lm[i-2].x-wrist.x, lm[i-2].y-wrist.y)*1.1).length;
        
        const isStrictThumb = (lm[4].y < lm[3].y) && (lm[4].y < lm[5].y - 0.05) && (lm[8].y > lm[6].y);

        if (state.mode === 'LOCKED' || state.mode === 'AUTHORIZING') {
            if (fingers >= 4) {
                if (state.unlockStart === 0) state.unlockStart = now;
                if (now - state.unlockStart > CONFIG.UNLOCK_DELAY) {
                    state.mode = 'SCANNING'; state.unlockStart = 0;
                    state.physics = { x: (1-lm[9].x)*window.innerWidth, y: lm[9].y*window.innerHeight };
                }
            } else if (isStrictThumb) state.mode = 'AUTHORIZING';
            else { state.mode = 'LOCKED'; state.unlockStart = 0; }
        } else {
            if (fingers >= 4) {
                state.mode = 'SCANNING';
                state.target = { x: (1-lm[9].x)*window.innerWidth, y: lm[9].y*window.innerHeight };
            } else if (fingers === 3) state.mode = 'LOCKED';
            else if (isStrictThumb) state.mode = 'AUTHORIZING';
            else state.mode = 'IDLE';
        }
    } else {
        if(state.mode !== 'LOCKED' && state.mode !== 'AUTHORIZING') state.mode = 'IDLE';
        state.unlockStart = 0;
    }
    requestAnimationFrame(() => loop(landmarker, video));
}