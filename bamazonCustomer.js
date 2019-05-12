const mysql = require("mysql");
const inquirer = require("inquirer");
require('dotenv').config();


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.ROOT_KEY,
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;

    connection.query(
        "select * from products",
        function(err, res){
            if (err) throw err;
            console.log("we in this")
            console.log(res)
        }
    )
})
