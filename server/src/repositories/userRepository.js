const { connectToDatabase, sql } = require("../config/database");

/*
  Find all users
  Tum kullanicilari listelemek icin kullanilir.
*/
const findAllUsers = async () => {
  const databaseConnection = await connectToDatabase();

  const queryResult = await databaseConnection.request().query(`
    SELECT
      id,
      full_name,
      email,
      created_at
    FROM users
    ORDER BY created_at DESC
  `);

  return queryResult.recordset;
};

/*
  Create user
  Yeni kullaniciyi veritabanina ekler.
*/
const createUser = async ({ fullName, email, passwordHash }) => {
  const databaseConnection = await connectToDatabase();

  const queryResult = await databaseConnection
    .request()
    .input("fullName", sql.NVarChar(100), fullName)
    .input("email", sql.NVarChar(150), email)
    .input("passwordHash", sql.NVarChar(255), passwordHash)
    .query(`
      INSERT INTO users (full_name, email, password_hash)
      OUTPUT
        INSERTED.id,
        INSERTED.full_name,
        INSERTED.email,
        INSERTED.created_at
      VALUES (@fullName, @email, @passwordHash)
    `);

  return queryResult.recordset[0];
};

/*
  Find user by email
  Login ve tekrar kontrol akislari icin kullaniciyi e-posta ile bulur.
*/
const findUserByEmail = async (email) => {
  const databaseConnection = await connectToDatabase();

  const queryResult = await databaseConnection
    .request()
    .input("email", sql.NVarChar(150), email)
    .query(`
      SELECT
        id,
        full_name,
        email,
        password_hash,
        created_at
      FROM users
      WHERE email = @email
    `);

  return queryResult.recordset[0] ?? null;
};

/*
  Find user by id
  Auth cookie uzerinden gelen aktif kullaniciyi kayit seviyesinde bulur.
*/
const findUserById = async (userId) => {
  const databaseConnection = await connectToDatabase();

  const queryResult = await databaseConnection
    .request()
    .input("userId", sql.Int, userId)
    .query(`
      SELECT
        id,
        full_name,
        email,
        password_hash,
        created_at
      FROM users
      WHERE id = @userId
    `);

  return queryResult.recordset[0] ?? null;
};

/*
  Update user password hash
  Verilen kullanicinin sifre hash alanini yeni degerle gunceller.
*/
const updateUserPasswordHash = async ({ userId, passwordHash }) => {
  const databaseConnection = await connectToDatabase();

  await databaseConnection
    .request()
    .input("userId", sql.Int, userId)
    .input("passwordHash", sql.NVarChar(255), passwordHash)
    .query(`
      UPDATE users
      SET password_hash = @passwordHash
      WHERE id = @userId
    `);
};

/*
  Delete user account
  Kullaniciya bagli kayitlari ve kullanici kaydini tek transaction icinde siler.
*/
const deleteUserAccount = async (userId) => {
  const databaseConnection = await connectToDatabase();
  const transaction = new sql.Transaction(databaseConnection);

  await transaction.begin();

  try {
    await new sql.Request(transaction)
      .input("userId", sql.Int, userId)
      .query(`DELETE FROM water_logs WHERE user_id = @userId`);

    await new sql.Request(transaction)
      .input("userId", sql.Int, userId)
      .query(`DELETE FROM exercises WHERE user_id = @userId`);

    await new sql.Request(transaction)
      .input("userId", sql.Int, userId)
      .query(`DELETE FROM meals WHERE user_id = @userId`);

    await new sql.Request(transaction)
      .input("userId", sql.Int, userId)
      .query(`DELETE FROM users WHERE id = @userId`);

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  findAllUsers,
  createUser,
  findUserByEmail,
  findUserById,
  updateUserPasswordHash,
  deleteUserAccount,
};
