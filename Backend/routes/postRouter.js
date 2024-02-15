const express = require('express');
const router = express.Router({ mergeParams: true });
const isLoggedIn = require('../middlewares/isLoggedIn')
const postController = require('../controllers/postController');
const validateAuthor = require('../middlewares/validateAuthor');
const multer = require('multer');
const AppError = require('../utils/AppError');
function fileFilter(req, file, cb) {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }

}
const upload = multer({ dest: '../TechBits/public/uploads/', fileFilter })


router.route('/all')
    .get(postController.allPosts)
router.route('/new')
    .post(isLoggedIn, upload.single('image'), postController.newPost)
router.route('/myposts')
    .get(isLoggedIn, postController.myPosts)
router.route('/:id')
    .get(postController.getPost)
    .patch(isLoggedIn, upload.single('image'), validateAuthor, postController.editPost)
    .delete(isLoggedIn, validateAuthor, postController.deletePost)
router.route('*')
    .get((req, res, next) => {
        return next(new AppError(404, 'Not Found'))
    })

module.exports = router;