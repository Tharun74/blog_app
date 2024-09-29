const jwt = require('jsonwebtoken')

const secret = '$uperM4n'

function genrateUserToken(user){
 const payload = {
    _id : user._id,
    email : user.email,
    profilePicUrl : user.profilePicUrl,
    role : user.role
 }

 const token = jwt.sign(payload,secret);
 return token;    
}

function validateUserToken(token){
  const payload = jwt.verify(token,secret);
  return payload;
}

module.exports = {
   genrateUserToken,
   validateUserToken,
}