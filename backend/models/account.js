const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    balance:{
        type:Number,
        required:true,
        default:5000,
    }
},{timestamps:true});

const account = mongoose.model("account",accountSchema);

module.exports = account;