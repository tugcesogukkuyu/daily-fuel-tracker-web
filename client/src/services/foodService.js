const API_BASE_URL = "/api";

/**
 * Arama metnine göre besin listesi getirir.
 */
export const searchFoods = async (searchTerm) => {
  const response = await fetch(
    `${API_BASE_URL}/foods/search?q=${encodeURIComponent(searchTerm)}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Besin araması başarısız oldu.");
  }

  return responseData;
};

/**
 * Tüm besin listesini getirir.
 */
export const getFoods = async () => {
  const response = await fetch(`${API_BASE_URL}/foods`, {
    method: "GET",
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Besin listesi alınamadı.");
  }

  return responseData;
};
