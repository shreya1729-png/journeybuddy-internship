# Module 5 — MongoDB Atlas & Vector Search

## Overview

This module implements a data model that supports vector embeddings and a hybrid query strategy combining metadata filters with vector similarity search, using MongoDB Atlas and Atlas Vector Search.

## Setup

- **Database:** MongoDB Atlas (Free Tier, Cluster0)
- **MongoDB Version:** 8.0.30
- **Region:** AWS Mumbai (ap-south-1)
- **Driver:** mongodb npm package v7.6.0
- **Node.js:** v22.23.1

### Environment Variables

A `.env` file (not committed to git) stores the connection string in this format:

MONGODB_URI=mongodb+srv://username:password@cluster0.ebyef87.mongodb.net/?appName=Cluster0

### Known Environment Issue: TLS Handshake

During setup, the MongoDB Node.js driver failed to connect with a low-level TLS handshake error (SSL alert number 80), even though basic network connectivity, DNS resolution, and simple TLS connections all succeeded. Root cause: a third-party antivirus suite (Net Protector Total Security) was intercepting encrypted traffic for "Web Security" scanning, which broke the MongoDB driver's specific multi-server TLS handshake pattern.

Fix: Uninstalled the antivirus's interception layer and, as a safety net, forced the Node.js process to negotiate TLS 1.2 explicitly via the --tls-max-v1.2 flag (baked into the npm scripts below).

## Files

- db.js — basic connection test script
- seed.js — inserts sample destination documents with synthetic vector embeddings
- search.js — runs a hybrid query (metadata filter + vector similarity search)
- DESIGN.md — data model and retrieval flow documentation

## NPM Scripts

| Command | Description |
|---|---|
| npm start | Tests the MongoDB Atlas connection |
| npm run seed | Seeds the destinations collection with sample data |
| npm run search | Runs a hybrid search query |

## Data Model

See DESIGN.md for full details on the document schema, indexing strategy, and hybrid retrieval flow.

## Note on Embeddings

Real production embeddings would typically come from a model API (e.g. OpenAI's text-embedding-3-small). Since this module's goal is to demonstrate the data model and hybrid query strategy rather than production-grade semantic search, synthetic (deterministic, pseudo-random) embedding vectors were generated locally instead — documented transparently here rather than presented as real semantic embeddings.