const express = require('express')
const router = express.Router()
const productionController = require('../controllers/productionController')
const rfc_login = require('../middlewares/backendAuth')


router.post('/production/insert',productionController.insertProduction) 
router.post('/production/searchSerials',productionController.searchProduction) 
router.post('/production/repack',productionController.repackProduction)
router.post('/production/serial_rack',productionController.serial_rack)
router.post('/production/changePieces',productionController.change_pieces)
router.post('/production/searchTotal',productionController.searchTotal) 


module.exports = router