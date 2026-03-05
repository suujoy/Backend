import React, { useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import "../styles/player.scss";

const Player = () => {
    const { song } = useSong();
    const audioRef = useRef(null);

    if (!song) return <div className="player">No song loaded</div>;

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");

    const formatTime = (time) => {
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60)
            .toString()
            .padStart(2, "0");
        return `${m}:${s}`;
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const current = audioRef.current.currentTime;
        const dur = audioRef.current.duration || 0;
        setProgress((current / dur) * 100);
        setCurrentTime(formatTime(current));
    };

    const handleLoaded = () => {
        setDuration(formatTime(audioRef.current.duration));
    };

    const handleSeek = (e) => {
        const value = e.target.value;
        const dur = audioRef.current.duration;
        audioRef.current.currentTime = (value / 100) * dur;
        setProgress(value);
    };

    const handleVolume = (e) => {
        const value = e.target.value;
        setVolume(value);
        audioRef.current.volume = value;
    };

    return (
        <div className="player">
            <img src={song.posterUrl} alt={song.title} />

            <div className="content">
                <h3>{song.title}</h3>

                <audio
                    ref={audioRef}
                    src={song.url}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoaded}
                />

                <div className="timeline">
                    <span>{currentTime}</span>

                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleSeek}
                    />

                    <span>{duration}</span>
                </div>

                <div className="controls">
                    <button
                        onClick={() => (audioRef.current.currentTime -= 10)}
                    >
                        ⏪
                    </button>

                    <button onClick={handlePlayPause}>
                        {isPlaying ? "⏸" : "▶"}
                    </button>

                    <button
                        onClick={() => (audioRef.current.currentTime += 10)}
                    >
                        ⏩
                    </button>

                    <div className="volume">
                        <span>🔉</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolume}
                        />
                        <span>🔊</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
