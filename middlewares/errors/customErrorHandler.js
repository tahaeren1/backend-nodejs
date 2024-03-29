const CustomError = require("../../helpers/error/CustomError");
const customErrorHandler = (err, req, res, next) => {

    let customError = err;
    // console.log(err.name);
    if (err.name === "SyntaxError") {
        customError = new CustomError("Unxpected Syntax", 400)
    }
    if (err.name === "ValidationError") {
        customError = new CustomError(err.message,400)
    }

    if(err.code === 11000) {
        customError = new CustomError("Duplicate Key Found : Check Your Input",400)
        //Duplicate key
    }

    // console.log(customError.message, customError.status);
    res.status(customError.status || 500).json({
        succes: false,
        message : customError.message 
    });
};

module.exports = customErrorHandler;