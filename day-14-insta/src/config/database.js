const mongoose = require("mongoose");

const connectToDb = async () => {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database");
};

module.exports = connectToDb;
