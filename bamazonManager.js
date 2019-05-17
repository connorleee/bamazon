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

function managerOptions() {
    connection.connect(function (err) {
        if (err) throw err;

        connection.query(
            "SELECT * FROM products",
            function (err, res) {
                if (err) throw err;

                console.log(res);

                inquirer
                    .prompt([
                        {
                            name: "managerOptions",
                            message: "Manager Options",
                            type: "rawlist",
                            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
                        }
                    ])
                    .then(answers => {
                        switch (answers.managerOptions) {
                            case "View Products for Sale":
                                products();
                                break

                            case "View Low Inventory":
                                lowInventory();
                                break

                            case "Add to Inventory":
                                addInventory();
                                break

                            case "Add New Product":
                                addProduct();
                                break

                            default:
                                console.log("error")
                        }
                        
                        connection.end();
                    })
            }
        )
    })
}


let products = () => {
    connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;

            let products = [];

            for (let i = 0; i < res.length; i++) {
                const el = res[i];

                products.push(el.product_name);
            }

            console.log(products.join("\n"));
        }
    )
}

managerOptions();