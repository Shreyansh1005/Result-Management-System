// controllers/userController.js

const User = require('../models/Users');
const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Controller to register a new user
const registerUser = async (req, res) => {
    const { name, email, password,role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password,role });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// Controller to authenticate a user
const authUser = async (req, res) => {
   console.log('Login request received:', req.body);
   const { email, password } = req.body;

   try {
       const user = await User.findOne({ email });
       console.log('User found:', user);

       if (user && (await user.matchPassword(password))) {
           res.json({
               _id: user._id,
               name: user.name,
               email: user.email,
               role: user.role,
               token: generateToken(user._id),
           });
       } else {
           res.status(401).json({ message: 'Invalid email or password' });
       }
   } catch (error) {
       console.error('Error during login:', error);
       res.status(500).json({ message: 'Server error' });
   }
};


// Controller to get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' }); // Assuming 'role' is how you distinguish between students and admins
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch students', error: error.message });
    }
};
const updatePassword = async (req, res) => {
    const { email, newPassword } = req.body;
  
    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
  
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
module.exports = { registerUser, authUser, getAllStudents,updatePassword };
