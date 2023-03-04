const addressRouter = require('express').Router()

// controllers
const {
  addAdrres
} = require('../controllers/addres.controller')

// middlewares
const {
  checkAuth,
} = require('../middlewares/auth')

// add new Address
addressRouter.post('/add', checkAuth, addAdrres)

module.exports = { addressRouter }
