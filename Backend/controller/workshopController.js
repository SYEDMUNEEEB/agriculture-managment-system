const Workshop = require('../models/Workshop');

// Controller methods
exports.getAllWorkshops = async (req, res) => {
    try {
        const workshops = await Workshop.find();
        res.status(200).json({ workshops });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch workshops' });
    }
};

exports.getWorkshopById = async (req, res) => {
    try {
        const workshopId = req.params.id;
        const workshop = await Workshop.findById(workshopId);
        if (!workshop) {
            return res.status(404).json({ message: 'Workshop not found' });
        }
        res.status(200).json({ workshop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch workshop' });
    }
};

exports.createWorkshop = async (req, res) => {
    try {
        // Extract workshop data from request body
        const { title, description, imgUrl } = req.body;
        // Create new workshop
        const workshop = new Workshop({ title, description, imgUrl });
        await workshop.save();
        res.status(201).json({ message: 'Workshop created successfully', workshop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create workshop' });
    }
};

exports.updateWorkshop = async (req, res) => {
    try {
        const workshopId = req.params.id;
        const { title, description,imgUrl } = req.body;
        const updatedWorkshop = await Workshop.findByIdAndUpdate(workshopId, { title, description ,imgUrl}, { new: true });
        if (!updatedWorkshop) {
            return res.status(404).json({ message: 'Workshop not found' });
        }
        res.status(200).json({ message: 'Workshop updated successfully', workshop: updatedWorkshop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update workshop' });
    }
};

exports.deleteWorkshop = async (req, res) => {
    try {
        const workshopId = req.params.id;
        const deletedWorkshop = await Workshop.findByIdAndDelete(workshopId);
        if (!deletedWorkshop) {
            return res.status(404).json({ message: 'Workshop not found' });
        }
        res.status(200).json({ message: 'Workshop deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete workshop' });
    }
};
