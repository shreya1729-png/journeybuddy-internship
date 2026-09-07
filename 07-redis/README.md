# Module 7 — Redis In-Memory Data Store

## Objective

Implement a cache-aside data retrieval strategy using Redis, including cache hits, cache misses, persistent storage retrieval, and a strict Time-to-Live (TTL) expiration policy.

## Implementation

The project uses Redis Cloud with Node.js.

The cache-aside strategy follows this flow:

1. Check Redis for the requested data.
2. If the data exists, return the cached value (**Cache HIT**).
3. If the data does not exist, retrieve it from persistent storage (**Cache MISS**).
4. Store the retrieved data in Redis.
5. Apply a 60-second TTL to the cached key.
6. Return the requested data.
7. Redis automatically removes the key after the TTL expires.

## Cache Key

The application uses the following key format:

`user:<userId>`

Example:

`user:user_1`

## TTL Policy

Cached user data is stored with a **60-second TTL** using Redis `setEx()`.

This ensures cached data does not remain indefinitely and provides an automatic expiration mechanism.

## Test Results

The cache implementation was successfully tested.

### First Request

The first request produced:

`Cache MISS`

The application retrieved the user from persistent storage and stored the result in Redis.

### Second Request

The second request produced:

`Cache HIT`

The application retrieved the user directly from Redis.

### TTL Verification

The remaining TTL was successfully verified:

`Remaining TTL: 59 seconds`

This confirms that the 60-second expiration policy is active.

## Files

* `client.js` — Configures the Redis client.
* `testConnection.js` — Tests Redis connection and basic SET/GET operations.
* `cache.js` — Implements the cache-aside strategy and TTL.
* `ARCHITECTURE.md` — Documents the caching workflow and expiration model.
* `.env` — Stores Redis connection configuration and credentials. It is excluded from Git.

## Technologies

* Node.js
* Redis
* Redis Cloud
* npm

## HR Task Completion

The required cache-aside retrieval strategy has been implemented and tested. The caching workflow and key expiration model are documented in `ARCHITECTURE.md`.

## Reference Documentation

Redis Documentation: https://redis.io/docs/
