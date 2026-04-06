const { sql, connectToDatabase } = require("../config/database");

/**
 * Foods table query helpers
 * Besin tablosu uzerindeki okuma islemlerini burada toplariz.
 */

/**
 * Tüm besinleri getirir.
 */
const findAllFoods = async () => {
  const pool = await connectToDatabase();
  const result = await pool.request().query(`
    SELECT id, name, category, serving_label, calories, protein, carbs, fat
    FROM foods
    ORDER BY name ASC
  `);

  return result.recordset;
};

/**
 * Arama metnine göre besin getirir.
 */
const findFoodsBySearchTerm = async (searchTerm) => {
  const pool = await connectToDatabase();
  const result = await pool.request()
    .input("prefixSearchTerm", sql.NVarChar, `${searchTerm}%`)
    .query(`
      SELECT id, name, category, serving_label, calories, protein, carbs, fat
      FROM foods
      WHERE name LIKE @prefixSearchTerm
      ORDER BY name ASC
    `);

  return result.recordset;
};

module.exports = {
  findAllFoods,
  findFoodsBySearchTerm,
};
