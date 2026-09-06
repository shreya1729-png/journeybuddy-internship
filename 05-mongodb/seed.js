const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Generates a small synthetic embedding vector (for demo purposes only).
// In production, this would be a real embedding from a model like OpenAI's text-embedding-3-small.
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
  {
    title: "Beach Getaway in Goa",
    category: "beach",
    region: "India",
    price_tier: "budget",
    description: "A relaxing coastal escape with beaches, seafood, and nightlife.",
  },
  {
    title: "Himalayan Trek in Manali",
    category: "mountain",
    region: "India",
    price_tier: "mid",
    description: "Snow-capped peaks, alpine trails, and adventure sports in the Himalayas.",
  },
  {
    title: "Luxury Retreat in Dubai",
    category: "city",
    region: "UAE",
    price_tier: "luxury",
    description: "Skyscrapers, desert safaris, and five-star shopping experiences.",
  },
  {
    title: "Backpacking in Hampi",
    category: "heritage",
    region: "India",
    price_tier: "budget",
    description: "Ancient ruins, boulder landscapes, and a laid-back backpacker scene.",
  },
  {
    title: "Island Hopping in Maldives",
    category: "beach",
    region: "Maldives",
    price_tier: "luxury",
    description: "Overwater villas, coral reefs, and crystal-clear turquoise water.",
  },
  {
    title: "Wildlife Safari in Ranthambore",
    category: "wildlife",
    region: "India",
    price_tier: "mid",
    description: "Tiger spotting, jungle safaris, and rustic forest lodges.",
  },
  {
    title: "Cultural Tour in Kyoto",
    category: "heritage",
    region: "Japan",
    price_tier: "mid",
    description: "Ancient temples, cherry blossoms, and traditional tea ceremonies.",
  },
  {
    title: "Budget Hostel Hopping in Bangkok",
    category: "city",
    region: "Thailand",
    price_tier: "budget",
    description: "Street food, night markets, and vibrant backpacker hostels.",
  },
];

async function seed() {
  try {
    await client.connect();
    const db = client.db("journeybuddy");
    const collection = db.collection("destinations");

    await collection.deleteMany({});

    const docs = destinations.map((dest, index) => ({
      ...dest,
      embedding: fakeEmbedding(index + 1),
    }));

    const result = await collection.insertMany(docs);
    console.log(`Inserted ${result.insertedCount} documents into 'destinations' collection.`);
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await client.close();
  }
}

seed();