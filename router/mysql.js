var mysql= require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'student'
});

connection.connect();
module.exports=connection;