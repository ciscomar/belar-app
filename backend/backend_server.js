require('dotenv').config({ path: './.env' })
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()


const userRoutes = require('./routes/userRoutes')
const productionRoutes = require('./routes/productionRoutes')
const deliveryRoutes = require('./routes/deliveryRoutes')
const materialRoutes = require('./routes/materialRoutes')
const equipmentRoutes = require('./routes/equipmentRoutes')

app.set('port', process.env.BACKEND_PORT || 5010)
app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())


  const morgan = require('morgan')
  app.use(morgan('dev'))
  let server = app.listen(app.get('port'), function () {
    console.info('Express node_env: ' + process.env.NODE_ENV + " Port: " + server.address().port);
    server.on('connection', () => { server.setTimeout(20 * 60 * 1000) })
  })

app.use(userRoutes)
app.use(productionRoutes)
app.use(deliveryRoutes)
app.use(materialRoutes)
app.use(equipmentRoutes)

