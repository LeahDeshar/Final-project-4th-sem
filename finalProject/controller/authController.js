const bcrypt = require('bcryptjs')

// register controller
const jwt = require("jsonwebtoken")

const userModel =require("../models/userModel.js");
exports.registerController = async (req, res, next) => {
  const { name, email, role, phonenumber, password} = req.body;

  try {
    // Validate required fields
    if (!name || !email || !password || !phonenumber || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required information.",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered. Please login.",
      });
    }

    // Create user
    const user = await userModel.create({
      name,
      email,
      role,
      phonenumber,
      password,
      category:[],
      notification: ["Welcome to our service provider platform! "], // Add the "Account Created" message to the notification array
    });

    if(role==="Provider")
    {
      user.notification.push("We're excited to have you on board. As a provider, you now have the opportunity to showcase your skills and expertise to a wider audience. Build your reputation, expand your professional network, and connect with clients actively seeking your services. Let's unlock new opportunities and grow your business together.")
    }
    if(role==="Customer")
    {
      user.notification.push("We're thrilled to have you join our community. As a user, you'll have access to a diverse range of skilled professionals and experts ready to meet your specific needs. From home improvement to graphic design and tutoring, we've got you covered. Let's connect you with the perfect service provider to bring your vision to life.")
    }
    await user.save();
    const token = user.createJWT();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// updateUserController notificaiton
exports.updateUserNotiController = async (req, res) => {
  try {
    const userId = req.user._id;
    
    

    // Find the service post by postId and associated user
    const servicePost = await userModel.findOne(
      { _id: userId});
     

    if (servicePost) {
      // Push the new notification message into the notification array
      servicePost.seen.push(...servicePost.notification)
      servicePost.notification=[]
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

exports.updateproUserCategoryController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { updatedCategoryList} = req.body;
    console.log(userId, updatedCategoryList,req.body
     );
    
    // Find the service post by userId
    const user = await userModel.findOne({ _id: userId });

    user.category = updatedCategoryList
    console.log("user.category",updatedCategoryList);
    await user.save();
   
 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// login controller

// exports.loginController = async (req, res, next) => {
//   const { email, password,role } = req.body;
//  console.log("req.body",req.body);
//   //validation
//   if (!email || !password || !role) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide all information",
//     });
//   }
//   //find user by email
//   const user = await userModel.findOne({ email });
//   if (!user) {
//     return res.status(400).json({
//       message: "invalid email"
//     })
//   }
//   // console.log(user);
//   //compare password
  

//    // compare password
//    const isMatch = await bcrypt.compare(password,user.password)
//    console.log(password,user.password,isMatch);
//    if(!isMatch)
//    {
//        return res.status(404).json({
//            message: "Invalid Password",
//            success: false,
//        })
//    }
//   // const isMatch = await user.comparePassword(password);
//   // console.log(isMatch);
//   // if (!isMatch) {
//   //   return res.status(400).json({
//   //     message: "invalid password"
//   //   })
//   // }
//    if(user.role != req.body.role)
//         {
//             return res.status(500).json({
//                 message: "Role doesn't match",
//                 success: false,
//                 })
//         }
//         const token =  jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn: '30d'})
//   res.status(200).json({
//     success: true,
//     message: "Login Successfully",
//     user,
//     token,
//   });
// };

exports.loginController = async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    // Validation
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all information',
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check user role
    if (user.role !== role) {
      return res.status(400).json({
        success: false,
        message: 'Role does not match',
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.currentUserController = async (req,res) =>
{
    try {
        console.log("here currentUserController");
        const userId = req.user._id
        const user = await userModel.findOne({_id: req.body.userId});
        return res.status(200).json({
            message: "Fetched user successfully",
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Unable to get current user",
            success: false,
            error
        })
    }
}
// Controller function to delete the current user's account
exports.deleteCurrentUser = async (req, res) => {
  try {
    // Get the current user's ID from the authenticated user's request
    const userId = req.user.id;
    console.log(userId);
    // Find and remove the user by ID
    await userModel.findByIdAndRemove(userId);
    
    res.status(200)
    .json({ 
      message: 'User account deleted successfully' 
    });
  } catch (error) {
    console.error(error);
    res.status(500)
    .json({ 
      message: 'Server error while deleting user account' 
    });
  }
};