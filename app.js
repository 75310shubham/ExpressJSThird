const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

const uuid = require("uuid");

const resData= require('./util/restaurant-data.js');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/restaurants", function (req, res) {
  const storedRestaurants= resData.getStoredRestaurants();
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

// app.get("/restaurants/:id", function (req, res) {
//   const restaurantId = req.params.id;
//   res.render("restaurant-detail", { rid: restaurantId });
// });

app.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;
  const storedRestaurants= resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }
  
  // res.render("404");
  res.status(404).render("404");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  // const restaurantsName= req.body.name;
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  // const filepath = path.join(__dirname, "data", "restaurants.json");
  // const fileData = fs.readFileSync(filepath);
  // const storedRestaurants = JSON.parse(fileData);
  const restaurants = resData.getStoredRestaurants();
  restaurants.push(restaurant);
  resData.storeRestaurants(restaurants);

  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.use(function (req, res) {
    // res.render("404");
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
    // res.render("500");
  res.status(500).render("500");
});

app.listen(3000);
