const userFunctions = {};
const schemas = require('../schemas/schemas_MONGO')


userFunctions.handleLogin = async (user, password) => {
  try {
    const userValidate = await schemas.userSchema.findOne( { "name": user, "password": password });
    return userValidate

  } catch (err) {
    throw err;
  }
};



module.exports = userFunctions;