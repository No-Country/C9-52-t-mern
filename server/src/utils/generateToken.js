const jwt = require('jsonwebtoken')

exports.tokenSign=async(user)=>{
  return jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn:process.env.JWT_EXPIRE_IN
    }
  )
}

exports.verifyToken=async(token)=>{
  try {
    return jwt.verify(token,process.env.JWT_SECRET)
  } catch (error) {
    return null    
  }
}