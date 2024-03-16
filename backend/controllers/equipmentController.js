const equipmentFunctions = require('../functions/equipmentFunctions');


const equipmentController = {};

equipmentController.newEmployee = async (req, res) => {
    const { name, role, ubication, phone } = req.body;

    try {
        const response_MONGO = await equipmentFunctions.newEmployee(name, role, ubication, phone);
        res.status(200).json(response_MONGO);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

equipmentController.newEquipment = async (req, res) => {
    const { description, category, brand, model, serie, state } = req.body;

    try {
        const response_MONGO = await equipmentFunctions.newEquipment(description, category, brand, model, serie, state);
        res.status(200).json(response_MONGO);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = equipmentController;