import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [editId, setEditId] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [age, setAge] = useState("");

    const fetchNotes = async () => {
        const { data } = await axios.get("http://localhost:3000/api/notes");
        setNotes(data.note);
    };
    useEffect(() => {
        fetchNotes();
    }, []);

    const handelSubmit = async (event) => {
        event.preventDefault();

        // const { title, description, age } = event.target.elements;
        if (editId) {
            const res = await axios.patch(
                "http://localhost:3000/api/notes/" + editId,
                { title, description, age },
            );
        } else {
            const res = await axios.post("http://localhost:3000/api/notes", {
                title: title,
                description: description,
                age: age,
            });
        }

        fetchNotes();
        setEditId(null);
        setTitle("");
        setDescription("");
        setAge("");
    };

    const handelDeleteNote = async (noteId) => {
        const res = await axios.delete(
            "http://localhost:3000/api/notes/" + noteId,
        );
        fetchNotes();
    };

    const handelEditNote = async (note) => {
        setEditId(note._id);
        setTitle(note.title);
        setDescription(note.description);
        setAge(note.age);
    };
    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">
                My Notes
            </h1>

            <div className="bg-white p-4 rounded-xl shadow-md mb-6 max-w-4xl mx-auto">
                <form
                    onSubmit={(event) => {
                        handelSubmit(event);
                    }}
                    className="flex flex-col md:flex-row gap-3 items-center"
                >
                    <input
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                        value={title}
                        name="title"
                        type="text"
                        placeholder="Title"
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />

                    <input
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                        value={description}
                        name="description"
                        type="text"
                        placeholder="Description"
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />

                    <input
                        onChange={(event) => {
                            setAge(event.target.value);
                        }}
                        value={age}
                        name="age"
                        type="number"
                        placeholder="Age"
                        className="w-full md:w-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />

                    <button className="w-full md:w-auto px-5 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition">
                        Add
                    </button>
                </form>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {notes.map((note, index) => (
                    <div
                        key={index}
                        className="relative bg-gradient-to-br from-indigo-200 to-purple-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
                    >
                        <h2 className="text-xl font-semibold text-slate-800 mb-2">
                            {note.title}
                        </h2>
                        <p className="text-slate-700 mb-4">
                            {note.description}
                        </p>
                        <span className="text-sm font-bold text-slate-600">
                            Age: {note.age}
                        </span>

                        <div className="absolute right-5 backdrop-blur-2xl bg-white/20 p-2 rounded flex gap-4 bottom-3">
                            <button
                                onClick={(event) => {
                                    handelEditNote(note);
                                }}
                                className="bg-sky-500 px-7 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    handelDeleteNote(note._id);
                                }}
                                className="bg-pink-500 px-7 py-1 rounded "
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
