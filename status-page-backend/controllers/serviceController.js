const Service = require('../models/Service');

exports.createService = async (req, res) => {
    try {
        const { name, status } = req.body;
        const newService = new Service({ name, status });
        await newService.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(500).json({ message: 'Error creating service' });
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching services' });
    }
};

exports.updateServiceStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.status(200).json(service);
    } catch (err) {
        res.status(500).json({ message: 'Error updating status' });
    }
};
