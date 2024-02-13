const mongoose = require("mongoose")
const likeSchema = mongoose.Schema({
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
    like: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

likeSchema.index({ author: 1, post: 1 }, { unique: true })
module.exports = mongoose.model('Likes', likeSchema)