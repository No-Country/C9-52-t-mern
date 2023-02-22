const express = require('express');
const router = express.Router();

// middelwares
const {
  producRegisterBody
} = require('../middlewares/productBody.middleware')
const {
  validate
} = require('../middlewares/body.middleware')
const {
  checkAuth,
  checkSeller 
} = require('../middlewares/auth');

const {
  actualizarProducto,
  createProduct,
  deleteProduct
} = require('../controllers/productsControllers');



router.post('/register', validate(producRegisterBody), checkAuth, checkSeller, createProduct);
router.put('/update/:id', actualizarProducto);
router.delete('/delete/:id', deleteProduct);



module.exports = { productRouter: router };