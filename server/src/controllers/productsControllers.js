// utils
const AppError = require('../utils/AppError');
const tryCatch = require('../utils/tryCatch');
const { cloudinary } = require('../utils/cloudinary'); 

// models
const Products = require('../models/productsModels');

// 
const qs = require('qs')

exports.createProduct = tryCatch(async (req, res, next) => {

    const files = req.files;

    const urls = []

    for (const file of files) {

        const uploadPromise = new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'Ecommerce' },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end(file.buffer);

        });
      
        urls.push(uploadPromise);

    }
    const images = await Promise.all(urls);
    const images_urls = images.map(image => image.secure_url);

    // convertir el campor characteristics a un array
    const characteristics = req.body.characteristics.split(',')
    const product = new Products({
        ...req.body,
        characteristics,
        idSeller: req.currentUser.id,
        photos: images_urls,
    });
    
    await product.save();

    return res.status(201).json({
        status: 'success',
        data: {
            product,
        },
        message: 'Producto creado correctamente'
    })
})

exports.getProducts = tryCatch(async (req, res, next) => {
    const products = await Products.find();

    if (!products) {
        return next(new AppError('No hay productos', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            products,
        }
    });
})

exports.updateProduct = tryCatch(async (req, res, next) => {
    const { id } = req.params;

    if (req.body.characteristics) {
      const characteristics = req.body.characteristics.split(',')
      req.body.characteristics = characteristics;
    }

    const product = await Products.findByIdAndUpdate(id, req.body);

    if (!product) {
        return next(new AppError('No existe el producto', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            product,
        }
    })
})

exports.getProduct = tryCatch(async (req, res, next) => {
    const { id } = req.params;

    const product = await Products.findById(id);

    if (!product) {
        return next(new AppError('No existe el producto', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            product,
        }
    })
})

exports.deleteProduct = tryCatch(async (req, res, next) => {
  const { id } = req.params;

  const product = await Products.findById(id);

  if (!product) {
    return next(new AppError('No existe el producto', 404));
  }

  product.updateOne({ status: 'deleted' })
  
})

exports.filterProducts = tryCatch(async (req, res, next) => {
    const querys = {}
    // const query = req.query
    const filter = qs.parse(req.query)

    if (filter.category) {
        querys.category = filter.category;
    }
    if (filter.brand) {
        querys.brand = filter.brand;
    }
    if (filter.priceMin) {
        querys.price = {$gte: +filter.priceMin}
    }
    if (filter.priceMax) {
        querys.price = {...querys.price, $lte: +filter.priceMax}
    }
    if (filter.promotion) {
        querys.promotion = true
    }
    if (filter.blackFriday) {
        querys.blackFriday = true
    }
    if (filter.featured) {
        querys.featured = filter.featured
    }

    const products = await Products.find(querys)

    let message = "Productos filtrados exitosamente"
    
    if (!products.length) {
        message = "No hay productos con los filtros pasados"
    }

    return res.status(200).json({
        status: 'succes',
        filter: querys,
        amount: products.length,
        data: {
            products,
        },
        message,
    })
})
