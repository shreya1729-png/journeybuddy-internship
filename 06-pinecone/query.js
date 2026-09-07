require("dotenv").config();
const { Pinecone } = require("@pinecone-database/pinecone");

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

function fakeEmbedding(seed) {
  const vector = [];
  let x = seed;
  for (let i = 0; i < 16; i++) {
    x = (x * 9301 + 49297) % 233280;
    vector.push(parseFloat(((x / 233280) * 2 - 1).toFixed(4)));
  }
  return vector;
}

async function query() {
  const index = pc.index("journeybuddy-destinations").namespace("default");

  const queryVector = fakeEmbedding(1);

  const results = await index.query({
    vector: queryVector,
    topK: 5,
    includeMetadata: true,
    filter: {
      region: { $eq: "India" },
      price_tier: { $eq: "budget" },
    },
  });

  console.log("Pinecone hybrid search results (vector similarity + metadata filter):");
  results.matches.forEach((match) => {
    console.log(`- ${match.metadata.title} (score: ${match.score.toFixed(4)})`);
  });
}

query().catch((err) => console.error("Query failed:", err));