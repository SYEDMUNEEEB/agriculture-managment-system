const FieldOfficer = require('../models/fieldOfficerModel');

// Create a new Field Officer
exports.createFieldOfficer = async (req, res) => {
  try {
    const { username, password, area ,imgUrl} = req.body;
    const fieldOfficer = new FieldOfficer({ username, password, area,imgUrl });
    await fieldOfficer.save();
    res.status(201).json({ message: 'Field Officer created successfully', fieldOfficer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create Field Officer' });
  }
};

// Get all Field Officers
exports.getAllFieldOfficers = async (req, res) => {
  try {
    const fieldOfficers = await FieldOfficer.find();
    res.status(200).json({ fieldOfficers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch Field Officers' });
  }
};

// Get Field Officer by ID
exports.getFieldOfficerById = async (req, res) => {
  try {
    const fieldOfficerId = req.params.id;
    const fieldOfficer = await FieldOfficer.findById(fieldOfficerId);
    if (!fieldOfficer) {
      return res.status(404).json({ message: 'Field Officer not found' });
    }
    res.status(200).json({ fieldOfficer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch Field Officer' });
  }
};

// Update Field Officer by ID
exports.updateFieldOfficer = async (req, res) => {
  try {
    const fieldOfficerId = req.params.id;
    const { username, password, area } = req.body;
    const updatedFieldOfficer = await FieldOfficer.findByIdAndUpdate(
      fieldOfficerId,
      { username, password, area },
      { new: true }
    );
    if (!updatedFieldOfficer) {
      return res.status(404).json({ message: 'Field Officer not found' });
    }
    console.log(updatedFieldOfficer);
    res.status(200).json({ message: 'Field Officer updated successfully', fieldOfficer: updatedFieldOfficer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update Field Officer' });
  }
};

// Delete Field Officer by ID
exports.deleteFieldOfficer = async (req, res) => {
  try {
    const fieldOfficerId = req.params.id;
    const deletedFieldOfficer = await FieldOfficer.findByIdAndDelete(fieldOfficerId);
    if (!deletedFieldOfficer) {
      return res.status(404).json({ message: 'Field Officer not found' });
    }
    res.status(200).json({ message: 'Field Officer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete Field Officer' });
  }
};
