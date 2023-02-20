const express  = require('express')

// routers user
const { userRouter } = require('./routers/user.router')

// globalError
const globalError = require('./utils/globalError')

const app = express()


// configuracion para la aceptacion de res JSON

app.use(express.json())
app.use(express.urlencoded({extended: true}))


// endpoints
// .....
app.use('/api/v1/users', require('./routers/user.router').userRouter)
// productos/api/v1/products
app.use('/api/v1/products', require('./routers/productsRouters').productRouter)
// Seller
app.use('/api/v1/sellers', require('./routers/sellers.router').sellersRouter)
// Comments

app.use('/api/v1/comments', require('./routers/comments.router'))

app.use(globalError)
module.exports = app