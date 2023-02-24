// utils
const AppError = require('../utils/AppError');
const tryCatch = require('../utils/tryCatch');
const { cloudinary } = require('../utils/cloudinary'); 

// models
const Products = require('../models/productsModels');


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

exports.obtenerProductos = tryCatch(async (req, res, next) => {
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

exports.actualizarProducto = tryCatch(async (req, res, next) => {
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

exports.obtenerProducto = async (req, res, next) => {
    
    try {
        let Products = await Products.findById(req.params.id);
        if (!Products) {
            res.status(404).json({ msg: 'No existe el producto '})
        }
        return res.json(product);

    } catch (error) {
        res.status(500).json({ msg: 'Hubo un error' });;  
    }
}

exports.deleteProduct = async (req, res, next) => {
    
    try {
        let Products = await Products.findById(req.params.id);
        if (!Products) {
            res.status(404).json({ msg: 'No existe el producto '})
        }
        await Products.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado con exito'});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error' });;  
    }
}


