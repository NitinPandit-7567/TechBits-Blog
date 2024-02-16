// const Comments = require('../model/comments.js')
const Posts = require('../model/posts.js')
const Comments = require('../model/comments.js')
const Likes = require('../model/likes.js')
const AppError = require('../utils/AppError.js')
module.exports = async function (req, res, next) {
    if (req.session.user_id) {
        const { id } = req.params;
        const url = req.originalUrl.split('/');
        if (req.session.user_id) {
            if (url[url.length - 2] === 'comments') {
                const { c_id } = req.params;
                const comment = await Comments.findById(c_id).catch((err) => { return next(err) })
                if (comment) {
                    if (req.session.user_id === comment.author._id.toString()) {
                        return next()
                    }
                    else {
                        return next(new AppError(403, 'Not Authorized'))
                    }
                }
                else {
                    console.log('here')
                    return next(new AppError(404, 'Not Found'))
                }
            }
            else if (url[url.length - 2] === 'likes') {
                const { l_id } = req.params;
                const like = await Likes.findById(l_id).catch((err) => { return next(err) })
                if (like) {
                    if (req.session.user_id === like.author._id.toString()) {
                        return next()
                    }
                    else {
                        return next(new AppError(403, 'Not Authorized'))
                    }
                }
                else {
                    console.log('here')
                    return next(new AppError(404, 'Not Found'))
                }
            }
            else {
                const post = await Posts.findById(id).catch((err) => { return next(err) });
                if (post) {
                    if (req.session.user_id === post.author._id.toString()) {
                        return next()
                    }
                    else {
                        return next(new AppError(403, 'Not Authorized'))
                    }
                }
                else {
                    return next(new AppError(404, 'Not Found'))
                }
            }
        }
        else {
            return next(new AppError(401, 'Not Authenticated'))
        }
    }
}