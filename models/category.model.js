const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name: {type: String, required: true, max: 100},
    userId: {type: String, required: true}
}, {timestamps: true});

// Export the model
module.exports = mongoose.model('Categories', CategorySchema, 'Categories');