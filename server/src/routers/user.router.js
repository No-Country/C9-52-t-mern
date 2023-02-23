const express = require('express');

const {
  loginUser,
  registerUser,
  updateUser
} = require('../controllers/user.controller')

// ----- middlewares ----- //
const { validate } = require('../middlewares/body.middleware');
const { 
  userRegisterBody,
  userLoginBody
} = require('../middlewares/userBody.middleware');
const {
  checkAuth,
  proctectUser
} = require('../middlewares/auth')

const router = express.Router();

router.post('/login', validate(userLoginBody), loginUser);
router.post('/register', validate(userRegisterBody), registerUser);
router.put('/update/:id', checkAuth, proctectUser, updateUser)

module.exports = { userRouter: router }; 