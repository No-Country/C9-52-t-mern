const AppError = require('../utils/AppError');
const tryCatch = require('../utils/tryCatch');

// models
const Comment = require('../models/commentsModels');

exports.protectComment = tryCatch(async (req, res, next) => {
  const { currentUser } = req
  const { id } = req.params

  const commentFind = Comment.findOne({ _id: id, idUser: currentUser._id, status: 'active' })

  if (!commentFind) {
    return next(new AppError('You are not authorized to perform this action', 401))
  }

  return next();
});