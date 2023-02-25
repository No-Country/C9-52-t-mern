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
  updateProduct,
  createProduct,
  deleteProduct,
  getProducts
} = require('../controllers/productsControllers');



router.post('/register', checkAuth, checkSeller, upload.array('image', 12), validate(producRegisterBody), createProduct);
router.put('/update/:id', updateProduct);
router.get('/', getProducts)
router.delete('/delete/:id', deleteProduct);



module.exports = { productRouter: router };