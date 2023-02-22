// utils
const AppError = require('../utils/AppError');
const tryCatch = require('../utils/tryCatch');

// models
const Products = require('../models/productsModels');


exports.createProduct = tryCatch(async (req, res, next) => {

  const product = new Products(req.body);
  
  await product.save();

  return res.status(201).json({
    status: 'success',
    data: {
      product
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


