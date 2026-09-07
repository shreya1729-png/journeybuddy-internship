require("dotenv").config();
const { Pinecone } = require("@pinecone-database/pinecone");

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

// Same synthetic embedding generator used in the MongoDB module,
// so results are comparable across both systems.
function fakeEmbedding(seed) {
  const vector = [];
  let x = seed;
  for (let i = 0; i < 16; i++) {
    x = (x * 9301 + 49297) % 233280;
    vector.push(parseFloat(((x / 233280) * 2 - 1).toFixed(4)));
  }
  return vector;
}

const destinations = [
  { id: "1", title: "Beach Getaway in Goa", category: "beach", region: "India", price_tier: "budget" },
  { id: "2", title: "Himalayan Trek in Manali", category: "mountain", region: "India", price_tier: "mid" },
  { id: "3", title: "Luxury Retreat in Dubai", category: "city", region: "UAE", price_tier: "luxury" },
  { id: "4", title: "Backpacking in Hampi", category: "heritage", region: "India", price_tier: "budget" },
  { id: "5", title: "Island Hopping in Maldives", category: "beach", region: "Maldives", price_tier: "luxury" },
  { id: "6", title: "Wildlife Safari in Ranthambore", category: "wildlife", region: "India", price_tier: "mid" },
  { id: "7", title: "Cultural Tour in Kyoto", category: "heritage", region: "Japan", price_tier: "mid" },
  { id: "8", title: "Budget Hostel Hopping in Bangkok", category: "city", region: "Thailand", price_tier: "budget" },
];

async function upsert() {
  const index = pc.index("journeybuddy-destinations").namespace("default");

  const vectors = destinations.map((dest, i) => ({
    id: dest.id,
    values: fakeEmbedding(i + 1),
    metadata: {
      title: dest.title,
      category: dest.category,
      region: dest.region,
      price_tier: dest.price_tier,
    },
  }));

 
await index.upsert({ records: vectors });
  console.log(`Upserted ${vectors.length} vectors to Pinecone.`);
}

upsert().catch((err) => console.error("Upsert failed:", err));