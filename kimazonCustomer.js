var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

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

function start() {

  inquirer.prompt([
  {
    name: "productId",
    type: "input",
    message: "Select an item ID"
  }, {
      name: "customerQuantity",
      type: "input",
      message:"How many would you like to buy?"

  }]).then(function(answer) {

    var customerChoice = answer.productId;
    var customerQuantity = answer.customerQuantity;
    connection.query("SELECT price, department_name, stock_quantity FROM products_table WHERE ?", {item_id: customerChoice} , function(err, res) {
      var price = res[0].price;
      var quantity = res[0].stock_quantity;
      var departmentName = res[0].department_name;
        if (customerQuantity > quantity) {
          console.log("------insufficient quantity------");
        }
        else {
          var newStockQuantity = parseInt(quantity) - parseInt(customerQuantity);
          var totalSales = parseInt(price) * parseInt(customerQuantity);
            console.log("PURCHASE DETAILS | Total Cost: " +totalSales + "\n  Number of Items Purchased: " + customerQuantity+"\n\n");
            connection.query('UPDATE departments SET ? WHERE ?',[
                    {
                          total_sales: totalSales
                    },{
                                department_name: departmentName
                            }],
                            function(err,res) {return});
                        connection.query('UPDATE products SET ? WHERE ?', [
                            {stock_quantity: newStockQuantity},
                            {item_id: customerChoice}],
                            function(err,res) {
                        })


        }
    })

  })
}
