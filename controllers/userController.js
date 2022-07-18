const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User(username, hashedPassword);
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAllUsers();
    res.status(200).send(users[0]);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    if (!user) throw new Error();
    const isVerified = await bcrypt.compare(password, user.password);
    if (!isVerified) throw new Error();
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );
    res.cookie("token", token, { httpOnly: true }).status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    const user = await User.findUserByIdAndDelete(req.params.id);
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token").json("logged out");
};
