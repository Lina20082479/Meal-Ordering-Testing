const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: String, ref: 'User'
        },
        dishes: [{
            dish:{ type: String, ref: 'Dish' },
            quantity: { type: Number }
        }],
        created: {
            type: Date,
            default: Date.now
        }
    },
    { collection: 'orders' });

module.exports = mongoose.model('Order', orderSchema);