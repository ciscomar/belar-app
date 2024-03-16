const express = require('express')
const router = express.Router()
const routesController = require('../controllers/userController')
const rfc_login = require('../middlewares/backendAuth')


router.post('/user/login', rfc_login.handleLogin) 

module.exports = router