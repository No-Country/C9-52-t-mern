const { body } = require('express-validator');

// models (schemas)
const User = require('../models/usersModels');
const AppError = require('../utils/AppError');


exports.userRegisterBody = [
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .isString()
    .withMessage('name must be a string'),
  body('lastName')
    .notEmpty()
    .withMessage('lastName is required')
    .isString()
    .withMessage('lastName must be a string'),
  body('nameUser')
    .notEmpty()
    .withMessage('nameUser is required')
    .isString()
    .withMessage('nameUser must be a string'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isString()
    .withMessage('email must be a string')
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail()
    .custom(async (email) => { 
      const user = await User.findOneByEmail({ email });
      if (user) {
        throw new AppError('email already in use', 400);
      }
      return true; 
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required'),
  body('passwordConfirm').custom((value, { req }) => { 
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  body('photo')
    .notEmpty()
    .withMessage('photo is required')
    .isString()
    .withMessage('photo must be a string'),
  body('role')
    .notEmpty()
    .withMessage('role is required')
    .isString()
    .withMessage('role must be a string'),
];

exports.userLoginBody = [
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail()
    .custom(async (email) => {
      const user = await User.findOneByEmail({ email });
      if (!user) {
        throw new AppError('invalid credentials', 400);
      }
      return true;
    })
]
