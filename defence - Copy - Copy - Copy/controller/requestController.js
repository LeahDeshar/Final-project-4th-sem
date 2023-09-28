const Request = require("../models/requestModel");
const ServiceModal = require("../models/serviceModal");
const User = require("../models/userModel");


exports.createRequestController = async (req, res) => {
  try {
    const { start_date, end_date, req_pay, req_contact, req_comment, post, user } = req.body;
    const prouser = req.user._id;
    
    const servicePost = await Request.create({
      start_date, end_date, req_pay, req_contact, req_comment, user, post, prouser, notification: []
    });

    // to push the message
    const userNoti = await User.findOne({_id:user})

    // to get the name of provider
    const prouserNoti = await User.findOne({_id:prouser})

    // to get the category
    const category =await ServiceModal.findOne({user:user})
    console.log("category to pick it",category);


    if(!category)
    {
      return res.status(404).json({
        message:'Service Category Not Found!'
      })
    }

    if(!userNoti)
    {
      return res.status(404).json({
        message:"User not found"
      })
    }

    if (servicePost.req_pending) {
      userNoti.notification.push(`${prouserNoti.name} is Requesting the service you posted on ${category.category}`)
      
      
      // servicePost.notification.push(`${prouserNoti.name} is Requesting the service you posted on ${category.category}`);
      
      console.log(userNoti);
    }
    await userNoti.save();
    await servicePost.save();

    res.status(201).json(servicePost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateRequestController = async (req, res) => {
  try {
    const userId = req.user._id;
    const reqId = req.params.reqId;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const req_pay = req.body.req_pay;
    const req_contact = req.body.req_contact;
    const req_comment = req.body.req_comment;
    const req_pending = req.body.req_pending;
    const req_accepted = req.body.req_accepted;
    const req_rejected = req.body.req_rejected;


    const servicePost = await Request.findOneAndUpdate(
      { _id: reqId, prouser: userId },
      { start_date, end_date, req_pay, req_contact, req_comment,req_pending,req_accepted,req_rejected },
      { new: true }
    );
    console.log("servicePost",servicePost);
    if (!servicePost) {
     return res.status(404).json({ error: 'Service post not found' });
    }
    else 
    {
      return res.status(202).json({ servicePost });
    }
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
exports.getAllRequestController =async (req, res) => {
    try {
      const servicePosts = await Request.find();
      res.json(servicePosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
exports.getRequestController = async (req, res) => {
    try {
      const servicePosts = await Request.find({ prouser: req.body.userId });
      res.json(servicePosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  exports.getRequestUserController = async (req, res) => {
    try {
      const servicePosts = await Request.find({ user: req.body.userId });
      res.json(servicePosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  exports.getRequestByPostController =async (req, res) => {
    try {
      const category = req.params.category;
  console.log(category);
      // Find the service posts made by the user with the specified category
      const servicePosts = await ServiceModal.find({ user: req.user._id, category });
  
      // Extract the IDs of the service posts
      const servicePostIds = servicePosts.map((post) => post._id);
  
      // Find the request posts made by all prousers on the specified service posts
      const requestPosts = await Request.find({ post: { $in: servicePostIds } })
        .populate('user', 'username')
        .populate('prouser', 'username')
        .populate('post', 'details');
  
      res.json(requestPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  exports.getAllByCategoryRequestController = async (req, res) => {
    const { category } = req.query;

  try {
    let requestPosts;

    if (category) {
      // Find the service posts with matching category
      const servicePosts = await ServiceModal.find({ category });
      
      if (servicePosts.length > 0) {
        // Find the request posts related to the service posts
        requestPosts = await Request.find({ post: { $in: servicePosts.map(post => post._id) } });
        res.json(requestPosts);
      } else {
        res.status(404).json({ message: 'No service posts found with the provided category' });
      }
    } else {
      res.status(400).json({ message: 'Category is required' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
  };

  exports.updateUserRequestController = async (req, res) => {
    try {
      const userId = req.user._id;
      const reqId = req.params.reqId;
      const start_date = req.body.start_date;
      const end_date = req.body.end_date;
      const req_pay = req.body.req_pay;
      const req_contact = req.body.req_contact;
      const req_comment = req.body.req_comment;
      const req_pending = req.body.req_pending;
      const req_accepted = req.body.req_accepted;
      const req_rejected = req.body.req_rejected;


      const servicePost = await Request.findOneAndUpdate(
        { _id: reqId, user: userId },
        { start_date, end_date, req_pay, req_contact, req_comment,req_pending,req_accepted,req_rejected },
        { new: true }
      );

      if (!servicePost) {
        return res.status(404).json({ error: 'Service post not found' });
      }

      console.log("req.body",req.body);
    // to get the name of the customer that created the post
    const userNoti = await User.findOne({_id: servicePost.user})
    console.log("userNoti",userNoti);

    // to get the name of provider and accepted/rejected message is pushed
    const request = await Request.findOne({_id: reqId})

    const prouserNoti = await User.findOne({_id: request.prouser})
    console.log("prouserNoti",prouserNoti);


console.log("servicePost.post",servicePost.post);
    // to get the category
    const postToCategory =await ServiceModal.findOne({_id: servicePost.post})

    // const categoryofPost = await ServiceModal.findOne({})
    console.log("category",postToCategory.category);
    if(!postToCategory)
    {
      return res.status(404).json({
        message:'Service Category Not Found!'
      })
    }

    if(!userNoti)
    {
      return res.status(404).json({
        message:"User not found"
      })
    }
    console.log("servicePost.req_accepted",servicePost.req_accepted);
    if (servicePost.req_accepted) {
      prouserNoti.notification.push(`Request For the service you posted on ${postToCategory.category} is accepted by ${userNoti.name}`)
    }
    if (servicePost.req_rejected) {
      prouserNoti.notification.push(`Request For the service you posted on ${postToCategory.category} is rejected by ${userNoti.name}`)
    }
   
    await prouserNoti.save();
    await servicePost.save();

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
exports.deleteRequestController = async (req, res) => {
    try {
    
      const userId = req.user._id;
      const reqId = req.params.reqId;
      // Find and delete the service post by postId and associated user
      const deletedServicePost = await Request.findOneAndDelete({ _id: reqId, prouser: userId });
  
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
exports.deleteAllRequestController =async (req, res) => {
    try {
      const userId  = req.body.user;
  
      // Find and delete all service posts associated with the user
      const deletedServicePosts = await Request.deleteMany({ prouser: userId });
  
      res.json({ message: 'All service posts deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }