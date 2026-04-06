const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

/*
  Hash password
  Duz sifreyi guvenli hash degerine cevirir.
*/
const hashPassword = async (plainPassword) => {
  const passwordHash = await bcrypt.hash(plainPassword, SALT_ROUNDS);

  return passwordHash;
};

/*
  Compare password
  Duz sifre ile kayitli hash degerinin eslesip eslesmedigini kontrol eder.
*/
const comparePassword = async (plainPassword, passwordHash) => {
  const isPasswordMatching = await bcrypt.compare(plainPassword, passwordHash);

  return isPasswordMatching;
};

module.exports = {
  hashPassword,
  comparePassword,
};
