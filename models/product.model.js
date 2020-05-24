const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    code: {type: String, required: true},
    quantity: {type: Number, required: true, default:0},
    description: {type: String, required: false},
    price: {type: Number, required: true},
    category: {type: Schema.Types.ObjectId, ref: "Categories"  }
});

// Export the model
module.exports = mongoose.model('Products', ProductSchema, 'products');