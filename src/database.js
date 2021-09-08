const mysql = require('mysql');
const { promisify } = require('util');
const database = require('./key');


const pool = mysql.createPool(database);


pool.getConnection((err, con) => {
    if(err) {
        console.error(err);
    } 
    if(con){
        con.release();
        console.log('Database connection is successful');
        return;
    }
})
// Promisify Pool Querys 
pool.query = promisify(pool.query);

module.exports = pool;