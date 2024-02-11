const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
    },
    comment: {
        type: String,
        required: true,
        default: 'New Comment'
    }
}, { timestamps: true })

module.exports = mongoose.model('Comments', commentSchema)