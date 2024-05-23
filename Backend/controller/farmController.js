

const Farm = require('../models/Farm');

// Create a new farm
exports.createFarm = async (req, res) => {
    try {
        const { name, location, size,imgUrl } = req.body;
        const farm = new Farm({ name, location, size,imgUrl });
        await farm.save();
        res.status(201).json({ message: 'Farm created successfully', farm });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create farm' });
    }
};

// Get farm details by ID
exports.getAllFarm = async (req, res) => {
    try {
        const farmId = req.params.id;
        const farm = await Farm.find();
        if (!farm) {
            return res.status(404).json({ message: 'Farm not found' });
        }
        res.status(200).json({ message: 'Farm details retrieved successfully', farm });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve farm details' });
    }
};
// Get farm details by ID
exports.getFarm = async (req, res) => {
    try {
        const farmId = req.params.id;
        const farm = await Farm.findById(farmId);
        if (!farm) {
            return res.status(404).json({ message: 'Farm not found' });
        }
        res.status(200).json({ message: 'Farm details retrieved successfully', farm });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve farm details' });
    }
};

// Update farm information by ID
exports.updateFarm = async (req, res) => {
    try {
        const farmId = req.params.id;
        const { name, location, size,imgUrl } = req.body;
        console.log(name, location, size, imgUrl);
        const updatedFarm = await Farm.findByIdAndUpdate(farmId, { name, location, size,imgUrl }, { new: true });
        if (!updatedFarm) {
            return res.status(404).json({ message: 'Farm not found' });
        }
        res.status(200).json({ message: 'Farm updated successfully', farm: updatedFarm });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update farm' });
    }
};

// Delete a farm by ID
exports.deleteFarm = async (req, res) => {
    try {
        const farmId = req.params.id;
        const deletedFarm = await Farm.findByIdAndDelete(farmId);
        if (!deletedFarm) {
            return res.status(404).json({ message: 'Farm not found' });
        }
        res.status(200).json({ message: 'Farm deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete farm' });
    }
};
