const client = require("./client");

async function test() {
  try {
    await client.connect();
    await client.set("test_key", "Hello from JourneyBuddy Module 7");
    const value = await client.get("test_key");
    console.log("Connected to Redis. Retrieved value:", value);
  } catch (error) {
    console.error("Redis connection failed:", error);
  } finally {
    await client.quit();
  }
}

test();