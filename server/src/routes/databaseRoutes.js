const express = require("express");
const {
  checkDatabaseConnection,
} = require("../controllers/databaseController");

const databaseRouter = express.Router();

/*
  Database routes
  Veritabani baglanti kontrolu endpointini tanimlar.
*/
databaseRouter.get("/check", checkDatabaseConnection);

module.exports = databaseRouter;
