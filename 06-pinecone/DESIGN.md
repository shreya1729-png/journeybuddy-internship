# Module 6 — Pinecone Data Model & Query Design

## 1. Vector Record Structure

Each record in the journeybuddy-destinations index consists of three parts:

{
  "id": "1",
  "values": [0.021, -0.114, 0.087, ...],
  "metadata": {
    "title": "Beach Getaway in Goa",
    "category": "beach",
    "region": "India",
    "price_tier": "budget"
  }
}

- id (string) — unique identifier for the record
- values (array of 16 floats) — the vector embedding, compared using cosine similarity
- metadata (object) — structured fields attached to the vector, used for filtering during queries

## 2. Index Configuration

- Name: journeybuddy-destinations
- Type: Serverless (AWS, us-east-1)
- Dimension: 16
- Metric: cosine

Pinecone serverless indexes automatically handle scaling and do not require manual sharding or capacity planning, unlike pod-based indexes.

## 3. Hybrid Query Flow

Pinecone supports combining vector similarity search with metadata filtering in a single query call:

1. A query vector is generated (in production, from an embedding model; here, a synthetic deterministic vector for demo purposes).
2. The query() call is sent with:
   - vector — the query embedding
   - filter — a metadata condition, e.g. { region: { $eq: "India" }, price_tier: { $eq: "budget" } }
   - topK — how many top results to return
3. Pinecone applies the metadata filter to narrow the candidate set, then ranks remaining candidates by cosine similarity to the query vector, returning the top K matches with their similarity scores.

This mirrors the same hybrid retrieval pattern used in the MongoDB Atlas Vector Search module (Module 5), demonstrating the same conceptual approach across two different vector database platforms.

## 4. Query Example

Conceptual call used in query.js:

index.query({
  vector: [...],
  topK: 5,
  includeMetadata: true,
  filter: {
    region: { $eq: "India" },
    price_tier: { $eq: "budget" }
  }
})

## 5. Comparison Notes: Pinecone vs MongoDB Atlas Vector Search

- Both support combining metadata filters with vector similarity in a single query.
- MongoDB Atlas requires filter fields to be explicitly declared in the vector index definition; Pinecone allows filtering on any metadata field without a separate filter-field declaration.
- Pinecone is a dedicated vector database (vector search is its primary purpose); MongoDB Atlas Vector Search is a feature added on top of a general-purpose document database.
- Pinecone's upsert API in the installed SDK version expects records wrapped in a { records: [...] } object rather than a raw array — a version-specific detail confirmed by inspecting the SDK source directly.

## 6. Limitations & Notes

- Embeddings are synthetic (deterministically generated), matching the approach used in Module 5, for the same reason: no paid embedding API was used for this demo.
- The dataset is intentionally small (8 sample records) to keep the demo lightweight.