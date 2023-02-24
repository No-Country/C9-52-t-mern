const multer = require('multer');

const AppError = require('../utils/AppError');

const storage = multer.memoryStorage();

const filterFiles = (req, file, cb) => {
  console.log('file ', file.mimetype)
  if (!file.mimetype.startsWith('image')) { 
    cb(new AppError('No es una imagen', 400), false)
  }
  cb(null, true)
}

exports.upload = multer({ storage: storage, fileFilter: filterFiles });