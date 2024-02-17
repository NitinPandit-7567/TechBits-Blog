const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
const dotenv = require('dotenv')
const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
const commentRouter = require('./routes/commentRouter')
const likeRouter = require('./routes/likeRouter')

const app = express();
dotenv.config()
const dbURL = process.env.DB_URL
const clntURL = process.env.CLNT_URL
const secret = process.env.TOKEN_SECRET

mongoose.connect(dbURL).then(() => { console.log('Connected to DB...') }).catch((e) => { console.log("Error: ", e) })

app.use(express.json());
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 5 * 60 * 60 * 1000 }       //setting session cookie age to 5 hours
}))
app.use(cors({
    origin: clntURL,
    credentials: true
}))

//Mounting router middlewares
app.use('/likes', likeRouter)
app.use('/comments', commentRouter)
app.use('/posts', postRouter)
app.use('/user', userRouter)
app.get('*', (req, res, next) => {
    return next(404, 'Not found!')
})

//Error handling middleware
app.use((err, req, res, next) => {
    let { status = 500, message = 'Internal server error' } = err;
    if (err.name === 'ValidationError') {                                     //Handling mongoose validation errors
        status = 400;
        const messages = Object.values(err.errors).map(val => val.message)
        message = messages[0]
        if (messages.length > 2) {
            message = 'Invalid/Incomplete Data';
        }
    }
    else if (err.name === 'CastError') {                                    //Handling mongoose cast errors
        message = 'Not Found';
        status = 404
    }
    else if (err.code === 11000) {                                         //Handling mongoose duplicate key errors
        message = 'Duplicate Key Error';
        status = 400;
    }
    res.status(status).json({ error: { status, message } })
})
app.listen(3000, () => { console.log('Listening on port 3000...'); })