const materialFunctions = {};
const schemas = require('../schemas/schemas_MONGO')


materialFunctions.insertMaterial = async (material, description) => {
  try {
    const validateMaterial = await schemas.materialSchema.findOne({ material: material });
    if (validateMaterial) {
      throw new Error('Material already exists');
    }
    const create = await schemas.materialSchema.create({
      material,
      description
    });
    return create

  } catch (err) {
    throw err;
  }
};

materialFunctions.listMaterial = async () => {
  try {
    const list = await schemas.materialSchema.find();
    return list
  } catch (err) {
    throw err;
  }
}

materialFunctions.getSerial = async (id) => {
  try {
    const validateSerial = await schemas.productionSchema.findOne({ _id: id });
    if (!validateSerial) {
      throw new Error('Serial not found');
    }
    return validateSerial
  } catch (err) {
    throw err;
  }
}



module.exports = materialFunctions;