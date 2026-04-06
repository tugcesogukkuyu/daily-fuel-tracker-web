const express = require("express");
const { getUsers } = require("../controllers/userController");

const userRouter = express.Router();

/*
  User routes
  Kullanici listeleme endpointini tanimlar.
*/
userRouter.get("/", getUsers);

module.exports = userRouter;
