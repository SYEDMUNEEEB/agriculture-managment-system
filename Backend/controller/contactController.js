const adminContact = require('../models/contactAdminModel');
const userContact = require('../models/contactModel');

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new userContact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Contact created successfully', contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create contact' });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await userContact.find();
    res.status(200).json({ contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await userContact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete contact' });
  }
};

exports.getUserContacts = async (req, res) => {
  try {
    const contactId = req.params.id;
    const userMessages = await userContact.find({ sendBy: contactId });
    res.status(200).json(userMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve contact messages' });
  }
};
exports.getAdminContacts = async (req, res) => {
  try {
    const contactId = req.params.id;
    const userMessages = await adminContact.find({ sendTo: contactId });
    res.status(200).json(userMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve contact messages' });
  }
};

exports.sendUserContacts = async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, message, sendBy } = req.body;

    // Create a new UserContact instance
    const newUserContact = new userContact({
      name,
      email,
      message,
      sendBy,
      time: Date.now(), // Set time to current time in milliseconds
    });

    // Save the new user contact to the database
    const savedUserContact = await newUserContact.save();

    res.status(201).json(savedUserContact); // Respond with the saved user contact
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save user contact' });
  }
};
exports.sendAdminContacts = async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, message, sendTo } = req.body;

    // Create a new UserContact instance
    const newAdminContact = new adminContact({
      name,
      email,
      message,
      sendTo,
      time: Date.now(), // Set time to current time in milliseconds
    });

    // Save the new Admin contact to the database
    const savedAdminContact = await newAdminContact.save();

    res.status(201).json(savedAdminContact); // Respond with the saved Admin contact
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save Admin contact' });
  }
};
