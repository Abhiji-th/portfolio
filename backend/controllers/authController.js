import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      res.status(400).json({
        success: false,
        error: "Please provide an email and a password",
      });

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      res.status(401).json({ success: false, error: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      res.status(401).json({ success: false, error: "Invalid credentials" });

    const token = generateToken(user._id);

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export { register, login };
