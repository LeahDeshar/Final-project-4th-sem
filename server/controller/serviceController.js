const ServicePost = require("../models/serviceModal");
const User = require("../models/userModel");


// exports.createServiceController = async (req, res) => {
//   try {
//     const { date, time, address, contactInfo, details, servicePrice, category } = req.body;
//     const user = req.user._id;

//     const servicePost = await ServicePost.create({
//       date,
//       time,
//       address,
//       contactInfo,
//       details,
//       category,
//       servicePrice,
//       user,
//       notification: [], // Initialize the notification array as an empty array
//     });

//     // Push a message into the notification array
//     servicePost.notification.push(`New Service Post For ${category} Is Created`);
//     await servicePost.save();

//     res.status(201).json(servicePost);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// exports.createServiceController = async (req, res) => {
//   try {
//     const { date, time, address, contactInfo, details, servicePrice, category } = req.body;
//     const user = req.user._id;
   
//     const servicePost = await ServicePost.create({
//       date,
//       time,
//       address,
//       contactInfo,
//       details,
//       category:category.toLowerCase(),
//       servicePrice,
//       user,
//       notification: []
//     });
    



    // get the name of the user who created the post (for message purpose)
    // find the provider and check all the category{} that are set to true
    // then
    // Push a message into the notification array for each prouser

//     servicePost.notification.push(`New service post for ${category} is created`);

    

//     await servicePost.save();

//     res.status(201).json(servicePost);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error',error });
//   }
// };



    // get the name of the user who created the post (for message purpose)
    // find the provider and check all the category{} that are set to true
    // then
    // Push a message into the notification array for each prouser
exports.createServiceController = async (req, res) => {
  try {
    const { date, time, address, contactInfo, details, servicePrice, category } = req.body;
    const user = req.user._id;

    const servicePost = await ServicePost.create({
      date,
      time,
      address,
      contactInfo,
      details,
      category: category.toLowerCase(),
      servicePrice,
      user,
      notification: [],
    });

    // --------Notification functionality implementation----------------------
    // Get the name of the user who created the post
    const userWhoCreatedPost = await User.findById(user);


    if (!userWhoCreatedPost) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find providers with the corresponding category set to true
    const query = {};
    query[`category.${category}`] = true;
    const providers = await User.find(query);

    if (!providers) {
      return res.status(404).json({ error: 'Pro User not found' });
    }

    // Push a message into the notification array for each provider
    providers.forEach(async (provider) => {
      provider.notification.push(`New service post for ${category} is created by ${userWhoCreatedPost.name}`);
      await provider.save();
    });

    res.status(201).json(servicePost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error', error });
  }
};

exports.getServiceController = async (req, res) => {
    try {
      const servicePosts = await ServicePost.find({ user: req.body.userId });
      res.json(servicePosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
exports.getAllServiceController =async (req, res) => {
    try {
      const servicePosts = await ServicePost.find();
      res.json(servicePosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  exports.getAllByCategoryServiceController = async (req, res) => {
    const { category } = req.query;
    
    try {
      let servicePosts;
  
      if (category) {
        // Filter services by category if category is provided
        servicePosts = await ServicePost.find({ category });
        res.json(servicePosts);
      } else {
        res.status(200).json("There's no post yet")
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  exports.updateServiceController = async (req, res) => {
    try {
      const userId = req.user._id;
      const postId = req.params.postId;
      const date = req.body.date;
      const time = req.body.time;
      const address = req.body.address;
      const contactInfo = req.body.contactInfo;
      const details = req.body.details;
      const servicePrice = req.body.servicePrice;
      const seen = req.body.seen;
      
  
      // Find the service post by postId and associated user
      const servicePost = await ServicePost.findOneAndUpdate(
        { _id: postId, user: userId },
        { date, time, address, contactInfo, details, servicePrice ,seen},
        { new: true }
      );
  
      if (servicePost) {
        // Push the new notification message into the notification array
        servicePost.notification.push("You Edited The Service Post");
        await servicePost.save();
  
        res.json(servicePost);
      } else {
        res.status(404).json({ error: 'Service post not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
exports.deleteServiceController = async (req, res) => {
    try {
    
      const userId = req.user._id;
      const postId = req.params.postId;
      // Find and delete the service post by postId and associated user
      const deletedServicePost = await ServicePost.findOneAndDelete({ _id: postId, user: userId });
  
      if (deletedServicePost) {
        res.json(deletedServicePost);
      } else {
        res.status(404).json({ error: 'Service post not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
exports.deleteAllServiceController =async (req, res) => {
    try {
      const userId  = req.body.user;
  
      // Find and delete all service posts associated with the user
      const deletedServicePosts = await ServicePost.deleteMany({ user: userId });
  
      res.json({ message: 'All service posts deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }