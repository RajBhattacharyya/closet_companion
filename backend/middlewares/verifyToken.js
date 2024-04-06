const express = require("express");
const jwt = require("jsonwebtoken");
require ('dotenv').config();

const verifyToken = (req,res,next)=>{
    const token = req.cookies.token;
    try {
        if(!token){
            res.status(400).send({message:"you are not verified"});
        }
        jwt.verify(
            token,
            process.env.JWT_KEY,
            (err, data) => {
                if (err) {
                    return res.status(401).send({ message: "You are not authorized" });
                }
                req._id = data._id;
                next();
            }
        )       
    } catch (error) {
        console.error(error)
        res.status(500).send({message:"server err"});
    }

}
module.exports = verifyToken;

