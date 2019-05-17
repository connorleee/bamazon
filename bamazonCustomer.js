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

connection.connect(function (err) {
    if (err) throw err;

    connection.query(
        "select * from products",
        function (err, res) {
            if (err) throw err;

            inquirer
                .prompt([
                    {
                        name: "product",
                        message: "What product ID would you like to purchase?",
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
                        name: "purchaseQty",
                        message: `How many would you like to purchase?`,
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

                    let availableQty = chosenItem.stock_quantity;

                    if (answers.purchaseQty > availableQty){
                        console.log(`Sorry, but we do not have that many ${answers.product}s in stock. Please submit a new order with a quantity less than or equal to ${availableQty}`)
                    } else {
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: availableQty - answers.purchaseQty
                                },
                                {
                                    product_name: answers.product
                                }
                            ],
                            (err) => {
                                if (err) throw err;
                                console.log(`Thank you for your purchase!`)
                            }
                        )
                        
                        connection.end();
                    }
                });
        }
    );

})