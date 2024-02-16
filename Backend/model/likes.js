const mongoose = require("mongoose")
const likeSchema = mongoose.Schema({
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
    like: {
        type: Boolean,
        required: [true, 'Like is required'],
    }
}, { timestamps: true })

likeSchema.index({ author: 1, post: 1 }, { unique: true })
module.exports = mongoose.model('Likes', likeSchema)