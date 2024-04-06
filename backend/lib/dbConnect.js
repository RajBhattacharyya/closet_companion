const mongoose = require("mongoose");
require ('dotenv').config();

const dbConnect = async ()=>{
    try{    
        await mongoose.connect(process.env.DB_URL);
        console.log("connected to the database!!");
    }catch(error){
        console.error(error);
        console.log("unable to connect to the database!!");
    }
}
module.exports = dbConnect;