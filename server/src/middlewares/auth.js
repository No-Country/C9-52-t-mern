const verifyToken=require('../utils/generateToken')
const AppError = require('../utils/AppError')

export const checkAuth=async(req,res,next)=>{
  try {
    //const token = req.headers.authorization.split(' ').pop()
    const token = req.headers['x-access-token']
    const tokenData = await verifyToken(token)
    if(tokenData.email){
      req.currentUser = {
        id: tokenData.id,
        email: tokenData.email,
      }
      next()
    }else{
      return next(new AppError('No autorizado', 401))
    }
  } catch (error) {
    console.log(error)
    return next(new AppError('No autorizado', 401))
  }
}