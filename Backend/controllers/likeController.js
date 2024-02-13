const Likes = require('../model/likes')
const wrapAsync = require('../utils/wrapAsync');
const AppError = require('../utils/AppError')
const Users = require('../model/users');
const Posts = require('../model/posts');

module.exports.newLike = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await Users.findById(req.session.user_id);
    const post = await Posts.findById(id);
    if (user !== null && post !== null) {
        const like = new Likes({ like: req.body.like, author: user._id, post: post._id })
        await like.save();
        return res.json({ status: 200, message: 'Like Created' })
    }
    else {
        return next(new AppError(404, 'Not Found'))
    }

})

module.exports.updateLike = wrapAsync(async (req, res, next) => {
    const { l_id } = req.params;
    if ((req.body.like).toString()) {
        const like = await Likes.findByIdAndUpdate(l_id, { like: req.body.like }, { runValidators: true, new: true });
        res.json({ status: 200, message: 'Like Updated' })
    }
    else {
        res.json({ status: 200, message: 'No Changes' })
    }
})

module.exports.getLikes = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const likes = await Likes.find({ post: { _id: id }, like: true })
    const dislikes = await Likes.find({ post: { _id: id }, like: false })
    const likeCount = likes.length;
    const dislikeCount = dislikes.length;
    const result = { likeCount, dislikeCount }
    if (likeCount > 0 || dislikeCount > 0) {
        if (likeCount > 0) {
            likes.map((el) => {
                if (el.author._id.toString() === req.session.user_id) {
                    result.isLiked = el.like;
                    result._id = el._id
                }
            })
            return res.json({ ...result })
        }
        if (dislikeCount > 0) {
            dislikes.map((el) => {
                if (el.author._id.toString() === req.session.user_id) {
                    result.isLiked = el.like;
                    result._id = el._id
                }
            })
            return res.json({ ...result })
        }
    }
    else {
        return res.json({ status: 200, message: 'There are no Likes yet' })
    }

})

module.exports.deleteLike = wrapAsync(async (req, res, next) => {
    const { l_id } = req.params;
    await Likes.findByIdAndDelete(l_id)
    return res.json({ status: 200, message: 'Like Deleted' })
})