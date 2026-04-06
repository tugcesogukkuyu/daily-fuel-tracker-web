const {
  createUserRecord,
  loginUser,
  changeUserPassword,
  removeUserAccount,
} = require("../services/userService");
const { createAuthToken } = require("../utils/token");
const environmentConfig = require("../config/env");

const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: environmentConfig.auth.cookieSameSite,
  secure: environmentConfig.auth.cookieSecure,
  path: "/",
};

/*
  Register user
  Yeni kullanici kaydi olusturur.
*/
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Ad soyad, e-posta ve şifre zorunludur.",
      });
    }

    const createdUser = await createUserRecord({
      fullName,
      email,
      password,
    });

    const authToken = createAuthToken(createdUser);

    res
      .cookie("authToken", authToken, AUTH_COOKIE_OPTIONS)
      .status(201)
      .json({
        message: "Kayıt başarılı.",
        data: createdUser,
      });
  } catch (error) {
    if (error.message === "A user with this email already exists") {
      return res.status(409).json({
        message: "Bu e-posta ile kayıtlı bir kullanıcı zaten var.",
      });
    }

    res.status(500).json({
      message: "Kayıt işlemi başarısız oldu.",
      error: error.message,
    });
  }
};

/*
  Login user
  E-posta ve sifre ile kullanici girisini kontrol eder.
*/
const loginRegisteredUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "E-posta ve şifre zorunludur.",
      });
    }

    const loggedInUser = await loginUser({
      email,
      password,
    });

    if (!loggedInUser) {
      return res.status(401).json({
        message: "E-posta veya şifre hatalı.",
      });
    }

    const authToken = createAuthToken(loggedInUser);

    res
      .cookie("authToken", authToken, AUTH_COOKIE_OPTIONS)
      .json({
        message: "Giriş başarılı.",
        data: loggedInUser,
      });
  } catch (error) {
    res.status(500).json({
      message: "Giriş işlemi başarısız oldu.",
      error: error.message,
    });
  }
};

/*
  Get current authenticated user
  Gecerli auth token varsa aktif kullanici bilgisini dondurur.
*/
const getAuthenticatedUser = async (req, res) => {
  res.json({
    message: "Aktif kullanıcı bilgisi alındı.",
    data: {
      id: req.authenticatedUser.id,
      email: req.authenticatedUser.email,
      full_name: req.authenticatedUser.fullName,
    },
  });
};

/*
  Change password
  Aktif kullanicinin sifresini mevcut sifre dogrulamasiyla gunceller.
*/
const updateAuthenticatedUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Mevcut şifre ve yeni şifre zorunludur.",
      });
    }

    await changeUserPassword({
      userId: req.authenticatedUser.id,
      currentPassword,
      newPassword,
    });

    res.json({
      message: "Şifre başarıyla güncellendi.",
    });
  } catch (error) {
    if (error.message === "Current password is incorrect") {
      return res.status(401).json({
        message: "Mevcut şifre hatalı.",
      });
    }

    res.status(500).json({
      message: "Şifre güncellenemedi.",
      error: error.message,
    });
  }
};

/*
  Delete authenticated user account
  Aktif kullanicinin hesabini bagli kayitlariyla birlikte siler.
*/
const deleteAuthenticatedUserAccount = async (req, res) => {
  try {
    const { currentPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({
        message: "Hesabı silmek için mevcut şifre zorunludur.",
      });
    }

    await removeUserAccount({
      userId: req.authenticatedUser.id,
      currentPassword,
    });

    res
      .clearCookie("authToken", AUTH_COOKIE_OPTIONS)
      .json({
        message: "Hesap başarıyla silindi.",
      });
  } catch (error) {
    if (error.message === "Current password is incorrect") {
      return res.status(401).json({
        message: "Mevcut şifre hatalı.",
      });
    }

    res.status(500).json({
      message: "Hesap silinemedi.",
      error: error.message,
    });
  }
};

/*
  Logout user
  Auth cookie'sini temizler ve oturumu kapatir.
*/
const logoutUser = (req, res) => {
  res
    .clearCookie("authToken", AUTH_COOKIE_OPTIONS)
    .json({
      message: "Çıkış başarılı.",
    });
};

module.exports = {
  registerUser,
  loginRegisteredUser,
  getAuthenticatedUser,
  updateAuthenticatedUserPassword,
  deleteAuthenticatedUserAccount,
  logoutUser,
};
