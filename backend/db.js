// CONFIG DATABASE
const pg = require("pg");
const {Pool} = pg  

const pool = new Pool({
    user:"postgres",
    password:"shaST",
    host:"localhost",
    port:5432,
    database:'jwt'
});

pool.query("SELECT 1", (err, result)=>{
    if(err){
        console.error("Error executing query: ", err);
    }
    else{
        console.log("Connected to the PostgresSQL server");
    }
});

module.exports = pool;