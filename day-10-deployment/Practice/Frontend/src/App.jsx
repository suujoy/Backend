import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [note, setNote] = useState([]);

    /**
     * Get Note
     */

    const getNotes = async () => {
        const { data } = await axios.get("http://localhost:3000/api/notes");

        setNote(data.note);
    };
    console.log('2+1')

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <div className="flex flex-wrap gap-5 p-6 w-full h-fit ">
            {note.map((note, index) => {
                return (
                    <div className="bg-pink-400 h-fit p-1 rounded w-[200px] flex flex-col gap-2 ">
                        <h2 className="">{note.title}</h2>
                        <h2>{note.description}</h2>
                    </div>
                );
            })}
        </div>
    );
};

export default App;
