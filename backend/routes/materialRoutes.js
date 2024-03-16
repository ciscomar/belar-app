const express = require('express')
const router = express.Router()
const materialController = require('../controllers/materialController')
const rfc_login = require('../middlewares/backendAuth')


router.post('/material/insert',materialController.insertMaterial) 
router.get('/material/list',materialController.listMaterial)
router.post('/material/serial',materialController.getSerial)


module.exports = router