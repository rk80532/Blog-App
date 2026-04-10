const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.registerUser = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, email, password } = req.body;

    console.log("STEP 1");

    const userExists = await User.findOne({ email });
    console.log("STEP 2");

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("STEP 3");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log("STEP 4");

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};