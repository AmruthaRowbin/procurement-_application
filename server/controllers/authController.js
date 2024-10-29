
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Admin Login


exports.register =async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name,email,"uuuuuuuuuuuuuuuuuu")

  try {
    // Check if the user already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      console.log("Admin not found");
      return res.status(404).json({ message: 'Admin not found' });
    }

    console.log("Admin found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log("Password matches");

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

     // Return user data and token (excluding password)
     res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
      token, // Include the token in the response
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
