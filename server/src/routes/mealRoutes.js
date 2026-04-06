const express = require("express");
const { getMeals, createMeal, deleteMeal, } = require("../controllers/mealController");
const { requireAuthentication } = require("../middleware/authMiddleware");

const mealRouter = express.Router();

/*
  Meal routes
  Yemek verileriyle ilgili endpointleri tanimlar.
*/
mealRouter.get("/", getMeals);
mealRouter.post("/", requireAuthentication, createMeal);
mealRouter.delete("/:id", requireAuthentication, deleteMeal);



module.exports = mealRouter;
