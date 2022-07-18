const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findAllMyTodosAndDelete } = require("../models/todoModel");
require("dotenv").config();

const Todo = require("../models/todoModel");

exports.createNewTodo = async (req, res, next) => {
  try {
    const { task, completed } = req.body;
    console.log(task);
    const todo = new Todo(task, completed, req.user.id);
    console.log(todo);
    await todo.save();
    res.status(200).send(todo);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAllTodos();
    res.status(200).send(todos[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getMyTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findMyTodos(req.user.id);
    res.status(200).send(todos[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findTodoByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Successfully Deleted", todo });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteMyAllTodos = async (req, res, next) => {
  try {
    const todos = await findAllMyTodosAndDelete(req.user.id);
    res
      .status(200)
      .json({ message: "All todos are successfully deleted", todos });
  } catch (error) {
    res.status(500).send(error);
  }
};
