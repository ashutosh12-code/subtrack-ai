const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    merchantName: {
      type: String,
      required: [true, "Merchant name is required"],
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Entertainment",
        "Productivity",
        "Education",
        "Shopping",
        "Finance",
        "Health",
        "Utilities",
        "Other",
      ],
      default: "Other",
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
      trim: true,
    },

    billingCycle: {
      type: String,
      enum: ["Weekly", "Monthly", "Quarterly", "Yearly", "One-time"],
      default: "Monthly",
    },

    startDate: {
      type: Date,
    },

    lastPaymentDate: {
      type: Date,
    },

    nextRenewalDate: {
      type: Date,
      required: [true, "Next renewal date is required"],
    },

    paymentMethod: {
      type: String,
      trim: true,
      default: "Unknown",
    },

    autoRenew: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Active", "Paused", "Cancelled", "Expired", "Trial"],
      default: "Active",
    },

    reminderDaysBefore: {
      type: Number,
      default: 3,
      min: 0,
    },

    source: {
      type: String,
      enum: ["Manual", "CSV", "Email", "Bank API", "AI Detected"],
      default: "Manual",
    },

    notes: {
      type: String,
      trim: true,
    },

    aiConfidence: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

subscriptionSchema.index({ user: 1, nextRenewalDate: 1 });
subscriptionSchema.index({ user: 1, merchantName: 1 });

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;