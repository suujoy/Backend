// server start karna


const app = require("./src/app")

const notes = []

app.post('/notes',(req,res)=>{
    console.log(req.body)

    notes.push(req.body)

    console.log(notes)
    res.send('Notes Created')
})

app.get('/notes',(req,res)=>{
    res.send(notes)
})

app.delete('/notes/:index',(req,res)=>{
    console.log(req.params.index)
    delete notes[req.params.index]

    res.send('Notes delete successfully')
})

app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].discription = req.body.description
    res.send('note updated successfully')
})

app.listen(3000,()=>{
    console.log('Server is started at port 3000')
})