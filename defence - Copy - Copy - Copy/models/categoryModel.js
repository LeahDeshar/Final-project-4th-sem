const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  laundary: { type: Boolean, default: false },
  painter: { type: Boolean, default: false },
  chef: { type: Boolean, default: false },
  carService: { type: Boolean, default: false },
  plumber: { type: Boolean, default: false },
  electrician: { type: Boolean, default: false },
  category7: { type: Boolean, default: false },
  category8: { type: Boolean, default: false },
  furniture: { type: Boolean, default: false },
  cleaning: { type: Boolean, default: false },
  petcare1: { type: Boolean, default: false },
  petcare2: { type: Boolean, default: false },
  prouser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServicePost',
    required: true,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
