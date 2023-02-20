const {verifyToken} = require ('../utils/generateToken')
const AppError = require('../utils/AppError')

exports.checkAuth = async(req,res,next) => {
  try {
    //const token = req.headers.authorization.split(' ').pop()
    let token = null
    if (
        req.headers.authorization 
        && req.headers.authorization.startsWith('Bearer')
      ) { 
      token = req.headers.authorization.split(' ')[1]
    } else {
      return next(new AppError('No autorizado', 401))
    }

    const tokenData = await verifyToken(token)

    if (!tokenData) {
      return next(new AppError('No autorizado', 401))
    }
    
    req.currentUser = {
      id: tokenData.id,
      email: tokenData.email,
    }
    next()
    
  } catch (error) {

    console.log(error)
    return next(new AppError('No autorizado', 401))
  }
}