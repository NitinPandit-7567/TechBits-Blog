const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Author is required']
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        required: [true, 'Post is required']
    },
    comment: {
        type: String,
        required: [true, 'Comment cannot be blank'],
    }
}, { timestamps: true })

module.exports = mongoose.model('Comments', commentSchema)