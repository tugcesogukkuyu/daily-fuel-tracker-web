const {
    findWaterLogByUserAndDate,
    createWaterLog,
    updateWaterLog,
  } = require("../repositories/waterRepository");
  
  /*
    Get daily water log
    Kullaniciya ve secili tarihe ait su kaydini getirir.
  */
  const getDailyWaterLog = async ({ userId, logDate }) => {
    const existingWaterLog = await findWaterLogByUserAndDate({
      userId,
      logDate,
    });
  
    return existingWaterLog;
  };
  
  /*
    Save daily water log
    Gunluk su kaydi varsa gunceller, yoksa yeni kayit olusturur.
  */
  const saveDailyWaterLog = async ({ userId, logDate, cupCount }) => {
    const existingWaterLog = await findWaterLogByUserAndDate({
      userId,
      logDate,
    });
  
    if (existingWaterLog) {
      return updateWaterLog({
        userId,
        logDate,
        cupCount,
      });
    }
  
    return createWaterLog({
      userId,
      logDate,
      cupCount,
    });
  };
  
  module.exports = {
    getDailyWaterLog,
    saveDailyWaterLog,
  };
  