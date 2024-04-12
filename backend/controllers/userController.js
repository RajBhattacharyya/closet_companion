const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Account = require("../models/account");

const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password || !firstName || !lastName) {
        return res.status(401).send({ message: "all fields are required!!" });
    }
    try {
        const extinguisher = await User.findOne({ email: email });
        if (extinguisher) {
            return res.status(411).send({ message: "user already exists" });
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: hashPassword,
        });
        const account = await Account.create({
            userID: user._id,
        });
        const jwtToken = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: "1d" });
        res.cookie("token", jwtToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });
        return res.status(201).send({
            username: `${user.firstname} ${user.lastname}`,
            balance: account.balance,
        });
    } catch (err) {
        return res.status(500).send({ message: "Error creating user", error: err });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: "all fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(401).send({ message: "User not found" });
        }
    
        const account = await Account.findOne({ userID: existingUser._id }); // Corrected from userId to userID
        if (!account) {
            return res.status(404).send({ message: "Account not found" });
        }
    
        const passwordMatched = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatched) {
            return res.status(401).send({ message: "Incorrect password" });
        }
    
        const jwtToken = jwt.sign({ _id: existingUser._id, email: existingUser.email }, process.env.JWT_KEY, { expiresIn: "1d" });
    
        res.cookie("token", jwtToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: true,
            sameSite: "None", // Corrected from "none" to "None"
        });
    
        return res.status(200).send({
            username: `${existingUser.firstname}`, // Corrected from firstname to firstName
            balance: account.balance
        });
    } catch (err) {
        return res.status(500).send({ message: "error logging in", err });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).send({ message: "successfully logged out" });
    } catch (error) {
        res.status(500).send({ message: "could not log out", error });
    }
};

module.exports = {
    login,
    signup,
    logout,
};
