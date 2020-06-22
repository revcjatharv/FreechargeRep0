
const jwt = require('jsonwebtoken');
const config=require('./config');

module.exports=function(req,res,next){
    try {
        const token=req.headers.authorization;
        var decoded=jwt.verify(token,config.secret);
        req.userData=decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            "message":"not authenticated"
        });
    }
}