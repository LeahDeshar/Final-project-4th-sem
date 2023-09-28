const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  prouser: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String },
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;