const express = require("express");

const app = express();
const PORT = 4000;

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Request timing middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${duration}ms`);
  });

  next();
});

// Authentication middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Authentication token is required",
    });
  }

  next();
}

// Public route
app.get("/", (req, res) => {
  res.json({
    message: "JourneyBuddy API is running",
  });
});

// Protected dashboard route
app.get("/dashboard", authenticate, (req, res) => {
  res.json({
    message: "Welcome to the protected JourneyBuddy Dashboard",
  });
});

// Analytics route
app.get("/analytics", authenticate, (req, res) => {
  res.json({
    message: "JourneyBuddy Analytics",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});