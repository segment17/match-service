'use strict';

var mysql = require('mysql');

//TODO: Create database and table during DevOps
/*
CREATE TABLE IF NOT EXISTS matches (
  id INT NOT NULL AUTO_INCREMENT,
  homeBoxerId INT NOT NULL,
  awayBoxerId INT NOT NULL,
  matchTime BIGINT NOT NULL,
  isFinished INT NOT NULL,
  winnerBoxerId INT,
  PRIMARY KEY (id)
);
*/

const connectionSetup = {
  host: process.env.MATCH_MYSQL_SERVICE_SERVICE_HOST != undefined ? process.env.MATCH_MYSQL_SERVICE_SERVICE_HOST : "localhost",
  user: "root",
  password: "root",
  database: "matchservice",
};
console.log('connectionSetup: ', connectionSetup);

var connection = mysql.createConnection(connectionSetup);

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = { connection };
