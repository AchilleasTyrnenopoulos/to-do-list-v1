const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = [];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//use ejs as view engine
app.set('view engine', 'ejs');

//get requests
app.get("/", function(req, res) {
  //res.send("Hello");

  const day = date.getDate();

  res.render("list", {listTitle: day, newListItems: items});
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});
//post requests
app.post("/", function(req, res){
  const item = req.body.newItem;

  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  }
  else {
    items.push(item);
    res.redirect("/");
  }

});



app.listen(3000, function() {
  console.log("Server is listening to port 3000");
});
