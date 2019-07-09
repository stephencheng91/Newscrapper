var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB, nor create news database in mongo
// mongoose.connect("mongodb://localhost/news", { useNewUrlParser: true });

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://kuan93017:Ste20022468@ds221416.mlab.com:21416/heroku_mqdtbgp9";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes 
// A GET route for scraping the website
app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.foxnews.com/category/us/crime").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    //create empty object to store scrape data
    var result = {};
    $(".article").each(function (i, element) {
      //Add title, summary, url to result object
      result.title = $(this).find(".title").children().text();
      result.link = $(this).find(".title").children().attr("href");
      result.summary = $(this).find(".content").children().children().text()

      console.log("result: ", result);

      //Push result to collection article
      db.Article.create(result)
      .then(function(res){
        // console.log(res)
      })
      .catch(function(err){
        // console.log("err,,", err)
      })

    })

    //console.log(result);


    // Send a message to the client
    res.send("Scrape Complete");
  });
});

app.get("/article", function(req, res){
  db.Article.find({})
  .then(function(dbArticle){
    res.json(dbArticle);
  })
  .catch(function(err){
    res.json(err);
  });
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
