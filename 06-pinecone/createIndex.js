require("dotenv").config();
const { Pinecone } = require("@pinecone-database/pinecone");

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

async function createIndex() {
  const indexName = "journeybuddy-destinations";

  const existing = await pc.listIndexes();
  const alreadyExists = existing.indexes?.some((idx) => idx.name === indexName);

  if (alreadyExists) {
    console.log(`Index "${indexName}" already exists. Skipping creation.`);
    return;
  }

  await pc.createIndex({
    name: indexName,
    dimension: 16,
    metric: "cosine",
    spec: {
      serverless: {
        cloud: "aws",
        region: "us-east-1",
      },
    },
  });

  console.log(`Index "${indexName}" created successfully.`);
}

createIndex().catch((err) => console.error("Error creating index:", err));