const productionFunctions = require('../functions/productionFunctions');


const productionController = {};


productionController.insertProduction = async (req, res) => {
    const { user, material, description, productionDate, expireDate, pieces, boxes, lote, isSerial } = req.body;

    try {
        const response = await productionFunctions.insertProduction( user, material, description, productionDate, expireDate, pieces, boxes, lote, isSerial);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


productionController.searchProduction = async (req, res) => {

    try {
        const response = await productionFunctions.searchProduction();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

productionController.repackProduction = async (req, res) => {
    const { id, pieces } = req.body;

    try {
        const response = await productionFunctions.repackProduction(id, pieces);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

productionController.serial_rack = async (req, res) => {
    const { serial, ubication } = req.body;

    try {
        const response = await productionFunctions.serialRack(serial, ubication);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

productionController.change_pieces = async (req, res) => {
    const { id } = req.body;

    try {
        const response = await productionFunctions.changePieces(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


productionController.searchTotal = async (req, res) => {

    try {
        const response = await productionFunctions.searchTotal();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = productionController;