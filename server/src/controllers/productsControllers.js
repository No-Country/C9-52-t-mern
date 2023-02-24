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

    const product = new Products({
        ...req.body,
        idSeller: req.currentUser.id,
        photos: images_urls,
    });
    
    await product.save();

    return res.status(201).json({
        status: 'success',
        data: {
            // product,
            images_urls
        },
        message: 'Producto creado correctamente'
    })
})

exports.obtenerProductos = async (req, res, next) => {

    try {
        const Products = await Products.find();
        res.json(Products)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarProducto = async (req, res, next) => {
    
    try {
        const { title, model, brand, price, description } = req.body;
        let Products = await Products.findById(req.params.id);
        if (!Products) {
            res.status(404).json({ msg: 'No existe el producto '})
        }

        await product.updateOne({ $set: req.body });
        product.save();

        Products = await Products.findOneAndUpdate({ _id: req.params.id },product, {new: true} )
        res.json(Products);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');  
    }
}

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


