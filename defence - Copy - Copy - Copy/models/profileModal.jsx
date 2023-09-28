const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({

  address: {
    type: String,
    required : function(){
      if(this.role == "Provider" )
      {
          return true;
      }
      return false}
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
    type: String,
    required : function(){
      if(this.role == "Provider" )
      {
          return true;
      }
      return false
  }
  }
},{timestamps: true}
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
