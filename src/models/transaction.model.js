const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "Transaction must have a source account"],
        index: true
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "Transaction must have a destination account"],
        index: true
    },
    amount: {
        type: Number,
        required: [true, "Transaction amount is required"],
        min: [0.01, "Transaction amount must be at least 0.01"]
    },
    idempotencyKey: {
        type: String,
        required: [true, "Idempotency key is required for transaction"],
        unique: true,
        index: true
    }
}, {
    timestamps: true
});


const transactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = transactionModel;