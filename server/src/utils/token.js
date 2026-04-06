const jwt = require("jsonwebtoken");
const environmentConfig = require("../config/env");

const JWT_SECRET = environmentConfig.auth.jwtSecret;

/*
  Create auth token
  Giris yapan kullanici icin imzali JWT token olusturur.
*/
const createAuthToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      fullName: user.full_name,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

/*
  Verify auth token
  Gelen JWT token'in gecerliligini kontrol eder.
*/
const verifyAuthToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  createAuthToken,
  verifyAuthToken,
};
