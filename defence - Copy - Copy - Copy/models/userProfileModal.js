const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({

  address: {
    type: String
  },
  userImage:
  {
    type: String
  },
  aboutMe:
  {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  skillset:
  {
    type: Array,
    default: []
  }
},{timestamps: true}
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
