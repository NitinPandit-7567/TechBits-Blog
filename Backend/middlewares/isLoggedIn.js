const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
module.exports = async function (req, res, next) {
    const authtoken = req.session.token
    const validate = authtoken ? (jwt.verify((authtoken), process.env.TOKEN_SECRET)) : false;
    if (validate) {
        return next()
    }
    else {
        return next(new AppError(401, 'Not Authorized'))
    }
}