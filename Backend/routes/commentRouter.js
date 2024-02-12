const express = require('express')
const router = express.Router({ mergeParams: true })
const isLoggedIn = require('../middlewares/isLoggedIn')
const validateAuthor = require('../middlewares/validateAuthor')
const commentController = require('../controllers/commentController')
router.route('/:id/new')
    .post(isLoggedIn, commentController.newComment)
router.route('/:id/all')
    .get(commentController.getComments)
router.route('/:c_id')
    .delete(isLoggedIn, validateAuthor, commentController.deleteComment)

module.exports = router