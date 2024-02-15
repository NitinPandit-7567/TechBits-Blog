const Users = require('../model/users');
const Posts = require('../model/posts');
const wrapAsync = require('../utils/wrapAsync');
const AppError = require('../utils/AppError')
const Comments = require('../model/comments')
const Likes = require('../model/likes')
const fs = require('fs')
const path = require('path')
const defaultImage = '../../blog-cover-picture.png';
// const unlinkAsync = promisify(fs.unlink)

//setup storage for multer
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, '../TechBits/public/uploads/')
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname)
//     }
// })

// const upload = multer({ storage: storage })

const unlinkImage = function (image) {
    if (image !== defaultImage && image !== undefined) {
        const image_path = (image).split('/')
        const filename = image_path[image_path.length - 1]
        const file_path = path.join(__dirname, '../../TechBits/public/uploads/' + filename);
        try { fs.unlinkSync(file_path) } catch (err) {
            if (err) {
                console.error(`Error while unlinking image ${filename}:`, err);
            } else {
                console.log(`Image ${filename} unlinked successfully.`);
            }
        };
    }
}



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
        return res.status(200).json({ pages, page, size: resultsPerPage, posts });
    } else {
        return next(new AppError(404, 'Not Found'))
    }
})

module.exports.myPosts = wrapAsync(async (req, res, next) => {
    const page = req.query.page || 1;
    const resultsPerPage = req.query.size || 5;
    const total = await Posts.countDocuments();
    const pages = Math.ceil(total / resultsPerPage);
    let posts = await Posts.find({ author: { _id: req.session.user_id } }, { content: 0 }).sort({ createdAt: 'descending' })
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
        return res.status(200).json({ pages, page, size: resultsPerPage, posts });
    } else {
        return next(new AppError(404, 'Not Found'))
    }
})

module.exports.newPost = wrapAsync(async (req, res, next) => {
    let image = defaultImage;
    if (req.file) {
        image = '../../uploads/' + req.file.filename;
    }
    let { title, summary, content, tags, status } = req.body;
    if (!tags.length > 0) {
        tags = []
    }
    else {
        tags = JSON.parse(tags)
    }
    const author = await Users.findById(req.session.user_id)
    const new_post = new Posts({ author, title, summary, content, tags, status, image });
    await new_post.save()
    return res.status(201).json({ id: new_post._id })
})

module.exports.getPost = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const post = await Posts.findById(id).populate({ path: 'author', select: { '_id': 1, 'username': 1, 'email': 1, 'name': 1 } });
    if (post) {
        res.status(200).json({ post: post })
    } else {
        return next(new AppError(404, 'Not Found'))
    }
})


module.exports.editPost = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    if (req.body) {
        let { title, summary, content, tags, status, image, deleteImage } = req.body;
        deleteImage = JSON.parse(deleteImage)
        if (req.file) {
            if (deleteImage.toDelete) {
                unlinkImage(deleteImage.image)
            }
            image = image = '../../uploads/' + req.file.filename;
        }
        if (!tags.length > 0) {
            tags = []
        } else if (!Array.isArray(tags)) {
            tags = JSON.parse(tags)
        }
        const post = await Posts.findByIdAndUpdate(id, { title, summary, content, tags, status, image }, { runValidators: true, new: true });
        res.status(200).json({ status: 200, message: 'Post Updated' })
    }
    else {
        res.status(204).json({ status: 200, message: 'No Changes' })
    }
})

module.exports.deletePost = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const post = await Posts.findByIdAndDelete(id)
    if (post) {
        unlinkImage(post.image)
    }
    res.status(200).json({ message: 'success' })
})
