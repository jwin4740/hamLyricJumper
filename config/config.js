var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "bmsyhziszmhf61g1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "tdvjvjugdyc44t1p",
  password: "w579cl2u3j1ojaal",
  database: "mroulygl42e5y8jp"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
