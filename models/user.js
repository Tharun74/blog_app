const { Schema, model } = require('mongoose');
const { randomBytes } = require('crypto');
const { createHmac } = require('crypto');
const { genrateUserToken } = require('../services/auth');

const userSchema = Schema({
    fullname: {
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

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const salt = randomBytes(16).toString('hex');
    const updatedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');
    
    user.password = updatedPassword;
    user.salt = salt;
    next();
});

userSchema.static('matchPassword',async function(email,password){
  const user =  await this.findOne({email});
  if(!user){
    throw new Error('User not found');
  }
  const salt = user.salt;
  const HashedPassword = user.password;
  const userHashedPassword = createHmac('sha256',salt)
  .update(password)
  .digest('hex');
  
  if(HashedPassword !== userHashedPassword){
    throw new Error('Incorrect Password');
  }

  const token = genrateUserToken(user);
  return token;
})

const User = model('user',userSchema);

module.exports = User;