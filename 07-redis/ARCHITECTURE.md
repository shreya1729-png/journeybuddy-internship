# Redis Cache-Aside Architecture

## 1. Overview

This module demonstrates a cache-aside data retrieval strategy using Redis.

Redis is used as an in-memory cache to provide fast access to frequently requested data. When requested data is not present in the cache, the application retrieves it from persistent storage and then stores the result in Redis with a Time-to-Live (TTL).

## 2. Cache-Aside Workflow

The retrieval process follows these steps:

1. The application receives a request for a user.
2. The application checks Redis using the corresponding cache key.
3. If the key exists, Redis returns the cached data. This is a **Cache HIT**.
4. If the key does not exist, a **Cache MISS** occurs.
5. The application queries persistent storage for the requested data.
6. The retrieved data is stored in Redis.
7. A TTL of 60 seconds is assigned to the cached key.
8. The data is returned to the requester.
9. After 60 seconds, Redis automatically expires the key.

## 3. Workflow Diagram

```text
                    User Request
                         |
                         v
                 Check Redis Cache
                         |
                  +------+------+
                  |             |
               HIT             MISS
                  |             |
                  v             v
          Return Cached      Query Persistent
              Data              Storage
                                |
                                v
                         Store in Redis
                         TTL = 60 seconds
                                |
                                v
                         Return Data
```

## 4. Cache Key Design

The application uses the following key format:

```text
user:<userId>
```

Example:

```text
user:user_1
```

This naming convention makes cached resources easy to identify and organize.

## 5. TTL Expiration Model

Each cached user record is stored with a **60-second TTL**.

The application uses Redis `SETEX` functionality through the Node.js Redis client's `setEx()` method.

Example:

```javascript
await client.setEx(
  cacheKey,
  60,
  JSON.stringify(user)
);
```

The TTL prevents stale data from remaining in the cache indefinitely.

## 6. Test Results

The implementation was tested using two consecutive requests.

### First Request

```text
Cache MISS
User stored in cache with 60-second TTL
```

The application retrieved the user from persistent storage and cached the result.

### Second Request

```text
Cache HIT
```

The application retrieved the user directly from Redis without querying persistent storage.

The TTL was also verified:

```text
Remaining TTL: 59 seconds
```

## 7. Implementation Files

* `client.js` — Redis client configuration.
* `testConnection.js` — Basic Redis connection, SET and GET test.
* `cache.js` — Cache-aside retrieval strategy and TTL implementation.
* `.env` — Stores Redis connection configuration and credentials. This file is excluded from Git using `.gitignore`.

## 8. Conclusion

The implementation demonstrates the cache-aside pattern required for the Redis module. Redis is checked before persistent storage, cache misses populate the cache, cache hits return data directly from memory, and a strict 60-second TTL automatically expires cached entries.
