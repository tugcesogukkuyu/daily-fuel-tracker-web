const dotenv = require("dotenv");

dotenv.config();

const environmentConfig = {
  port: process.env.PORT || 5050,
  nodeEnvironment: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  auth: {
    jwtSecret: process.env.JWT_SECRET || "daily_fuel_tracker_secret_key",
    cookieSameSite: process.env.COOKIE_SAME_SITE || "lax",
    cookieSecure: process.env.COOKIE_SECURE === "true",
  },
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT) || 1433,
    name: process.env.DB_NAME,
  },
};

module.exports = environmentConfig;
