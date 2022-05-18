function addNewProduct() {
  //empty array to dynamically populate current departments
  var deptChoices = [];
  //selects all departments, pushes the id and name for each into the array
  connection.query("SELECT * FROM departments", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      deptChoices.push(data[i].dept_id + " - " + data[i].dept_name);
    }
  });
  inquirer
    .prompt([
      {
        message: "What product would you like to add?",
        type: "input",
        name: "product",
      },
      {
        message: "What department does it belong in?",
        type: "list",
        //inquirer choices accept arrays, using the one created above
        choices: deptChoices,
        name: "dept",
      },
      {
        message: "Retail price of product?",
        type: "input",
        name: "price",
      },
      {
        message: "How many to add?",
        type: "input",
        name: "count",
      },
    ])
    .then(function (answer) {
      var newProduct = answer.product;
      console.log(newProduct);
      //sets dept equal to the first index of the string chosen from our array 'deptChoices
      //since the array is created as "dept_id + ..." this will always be our id
      var dept = parseInt(answer.dept[0]);
      var price = parseFloat(answer.price);
      var quant = parseInt(answer.count);
      connection.query(
        "INSERT INTO products (product_name, department, price, stock_quantity, product_sales) VALUES(?,?,?,?,0.00)",
        [newProduct, dept, price, quant],
        function (err) {
          if (err) throw err;
          viewProducts();
        }
      );
    });
}
