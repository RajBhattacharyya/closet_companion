const mongoose = require("mongoose");
const { string } = require("zod");

const userSchema = new mongoose.Schema({
    firstname:{
        required:true,
        trim:true,
        type:String,
    },
    email:{
        required:true,
        trim:true,
        type:String,
    },
    password:{
        required:true,
        type:String,   
    }
})

const User = mongoose.model("user",userSchema);
module.exports = User;