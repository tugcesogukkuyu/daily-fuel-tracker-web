const { getUserList } = require("../services/userService");

/*
  Get users
  Tum kullanicilari listelemek icin kullanilir.
*/
const getUsers = async (req, res) => {
  try {
    const userList = await getUserList();

    res.json({
      message: "Users fetched successfully",
      data: userList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
};
