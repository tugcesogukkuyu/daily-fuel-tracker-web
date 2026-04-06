const { connectToDatabase } = require("../config/database");

/*
  Check database connection
  Uygulamanin SQL Server baglantisini test eder.
*/
const checkDatabaseConnection = async (req, res) => {
  try {
    await connectToDatabase();

    res.json({
      message: "Database connection is successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
};

module.exports = {
  checkDatabaseConnection,
};
