const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const validateToken = asyncHandler(async (req, res, next)=>{
    let token;
    const authHeader= req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; 
    }
    if(!token){
        res.send(401).json({message:"Token is missing"});
    }
    await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY, (err,decoded)=>{
        if(err){
            throw new Error("Unauthorized access");
        }
        req.user = decoded?.user;
        next();
    });
});

module.exports = validateToken;