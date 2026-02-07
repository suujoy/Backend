import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [notes, setNotes] = useState([])
    console.log('git')
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/notes")
            .then((res) => setNotes(res.data.note))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="flex flex-wrap w-full h-screen justify-start items-start gap-5 p-4">
            {notes.map((note) => (
                <div
                    key={note._id || note.id}
                    className="bg-purple-900 p-1 rounded-2xl flex-wrap h-fit flex w-[400px] flex-col gap-2"
                >
                    <h1 className="bg-yellow-50 p-1 rounded-2xl">
                        {note.title}
                    </h1>
                    <h2 className="bg-slate-600 p-1 rounded-2xl">
                        {note.description}
                    </h2>
                    <h2 className="bg-pink-400 p-1 rounded-2xl">{note.age}</h2>
                </div>
            ))}
        </div>
    );
};

export default App;
