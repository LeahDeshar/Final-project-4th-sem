const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');
const Profile = require('../models/userProfileModal');
const User = require('../models/userModel');
require("dotenv").config();



 


// Configure multer to store uploaded files in a temporary folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
// Route to handle profile creation
router.get('/profile/:id', async (req, res) => {
//   console.log("image" ,req.body);
 const id = req.params.id
 console.log("req.params.id",req.params.id);
   const userProfile =await User.findOne({_id:id})

    await Profile.findOne({user: userProfile._id})
      .then((profile) => {
        // console.log("profile" ,profile);
        res.json(profile);
      })
      .catch((error) => {
        console.error('Error retrieving profile:', error);
        res.status(500).send('Error retrieving profile');
      });
  });
router.post('/profile', upload.single('image'), async(req, res) => {
  const {aboutMe, skillset, address,user} = req.body;
 const skillsett = skillset.split(',');
  const userImage = req.file.filename;
  const profile = new Profile({
    aboutMe, skillset:skillsett, address,userImage,user
  });
  profile
    .save()
    .then(() => {
      res.status(200).send('Profile updated successfully!');
    })
    .catch((error) => {
     
      res.status(500).send('Error saving profile to database');
    });
});
router.put('/profile', upload.single('image'), async (req, res) => {
  const { aboutMe, skillset, address, user } = req.body;
  const skillsett = skillset.split(",")
  console.log(req.body);
  const userImage = req.file ? req.file.filename : null; // Check if req.file exists

  try {
    const person = await Profile.findOneAndUpdate({ user: user }, { aboutMe, skillset:skillsett, address, userImage }, { new: true });
    if (!person) {
      return res.status(400).json({
        message: 'Person not found'
      });
    }
    console.log(person);
    return res.status(200).json({
      person
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// get all profile
router.get('/profile-all', async (req, res) => {
  
      // await Profile.find({})
      //   .then((profile) =>res.json({profile}))
      //   .catch((error) => {
      //     console.error('Error retrieving profile:', error);
      //     res.status(500).send('Error retrieving profile');
      //   });
      try {
        const profiles = await Profile.find({}).populate('user').exec();
    
        res.json( profiles );
      } catch (error) {
        console.error('Error retrieving profiles:', error);
        res.status(500).send('Error retrieving profiles');
      }
    });

module.exports = router;
  