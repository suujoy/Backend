import { useEffect, useRef } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const FaceExpression = () => {
    const videoRef = useRef(null);
    let faceLandmarker;

    useEffect(() => {
        const loadModel = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
            );

            faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                },
                outputFaceBlendshapes: true,
                runningMode: "VIDEO",
            });

            startCamera();
        };

        const startCamera = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            detect();
        };

        const detect = async () => {
            const now = Date.now();
            const result = faceLandmarker.detectForVideo(videoRef.current, now);

            if (result.faceBlendshapes?.length > 0) {
                const blendshapes = result.faceBlendshapes[0].categories;

                const smile = blendshapes.find(
                    (b) => b.categoryName === "mouthSmileLeft",
                );
                console.log("Smile score:", smile.score);
            }

            requestAnimationFrame(detect);
        };

        loadModel();
    }, []);

    return <video ref={videoRef} width="400" />;
};

export default FaceExpression;
