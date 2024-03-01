// models/Swipe.js
const mongoose = require('mongoose');

const swipeSchema = new mongoose.Schema({
  swiper: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  target: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, enum: ['like', 'dislike'], required: true },
  timestamp: { type: Date, default: Date.now }
});

const Swipe = mongoose.model('Swipe', swipeSchema);

module.exports = Swipe;
