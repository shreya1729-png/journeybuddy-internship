const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Same synthetic embedding generator used in seed.js,
// so a "query" can be embedded the same way sample data was.
function fakeEmbedding(seed) {
  const vector = [];
  let x = seed;
  for (let i = 0; i < 16; i++) {
    x = (x * 9301 + 49297) % 233280;
    vector.push(parseFloat(((x / 233280) * 2 - 1).toFixed(4)));
  }
  return vector;
}

async function hybridSearch() {
  try {
    await client.connect();
    const db = client.db("journeybuddy");
    const collection = db.collection("destinations");

    // Simulate a user query embedding (e.g. "affordable beach trip in India")
    const queryVector = fakeEmbedding(1);

    const results = await collection
      .aggregate([
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embedding",
            queryVector: queryVector,
            numCandidates: 50,
            limit: 10,
            filter: {
              region: { $eq: "India" },
              price_tier: { $eq: "budget" },
            },
          },
        },
        {
          $project: {
            _id: 0,
            title: 1,
            category: 1,
            region: 1,
            price_tier: 1,
            description: 1,
            score: { $meta: "vectorSearchScore" },
          },
        },
      ])
      .toArray();

    console.log("Hybrid search results (vector similarity + metadata filter):");
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error("Hybrid search failed:", error);
  } finally {
    await client.close();
  }
}

hybridSearch();