const fs = require("fs");
const path = require("path");
const { connectToDatabase, sql } = require("../src/config/database");

const foodsJsonPath = path.join(__dirname, "../src/data/foods.json");

async function seedFoods() {
  const foods = JSON.parse(fs.readFileSync(foodsJsonPath, "utf8"));
  const pool = await connectToDatabase();
  const transaction = new sql.Transaction(pool);
  await transaction.begin();

  try {
    const existingResult = await new sql.Request(transaction).query(
      "SELECT name, category FROM foods"
    );

    const existingKeys = new Set(
      existingResult.recordset.map((row) => `${row.name}__${row.category}`)
    );

    let inserted = 0;
    let updated = 0;

    for (const food of foods) {
      const key = `${food.name}__${food.category}`;
      const request = new sql.Request(transaction);

      request.input("name", sql.NVarChar(150), food.name);
      request.input("category", sql.NVarChar(100), food.category);
      request.input("serving_label", sql.NVarChar(100), food.servingLabel);
      request.input("calories", sql.Int, food.calories);
      request.input("protein", sql.Decimal(6, 2), food.protein);
      request.input("carbs", sql.Decimal(6, 2), food.carbs);
      request.input("fat", sql.Decimal(6, 2), food.fat);

      if (existingKeys.has(key)) {
        await request.query(`
          UPDATE foods
          SET serving_label = @serving_label,
              calories = @calories,
              protein = @protein,
              carbs = @carbs,
              fat = @fat
          WHERE name = @name AND category = @category
        `);
        updated += 1;
      } else {
        await request.query(`
          INSERT INTO foods (name, category, serving_label, calories, protein, carbs, fat)
          VALUES (@name, @category, @serving_label, @calories, @protein, @carbs, @fat)
        `);
        inserted += 1;
      }
    }

    await transaction.commit();

    const totalResult = await pool.request().query(
      "SELECT COUNT(*) AS total FROM foods"
    );

    console.log(
      JSON.stringify(
        {
          inserted,
          updated,
          total: totalResult.recordset[0].total,
        },
        null,
        2
      )
    );
  } catch (error) {
    await transaction.rollback();
    throw error;
  } finally {
    await pool.close();
  }
}

seedFoods().catch((error) => {
  console.error("Foods seed failed:", error);
  process.exit(1);
});
