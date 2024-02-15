const mongoose = require('mongoose')
const Comments = require('./comments.js')
const postSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Author is required']
    },
    title: {
        type: String,
        default: 'New Untitled Post',
        required: [true, 'Title is required']
    },
    summary: {
        type: String,
        required: [true, 'Summary is required'],
        default: 'New Post'
    },
    content: String,
    image: String,
    tags: {
        type: Array,
        default: 'other'
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    }
}, { timestamps: true })

postSchema.post('findOneAndDelete', async (deletePost) => {
    if (deletePost) {
        await Comments.deleteMany({ post: { _id: deletePost._id } })
    }
})

module.exports = mongoose.model('Posts', postSchema)