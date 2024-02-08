const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    }

})

userSchema.virtual('name.full').get(function () {
    return this.name.first + ' ' + this.name.last;
})

userSchema.statics.findAndValidate = async function (user, pwd) {
    const db_user = await this.findOne({ username: user })
    if (db_user) {
        const validation_result = await bcrypt.compare(pwd, db_user.password);
        return validation_result ? db_user : false
    } else {
        return false
    }
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    else {
        this.password = await bcrypt.hash(this.password, 12)
        return next()
    }
})

module.exports = mongoose.model('Users', userSchema)