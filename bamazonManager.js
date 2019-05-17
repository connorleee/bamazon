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

let lowInventory = () => {
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5",
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

let addInventory = () => {
    connection.query(
        "select * from products",
        function (err, res) {
            if (err) throw err;

            inquirer
                .prompt([
                    {
                        name: "product",
                        message: "Pick product to add inventory to",
                        type: "rawlist",
                        choices: function () {
                            products = [];

                            res.forEach(element => {
                                products.push(element.product_name)
                            });

                            return products;
                        }
                    },
                    {
                        name: "addedQuantity",
                        message: "Quantity to restock?",
                        type: "number"
                    }
                ])
                .then(answers => {
                    let chosenItem;
                    res.forEach(el => {
                        if (el.product_name === answers.product){
                            chosenItem = el;
                        }
                    })

                    let currentQuantity = chosenItem.stock_quantity;

                    connection.query(
                        `UPDATE products SET ? WHERE ?`,
                        [
                            {
                                stock_quantity: currentQuantity + answers.addedQuantity
                            },
                            {
                                product_name: answers.product
                            }
                        ],
                        function (err) {
                            if (err) throw err;

                            // console.log(`Successfully added ${answers.addedQuantity} units of ${answers.product}`);
                        }
                    )
                })
        }
    )
}

managerOptions();