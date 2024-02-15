const Comments = require('../model/comments')
const wrapAsync = require('../utils/wrapAsync');
const AppError = require('../utils/AppError')
const Users = require('../model/users');
const Posts = require('../model/posts');
module.exports.newComment = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await Users.findById(req.session.user_id);
    const post = await Posts.findById(id);
    if (user !== null && post !== null && post.status !== 'draft') {
        const comment = new Comments({ ...req.body, author: user._id, post: post._id })
        await comment.save();
        return res.status(201).json({ status: 201, message: 'Comment Created' })
    }
    else {
        return next(new AppError(404, 'Not Found'))
    }

})

module.exports.getComments = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const comments = await Comments.find({ post: { _id: id } }).populate({ path: 'author', select: { '_id': 1, 'username': 1, 'email': 1, 'name': 1 } })
    if (comments) {
        return res.status(200).json({ status: 200, comments })
    } else {
        return res.status(204).json({ status: 204, message: 'There are no comments yet.' })
    }
})

module.exports.deleteComment = wrapAsync(async (req, res, next) => {
    const { c_id } = req.params;
    await Comments.findByIdAndDelete(c_id)
    return res.status(200).json({ status: 200, message: 'Comment Deleted' })
})