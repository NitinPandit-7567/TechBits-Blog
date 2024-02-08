const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')

const cors = require('cors')
const dotenv = require('dotenv')
const userRouter = require('./routes/userRouter')
dotenv.config()
const app = express();
const secret = process.env.TOKEN_SECRET

mongoose.connect('mongodb://127.0.0.1:27017/Blog').then(() => { console.log('Connected to DB...') }).catch((e) => { console.log("Error: ", e) })

app.use(express.json());
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}))

app.use('/', userRouter)

app.use((err, req, res, next) => {
    const { status = 505, message = 'Internal server error' } = err;
    res.json({ status, message })
})
app.listen(3000, () => { console.log('Listening on port 3000...'); })