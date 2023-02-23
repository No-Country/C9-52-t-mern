const multer = require('multer');

const AppError = require('../utils/AppError');
// obtener un array de imagenes para almacenarlas en la API cloudinary

const storage = multer.memoryStorage();

const filterFiles = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) { 
    cb(new AppError('No es una imagen', 400), false)
  }
  cb(null, true)
}

exports.upload = multer({ storage: storage, fileFilter: filterFiles });