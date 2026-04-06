const sql = require("mssql");
const environmentConfig = require("./env");

const { database } = environmentConfig;

const databaseConfig = {
  user: database.user,
  password: database.password,
  server: database.server,
  port: database.port,
  database: database.name,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

/*
  Connect to database
  SQL Server baglantisini kurar ve aktif connection pool dondurur.
*/
const connectToDatabase = async () => {
  const databaseConnection = await sql.connect(databaseConfig);

  return databaseConnection;
};

module.exports = {
  sql,
  connectToDatabase,
};
