import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [age, setAge] = useState("");

    const [editId, setEditId] = useState("");

    const fetchNote = async () => {
        const { data } = await axios.get("https://backend-2-dj6c.onrender.com//api/notes");

        setNotes(data.note);
    };

    useEffect(() => {
        fetchNote();
    }, []);

    const handelSubmit = async (event) => {
        event.preventDefault();

        if (editId) {
            await axios.patch("https://backend-2-dj6c.onrender.com//api/notes/" + editId, {
                title,
                description,
                age,
            });
        } else {
            const { data } = await axios.post(
                "https://backend-2-dj6c.onrender.com//api/notes",
                {
                    title: title,
                    description: description,
                    age: age,
                },
            );
        }

        fetchNote();

        setTitle("");
        setDescription("");
        setAge("");
        setEditId("");
    };

    const handelDelete = async (noteId) => {
        await axios.delete("https://backend-2-dj6c.onrender.com//api/notes/" + noteId);
        fetchNote();
    };
    const handelEdtitNote = async (note) => {
        setEditId(note._id);
        setTitle(note.title);
        setDescription(note.description);
        setAge(note.age);
    };

    return (
        <div className="p-3">
            {/* Note Ui  */}
            <form
                onSubmit={(event) => {
                    handelSubmit(event);
                }}
                className="flex gap-3"
            >
                <input
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                    value={title}
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

                <input
                    onChange={(event) => {
                        setDescription(event.target.value);
                    }}
                    value={description}
                    title="description"
                    type="text"
                    placeholder="Description"
                    className="flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

                <input
                    onChange={(event) => {
                        setAge(event.target.value);
                    }}
                    value={age}
                    name="age"
                    type="number"
                    placeholder="Age"
                    className="w-24 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button className=" w-40 p-3  bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition">
                    Save Note
                </button>
            </form>

            {/* NOte Ui Fetched */}

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                {notes.map((note) => (
                    <div
                        key={note._id}
                        className="bg-gradient-to-br from-purple-400 to-blue-400 text-white p-4 rounded-xl shadow-lg relative"
                    >
                        <h3 className="text-lg font-bold mb-1">{note.title}</h3>

                        <p className="text-sm opacity-90 mb-2">
                            {note.description}
                        </p>

                        <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-semibold">
                            Age: {note.age}
                        </span>
                        <div className="flex gap-5 absolute right-3 bottom-2">
                            <button
                                onClick={() => {
                                    handelEdtitNote(note);
                                }}
                                className="bg-sky-600 px-6 py-1 rounded "
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    handelDelete(note._id);
                                }}
                                className="bg-red-600 px-6 py-1 rounded "
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
