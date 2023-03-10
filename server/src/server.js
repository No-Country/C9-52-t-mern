const app = require('./app')

const connectDB = require('./utils/database.js')

require('dotenv').config()
/*
@param {},

return {}
*/
const startServer = () => { 

  const PORT = 4545 || process.env.SERVER_PORT

  app.listen(PORT, () => {
    connectDB()
    console.log('Server is running on port ', PORT, ' and ', app.request.url)
  })
}

startServer()
