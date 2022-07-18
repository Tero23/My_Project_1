const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/signup", userController.createUser);

router.get("/users", userController.getAllUsers);

router.post("/login", userController.loginUser);

router.get("/logout", auth, userController.logoutUser);

router.delete("/users/:id", auth, userController.deleteProfile);

module.exports = router;
