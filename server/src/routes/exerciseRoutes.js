const express = require("express");
const {
  getExercises,
  getExerciseCatalogSearchResults,
  createExercise,
  deleteExercise,
} = require("../controllers/exerciseController");
const { requireAuthentication } = require("../middleware/authMiddleware");

const exerciseRouter = express.Router();

/*
  Exercise routes
  Egzersiz kayitlari ve egzersiz katalog endpointlerini tanimlar.
*/
exerciseRouter.get("/catalog/search", getExerciseCatalogSearchResults);
exerciseRouter.get("/", getExercises);
exerciseRouter.post("/", requireAuthentication, createExercise);
exerciseRouter.delete("/:id", requireAuthentication, deleteExercise);

module.exports = exerciseRouter;
