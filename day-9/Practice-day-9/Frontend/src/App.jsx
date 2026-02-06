import React, { useState } from "react";
import axios from "axios";

const App = () => {
    const [note, setNote] = useState([]);

    axios.get("http://localhost:3000/api/notes").then((res) => {
        setNote(res.data.note);
    });

    return (
        <div className="bg-black w-full h-screen flex items-center justify-center gap-2 flex-wrap">
            {note.map((note) => {
                return (
                    <div className="bg-gray-700 w-[300px] h-fit p-2 text-white ">
                        <h2 className="bg-pink-900 p-1 rounded ">
                            {note.title}
                        </h2>
                        <p className="bg-purple-700 p-1 rounded mt-2">
                            {note.description}
                        </p>
                        <h3 className="bg-yellow-400 mt-2 p-1 rounded">
                            {note.age}
                        </h3>
                    </div>
                );
            })}
        </div>
    );
};

export default App;
