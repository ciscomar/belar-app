const express = require('express')
const router = express.Router()
const deliveryController = require('../controllers/deliveryController')
const rfc_login = require('../middlewares/backendAuth')


router.post('/delivery/insert',deliveryController.insertDelivery) 
router.post('/delivery/id',deliveryController.getDeliveryById) 
router.get('/delivery/active',deliveryController.activeDeliveries) 
router.post('/delivery/captureSerial',deliveryController.captureSerial) 
router.post('/delivery/complete',deliveryController.completeDelivery)
router.post('/delivery/destinationInsert',deliveryController.destinationInsert)
router.get('/delivery/destinationList',deliveryController.destinationList)


module.exports = router