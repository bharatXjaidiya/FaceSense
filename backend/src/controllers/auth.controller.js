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
    }).select("password");

    if (!user) {
        return res.status(401).json({ message: "Invalid Credentials." });
    }

    let decode ;
    try{
        decode =  bcrypt.compare(password , user.password);
        if(!decode){
            return res.status(401).json({message : "Invalid Credentials."})
        }
    }
    catch(err){
        consle.log("error in decoding hash : " + err);
    }

    const token = jwt.sign({
        userId : user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" });

    
    res.cookie("token", token);

    res.status(201).json({ message: "User Login Successfully." ,user})

}

const getMeController = async(req,res)=>{
    const userId = req.userId;

    const user = await userModel.findById(userId);

    res.status(201).json({message : "User fetched successfully."});
}





module.exports = { registerController, loginController , getMeController}