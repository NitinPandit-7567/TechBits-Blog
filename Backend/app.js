const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
const dotenv = require('dotenv')
const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
const commentRouter = require('./routes/commentRouter')
const likeRouter = require('./routes/likeRouter')
const AppError = requrire('./utils/AppError')
const app = express();
const secret = process.env.TOKEN_SECRET

dotenv.config()
mongoose.connect('mongodb://127.0.0.1:27017/Blog').then(() => { console.log('Connected to DB...') }).catch((e) => { console.log("Error: ", e) })

app.use(express.json());
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 5 * 60 * 60 * 1000 }
}))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/likes', likeRouter)
app.use('/comments', commentRouter)
app.use('/posts', postRouter)
app.use('/user', userRouter)
app.get('*', (req, res, next) => {
    return next(404, 'Page not found!')
})
app.use((err, req, res, next) => {
    const { status = 500, message = 'Internal server error' } = err;
    res.status(status).json({ error: { status, message } })
})
app.listen(3000, () => { console.log('Listening on port 3000...'); })