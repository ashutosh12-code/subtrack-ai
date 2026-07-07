const express = require("express");
const {
  createSubscription,
  getSubscriptions,
  updateSubscription,
  deleteSubscription,
} = require("../controllers/subscriptionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createSubscription);
router.get("/", protect, getSubscriptions);
router.put("/:id", protect, updateSubscription);
router.delete("/:id", protect, deleteSubscription);

module.exports = router;