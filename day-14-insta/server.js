require("dotenv").config();

const app = require("./src/app");
const connectToDb = require("./src/config/database");

connectToDb();

app.listen(3000, () => {
    console.log(`Server Is running on port 3000`);
});
console.log('1')