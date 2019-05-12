drop database if exists bamazon_db;
create database bamazon_db;

use bamazon_db;

create table products(
item_id integer (11) not null auto_increment,
product_name varchar (30) not null,
department_name varchar (30),
price decimal (6,2) not null,
stock_quantity integer (11) not null,
primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
value ("Heat Gun", "Tools", 22.99, 48);

insert into products (product_name, department_name, price, stock_quantity)
value ("Guppy - Tammy Winser", "Fine Art", 550.99, 3);

insert into products (product_name, department_name, price, stock_quantity)
value ("Dry Wall Anchors", "Tools", 6.99, 687);

insert into products (product_name, department_name, price, stock_quantity)
value ("6' HDMI Cable", "Electronics", 12.99, 120);

insert into products (product_name, department_name, price, stock_quantity)
value ("Crochet Hook", "Arts and Crafts", 3.99, 65);

insert into products (product_name, department_name, price, stock_quantity)
value ("Butter Knife", "Kitchen", 13.99, 57);

insert into products (product_name, department_name, price, stock_quantity)
value ("Assorted Rubber Bands", "Arts and Crafts", 4.99, 758);

insert into products (product_name, department_name, price, stock_quantity)
value ("Shoe Horn", "Clothing", 4.99, 83);

insert into products (product_name, department_name, price, stock_quantity)
value ("Golf Glove", "Sports", 18.99, 80);

insert into products (product_name, department_name, price, stock_quantity)
value ("Telescope", "Photo and Video", 250.00, 22);

select * from products;