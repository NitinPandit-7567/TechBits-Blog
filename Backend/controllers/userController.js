const wrapAsync = require('../utils/wrapAsync')
const Users = require('../model/users')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
module.exports.signUp = wrapAsync(async (req, res, next) => {
    const { username, password, email, name } = req.body
    const new_user = new Users({ username, password, email, name });
    await new_user.save().then(() => {
        const token = jwt.sign({ token: validation.username }, process.env.TOKEN_SECRET, { expiresIn: '5h' });
        req.session.token = token;
        req.session.user_id = new_user._id;
        res.json({ username: new_user.username, email: new_user.email, name: new_user.name.full })
    })
})

module.exports.login = wrapAsync(async (req, res, next) => {
    const { username, password } = req.body;
    const validation = await Users.findAndValidate(username, password);
    if (validation) {
        const token = jwt.sign({ token: validation.username }, process.env.TOKEN_SECRET, { expiresIn: '5h' });
        req.session.token = token;
        req.session.user_id = validation._id
        res.json({ username: validation.username, email: validation.email, name: validation.name.full })
    }
    else {
        return next(new AppError(401, 'Invalid Credentials'))
    }
})

module.exports.logout = (req, res, next) => {
    req.session.token = null;
    req.session.user_id = null;
    res.json({ message: 'Logged Out' })
}