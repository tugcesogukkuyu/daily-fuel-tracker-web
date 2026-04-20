const API_BASE_URL = "/api";

/*
  Register user
  Yeni kullanici kaydi icin backend'e istek atar.
*/
export const registerUser = async ({ fullName, email, password }) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName,
      email,
      password,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error || responseData.message || "Kayıt başarısız.");
  }

  return responseData;
};

/*
  Login user
  Kullanici girisi icin backend'e istek atar.
*/
export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error || responseData.message || "Giriş başarısız.");
  }

  return responseData;
};

/*
  Get authenticated user
  Gecerli auth cookie varsa aktif kullanici bilgisini backend'den getirir.
*/
export const getAuthenticatedUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.error ||
        responseData.message ||
        "Aktif kullanıcı bilgisi alınamadı."
    );
  }

  return responseData;
};

/*
  Change authenticated user password
  Mevcut sifreyi dogrulayip yeni sifreyi backend'de gunceller.
*/
export const updateAuthenticatedUserPassword = async ({
  currentPassword,
  newPassword,
}) => {
  const response = await fetch(`${API_BASE_URL}/auth/password`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.error || responseData.message || "Şifre güncellenemedi."
    );
  }

  return responseData;
};

/*
  Delete authenticated user account
  Aktif kullanicinin hesabini backend tarafinda bagli kayitlariyla siler.
*/
export const deleteAuthenticatedUserAccount = async ({ currentPassword }) => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentPassword,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.error || responseData.message || "Hesap silinemedi."
    );
  }

  return responseData;
};

/*
  Logout user
  Backend tarafinda auth cookie'sini temizler.
*/
export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error || responseData.message || "Çıkış yapılamadı.");
  }

  return responseData;
};
