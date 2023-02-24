const AppError = require('../utils/AppError');
const tryCatch = require('../utils/tryCatch');
const { tokenSign } = require('../utils/generateToken');

const bcrypt = require('bcrypt');

const User = require('../models/usersModels');

exports.loginUser = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const userFind = await User.findOne({ email });

  if (!userFind) {
    return next(new AppError('User not found', 404));
  }

  // desecriptar passord
  const isMatch = await bcrypt.compare(password, userFind.password);

  if (!isMatch) {
    return next(new AppError('invalid credentials', 400));
  }

  // Sign Token
  const token = await tokenSign(userFind);

  userFind.password = undefined;

  return res.status(200).json({
    code: 200,
    status: 'success',
    data: {
      user: userFind,
      token,
    }
  }).send();

});

exports.registerUser = tryCatch(async (req, res, next) => {
  console.log('crear user >_ ', req.body)
  const {
    name,
    lastName,
    password,
    nameUser,
    photo,
    email,
    status
  } = req.body;

  // encontrar en la base de datos si existe el email
  const userFind = await User.findOne({ email });

  if (userFind) {
    return next(new AppError('este usuario ya esta registrado', 404));
  }

  // encriptar contraseña
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const userNew = {
    name,
    lastName,
    nameUser,
    email,
    password: passwordHash,
    photo
  }

  // resgistrando el usuario en el modelo User
  const user = await User.create(userNew);

  if (!user) {
    return next(new AppError('Error al crear el usuario', 404));
  }

  user.save()

  return res.status(200).json({
    code: 200,
    status: 'success',
    data: {
      user,
    }
  });

});

exports.updateUser = tryCatch(async (req, res, next) => { 
  const { user } = req.currentUser;

  await user.updateOne(req.body);

  if (!user) {
    return next(new AppError('Error al actualizar el usuario', 404));
  }
  
  user.save()

  return res.status(200).json({
    status: 'success',
    data: {
      user,
    }
  })

});
