const express = require('express')
const router = express.Router({ mergeParams: true })
const userController = require('../controllers/userController')
const isloggedIn = require('../middlewares/isLoggedIn')
router.route('/sign-up')
    .post(userController.signUp)
router.route('/login')
    .post(userController.login)

router.route('/logout')
    .post(isloggedIn, userController.logout)

module.exports = router;