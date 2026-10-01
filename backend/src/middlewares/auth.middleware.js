const jwt = require("jsonwebtoken");
const blackListModel = require("../models/blacklist.model");

const authMiddleware = async(req,res,next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message : "Token not found."})
    }

    const isBlackListedToken = await blackListModel.findOne({token});

    if(isBlackListedToken){
        return res.status(401).json({message : "Invalid Token"});
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch(err){
        res.status(401).json({message : "Invalid Token."})
    }
}

module.exports = authMiddleware;