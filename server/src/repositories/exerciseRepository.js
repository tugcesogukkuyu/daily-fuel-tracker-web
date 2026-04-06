const { connectToDatabase, sql } = require("../config/database");

/*
  Find all exercises
  Tum egzersiz kayitlarini veritabanindan getirir.
*/
const findAllExercises = async () => {
  const databaseConnection = await connectToDatabase();

  const queryResult = await databaseConnection.request().query(`
    SELECT
      id,
      user_id,
      name,
      duration_minutes,
      calories_burned,
      created_at
    FROM exercises
    ORDER BY created_at DESC
  `);

  return queryResult.recordset;
};

/*
  Create exercise
  Yeni egzersiz kaydini veritabanina ekler.
*/
const createExercise = async ({
  userId,
  name,
  durationMinutes,
  caloriesBurned,
}) => {
  const databaseConnection = await connectToDatabase();

  const queryResult = await databaseConnection
    .request()
    .input("userId", sql.Int, userId)
    .input("name", sql.NVarChar(150), name)
    .input("durationMinutes", sql.Int, durationMinutes)
    .input("caloriesBurned", sql.Int, caloriesBurned)
    .query(`
      INSERT INTO exercises (
        user_id,
        name,
        duration_minutes,
        calories_burned
      )
      OUTPUT
        INSERTED.id,
        INSERTED.user_id,
        INSERTED.name,
        INSERTED.duration_minutes,
        INSERTED.calories_burned,
        INSERTED.created_at
      VALUES (
        @userId,
        @name,
        @durationMinutes,
        @caloriesBurned
      )
    `);

  return queryResult.recordset[0];
};

/*
  Delete exercise by id
  Verilen id'ye sahip egzersiz kaydini siler.
*/
const deleteExerciseById = async (exerciseId) => {
  const databaseConnection = await connectToDatabase();

  const queryResult = await databaseConnection
    .request()
    .input("exerciseId", sql.Int, exerciseId)
    .query(`
      DELETE FROM exercises
      OUTPUT DELETED.id
      WHERE id = @exerciseId
    `);

  return queryResult.recordset[0] ?? null;
};


module.exports = {
  findAllExercises,
  createExercise,
  deleteExerciseById,
};
