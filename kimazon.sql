create database kimazon;

use kimazon;

create table products_table (
	item_id integer(20) not null auto_increment,
	product_name varchar(100) not null,
    department_name varchar(100) not null,
    price integer(10),
    stock_quantity integer(10),
    primary key (item_id)
    
);

insert into products_table (product_name, department_name, price, stock_quantity)
values ("fidget_spinner", "toys", 5, 5);


insert into products_table (product_name, department_name, price, stock_quantity)
values ("fire_tv", "electronics", 30, 100);

insert into products_table (product_name, department_name, price, stock_quantity)
values ("toothbrush_heads", "personal_care", 16, 100);


insert into products_table (product_name, department_name, price, stock_quantity)
values("stila_eyeliner", "personal_care", 20, 50);

select * from kimazon;