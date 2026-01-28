const app = require("./src/app");
const mongoose = require("mongoose");

const connectToDb = () => {
    mongoose.connect(
    ).then(()=>{
        console.log('Connected to Database')
    })
};
connectToDb()

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
