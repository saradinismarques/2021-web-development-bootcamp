//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great fruit."
});

pineapple.save();

const person = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
});

person.save();

const mango = new Fruit({
  name: "Mango",
  score: 6,
  review: "Decent fruit"
});

mango.save();

Person.updateOne({name: "John"}, {favouriteFruit: mango}, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Succesfully updated the document.")
  }
});

const kiwi = new Fruit({
  name: "Kiwi",
  score: 10,
  review: "The best fruit!"
});

const orange = new Fruit({
  name: "Orange",
  score: 4,
  review: "Too sour for me"
});

const banana = new Fruit({
  name: "Banana",
  score: 3,
  review: "Weird texture"
});

Fruit.insertMany([kiwi, orange, banana], function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Successfully saved all the fruits to fruitsDB")
  }
});

Fruit.find(function(err, fruits) {
  if(err) {
    console.log(err);
  } else {

    mongoose.connection.close();

    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    })
  }
});

Fruit.updateOne({_id: "602a955137c5e4b978e21960"}, {rating: 8}, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Succesfully updated the document.")
  }
});

Fruit.deleteOne({name: "Kiwi"}, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Succesfully deleted the document.")
  }
});

Person.deleteMany({name: "John"}, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Succesfully deleted all the documents")
    }
});

