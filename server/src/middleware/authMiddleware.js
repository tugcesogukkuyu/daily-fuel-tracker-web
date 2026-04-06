const { verifyAuthToken } = require("../utils/token");

/*
  Require authentication
  Gelen istekte auth cookie'si varsa token'i dogrular ve kullaniciyi req icine yazar.
*/
const requireAuthentication = (req, res, next) => {
  try {
    const authToken = req.cookies?.authToken;

    if (!authToken) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const decodedToken = verifyAuthToken(authToken);

    req.authenticatedUser = {
      id: decodedToken.userId,
      email: decodedToken.email,
      fullName: decodedToken.fullName,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired authentication token",
    });
  }
};

module.exports = {
  requireAuthentication,
};
