# Module 6 — Pinecone & Vector Databases

## Overview

This module implements a vector database workflow using Pinecone: creating a serverless index, inserting (upserting) vector embeddings with metadata, and running a hybrid query that combines metadata filtering with vector similarity search.

## Setup

- **Vector DB:** Pinecone (Serverless, AWS us-east-1)
- **SDK:** @pinecone-database/pinecone v8.2.0
- **Index:** journeybuddy-destinations (16 dimensions, cosine similarity)

### Environment Variables

A .env file (not committed to git) stores the API key:

PINECONE_API_KEY=your_key_here

## Files

- createIndex.js — creates the Pinecone serverless index (safe to re-run; skips if index already exists)
- upsert.js — inserts 8 sample destination vectors with metadata (title, category, region, price_tier)
- query.js — runs a hybrid query: metadata filter (region, price_tier) + vector similarity search
- DESIGN.md — data model and query design documentation

## NPM Scripts

| Command | Description |
|---|---|
| npm run create-index | Creates the Pinecone index (one-time setup) |
| npm run upsert | Inserts sample vectors into the index |
| npm run query | Runs a hybrid similarity + metadata query |

## Data Model

See DESIGN.md for details on the vector schema, metadata fields, and query structure.

## Note on Embeddings

As in Module 5, synthetic (deterministic) embedding vectors are used in place of real model-generated embeddings, since generating real embeddings requires a paid API. The index structure, upsert flow, and hybrid query logic are identical to what would be used with real embeddings — only the vector values are placeholders. This is documented transparently rather than presented as real semantic search.

## Debugging Note

The installed SDK version (v8.2.0) expects upsert calls in the shape { records: [...] } rather than a raw array of vectors. This was discovered by inspecting the SDK's own source code (node_modules/@pinecone-database/pinecone/dist/data/vectors/upsert.js) after the array form threw a "must pass in at least 1 record" error despite non-empty input.