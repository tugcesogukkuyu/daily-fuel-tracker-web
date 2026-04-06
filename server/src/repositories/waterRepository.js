const { connectToDatabase, sql } = require("../config/database");

/*
  Find water log by user and date
  Kullaniciya ve tarihe ait su kaydini getirir.
*/
const findWaterLogByUserAndDate = async ({ userId, logDate }) => {
  const databaseConnection = await connectToDatabase();

  const queryResult = await databaseConnection
    .request()
    .input("userId", sql.Int, userId)
    .input("logDate", sql.Date, logDate)
    .query(`
      SELECT
        id,
        user_id,
        log_date,
        cup_count,
        created_at,
        updated_at
      FROM water_logs
      WHERE user_id = @userId
        AND log_date = @logDate
    `);

  return queryResult.recordset[0] ?? null;
};

/*
  Create water log
  Yeni bir gunluk su kaydi olusturur.
*/
const createWaterLog = async ({ userId, logDate, cupCount }) => {
  const databaseConnection = await connectToDatabase();

  const queryResult = await databaseConnection
    .request()
    .input("userId", sql.Int, userId)
    .input("logDate", sql.Date, logDate)
    .input("cupCount", sql.Int, cupCount)
    .query(`
      INSERT INTO water_logs (
        user_id,
        log_date,
        cup_count
      )
      OUTPUT
        INSERTED.id,
        INSERTED.user_id,
        INSERTED.log_date,
        INSERTED.cup_count,
        INSERTED.created_at,
        INSERTED.updated_at
      VALUES (
        @userId,
        @logDate,
        @cupCount
      )
    `);

  return queryResult.recordset[0];
};

/*
  Update water log
  Var olan gunluk su kaydinin bardak sayisini gunceller.
*/
const updateWaterLog = async ({ userId, logDate, cupCount }) => {
  const databaseConnection = await connectToDatabase();

  const queryResult = await databaseConnection
    .request()
    .input("userId", sql.Int, userId)
    .input("logDate", sql.Date, logDate)
    .input("cupCount", sql.Int, cupCount)
    .query(`
      UPDATE water_logs
      SET
        cup_count = @cupCount,
        updated_at = GETDATE()
      OUTPUT
        INSERTED.id,
        INSERTED.user_id,
        INSERTED.log_date,
        INSERTED.cup_count,
        INSERTED.created_at,
        INSERTED.updated_at
      WHERE user_id = @userId
        AND log_date = @logDate
    `);

  return queryResult.recordset[0] ?? null;
};

module.exports = {
  findWaterLogByUserAndDate,
  createWaterLog,
  updateWaterLog,
};
