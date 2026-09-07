const client = require("./client");

// Simulated persistent database
const database = {
  user_1: {
    id: "user_1",
    name: "Shreya",
    role: "Intern",
  },
};

async function getUser(userId) {
  const cacheKey = `user:${userId}`;

  // 1. Check Redis cache
  const cachedUser = await client.get(cacheKey);

  if (cachedUser) {
    console.log("Cache HIT");
    return JSON.parse(cachedUser);
  }

  // 2. Cache miss → query persistent storage
  console.log("Cache MISS");

  const user = database[userId];

  if (!user) {
    return null;
  }

  // 3. Store result in Redis with 60-second TTL
  await client.setEx(cacheKey, 60, JSON.stringify(user));

  console.log("User stored in cache with 60-second TTL");

  return user;
}

async function testCache() {
  try {
    await client.connect();

    console.log("First request:");
    console.log(await getUser("user_1"));

    console.log("\nSecond request:");
    console.log(await getUser("user_1"));

    console.log("\nWaiting/checking TTL...");
    const ttl = await client.ttl("user:user_1");
    console.log("Remaining TTL:", ttl, "seconds");

  } catch (error) {
    console.error("Cache test failed:", error);
  } finally {
    await client.quit();
  }
}

testCache();