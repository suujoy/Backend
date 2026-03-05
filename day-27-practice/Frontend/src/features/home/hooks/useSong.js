import { SongContext } from "../song.context";

import { getSong, uploadSong } from "../services/song.api";
import { useContext } from "react";

export const useSong = () => {
    const context = useContext(SongContext);
    const { loading, setLoading, song, setSong } = context;

    const handleUploadSong = async ({ url, postUrl, title, mood }) => {
        setLoading(true);
        try {
            const { song } = await uploadSong({ url, postUrl, title, mood });

            setSong(song);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGetSong = async ({ mood }) => {
        setLoading(true);
        try {
            const { song } = await getSong({ mood });
            setSong(song);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return { song, loading, handleGetSong, handleUploadSong };
};
