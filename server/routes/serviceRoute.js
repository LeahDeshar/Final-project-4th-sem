const express = require('express');
const { getServiceController, createServiceController, getAllServiceController, updateServiceController, deleteServiceController, deleteAllServiceController, getAllByCategoryServiceController } = require('../controller/serviceController');

const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')


// Create a new service post
router.post('/service-posts',authMiddleware, createServiceController);

// Get all service posts by a specific customer
router.get('/service-posts',authMiddleware, getServiceController);

// Get all service posts
router.get('/service-all-posts',authMiddleware,getAllByCategoryServiceController );
  

// Update a service post
router.put('/service-posts/:postId', authMiddleware, updateServiceController);
  
  // Delete specific service post
  router.delete('/service-posts/:postId', authMiddleware, deleteServiceController);
  
  // Delete all service posts
router.delete('/service-all-posts', authMiddleware, deleteAllServiceController);
module.exports = router;

