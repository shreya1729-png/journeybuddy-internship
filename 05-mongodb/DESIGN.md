# Module 5 — Data Model & Hybrid Retrieval Design

## 1. Document Data Model

Each document in the `journeybuddy.destinations` collection represents a travel destination, combining regular metadata fields with a vector embedding field.

Example document:

{
  "title": "Beach Getaway in Goa",
  "category": "beach",
  "region": "India",
  "price_tier": "budget",
  "description": "A relaxing coastal escape with beaches, seafood, and nightlife.",
  "embedding": [0.021, -0.114, 0.087, ...]
}

Field descriptions:

- title (string) — display name of the destination
- category (string) — type of trip (beach, mountain, city, heritage, wildlife)
- region (string) — country or region, used for metadata filtering
- price_tier (string) — budget / mid / luxury, used for metadata filtering
- description (string) — human-readable text describing the destination; this is the conceptual source of the embedding
- embedding (array of floats) — a 16-dimensional numeric vector representing the semantic meaning of the description, used for similarity search

## 2. Indexing Strategy

A single Atlas Vector Search index (vector_index) is defined on the destinations collection with three fields:

1. embedding — type: vector, 16 dimensions, cosine similarity. This is the field vector search compares against the query vector.
2. region — type: filter. Allows the query to restrict results to a specific region before/alongside similarity ranking.
3. price_tier — type: filter. Allows the query to restrict results to a specific budget tier.

Filter fields must be explicitly declared in the vector index definition (separately from the vector field itself) for Atlas to allow filtering on them inside a $vectorSearch stage.

## 3. Hybrid Retrieval Flow

The hybrid query strategy combines metadata filtering and vector similarity search in a single aggregation pipeline stage:

1. A user query (e.g. "affordable beach trip in India") is converted into a query embedding vector — the same shape/dimensionality as the stored embeddings.
2. A $vectorSearch aggregation stage is run against the vector_index, which:
   - First narrows the candidate documents using the filter conditions (region: "India", price_tier: "budget")
   - Then ranks the remaining candidates by cosine similarity between the query vector and each document's embedding field
   - Returns the top N most similar matching documents
3. A $project stage shapes the output, including a computed score field (vectorSearchScore) representing how closely each result matches the query vector.

This approach is more efficient and more relevant than either method alone:

- Metadata filtering alone would return all budget destinations in India without any notion of semantic relevance to the user's actual intent.
- Vector search alone (with no filter) could return semantically similar destinations that are the wrong price tier or in the wrong region.
- Combining both in one indexed operation lets Atlas efficiently narrow the search space before doing the more expensive similarity ranking.

## 4. Query Example

Conceptual pipeline used in search.js:

$vectorSearch: {
  index: "vector_index",
  path: "embedding",
  queryVector: [...],
  numCandidates: 50,
  limit: 10,
  filter: {
    region: { $eq: "India" },
    price_tier: { $eq: "budget" }
  }
}

## 5. Limitations & Notes

- Embeddings in this module are synthetic (deterministically generated from a numeric seed) rather than produced by a real embedding model, since generating real embeddings requires a paid API. The data model, index structure, and hybrid query logic are identical to what would be used with real embeddings — only the vector values themselves are placeholders.
- The dataset is intentionally small (8 sample documents) to keep the demo lightweight, per the module's instructions.