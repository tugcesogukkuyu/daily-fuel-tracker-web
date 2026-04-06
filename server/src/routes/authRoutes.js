const express = require("express");
const {
  registerUser,
  loginRegisteredUser,
  getAuthenticatedUser,
  updateAuthenticatedUserPassword,
  deleteAuthenticatedUserAccount,
  logoutUser,
} = require("../controllers/authController");
const { requireAuthentication } = require("../middleware/authMiddleware");

const authRouter = express.Router();

/*
  Auth routes
  Kullanici kayit, giris, cikis ve hesap yonetimi endpointlerini tanimlar.
*/
authRouter.post("/register", registerUser);
authRouter.post("/login", loginRegisteredUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/me", requireAuthentication, getAuthenticatedUser);
authRouter.patch("/password", requireAuthentication, updateAuthenticatedUserPassword);
authRouter.delete("/me", requireAuthentication, deleteAuthenticatedUserAccount);

module.exports = authRouter;
