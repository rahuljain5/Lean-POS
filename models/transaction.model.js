const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TransactionSchema = new Schema({
    userId: {type: String, required: true, max: 100},
    code: {type: String, required: true},
    amount: {type: Number, required: true},
    items: [{
       quantity: {type: Number, default: 1},
       product: {type: Schema.Types.ObjectId, ref: 'Products'}     
    }],
    description: {type: String, required: false},
    dealerName: {type: String, required: false},
    transactedOn: {type: Date, default: Date.now }
});

// Export the model
module.exports = mongoose.model('Transactions', TransactionSchema, 'Transactions');