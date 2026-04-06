const {
  findAllUsers,
  createUser,
  findUserByEmail,
  findUserById,
  updateUserPasswordHash,
  deleteUserAccount,
} = require("../repositories/userRepository");
const { hashPassword, comparePassword } = require("../utils/password");

/*
  Get user list
  Tum kullanicilari veritabanindan getirir.
*/
const getUserList = async () => {
  const userList = await findAllUsers();

  return userList;
};

/*
  Create user record
  Duz sifreyi hashleyip yeni kullanici kaydi olusturur.
*/
const createUserRecord = async ({ fullName, email, password }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("A user with this email already exists");
  }

  const passwordHash = await hashPassword(password);

  const createdUser = await createUser({
    fullName,
    email,
    passwordHash,
  });

  return createdUser;
};

/*
  Login user
  E-posta ile kullaniciyi bulur ve sifreyi dogrular.
*/
const loginUser = async ({ email, password }) => {
  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    return null;
  }

  const isPasswordMatching = await comparePassword(
    password,
    existingUser.password_hash
  );

  if (!isPasswordMatching) {
    return null;
  }

  return {
    id: existingUser.id,
    full_name: existingUser.full_name,
    email: existingUser.email,
    created_at: existingUser.created_at,
  };
};

/*
  Change user password
  Aktif kullanicinin mevcut sifresini dogrular ve yeni sifresini gunceller.
*/
const changeUserPassword = async ({ userId, currentPassword, newPassword }) => {
  const existingUser = await findUserById(userId);

  if (!existingUser) {
    throw new Error("User not found");
  }

  const isPasswordMatching = await comparePassword(
    currentPassword,
    existingUser.password_hash
  );

  if (!isPasswordMatching) {
    throw new Error("Current password is incorrect");
  }

  const passwordHash = await hashPassword(newPassword);

  await updateUserPasswordHash({
    userId,
    passwordHash,
  });
};

/*
  Remove user account
  Aktif kullanicinin sifresini dogrular ve tum hesabini bagli verilerle siler.
*/
const removeUserAccount = async ({ userId, currentPassword }) => {
  const existingUser = await findUserById(userId);

  if (!existingUser) {
    throw new Error("User not found");
  }

  const isPasswordMatching = await comparePassword(
    currentPassword,
    existingUser.password_hash
  );

  if (!isPasswordMatching) {
    throw new Error("Current password is incorrect");
  }

  await deleteUserAccount(userId);
};

module.exports = {
  getUserList,
  createUserRecord,
  loginUser,
  changeUserPassword,
  removeUserAccount,
};
