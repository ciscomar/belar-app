const materialFunctions = require('../functions/materialFunctions');


const materialController = {};


materialController.insertMaterial = async (req, res) => {
    const { material, description} = req.body;

    try {
        const response = await materialFunctions.insertMaterial( material, description);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

materialController.listMaterial = async (req, res) => {

    try {
        const response = await materialFunctions.listMaterial();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

materialController.getSerial = async (req, res) => {
    const { id } = req.body;

    try {
        const response = await materialFunctions.getSerial(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



module.exports = materialController;