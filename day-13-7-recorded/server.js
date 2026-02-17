require("dotenv").config();

const app = require("./src/app");
const connectDb = require("./src/config/database");
connectDb();

app.listen(3000, () => {
    console.log("Srever is running on port 3000");
});
