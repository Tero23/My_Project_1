const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const auth = require("../middlewares/auth");

router.post("/addTodo", auth, todoController.createNewTodo);

router.get("/todos", todoController.getAllTodos);

router.get("/mytodos", auth, todoController.getMyTodos);

router.delete("/mytodos/:id", auth, todoController.deleteTodoById);

router.delete("/mytodos", auth, todoController.deleteMyAllTodos);

module.exports = router;
