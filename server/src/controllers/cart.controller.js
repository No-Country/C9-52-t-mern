const AppError = require('../utils/AppError')
const tryCatch = require('../utils/tryCatch')

const Car = require('../models/carModels')
const CarProducts = require('../models/carProductsModels')
const Product = require('../models/productsModels')

exports.allProductsCar = tryCatch( async(req, res, next) => {

  const idUser = req.currentUser.id

  const findCar = await Car.findOne({idUser})

  if (findCar === null) {
    return res.status(202).json({
      status: 'pending',
      quantity: 0,
      priceTotal: 0,
      priceTotalDouble: "0",
      data: {
        listProduct: []
      },
      message: 'No hay productos en el carrito'
    })
  }

  const productsInCart = await CarProducts.find({idCar: findCar._id}).populate('idProduct')

  if (productsInCart.length <= 0) {

    return res.status(202).json({
      status: 'succes',
      quantity: products.length,
      priceTotal: findCar.priceTotal,
      priceTotalDouble: findCar.priceTotal.toLocaleString(),
      data: {
        products: []
      },
      message: 'No Hay productos en el carrito'
    })
  }

  const productsPromise = productsInCart.map( async(product) => {

    if (product.idProduct.stock < product.quantity 
      || product.idProduct.status === "deleted") {

      await CarProducts.updateOne({status: 'remove'})
      await product.save()

      return product
    }

    return product
  })

  const products = await Promise.all(productsPromise)

  return res.status(202).json({
    status: 'succes',
    quantity: products.length,
    priceTotal: findCar.priceTotal,
    priceTotalDouble: findCar.priceTotal.toLocaleString(),
    data: {
      products
    },
    message: 'Estos son los productos del carrito'
  })

})

