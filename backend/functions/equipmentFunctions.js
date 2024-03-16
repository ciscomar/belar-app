const equipmentFunctions = {};
const schemas = require('../schemas/schemas_MONGO')


equipmentFunctions.newEmployee = async (name, role, ubication, phone) => {
  try {
    const insertEmployee = await schemas.employeeSchema.create({ name, role, ubication, phone })
    return insertEmployee

  } catch (err) {
    throw err;
  }
};

equipmentFunctions.newEquipment = async (description, category, brand, model, serie, state) => {
  try {
    const insertEquipment = await schemas.equipmentSchema.create({ description, category, brand, model, serie, state })
    return insertEquipment

  } catch (err) {
    throw err;
  }
};



module.exports = equipmentFunctions;