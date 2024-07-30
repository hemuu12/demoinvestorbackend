const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
