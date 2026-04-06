const { getMealList, createMealRecord, deleteMealRecord, } = require("../services/mealService");

/*
  Get meals
  Tum yemek kayitlarini listelemek icin kullanilir.
*/
const getMeals = async (req, res) => {
  try {
    const mealList = await getMealList();

    res.json({
      message: "Meals fetched successfully",
      data: mealList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch meals",
      error: error.message,
    });
  }
};

/*
  Create meal
  Yeni yemek kaydi olusturur.
*/
const createMeal = async (req, res) => {
  try {
    const { name, mealType, calories, protein, carbs, fat } = req.body;
    const userId = req.authenticatedUser.id;


    if (
      !name ||
      !mealType ||
      calories === undefined ||
      protein === undefined ||
      carbs === undefined ||
      fat === undefined
    ) {

      return res.status(400).json({
        message:
          "Name, meal type, calories, protein, carbs and fat are required",
      });
    }

    const createdMeal = await createMealRecord({
      userId,
      name,
      mealType,
      calories,
      protein,
      carbs,
      fat,
    });

    res.status(201).json({
      message: "Meal created successfully",
      data: createdMeal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create meal",
      error: error.message,
    });
  }
};

/*
  Delete meal
  Verilen id'ye sahip yemek kaydini siler.
*/
const deleteMeal = async (req, res) => {
  try {
    const mealId = Number(req.params.id);

    if (!mealId) {
      return res.status(400).json({
        message: "Meal id is required",
      });
    }

    const deletedMeal = await deleteMealRecord(mealId);

    if (!deletedMeal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    res.json({
      message: "Meal deleted successfully",
      data: deletedMeal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete meal",
      error: error.message,
    });
  }
};


module.exports = {
  getMeals,
  createMeal,
  deleteMeal,
};
