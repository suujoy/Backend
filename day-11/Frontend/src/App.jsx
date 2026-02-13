import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [notes, setNotes] = useState([]);
    const getNotes = async () => {
        const { data } = await axios("http://localhost:3000/api/notes");
        setNotes(data.note);
    };
    useEffect(() => {
        getNotes();
    }, []);

    const handelSubmit = (event) => {
        event.preventDefault();
        const { title, description, age } = event.target.elements;
        console.log(title.value, description, age);
        axios
            .post("http://localhost:3000/api/notes", {
                title: title.value,
                description: description.value,
                age: age.value,
            })
            .then((res) => {
                console.log(res.data);
                getNotes();
            });
    };

    const handelDeleteNote = (noteId) => {
        console.log(noteId);
        axios
            .delete("http://localhost:3000/api/notes/" + noteId)
            .then((res) => {
                console.log(res);
                getNotes();
            });
    };

    return (
        <div>
            <form
                onSubmit={(event) => {
                    handelSubmit(event);
                }}
                className=" w-full h-20 flex justify-evenly items-center  "
            >
                <input
                    name="title"
                    className="border-2 h-fit px-6 py-2 rounded"
                    type="text"
                    placeholder="Enter Title"
                />
                <input
                    name="description"
                    className="border-2 h-fit px-6 py-2 rounded"
                    type="text"
                    placeholder="Enter Description"
                />
                <input
                    name="age"
                    className="border-2 h-fit px-6 py-2 rounded"
                    type="number"
                    placeholder="Enter Description"
                />
                <button
                    type="submit"
                    className="bg-green-200 px-6 py-1 font-extrabold rounded "
                >
                    Submit
                </button>
            </form>

            <div className="p-6 space-y-4 bg-gray-100 min-h-screen">
                {notes.map((note, index) => (
                    <div
                        key={index}
                        className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded"
                    >
                        <h2 className="text-lg font-semibold">{note.title}</h2>
                        <p className="text-gray-700">{note.description}</p>
                        <span className="text-sm text-purple-600">
                            Age: {note.age}
                        </span>
                        <button
                            onClick={() => {
                                handelDeleteNote(note._id);
                            }}
                            className="bg-red-600 text-white px-5 rounded ml-60"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
