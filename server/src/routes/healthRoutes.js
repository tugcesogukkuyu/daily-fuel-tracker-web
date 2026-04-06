const express = require("express");
const { getHealthStatus } = require("../controllers/healthController");

const healthRouter = express.Router();

/*
  Health routes
  Uygulamanin ayakta oldugunu kontrol eden endpointi tanimlar.
*/
healthRouter.get("/", getHealthStatus);

module.exports = healthRouter;
