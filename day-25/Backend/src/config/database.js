const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connect to Database");
    } catch (err) {
        console.log("Connect to Database", err);
    }
};

module.exports = connectToDb;
