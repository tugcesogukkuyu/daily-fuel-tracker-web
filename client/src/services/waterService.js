const API_BASE_URL = "/api";

/*
  Get water log
  Kullaniciya ve secili tarihe ait su kaydini backend'den getirir.
*/
export const getWaterLog = async ({ logDate }) => {
  const response = await fetch(
    `${API_BASE_URL}/water/?logDate=${logDate}`,
    {
      credentials: "include",
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.error || responseData.message || "Su kaydı getirilemedi."
    );
  }

  return responseData;
};

/*
  Save water log
  Kullaniciya ait gunluk su kaydini backend'de olusturur veya gunceller.
*/
export const saveWaterLog = async ({ logDate, cupCount }) => {
  const response = await fetch(`${API_BASE_URL}/water/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      logDate,
      cupCount,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.error || responseData.message || "Su kaydı kaydedilemedi."
    );
  }

  return responseData;
};
