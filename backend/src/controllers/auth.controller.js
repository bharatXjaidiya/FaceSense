const userModel = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const registerController = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "all fields are required." })
    }

    const exist = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (exist) {
        return res.status(409).json({
            message:
                exist.email === email
                    ? "Email already registered."
                    : "Username already registered.",
        });
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({ username, email, password: hash });

    res.status(201).json({ message: "user registered successfully.", user })

}

const loginController = async (req, res) => {
    const { username, email, password } = req.body;

    if (!password || !(username && email)) {
        return res.status(400).json({ message: "All fields required." });
    }

    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    }
    );

    if (!user) {
        return res.status(404).json({ meassage: "User dosn't exist." });
    }

    let decode ;
    try{
        decode = await bcrypt.compare(password , user.password);
        if(!decode){
            return res.status(401).json({message : "Unauthrized access."})
        }
    }
    catch(err){
        consle.log("error in decoding hash : " + err);
    }

    const token = jwt.sign({
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie(token);

    res.status(201).json({ message: "User Login Successfully." ,user})

}


module.exports = { registerController, loginController }