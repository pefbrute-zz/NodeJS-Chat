var express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  http = require("http").Server(app),
  io = require("socket.io")(http),
  mongoose = require("mongoose");

app.use(express.static(__dirname));

console.log(`Dirname: ${__dirname}`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Message = mongoose.model("Message", {
  name: String,
  message: String,
});

// var dbUrl = 'mongodb://username:password@ds257981.mlab.com:57981/simple-chat'
var dbUrl =
  "mongodb+srv://pefbrute:Tolyan2007@cluster0-nsz4m.mongodb.net/test?retryWrites=true&w=majority";

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.post("/messages", (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if (err) sendStatus(500);
    io.emit("message", req.body);
    res.sendStatus(200);
  });
});

io.on("connection", () => {
  console.log("a user is connected");
});

mongoose.connect(
  dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("mongodb connected", err);
  }
);

var server = http.listen(3000, () => {
  console.log("server is running on port", server.address().port);
});

app.post("/messages", (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if (err) sendStatus(500);
    io.emit("message", req.body);
    res.sendStatus(200);
  });
});
