const { findAllMeals, createMeal, deleteMealById, } = require("../repositories/mealRepository");

/*
  Get meal list
  Tum yemek kayitlarini veritabanindan getirir.
*/
const getMealList = async () => {
  const mealList = await findAllMeals();

  return mealList;
};

/*
  Create meal record
  Yeni yemek kaydini veritabanina ekler.
*/
const createMealRecord = async ({
  userId,
  name,
  mealType,
  calories,
  protein,
  carbs,
  fat,
}) => {
  const createdMeal = await createMeal({
    userId,
    name,
    mealType,
    calories,
    protein,
    carbs,
    fat,
  });

  return createdMeal;
};

/*
  Delete meal record
  Yemek kaydini id ile siler.
*/
const deleteMealRecord = async (mealId) => {
  const deletedMeal = await deleteMealById(mealId);

  return deletedMeal;
};


module.exports = {
  getMealList,
  createMealRecord,
  deleteMealRecord,
};
