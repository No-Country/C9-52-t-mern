const express  = require('express')

// routers user
const { userRouter } = require('./routers/user.router')

// globalError
const globalError = require('./utils/globalError')

const cors = require('cors')

const app = express()


// configuracion para la aceptacion de res JSON

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())
app.options('*', cors());

// endpoints
// .....
app.use('/api/v1/users', require('./routers/user.router').userRouter)
// productos/api/v1/products
app.use('/api/v1/products', require('./routers/productsRouters').productRouter)
// Seller
app.use('/api/v1/sellers', require('./routers/sellers.router').sellersRouter)
// Comments
app.use('/api/v1/comments', require('./routers/comments.router'))
// Cars
app.use('/api/v1/cars', require('./routers/cart.router').cartRouter)
// address
app.use('/api/v1/address', require('./routers/address.router').addressRouter)

app.use(globalError)
module.exports = app