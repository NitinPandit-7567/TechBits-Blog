const Users = require('../model/users');
const Posts = require('../model/posts');
const wrapAsync = require('../utils/wrapAsync');
const AppError = require('../utils/AppError')
const Comments = require('../model/comments')
const Likes = require('../model/likes')
module.exports.allPosts = wrapAsync(async (req, res, next) => {
    const page = req.query.page || 1;
    const resultsPerPage = req.query.size || 5;
    const total = await Posts.countDocuments();
    const pages = Math.ceil(total / resultsPerPage);
    let posts = await Posts.find({ status: 'published' }, { content: 0, updatedAt: 0, status: 0 }).sort({ createdAt: 'descending' })
        .lean()
        .limit(resultsPerPage)
        .skip((page - 1) * resultsPerPage).populate({ path: 'author', select: { '_id': 1, 'username': 1 } });
    if (posts && posts.length > 0) {
        for (let i of posts) {
            const comments = await Comments.find({ post: { _id: i._id } });
            const likes = await Likes.find({ post: { _id: i._id } });
            i.likeCount = 0;
            i.dislikeCount = 0;
            if (likes.length > 0) {
                for (let j of likes) {
                    if (j.like) {
                        i.likeCount += 1;
                    } else {
                        i.dislikeCount += 1;
                    }
                }
            }
            i.commentsCount = comments.length
        }
        return res.json({ pages, page, size: resultsPerPage, posts });
    } else {
        return next(new AppError(404, 'Not Found'))
    }
})

module.exports.myPosts = wrapAsync(async (req, res, next) => {
    const page = req.query.page || 1;
    const resultsPerPage = req.query.size || 5;
    const total = await Posts.countDocuments();
    const pages = Math.ceil(total / resultsPerPage);
    const posts = await Posts.find({ author: { _id: req.session.user_id } }, { content: 0, updatedAt: 0 }).sort({ createdAt: 'descending' })
        .lean()
        .limit(resultsPerPage)
        .skip((page - 1) * resultsPerPage)
        .populate({ path: 'author', select: { '_id': 1, 'username': 1, 'email': 1, 'name': 1 } });
    if (posts) {
        return res.json(posts);
    } else {
        return next(new AppError(404, 'Not Found'))
    }
})

module.exports.newPost = wrapAsync(async (req, res, next) => {
    const { title, summary, content, tags, status, image } = req.body;
    const author = await Users.findById(req.session.user_id)
    const new_post = new Posts({ author, title, summary, content, tags, status, image });
    await new_post.save()
    return res.json({ id: new_post._id })
})

module.exports.getPost = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const post = await Posts.findById(id).populate({ path: 'author', select: { '_id': 1, 'username': 1, 'email': 1, 'name': 1 } });
    if (post) {
        res.json({ post: post })
    } else {
        return next(new AppError(404, 'Not Found'))
    }
})


module.exports.editPost = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.post) {
        const post = await Posts.findByIdAndUpdate(id, { ...req.body.post }, { runValidators: true, new: true });
        res.json({ status: 200, message: 'Post Updated' })
    }
    else {
        res.json({ status: 200, message: 'No Changes' })
    }
})

module.exports.deletePost = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Posts.findByIdAndDelete(id)
    res.json({ status: 'success' })
})
