//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); //local module

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"]; //even tho we push items to the array it's a const (we can't assign it to a new array)
const workItems = [];

app.set('view engine', "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

    const day = date.getDate(); //running getDate

    res.render("list", {
        listTitle: day,
        newListItem: items
    });

});

app.post("/", function(req, res) {

    const item = req.body.newItem;
    
    if(req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");  
    } else {
        items.push(item); //pushing every item the user types so it doesn't get overwritten
        res.redirect("/"); //when a post request is triggered, it will redirect to home route which triggers app.get for the home route
    }
});

app.get("/work", function(req, res) {

    res.render("list", {
        listTitle: "Work List",
        newListItem: workItems
    });
});

app.get("/about", function(req, res) {

    res.render("about");
})

app.listen(3000, function(){

  console.log("Server started on port 3000.");
});
