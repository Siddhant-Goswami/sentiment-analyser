var data = require("../data/data.json");
var brain = require("brain.js");

const trainingData = data.map((item) => {
  return { input: item.comment.toLowerCase(), output: item.score };
});

const net = new brain.recurrent.LSTM();
net.train(trainingData, {
  iterations: 30,
  erroThresh: 0.01,
  log: true,
  callbackPeriod: 10,
  callback: function () {
    testBrain();
  },
});

function testBrain() {
  console.log(net.run("small change for one man, big change for humanity."));
  console.log(net.run("this was my fave email you have sent"));
  console.log(net.run("excellent point, i’ll put something together"));
  console.log(net.run("this sucks i wont buy it"));
  console.log(net.run("can't say about it"));
}
