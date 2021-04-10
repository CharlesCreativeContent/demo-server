let mongoose = require("mongoose");

// define the schema for our user model
let pokemonSchema = mongoose.Schema({
  name: String,
  id: Number,
  type: Array,
  moves: Array,
  imgs: Array,
  hp: Number,
  attack: Number,
  defense: Number,
  speed: Number,
});

// create the model for users and expose it to our app
module.exports = mongoose.model("Pokemon", pokemonSchema);
