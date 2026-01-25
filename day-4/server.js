const app = require("./src/app");

const notes = [];

app.post("/notes", (req, res) => {
    notes.push(req.body);
    console.log(req.body);
    res.send("Notes Created Successfully");
});

app.get("/notes", (req, res) => {
    res.send(notes);
});

app.delete("/notes/:index", (req, res) => {
    delete notes[req.params.index];

    res.send("successfully deleted");
});

app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description = req.body.description;

    res.send("Desc succesfullly updated");
});

app.listen(3000, () => {
    console.log("Server is running on the prot no 3000");
});
