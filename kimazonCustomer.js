var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  password:"gsxr600",
  database:"kimazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);

});

connection.query('SELECT * FROM products_table', function(err,res) {
    if(err) throw err;
    var table = [];
    for(var i = 0; i < res.length; i++) {
        var row = [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price,res[i].stock_quantity];
        table.push(row);
    }
    console.table(["ID","Item", "Department", "Price", "Stock"],table);
    start();

});

function start(){

  inquirer.prompt({
    name: "productId",
    type: "item_id",
    message: "Select an item ID"
  })
}
