const {
    getDailyWaterLog,
    saveDailyWaterLog,
  } = require("../services/waterService");
  
  /*
    Get water log
    Kullaniciya ve tarihe ait su kaydini dondurur.
  */
  const getWaterLog = async (req, res) => {
    try {
      const { logDate } = req.query;
      const userId = req.authenticatedUser.id;
  
  
      if (!logDate) {
        return res.status(400).json({
          message: "Log date are required",
        });
      }
  
      const waterLog = await getDailyWaterLog({
        userId: Number(userId),
        logDate,
      });
  
      res.json({
        message: "Water log fetched successfully",
        data: waterLog,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch water log",
        error: error.message,
      });
    }
  };
  
  /*
    Save water log
    Kullaniciya ait gunluk su kaydini olusturur veya gunceller.
  */
  const saveWaterLog = async (req, res) => {
    try {
      const { logDate, cupCount } = req.body;
      const userId = req.authenticatedUser.id;
  
  
      if (!logDate || cupCount === undefined) {
        return res.status(400).json({
          message: "Log date and cup count are required",
        });
      }
  
      const savedWaterLog = await saveDailyWaterLog({
        userId: Number(userId),
        logDate,
        cupCount,
      });
  
      res.json({
        message: "Water log saved successfully",
        data: savedWaterLog,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to save water log",
        error: error.message,
      });
    }
  };
  
  module.exports = {
    getWaterLog,
    saveWaterLog,
  };
  