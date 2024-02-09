// const Comments = require('../model/comments.js')
const Posts = require('../model/posts.js')
const AppError = require('../utils/AppError.js')
module.exports = async function (req, res, next) {
    if (req.session.user_id) {
        const { id } = req.params;
        const url = req.url.split();
        if (req.session.user_id) {
            if (url[url.length - 1] === 'comments') {
                // const { c_id } = req.params;

                // const comment = await Comments.findById(c_id)
                // if (comment.author._id === req.session.user_id) {
                //     return next()
                // }

                // else {
                //     return next(new AppError(401, 'Not Authorized'))
                // }
            }
            else {
                const post = await Posts.findById(id);
                if (req.session.user_id === post.author._id.toString()) {
                    return next()
                }
                else {
                    return next(new AppError(401, 'Not Authorized'))
                }
            }
        }
        else {
            return next(new AppError(401, 'Not Authenticated'))
        }
    }
}