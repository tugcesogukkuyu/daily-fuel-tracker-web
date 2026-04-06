const express = require("express");
const { getWaterLog, saveWaterLog } = require("../controllers/waterController");
const { requireAuthentication } = require("../middleware/authMiddleware");

const waterRouter = express.Router();

/*
  Water routes
  Gunluk su takibi endpointlerini tanimlar.
*/
waterRouter.get("/", requireAuthentication, getWaterLog);
waterRouter.post("/", requireAuthentication, saveWaterLog);


module.exports = waterRouter;
