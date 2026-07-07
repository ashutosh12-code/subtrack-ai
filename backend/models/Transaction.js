const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    transactionDate: {
      type: Date,
      required: [true, "Transaction date is required"],
    },

    merchantName: {
      type: String,
      required: [true, "Merchant name is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },

    type: {
      type: String,
      enum: ["Debit", "Credit"],
      default: "Debit",
    },

    category: {
      type: String,
      default: "Uncategorized",
      trim: true,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
      trim: true,
    },

    source: {
      type: String,
      enum: ["Manual", "CSV", "Email", "Bank API"],
      default: "Manual",
    },

    isRecurringCandidate: {
      type: Boolean,
      default: false,
    },

    linkedSubscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.index({ user: 1, transactionDate: -1 });
transactionSchema.index({ user: 1, merchantName: 1 });

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;