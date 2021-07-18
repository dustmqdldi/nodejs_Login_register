var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'tutorials'
});
  
connection.connect();

const queryreturn = (query) =>{
  return new Promise(function(resolve, reject) 
    {
      connection.query(String(query), function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      })
    })
}
 
module.exports = { queryreturn };
