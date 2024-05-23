

const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
    // Extract data from request body
    const { username, email, password, role } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        user = new User({
            username,
            email,
            password,
            isAdmin: role === 'admin' // Set isAdmin based on the role
        });

        // Save user to database
        await user.save();

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with success message and token
        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Register first then login" });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        // Create JWT token with 7 days expiration
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Check if user is an admin
        const isAdmin = user.isAdmin;

        // Respond with token and admin message if applicable
        if (isAdmin) {
            res.status(200).json({ message: "Login Successful. You are an admin.", token });
        } else {
            res.status(200).json({ message: "Login Successful", token });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
exports.getData = async (req, res) => {
    const { _id } = req.body;

    try {
        // Check if user exists

        let user = await User.findOne({ _id });
        if (!user) {
            return res.status(400).json({ message: "Register first then login" });
        }


        const isAdmin = user.isAdmin;

        // Respond with token and admin message if applicable
        if (isAdmin) {
            res.status(200).json({ message: "Login Successful. You are an admin.", user });
        } else {
            res.status(200).json({ message: "Login Successful", user });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
exports.getAllUsers = async (req, res) => {

    try {

        const users = await User.find();

        res.status(200).json(users);


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
exports.deleteUser = async (req, res) => {

    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.updateRole = async (req, res) => {
    try {
        const Id = req.params.id;



        const { isAdmin } = req.body;
        const UpdatedUser = await User.findByIdAndUpdate(Id, { isAdmin }, { new: true });
        if (!UpdatedUser) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json({ message: 'user updated successfully', user: UpdatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update user' });
    }
};

