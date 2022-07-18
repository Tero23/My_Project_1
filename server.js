require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const userRouter = require("./routers/userRouter");
const todoRouter = require("./routers/todoRouter");

app.use(cookieParser());
app.use(express.json());
app.use(userRouter);
app.use(todoRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server is up at port kezi inch`)
);
