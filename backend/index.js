const express = require("express");
const cookieParser = require("cookie-parser");
const dbConnect = require("./lib/dbConnect");
const mainRouter = require("./routes/mainRouter");
const cors = require("cors");
require('dotenv').config();

const app = express();
dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http://192.168.29.101:5173"]
}));

app.use("/api/v1", mainRouter);


app.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
});
