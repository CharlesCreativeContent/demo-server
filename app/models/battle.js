let mongoose = require("mongoose");

// define the schema for our user model
let battleSchema = mongoose.Schema({
  email: String,
  player1: Array,
  player2: Array,
});

// create the model for users and expose it to our app
module.exports = mongoose.model("Battle", battleSchema);
