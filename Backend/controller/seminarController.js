const Seminar = require('../models/seminarModel');

exports.createSeminar = async (req, res) => {
  try {
    const { title, date, venue, description,imgUrl } = req.body;
    const seminar = new Seminar({ title, date, venue, description ,imgUrl});
    await seminar.save();
    res.status(201).json({ message: 'Seminar created successfully', seminar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create seminar' });
  }
};

exports.getAllSeminars = async (req, res) => {
  try {
    const seminars = await Seminar.find();
    res.status(200).json({ seminars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch seminars' });
  }
};
exports.getSeminar = async (req, res) => {
  try {
    const id = req.params.id;
    const seminars = await Seminar.findById(id);
    res.status(200).json({ seminars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch seminars' });
  }
};

exports.deleteSeminar = async (req, res) => {
  try {
    const seminarId = req.params.id;
    const deletedSeminar = await Seminar.findByIdAndDelete(seminarId);
    if (!deletedSeminar) {
      return res.status(404).json({ message: 'Seminar not found' });
    }
    res.status(200).json({ message: 'Seminar deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete seminar' });
  }
};
