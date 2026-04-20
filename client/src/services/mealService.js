const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;
/*
  Create meal
  Yeni yemek kaydini backend'e gonderir.
*/
export const createMeal = async ({
  name,
  mealType,
  calories,
  protein,
  carbs,
  fat,
}) => {
  const response = await fetch(`${API_BASE_URL}/meals/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      mealType,
      calories,
      protein,
      carbs,
      fat,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.error || responseData.message || "Öğün eklenemedi."
    );
  }

  return responseData;
};

/*
  Get meals
  Tum yemek kayitlarini backend'den getirir.
*/
export const getMeals = async () => {
  const response = await fetch(`${API_BASE_URL}/meals/`, {
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.error || responseData.message || "Yemekler getirilemedi."
    );
  }

  return responseData;
};

/*
  Delete meal
  Verilen id'ye sahip yemek kaydini backend'de siler.
*/
export const deleteMeal = async (mealId) => {
  const response = await fetch(`${API_BASE_URL}/meals/${mealId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.error || responseData.message || "Öğün silinemedi."
    );
  }

  return responseData;
};



