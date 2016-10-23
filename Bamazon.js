var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "TromboneBaritoneFrog",
	database: "bamazon"
})

connection.connect(function(err) {
	if (err) throw err;
	console.log("Connected as ID "+connection.threadId);
	start();
})

var start = function(){
	console.log("*****************************************")
	console.log("********** Welcome to Bamazon! **********")
	console.log("*****************************************\n")
	console.log("Choose a Product ID to purchase that item")
	console.log("*****************************************\n")

	connection.query("SELECT * FROM products", function(err, res){
		for (var i = 0; i < res.length; i++){
			console.log("Product ID: "+ res[i].id);
			console.log("Item: "+ res[i].productName);
			console.log("Department: "+res[i].departmentName);
			console.log("Price: "+res[i].price);
			console.log("Quantity in Stock: "+res[i].stockQuantity);
			console.log("*****************************************\n");

		}
	})

	runchoice();
}

var runchoice = function(){
	inquirer.prompt([{
		name: "choice",
		type: "input",
		message: "\nPlease enter an item ID number:",
		validate: function(value){
			if (isNaN(value) == false) {
				return true;
			}
			else {
				console.log("\nPlease choose a valid ID number")
				return false;
			}
		}
	}, {
		name: "quantity",
		type: "input",
		message: "\nPlease enter a quantity:",
		validate: function(value){
			if (isNaN(value) == false){
				return true;
			}
			else {
				console.log("\nPlease enter a valid number for the quantity")
				return false;
			}
		}
		
		}]).then(function(answer){
		//connection.query("SELECT * FROM products WHERE id="+choice, )
		console.log(choice);
		console.log(quantity);
		})
}