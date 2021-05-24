'use strict';

var mysql = require('mysql');

const connectionSetup = {
  host: process.env.MATCH_MYSQL_SERVICE_ADDR || "localhost",
  user: "root",
  password: "root",
  database: "matchservice",
};

var connection = mysql.createConnection(connectionSetup);

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = {
  connection
};
