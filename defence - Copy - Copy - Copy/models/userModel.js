const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const JWT = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail,'Please provide your email']
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Customer', 'Provider'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
  }
  ,
  // address: {
  //   type: String,
  //   required : function(){
  //     if(this.role == "Provider" )
  //     {
  //         return true;
  //     }
  //     return false}
  // },
  category: 
  {
    type: Object,
    default: {
      laundary: false,
      painter:  false ,
      chef: false ,
      carService:  false ,
      plumber: false ,
      electrician:false ,
      category7: false ,
      category8:  false ,
      furniture:  false ,
      cleaning: false ,
      petcare1:  false ,
      petcare2: false 
      }
  },
  jobcount:
  {
    type: Number,
    default: 0
  },
  // aboutMe:
  // {
  //   type: String
  // },
  notification:{type: Array,default: []},
  seen: {type:Array,default: []},
  // skillset:
  // {
  //   type: String,
  //   required : function(){
  //     if(this.role == "Provider" )
  //     {
  //         return true;
  //     }
  //     return false
  // }
  // }
},{timestamps: true}
);
// middelwares
// encrypt the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//compare password
// for login
// userSchema.methods.comparePassword = async function (userPassword) {
//   console.log(userPassword,this.password);
//   const isMatch = await bcrypt.compare(userPassword, this.password);
//   return isMatch;
// };

//JSON WEBTOKEN
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
