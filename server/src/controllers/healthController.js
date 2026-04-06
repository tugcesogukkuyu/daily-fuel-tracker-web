/*
  Get health status
  Uygulamanin ayakta oldugunu dogrulayan basit saglik kontrolu cevabi doner.
*/
const getHealthStatus = (req, res) => {
  res.json({ message: "Backend is running" });
};

module.exports = {
  getHealthStatus,
};
