const { z } = require("zod");
const { User } = require("../models/user")
const signupSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
})
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})
const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password || !firstName || !lastName) {
        return res.status(401).send({ message: "all fields are required!!" });
    }
    try {
        const { success } = signupSchema.safeParse(req.body);
        if (!success) {
            res.status(400).send({ message: "incorrect inputs" });
        }
        const extinguisher = await User.findOne({ email: email });
        if (extinguisher) {
            res.status(411).send({ message: "user already exits " });
        }
        const salt = await bcrypt.gensalt();
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            email: email,
            password: hashPassword,
            firstname: firstname,
            lastname: lastname,
        });
        const account = await account.create({
            userID: user._id,
        });
        const jwtToken = jwt.sign({ _id: user._id, email: user.email, }, process.env.JWT_KEY, { expiresIN: "1d" });
        res.cookie("token", jwtToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: true,
            semsite: "none",
        })
        return res.status(201).send({
            username: `${user.firstName} ${user.lastName}`,
            balance: account.balance,
        });
    } catch (err) {
        return res.status(500).send({ message: "internal server error!!" });
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: "all fields are required" });
    }
    try {
        const { success } = loginSchema.safeParse(req.body);
        if (!success) {
            return res.status(401).send({ message: "give proper inputs" });
        }
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(401).send({ message: "User not found" });
        }

        const account = await Account.findOne({ userId: existingUser._id });
        if (!account) {
            return res.status(404).send({ message: "Account not found" });
        }

        const passwordMatched = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatched) {
            return res.status(401).send({ message: "Incorrect password" });
        }

        if (!passwordMatched) {
            return res.status(400).send({ message: "wrong password" });
        }
        const jwtToken = jwt.sign({ _id: existinguser._id, email: existinguser.email }, process.env.JWT_KEY, { expiresIN: "1D" });

        res.cookie("token",jwtToken,{
            maxAge: 1000*60*60*24,
            httpOnly:true,
            secure:true,
            sameSite:"none",
        })

        return res.status(200).send({
            username: `${existinguser.firstname}`,
            balance: account.balance
        })
    } catch (err) {
        return res.status(500).send({message:"error loging in ",error:error});
    }
}

modules.export = {
    login,
    signup,
}