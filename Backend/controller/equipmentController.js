const Equipment = require('../models/equipmentModel');

// Controller to create a new equipment
exports.createEquipment = async (req, res) => {
  try {
    const { name, description, quantity ,imgUrl} = req.body;
    const equipment = new Equipment({ name, description, quantity,imgUrl });
    await equipment.save();
    res.status(201).json({ message: 'Equipment created successfully', equipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create equipment' });
  }
};

// Controller to get all equipment
exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.status(200).json({ equipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch equipment' });
  }
};
exports.getEquipment = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment = await Equipment.findById(id);
    res.status(200).json({ equipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch equipment' });
  }
};

// Controller to update equipment by ID
exports.updateEquipment = async (req, res) => {
  try {
    const equipmentId = req.params.id;
    const { name, description, quantity,imgUrl } = req.body;
    const updatedEquipment = await Equipment.findByIdAndUpdate(equipmentId, { name, description, quantity,imgUrl }, { new: true });
    if (!updatedEquipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.status(200).json({ message: 'Equipment updated successfully', equipment: updatedEquipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update equipment' });
  }
};

// Controller to delete equipment by ID
exports.deleteEquipment = async (req, res) => {
  try {
    const equipmentId = req.params.id;
    const deletedEquipment = await Equipment.findByIdAndDelete(equipmentId);
    if (!deletedEquipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.status(200).json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete equipment' });
  }
};
