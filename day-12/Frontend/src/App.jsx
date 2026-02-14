import React, { useEffect, useState } from "react";

import axios from "axios";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [editId, setEditId] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [age, setAge] = useState("");

    const getNotes = async () => {
        const { data } = await axios.get("https://backend-2-dj6c.onrender.com//api/notes");

        setNotes(data.note);
    };

    useEffect(() => {
        getNotes();
    }, []);

    const handelSubmit = async (event) => {
        event.preventDefault();

        if (editId) {
            const res = await axios.patch(
                "https://backend-2-dj6c.onrender.com//api/notes/" + editId,
                { title, description, age },
            );
        } else {
            const res = await axios.post("https://backend-2-dj6c.onrender.com//api/notes", {
                title,
                description,
                age,
            });
        }

        getNotes();

        setTitle("");
        setDescription("");
        setAge("");
        setEditId("");
    };

    const handelEdit = async (note) => {
        setEditId(note._id);

        setTitle(note.title || "");
        setDescription(note.description || "");
        setAge(note.age || "");
    };

    const handelDelete = async (noteId) => {
        const res = await axios.delete(
            "https://backend-2-dj6c.onrender.com//api/notes/" + noteId,
        );
        getNotes();
    };

    return (
        <div>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="bg-white p-5 rounded-xl shadow-md mb-8">
                    <form
                        onSubmit={(event) => {
                            handelSubmit(event);
                        }}
                        className="flex gap-4"
                    >
                        <input
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }}
                            value={title}
                            name="title"
                            type="text"
                            placeholder="Title"
                            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />

                        <input
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}
                            value={description}
                            name="description"
                            type="text"
                            placeholder="Description"
                            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />

                        <input
                            onChange={(event) => {
                                setAge(event.target.value);
                            }}
                            value={age}
                            name="age"
                            type="number"
                            placeholder="Age"
                            className="w-24 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />

                        <button className="bg-purple-500 text-white px-5 rounded-lg hover:bg-purple-600 transition">
                            {editId ? "Update" : "Add"}
                        </button>
                    </form>
                </div>

                <h1 className="text-2xl font-semibold mb-6 text-center">
                    Notes
                </h1>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {notes.map((note, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-purple-100 to-blue-100 p-5 rounded-xl shadow-md hover:shadow-xl transition relative"
                        >
                            <h2 className="font-semibold text-lg mb-2 text-purple-700">
                                {note.title}
                            </h2>

                            <p className="text-gray-700 mb-3">
                                {note.description}
                            </p>

                            <p className="text-sm font-medium text-blue-600">
                                Age: {note.age}
                            </p>
                            <div className="absolute right-2 bottom-2 flex gap-3 bg-sky-100 px-3 py-1 rounded">
                                <button
                                    onClick={(event) => {
                                        handelEdit(note);
                                    }}
                                    className="bg-sky-500 px-5 py-1 rounded "
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={(event) => {
                                        handelDelete(note._id);
                                    }}
                                    className="bg-red-500 px-5 py-1 rounded "
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
