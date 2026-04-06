const API_BASE_URL = "http://localhost:5050/api";

/*
  Search exercise catalog
  Drawer aramasi icin backend uzerinden egzersiz katalog verisini getirir.
*/
export const searchExerciseCatalog = async (searchTerm) => {
  const response = await fetch(
    `${API_BASE_URL}/exercises/catalog/search?q=${encodeURIComponent(searchTerm)}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.error ||
        responseData.message ||
        "Egzersiz araması sırasında bir hata oluştu."
    );
  }

  return responseData;
};

/*
  Create exercise
  Yeni egzersiz kaydini backend'e gonderir.
*/
export const createExercise = async ({
  name,
  durationMinutes,
  caloriesBurned,
}) => {
  const response = await fetch(`${API_BASE_URL}/exercises/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      durationMinutes,
      caloriesBurned,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.error || responseData.message || "Egzersiz eklenemedi."
    );
  }

  return responseData;
};

/*
  Get exercises
  Tum egzersiz kayitlarini backend'den getirir.
*/
export const getExercises = async () => {
  const response = await fetch(`${API_BASE_URL}/exercises/`, {
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.error || responseData.message || "Egzersizler getirilemedi."
    );
  }

  return responseData;
};

/*
  Delete exercise
  Verilen id'ye sahip egzersiz kaydini backend'de siler.
*/
export const deleteExercise = async (exerciseId) => {
  const response = await fetch(`${API_BASE_URL}/exercises/${exerciseId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.error || responseData.message || "Egzersiz silinemedi."
    );
  }

  return responseData;
};
