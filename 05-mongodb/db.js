const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function connectDB() {
try {
await client.connect();
console.log("Connected to MongoDB Atlas");
} catch (error) {
console.error("MongoDB connection failed:", error);
}
}

connectDB();

module.exports = { client, connectDB };