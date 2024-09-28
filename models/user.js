const { Schema, model } = require('mongoose');
const { randomBytes } = require('crypto');
const { createHmac } = require('crypto');
const UserSchema = Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    profilePicUrl: {
        type: String,
        default: './images/defaultProfile.png'
    }
});

Schema.pre('save', function (next) {
    const user = this;
    if (!user.isModified) return next();

    const salt = randomBytes(16).toString;
    const updatedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');
    
    this.password = updatedPassword;
    this.salt = salt;
    next();
});

const User = model('user',UserSchema);