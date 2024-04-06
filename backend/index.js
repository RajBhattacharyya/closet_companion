const express = require("express");
const cookieParser = require("cookie-parser");
const dbConnect = require("./lib/dbConnect");
const cors = require("cors");
require ('dotenv').config();


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials:true,
        origin:["http://localhost:5173","http://192.168.29.101:5173"]
    })
)
dbConnect();
app.listen(3000,()=>{
    console.log('server is running on http://localhost:3000');
})