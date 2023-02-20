// utils
const AppError = require('../utils/AppError');
const tryCatch = require('../utils/tryCatch');

// models
const Comment = require('../models/commentsModels')


exports.createComment = tryCatch(async (req, res, next) => {

  const comment = {
    ...req.body,
    idUser: req.user._id,
  }

  const commentNew = await Comment.create(comment);

  if (!commentNew) {
    return next(new AppError('Error al crear comentario', 400))
  }

  commentNew.save();
  
  return res.status(201).json({
    status: 'success',
    data: {
      comment: commentNew
    },
    message: 'Comentario creado correctamente'
  }).end();

})
