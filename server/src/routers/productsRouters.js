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
const { upload } = require('../middlewares/multer.middleware');

const {
  actualizarProducto,
  createProduct,
  deleteProduct
} = require('../controllers/productsControllers');



router.post('/register', checkAuth, checkSeller, upload.array('image', 12), createProduct);
router.put('/update/:id', actualizarProducto);
router.delete('/delete/:id', deleteProduct);



module.exports = { productRouter: router };