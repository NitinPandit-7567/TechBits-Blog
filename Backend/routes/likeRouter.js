const express = require('express');
const router = express.Router({ mergeParams: true });
const isLoggedIn = require('../middlewares/isLoggedIn');
const likeController = require('../controllers/likeController');
const validateAuthor = require('../middlewares/validateAuthor');

router.route('/:id/new')
    .post(isLoggedIn, likeController.newLike)
router.route('/:l_id')
    .patch(isLoggedIn, validateAuthor, likeController.updateLike)
    .delete(isLoggedIn, validateAuthor, likeController.deleteLike)
router.route('/:id/')
    .get(likeController.getLikes)
router.route('*')
    .get((req, res, next) => {
        return next(new AppError(404, 'Not Found'))
    })
module.exports = router;