exports.addProductsCart = tryCatch( async(req, res, next) => {
  const { id } = req.currentUser
  const { quantity, idProduct } = req.body

  const carFind = await Car.findOne({ idUser: id, status: 'active' })

  const product = await Product.findOne({
    _id: idProduct,
    status: 'active'
  })

  if (product === null) {
    return next( new AppError('Out of stock or non-existent product', 404))
  }

  if (quantity > product.stock) {
    return next( new AppError('The quantity exceeds the stock of the products', 401))
  }

  // precio tatal del producto * el quantity pasado
  const priceTotalProduct = product.price * quantity

  // Verificar si el usuario no tiene un carrito activo para crear uno nuevo
  if (carFind === null) {

    const newCar = new Car({
      idUser: id,
      priceTotal: priceTotalProduct,
      quantity
    })

    await newCar.save()

    const newCardPorduct = new CarProducts({
      idProduct: idProduct,
      idCar: newCar._id,
      quantity,
      priceProduct: product.price,
      priceTotal: priceTotalProduct
    })

    await newCardPorduct.save()

    const listProductCart = await CarProducts.find({idCar: newCar._id}).populate('idProduct')

    return res.status(202).json({
      status: 'succes',
      priceTotal: newCar.priceTotal,
      priceTotalDouble: newCar.priceTotal.toLocaleString(),
      aquantityProduct: listProductCart.length,
      data: {
        card: newCar,
        listProductCart
      },
      message: 'product added cart successfully'
    })
  }

  // verificar si el producto se ecnuentra en el carrito
  const productInCart = await CarProducts.findOne({idProduct}) // idProduct

  // Si el producto no esta agregado al carrito
  if (productInCart === null) {

    const addNewProductCar = new CarProducts({
      idCar: carFind._id,
      idProduct: idProduct,
      quantity,
      priceProduct: product.price,
      priceTotal: priceTotalProduct
    })

    await addNewProductCar.save()

    await carFind.updateOne({
      quantity: carFind.quantity + quantity,
      priceTotal: carFind.priceTotal + priceTotalProduct
    })

    await carFind.save()

    const listProductCart = await CarProducts.find({idCar: carFind._id}).populate('idProduct')

    return res.status(202).json({
      status: 'succes',
      aquantity: listProductCart.length,
      data: {
        card: carFind,
        listProductCart,
      },
      message: 'product added cart successfully',
    })
  }

  // si la cantidad pasada es menor o igual a 0
  if (quantity <= 0) {

    await carFind.updateOne({
      quantity: carFind.quantity - productInCart.quantity,
      priceTotal: carFind.priceTotal - productInCart.priceTotal
    })

    carFind.save()

    const productRemoveInCarProducts = await CarProducts.findOneAndDelete({
      idProduct,
      idCar: carFind._id
    })

    productRemoveInCarProducts.save()

    return res.status(202).json({
      status: 'succes',
      priceTotal: carFind.priceTotal,
      priceTotalDouble: carFind.priceTotal.toLocaleString(),
      aquantityProducts: carFind.quantity,
      data: {
        car: carFind,
        productRemove: productRemoveInCarProducts
      },
      message: 'producto removido del carrito exitosamente'
    })
  }

  // si la cantidad pasada del producto es mayor a la registrada en la base de dato
  if (quantity > productInCart.quantity) {

    const remainingQuantity = quantity - productInCart.quantity
    const newPriceTotal = productInCart.priceProduct * remainingQuantity

    await carFind.updateOne({
      quantity: carFind.quantity + remainingQuantity,
      priceTotal: carFind.priceTotal + newPriceTotal
    })

    await carFind.save()
    
    await productInCart.updateOne({
      quantity,
      priceTotal: productInCart.priceTotal + newPriceTotal
    })

    await productInCart.save()

    const listProductCart = await CarProducts.find({idCar: carFind._id}).populate('idProduct')

    return res.status(202).json({
      status: 'succes',
      priceTotal: carFind.priceTotal,
      priceTotalDouble: carFind.priceTotal.toLocaleString(),
      aquantityProduct: listProductCart.length,
      data: {
        listProductCart,
      },
      message: 'product added cart successfully',
    })

    // si la cantidad pasada del producto es menor a la registrada en la base de dato
  } else if (quantity < productInCart.quantity) {

    const remainingQuantity = productInCart.quantity - quantity
    const newPriceTotal = productInCart.priceProduct * remainingQuantity

    await carFind.updateOne({
      quantity: carFind.quantity - remainingQuantity,
      priceTotal: carFind.priceTotal - newPriceTotal
    })

    await carFind.save()

    await productInCart.update({
      quantity,
      priceTotal: productInCart.priceTotal - newPriceTotal
    })

    await productInCart.save()

    const listProductCart = await CarProducts.find({idCar: carFind._id}).populate('idProduct')

    return res.status(202).json({
      status: 'succes',
      priceTotal: carFind.priceTotal,
      priceTotalDouble: carFind.priceTotal.toLocaleString(),
      aquantityProduct: listProductCart.length,
      data: {
        listProductCart,
      },
      message: 'product added cart successfully',
    })
  }  

  // Si el producto se encuntra en el carrito
  carFind.save()
  productInCart.save()

  const listProductCart = await CarProducts.find({idCar: carFind._id}).populate('idProduct')

  return res.status(202).json({
    status: 'succes',
    priceTotal: carFind.priceTotal,
    priceTotalDouble: carFind.priceTotal.toLocaleString(),
    aquantityProduct: listProductCart.length,
    data: {
      listProductCart,
    },
    message: 'product added cart successfully',
  })

  // verificar que los productos de carrito siguan disponibles y/o con el stock
  // suficiente 

})

exports.buyProductsCars = tryCatch( async(req, res, next) => {

  const idUser = req.currentUser.id 

  const findCar = await Car.findOne({ idUser, status: 'active' })

  if (findCar === null) {
    return next( new AppError('There are no products to purchase', 403))
  }

  // comprar si la cantidad de los productos almacenados en el carrito 
  
  const listProductCart = await CarProducts.find({idCar: findCar._id}).populate('idProduct')

  const productsSuccesPromise = listProductCart.map( async(product) => {

    if (product.quantity <= product.idProduct.stock 
      && product.idProduct.status === 'active') {

      const updateStock = product.idProduct.stock - product.quantity
      await Product.findByIdAndUpdate(product.idProduct._id, {stock: updateStock})
      return product
    }
  })

  const productsSucces = await Promise.all(productsSuccesPromise)

  return res.status(202).json({
    status: 'success',
    priceTotal: findCar.priceTotal.toLocaleString(),
    PriceTotalInt: findCar.priceTotal,
    quantity: findCar.quantity,
    data: {
      products: productsSucces
    }
  })

})