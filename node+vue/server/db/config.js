var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit : 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings:true
});
var _connection = function(callback) {
	pool.getConnection(function(err, connection) {
		callback(err,connection);
	});
};
exports._connection = _connection;
