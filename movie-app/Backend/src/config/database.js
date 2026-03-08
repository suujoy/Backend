const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to Database`);
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectToDb;
