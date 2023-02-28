const { body } = require('express-validator'); 

exports.producRegisterBody = [
  body('title')
    .notEmpty()
    .withMessage('El titulo es requerido')
    .isString()
    .withMessage('El titulo debe ser un string'),
  body('model')
    .notEmpty()
    .withMessage('El modelo es requerido')
    .isString()
    .withMessage('El modelo debe ser un string'),
  body('brand')
    .notEmpty()
    .withMessage('La marca es requerida')
    .isString()
    .withMessage('La marca debe ser un string'),
  body('price')
    .notEmpty()
    .withMessage('El precio es requerido')
    .isNumeric()
    .withMessage('El precio debe ser un numero'),
  body('description')
    .notEmpty() 
    .withMessage('La descripcion es requerida')
    .isString()
    .withMessage('La descripcion debe ser un string'),
  body('characteristics')
    .notEmpty()
    .withMessage('Las caracteristicas son requeridas')
    .isString()
    .withMessage('Las caracteristicas deben ser un String'),
  body('promotion')
    .isBoolean()
    .withMessage('La promocion debe ser un booleano'),
  body('featured')
    .isNumeric()
    .withMessage('Los destacados deben ser un numero')
    .custom((value) => {
      if (value < 0 || value > 100) {
        throw new Error('Los destacados deben ser un numero entre 0 y 100')
      }
      return true;
    }),
  body('blackFriday')
    .isBoolean()
    .withMessage('El blackFriday debe ser un booleano'),
  body('discount')
    .isNumeric()
    .withMessage('El descuento debe ser un numero')
]
