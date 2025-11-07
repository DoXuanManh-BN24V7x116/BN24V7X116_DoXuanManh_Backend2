const { MongoClient } = require("mongodb");
const config = require("../config/index.js");

let dbConnection = null;

async function connectToDatabase() {
  if (dbConnection) return dbConnection;

  const client = new MongoClient(config.db.uri);
  await client.connect();
  console.log("✅ Connected to MongoDB");
  dbConnection = client.db(); // save DB instance
  return dbConnection;
}

module.exports = { connectToDatabase };
