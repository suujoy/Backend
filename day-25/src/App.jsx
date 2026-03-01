import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const FaceExpression = () => {
    const videoRef = useRef(null);
    const [emotion, setEmotion] = useState("Loading...");
    const faceLandmarkerRef = useRef(null);

    const classifyEmotion = (blendshapes) => {
        const get = (name) =>
            blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smile = get("mouthSmileLeft") + get("mouthSmileRight");
        const frown = get("mouthFrownLeft") + get("mouthFrownRight");
        const browDown = get("browDownLeft") + get("browDownRight");
        const browUp = get("browInnerUp");
        const jawOpen = get("jawOpen");
        const eyeWide = get("eyeWideLeft") + get("eyeWideRight");

        if (smile > 1) return "Happy";
        if (frown > 0.05) return "Sad";
        if (browDown > 1.4) return "Angry";
        if (jawOpen > 0.4 && eyeWide > 0.3 && browUp > 0.3) return "Surprised";

        return "Neutral";
    };

    const detect = () => {
        if (!faceLandmarkerRef.current || !videoRef.current) return;

        const now = Date.now();
        const result = faceLandmarkerRef.current.detectForVideo(
            videoRef.current,
            now,
        );

        if (result.faceBlendshapes?.length > 0) {
            const blendshapes = result.faceBlendshapes[0].categories;
            const detectedEmotion = classifyEmotion(blendshapes);
            setEmotion(detectedEmotion);
        }
    };

    useEffect(() => {
        const initialize = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
            );

            faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(
                vision,
                {
                    baseOptions: {
                        modelAssetPath:
                            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                    },
                    outputFaceBlendshapes: true,
                    runningMode: "VIDEO",
                },
            );

            startCamera();
        };

        const startCamera = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
            detect();
        };

        initialize();

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Detected Emotion: {emotion}</h2>
            <video
                ref={videoRef}
                width="400"
                height="300"
                style={{ borderRadius: "10px" }}
            />
            <button
                onClick={() => {
                    detect();
                }}
            >
                Detect Expression
            </button>
        </div>
    );
};

export default FaceExpression;
