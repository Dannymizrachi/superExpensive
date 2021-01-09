const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Dm123321%",
  database: "shufersal",
});

connection.connect((err) => {
  if (err) {
    console.log("Failed to create connection + " + err);
    return;
  }
  console.log("We're connected to MySQL");
});

function execute(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

function executeWithParameters(sql, parameters) {
  return new Promise((resolve, reject) => {
    connection.query(sql, parameters, (err, result) => {
      if (err) {
        console.log("Failed interacting with DB, calling reject");
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports = {
  execute,
  executeWithParameters,
};
