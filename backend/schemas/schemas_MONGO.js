const { Schema, model } = require("mongoose");
const connection = require("../connections/db/mongoConnection")
const mongooseSchemas = {}

const userSch = {
  name: String,
  email: String,
  password: String,
}

const productionSch = {
  user: String,
  material: String,
  description: String,
  productionDate: Date,
  expireDate:Date,
  pieces: Number,
  serial: String,
  status: String,
  delivery: String,
  ubication: String,
  lote: String,
  isSerial: Boolean,
}

const deliverySch = {
user: String,
destination: String,
date: Date,
serials: Array,
status: String,
}
const materialSch = {
  material: String,
  description: String,
}

const destinationSch = {
  destination: String,
}

const employeeSch = {
  name: String,
  role: String,
  ubication: String,
  phone: String

}

const equipmentSch = {
  description: String,
  category: String,
  brand: String,
  model: String,
  serie: String,
  state: String,
}


mongooseSchemas.userSchema = model('users', new Schema(userSch))
mongooseSchemas.productionSchema = model('production', new Schema(productionSch))
mongooseSchemas.deliverySchema = model('delivery', new Schema(deliverySch))
mongooseSchemas.materialSchema = model('material', new Schema(materialSch))
mongooseSchemas.destinationSchema = model('destination', new Schema(destinationSch))
mongooseSchemas.employeeSchema = model('employee', new Schema(employeeSch))
mongooseSchemas.equipmentSchema = model('equipment', new Schema(equipmentSch))



module.exports = mongooseSchemas