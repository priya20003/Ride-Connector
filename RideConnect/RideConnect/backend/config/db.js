// config/db.js
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : process.env.DB_HOST || 'localhost',
  user     : process.env.DB_USER || 'root',
  password : process.env.DB_PASS || '',
  database : process.env.DB_NAME || 'rideconnect'
});
connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});
module.exports = connection;
