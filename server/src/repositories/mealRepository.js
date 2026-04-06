const { connectToDatabase, sql } = require("../config/database");

/*
  Find all meals
  Tum yemek kayitlarini veritabanindan getirir.
*/
const findAllMeals = async () => {
  const databaseConnection = await connectToDatabase();

  const queryResult = await databaseConnection.request().query(`
    SELECT
      id,
      user_id,
      name,
      meal_type,
      calories,
      protein,
      carbs,
      fat,
      created_at
    FROM meals
    ORDER BY created_at DESC
  `);

  return queryResult.recordset;
};

/*
  Create meal
  Yeni yemek kaydini veritabanina ekler.
*/
const createMeal = async ({
  userId,
  name,
  mealType,
  calories,
  protein,
  carbs,
  fat,
}) => {
  const databaseConnection = await connectToDatabase();

  const queryResult = await databaseConnection
    .request()
    .input("userId", sql.Int, userId)
    .input("name", sql.NVarChar(150), name)
    .input("mealType", sql.NVarChar(50), mealType)
    .input("calories", sql.Int, calories)
    .input("protein", sql.Decimal(6, 2), protein)
    .input("carbs", sql.Decimal(6, 2), carbs)
    .input("fat", sql.Decimal(6, 2), fat)
    .query(`
      INSERT INTO meals (
        user_id,
        name,
        meal_type,
        calories,
        protein,
        carbs,
        fat
      )
      OUTPUT
        INSERTED.id,
        INSERTED.user_id,
        INSERTED.name,
        INSERTED.meal_type,
        INSERTED.calories,
        INSERTED.protein,
        INSERTED.carbs,
        INSERTED.fat,
        INSERTED.created_at
      VALUES (
        @userId,
        @name,
        @mealType,
        @calories,
        @protein,
        @carbs,
        @fat
      )
    `);

  return queryResult.recordset[0];
};

/*
  Delete meal by id
  Verilen id'ye sahip yemek kaydini siler.
*/
const deleteMealById = async (mealId) => {
  const databaseConnection = await connectToDatabase();

  const queryResult = await databaseConnection
    .request()
    .input("mealId", sql.Int, mealId)
    .query(`
      DELETE FROM meals
      OUTPUT DELETED.id
      WHERE id = @mealId
    `);

  return queryResult.recordset[0] ?? null;
};


module.exports = {
  findAllMeals,
  createMeal,
  deleteMealById,
};
