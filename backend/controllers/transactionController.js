const Transaction = require("../models/Transaction");

// Create transaction manually
const createTransaction = async (req, res) => {
  try {
    const {
      transactionDate,
      merchantName,
      description,
      amount,
      type,
      category,
      currency,
      source,
      isRecurringCandidate,
      linkedSubscription,
    } = req.body;

    if (!transactionDate || !merchantName || amount === undefined) {
      return res.status(400).json({
        message: "Transaction date, merchant name, and amount are required",
      });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      transactionDate,
      merchantName,
      description,
      amount,
      type,
      category,
      currency,
      source,
      isRecurringCandidate,
      linkedSubscription,
    });

    return res.status(201).json(transaction);
  } catch (error) {
    return res.status(500).json({
      message: "Server error while creating transaction",
      error: error.message,
    });
  }
};
// Get all transactions for logged-in user
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    }).sort({ transactionDate: -1 });

    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching transactions",
      error: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
};