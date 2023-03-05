
const AppError = require('../utils/AppError')
const tryCatch = require('../utils/tryCatch')

const modelAddres = require('../models/addressModels')

exports.addAdrres = tryCatch( async(req, res, next) => {
  console.log('currentUser -> ', req)
  const idUser = req.currentUser.id
  const { title } = req.body

  const existAddress = await modelAddres.findOne({idUser, title})
  // console.log('addrees -> ', existAddress)
  if (existAddress !== null) {
    return next( new AppError('Este nombre ya lo tiene registrado en sus direcciones', 404))
  }

  const newAddress = new modelAddres({
    ...req.body,
    idUser
  })

  newAddress.save()

  return res.status(202).json({
    status: 'success',
    data: {
      user: req.User,
      address: newAddress,
    },
    message: 'usuario creado exitosamente '
  })

})