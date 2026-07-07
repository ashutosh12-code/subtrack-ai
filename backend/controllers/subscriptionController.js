const Subscription = require("../models/Subscription");

// Create subscription
const createSubscription = async (req, res) => {
  try {
    const {
      merchantName,
      category,
      amount,
      currency,
      billingCycle,
      startDate,
      lastPaymentDate,
      nextRenewalDate,
      paymentMethod,
      autoRenew,
      status,
      reminderDaysBefore,
      source,
      notes,
      aiConfidence,
    } = req.body;

    if (!merchantName || amount === undefined || !nextRenewalDate) {
      return res.status(400).json({
        message: "Merchant name, amount, and next renewal date are required",
      });
    }

    const subscription = await Subscription.create({
      user: req.user._id,
      merchantName,
      category,
      amount,
      currency,
      billingCycle,
      startDate,
      lastPaymentDate,
      nextRenewalDate,
      paymentMethod,
      autoRenew,
      status,
      reminderDaysBefore,
      source,
      notes,
      aiConfidence,
    });

    return res.status(201).json(subscription);
  } catch (error) {
    return res.status(500).json({
      message: "Server error while creating subscription",
      error: error.message,
    });
  }
};
// Get all subscriptions for logged-in user
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user._id,
    }).sort({ nextRenewalDate: 1 });

    return res.status(200).json(subscriptions);
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching subscriptions",
      error: error.message,
    });
  }
};
// Update subscription
const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    Object.assign(subscription, req.body);

    const updatedSubscription = await subscription.save();

    return res.status(200).json(updatedSubscription);
  } catch (error) {
    return res.status(500).json({
      message: "Server error while updating subscription",
      error: error.message,
    });
  }
};
// Delete subscription
const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    await subscription.deleteOne();

    return res.status(200).json({
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while deleting subscription",
      error: error.message,
    });
  }
};

module.exports = {
  createSubscription,
  getSubscriptions,
  updateSubscription,
  deleteSubscription,
};