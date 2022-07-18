const db = require("../config/db");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Todo = require("../models/todoModel");
require("dotenv").config();

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json("A token is required!");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) throw new Error("Invalid token");
    if (decoded) {
      const user = await User.findByUsername(decoded.username);
      req.user = user;
      if (req.params.id) {
        console.log(typeof parseInt(req.params.id));
        const userId = await Todo.findUserIdByTodoId(parseInt(req.params.id));
        console.log(userId[0][0].user_id);
        const isVerified = req.user.id === userId[0][0].user_id;
        if (!isVerified)
          return res.json({
            message: "Your have no permition to delete other's todos",
          });
      }
      next();
    } else res.json({ message: "Not Authorized" });
  } catch (error) {
    res.status(500).send(error);
  }
};

// const ownTodo = async (req, res, next) => {
//   try {
//     const isVerified = req.user.id === req.params.id;
//     if (!isVerified) throw new Error();
//     next();
//   } catch (error) {
//     res.status(500).json({ message: "That todo doesn't belong to you" });
//   }
// };

module.exports = auth;
