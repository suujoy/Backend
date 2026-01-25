const app = require("./src/app");

const notes = [];

// POST /notes
app.post("/notes", (req, res) => {
    notes.push(req.body);

    res.status(201).json({
        massage: "Notes Created Successfully",
    });
});

// GET /notes
app.get("/notes", (req, res) => {
    res.status(200).json({
        notes: notes,
    });
});

// Delete /notes

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]

    res.status(204).json({
        massage:"Note Deleted successfully"
    })
})

// PATCH /notes/:index

app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].name=req.body.name

    res.status(200).json({
        massage:'Note Updated Successfully'
    })
})

// PUT /notes

app.put('/notes/:index',(req,res)=>{
    notes[req.params.index] = req.body

    res.status(200).json({
        massage:'Note Modified Successfully'
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
