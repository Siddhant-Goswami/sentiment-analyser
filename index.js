var express = require("express");
var app = express();
var ml = require("ml-sentiment")();

var redditComments = require("./data/comments.json");

redditComments.forEach(function(comment) {
  comment.sentiment = ml.classify(comment.body);
  if (comment.sentiment >= 5) {
    comment.emoji = "😃";
  } else if (comment.sentiment > 0) {
    comment.emoji = "🙂";
  } else if (comment.sentiment === 0) {
    comment.emoji = "😐";
  } else {
    comment.emoji = "😕";
  }
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/data", function(req, res) {
  res.json(redditComments);
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Your app is listening on port ", 3000);
});