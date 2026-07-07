const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("SubTrack AI backend is running");
});

module.exports = app;