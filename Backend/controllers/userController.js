const wrapAsync = require('../utils/wrapAsync')
const Users = require('../model/users')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
module.exports.signUp = wrapAsync(async (req, res, next) => {
    const { username, password, email, name } = req.body
    const new_user = new Users({ username, password, email, name });
    await new_user.save().then(() => {
        const token = jwt.sign({ token: username }, process.env.TOKEN_SECRET, { expiresIn: '5h' });    //Generating JWT token after user is created and saved successfully
        req.session.token = token;                                                                     //Storing the token in the session store
        req.session.user_id = new_user._id;                                                            //Storing the new user ID in the session store
        res.status(201).json({ username: new_user.username, email: new_user.email, name: new_user.name.full })
    }).catch((err) => {
        if (err.name === 'ValidationError') {                                                         //Sending validation error with status 400 if fields are missing
            const message = Object.values(err.errors).map(val => val.message)
            let err_message = message[0]
            if (message.length > 2) {
                err_message = 'Invalid/Incomplete Data'
            }
            return next(new AppError(400, err_message))
        }
        else {
            return next(new AppError(400, 'This username is already taken, please enter a different one.'))   //Sending duplicate key error if username already exists
        }
    })
})

module.exports.login = wrapAsync(async (req, res, next) => {
    const { username, password } = req.body;
    if (username && password) {
        const validation = await Users.findAndValidate(username.toString().toLowerCase(), password.toString());          //Using the static method defined in the userSchema to validate credentials
        if (validation) {
            const token = jwt.sign({ token: validation.username }, process.env.TOKEN_SECRET, { expiresIn: '5h' });      //Generating the token if validation is successful
            req.session.token = token;                                                                                  //Storing the token and user ID in the session store
            req.session.user_id = validation._id
            res.status(200).json({ username: validation.username, email: validation.email, name: validation.name.full })

        }
        else {
            return next(new AppError(401, 'Invalid Credentials'))                               
        }
    }
    else {
        return next(new AppError(400, 'Username/Password cannot be blank'))          
    }
})

module.exports.logout = (req, res, next) => {
    req.session.token = null;                                                 //removing the token in the session store
    req.session.user_id = null;                                               //removing the userID from the session store
    res.status(200).json({ status: 200, message: 'Logged Out' })
}