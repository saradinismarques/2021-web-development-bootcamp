//jshint esversion:6

const express = require("express");

const app = express();

app.get("/", function(req, res) { //callback function to tells the server what to do if that request happens by the browser, response that server sentss
    res.send("<h1>Hello World!<\h1>");
});

app.get("/contact", function(req, res) {
    res.send("Contact me at: sara.filipadinis@gmail.com")
});

app.get("/about", function(req, res) {
    res.send("My name is Sara and I love to code.");
});

app.listen(3000, function() {
   console.log("Server started on port 3000"); 
});

