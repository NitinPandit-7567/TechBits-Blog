const express = require('express');
const router = express.Router({ mergeParams: true });
const isLoggedIn = require('../middlewares/isLoggedIn')
const postController = require('../controllers/postController');
const validateAuthor = require('../middlewares/validateAuthor');
router.route('/all')
    .get(postController.allPosts)
router.route('/new')
    .post(isLoggedIn, postController.newPost)
router.route('/:id')
    .get(postController.getPost)
    .patch(isLoggedIn, validateAuthor, postController.editPost)
    .delete(isLoggedIn, validateAuthor, postController.deletePost)

module.exports = router;