const app = require("./src/app");

const bio = [];

app.post("/bio", (req, res) => {
    bio.push(req.body);

    res.status(200).json({
        massage: "Bio Creation Success",
    });
});

app.get("/bio", (req, res) => {
    res.status(200).json({
        bio: bio,
    });
});


app.delete('/bio/:index',(req,res)=>{
    delete bio[req.params.index]

    res.status(200).json({
        massage:'Bio Deleted successfully'
    })
})

app.patch('/bio/:index',(req,res)=>{
    bio[req.params.index].name=req.body.name;
    res.status(200).json({
        massage:'Bio name updated successfully'
    })
})

app.listen(3000, () => {
    console.log("Hello Guys I am under the water form prot 3000");
});
