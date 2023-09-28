// const mongoose = require('mongoose');

// const servicePostSchema = new mongoose.Schema({
//   date: { type: Date, required: true },
//   time: { type: String, required: true },
//   address: { type: String, required: true },
//   contactInfo: { type: String, required: true },
//   details: { type: String, required: true },
//   servicePrice: { type: Number, required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// },{
//     timestamps : true
// });

// const ServicePost = mongoose.model('ServicePost', servicePostSchema);

// module.exports = ServicePost;
const mongoose = require('mongoose');

const servicePostSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  address: { type: String, required: true },
  contactInfo: { type: String, required: true },
  details: { type: String, required: true },
  category: {type: String,required:true},
  servicePrice: { type: Number, required: true },
  notification:{type: Array},
  isCompleted:{type:Boolean,default:false},
  seen: {type:Boolean,default: false},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},{
    timestamps : {
        createdAt: true,
        updatedAt: true
    }
});

const ServicePost = mongoose.model('ServicePost', servicePostSchema);

module.exports = ServicePost;