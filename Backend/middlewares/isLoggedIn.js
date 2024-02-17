const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
//Defining the isLoggedIn middleware
module.exports = async function (req, res, next) {
    const authtoken = req.session.token                                          //getting the token from the session store
    const validate = authtoken ? (jwt.verify((authtoken), process.env.TOKEN_SECRET)) : false;   //verifying the token
    if (validate && req.session.user_id) {
        return next()                                                           //moving on to the next middleware if token is valid
    }   
    else {
        return next(new AppError(401, 'Not Authenticated'))                    //throwing an error if validation fails
    }
}