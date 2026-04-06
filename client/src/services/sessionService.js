const CURRENT_USER_STORAGE_KEY = "dailyFuelTrackerCurrentUser";

/*
  Save current user
  Giris yapan veya yeni kayit olan kullaniciyi localStorage'a yazar.
*/
export const saveCurrentUser = (userData) => {
  localStorage.setItem(
    CURRENT_USER_STORAGE_KEY,
    JSON.stringify(userData)
  );
};

/*
  Get current user
  LocalStorage icindeki aktif kullaniciyi okur.
*/
export const getCurrentUser = () => {
  const storedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  return JSON.parse(storedUser);
};

/*
  Clear current user
  Aktif kullanici kaydini localStorage'dan siler.
*/
export const clearCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
};
