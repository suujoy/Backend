import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [song, setSong] = useState({
        url: "https://ik.imagekit.io/teim9v6vi/moodify/songs/Zamaan_ilz2lRxv0.mp3",
        posterUrl:
            "https://ik.imagekit.io/teim9v6vi/moodify/posters/Zamaan_lFRBotG5u.jpeg",
        title: "Zamaan",
        mood: "sad",
    });

    return (
        <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
            {children}
        </SongContext.Provider>
    );
};
