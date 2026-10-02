const userModel = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListModel = require("../models/blacklist.model");
const redis = require("../config/cache")

const registerController = async (req, res) => {
    const { username, email, password , gender } = req.body;

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

    const user = await userModel.create({ username, email, password: hash , gender });

    res.status(201).json({ message: "user registered successfully.", user })

}

const loginController = async (req, res) => {
    const { username, email, password } = req.body;

    if (!password || !(username || email)) {
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

    res.status(201).json({ message: "User Login Successfully.",user :{
        username : user.username,
        id : user._id,
        email : user.email,
        gender : user.gender
    }})

}

const getMeController = async(req,res)=>{
    const userId = req.user.userId;

    const user = await userModel.findById(userId);

    res.status(201).json({message : "User fetched successfully.",user});
}


const logoutController = async(req,res)=>{

    const token = req.cookies.token;

    res.clearCookie("token");

    // await blackListModel.create({    for the db token blacklistc
    //     token
    // })

    await redis.set(token,Date.now().toString(),"EX", 60 * 60 * 24);

    res.status(201).json({message : "Logout successfully."});

}




module.exports = { registerController, loginController , getMeController , logoutController}