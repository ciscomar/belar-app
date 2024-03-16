const express = require('express')
const router = express.Router()
const routesController = require('../controllers/equipmentController')



router.post('/equipment/newEmployee', routesController.newEmployee) 
router.post('/equipment/newEquipment', routesController.newEquipment)

module.exports = router