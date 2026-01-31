const mongoose = require("mongoose");

const connectToDb = () => {
    mongoose
        .connect(
            `mongodb+srv://sujoy:ZqVNdwxkGf9OLJug@cluster0.v2bdxrd.mongodb.net/-day-7-practice`,
        )
        .then(() => {
            console.log("Connected to Datebase");
        });
};

module.exports = connectToDb;
