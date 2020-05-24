const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TransactionSchema = new Schema({
    userId: {type: String, required: true, max: 100},
    amount: {type: Number, required: true},
    description: {type: String, required: false},
    dealerName: {type: String, required: false},
    transactedOn: {type: Date, required: true, default: Date.now }
});

// Export the model
module.exports = mongoose.model('Transactions', TransactionSchema, 'Transactions');