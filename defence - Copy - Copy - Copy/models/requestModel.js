const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  req_pay: {
    type: String,
    required: true,
  },
  req_contact: {
    type: String,
    required: true,
  },
  req_comment: {
    type: String,
    required: true,
  },
  req_pending:
  {
    type: Boolean,
    default: true,
  },
  req_rejected:
  {
    type: Boolean,
    default: false,
  },
  req_accepted:
  {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notification:{type: Array},
  notificationToggle:{type:Boolean,default:false},
  seen: {type:Boolean,default: false},
  prouser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServicePost',
    required: true,
  },
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
