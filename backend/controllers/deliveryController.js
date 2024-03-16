const deliveryFunctions = require('../functions/deliveryFunctions');


const deliveryController = {};


deliveryController.insertDelivery = async (req, res) => {
    console.log(req.body);
    const { user, destination, date, serials } = req.body.formValues;
    const selectedShelf = req.body.selectedShelf;


    try {
        const response = await deliveryFunctions.insertDelivery( user, destination, date, serials, selectedShelf);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

deliveryController.activeDeliveries = async (req, res) => {

    try {
        const response = await deliveryFunctions.activeDeliveries();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
deliveryController.getDeliveryById = async (req, res) => {
    const { id } = req.body;

    try {
        const response = await deliveryFunctions.getDeliveryById(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

deliveryController.captureSerial = async (req, res) => {
    const { serial, id } = req.body;
    try {
        const response = await deliveryFunctions.captureSerial(serial, id);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

deliveryController.completeDelivery = async (req, res) => {
    const { id } = req.body;
    try {
        const response = await deliveryFunctions.completeDelivery(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

deliveryController.destinationInsert = async (req, res) => {
    const { destination } = req.body;
    try {
        const response = await deliveryFunctions.destinationInsert(destination);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

deliveryController.destinationList = async (req, res) => {
    try {
        const response = await deliveryFunctions.destinationList();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}




module.exports = deliveryController;