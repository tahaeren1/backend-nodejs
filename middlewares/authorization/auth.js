const CustomError = require('../../helpers/error/CustomError');
const jwt = require('jsonwebtoken');
const {isTokenIncluded, getAccessTokenFromHeader} = require('../../helpers/authorization/tokenHelpers');
const getAccessToRoute = (req, res, next) => {
    // token
    const {JWT_SECRET_KEY} = process.env;
    if(!isTokenIncluded(req)) {
        return next(new CustomError("You are not auth to access this route",401));
    }
    const accesToken = getAccessTokenFromHeader(req);
    jwt.verify(accesToken,JWT_SECRET_KEY,(err,decoded) => {
        if(err) {
            //süresi geçen token hatası
            return next(new CustomError("Süresi geçen token",401));
        }
        req.user = {
            id : decoded.id,
            name : decoded.name
        }
        next();
    })
  
    
};

module.exports = {
    getAccessToRoute
};