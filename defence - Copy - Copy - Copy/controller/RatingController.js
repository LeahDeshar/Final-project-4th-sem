const Rating = require("../models/ratingModel");
const Request = require("../models/requestModel");
const ServicePost = require("../models/serviceModal");
const User = require("../models/userModel");
const Profile = require("../models/userProfileModal");
exports.createRatingController = async (req, res) => {
    try {
        //   get prouser, rating, review ,user,reqId
      const {  prouser, rating, review ,reqId ,user} = req.body;
      // const user = req.user._id;
      
     //  using reqId find the request post in the request model
     const servicePost = await Request.findOne(
         { _id: reqId, prouser: prouser });

     const post =await ServicePost.findOne({user:user,_id:servicePost.post})
     post.seen =true
     post.isCompleted = true

     console.log(post);
     await post.save()

    //  all three value set to false -->completed work
        servicePost.req_pending =false
        servicePost.req_accepted =false
        servicePost.req_rejected =false
        await servicePost.save();

     // set true to the flag seen in post model

     
      




        // to get name of user and push the message
      const userRate = await User.findOne({_id:user})
  
      // to get the name of provider and push the message
      const prouserRate = await User.findOne({_id:prouser})
      if(!userRate || !prouserRate)
      {
        return res.status(404).json({
          message:"User not found"
        })
      }

      // push the notification to both the users
      userRate.notification.push(`Dear customer, job has been successfully completed.
      Thank you for choosing our home service platform.`)

      prouserRate.notification.push(`Hello professional, the job has been successfully completed. Thank you for your service.`)
      
      prouserRate.jobcount += 1;
  
      // get the profile of the user of who created the rating

     const getuserWhoRate= await Profile.findOne({user: userRate._id})
    //   create the rating 

    const profile = getuserWhoRate._id
    console.log( prouser, rating, review ,user,profile);
    const rateProuser = await Rating.create({
        prouser, rating, review ,user,profile
    })
  
      await userRate.save();
      await prouserRate.save();
      console.log(servicePost);
      res.status(201).json(rateProuser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  exports.getRatingController = async (req, res) => {
    try {
      // console.log(req.param);
      const user = req.params.id;
      const RatingOfProUser = await Rating.find({ prouser: user }).populate('prouser').populate('user').populate('profile').exec()


      res.json(RatingOfProUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }