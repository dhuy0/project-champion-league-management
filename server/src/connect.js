var sql = require("mssql");

const config = {
  server: "localhost",
  user: "sa",
  password: "123456",
  database: "V_League",
  driver: "SQL Server",
  trustServerCertificate: true,
};

const conn = new sql.ConnectionPool(config).connect().then((pool) => {
  return pool;
});

module.exports = {
  conn: conn,
  sql: sql,
};
