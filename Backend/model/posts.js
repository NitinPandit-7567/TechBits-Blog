const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    title: {
        type: String,
        default: 'New Untitled Post',
        required: true
    },
    summary: {
        type: String,
        required: true,
        default: 'New Post'
    },
    content: String,
    image: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ],
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

module.exports = mongoose.model('Posts', postSchema)