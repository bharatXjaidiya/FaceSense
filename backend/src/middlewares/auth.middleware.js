const jwt = require("jsonwebtoken")

const authMiddleware = async(req,res,next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message : "Token not found."})
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