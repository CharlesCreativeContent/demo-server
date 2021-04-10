const username = "arcade";
const pass = "bootcamp2020b!";
const collection = "arcade";

const connectionString = `mongodb+srv://${username}:${pass}@cluster0.56mug.mongodb.net/${collection}?retryWrites=true&w=majority`; // Cluster might need to change

module.exports = {
  url: connectionString,
};
