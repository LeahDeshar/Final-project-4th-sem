const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createRequestController, getAllRequestController, getRequestController, getAllByCategoryRequestController, updateRequestController, deleteAllRequestController, deleteRequestController, getRequestByPostController, getRequestUserController, updateUserRequestController } = require('../controller/requestController');
const router = express.Router();


router.post('/request-posts',authMiddleware,createRequestController)

router.get('/request-all-posts',authMiddleware,getAllRequestController)

router.get('/request-user-posts',authMiddleware,getRequestController)
router.get('/request-user-servicePosts',authMiddleware,getRequestUserController)


router.get('/request-category-posts',authMiddleware,getAllByCategoryRequestController)

router.get('/request-posts/:category',authMiddleware,getRequestByPostController)

router.put('/request-posts/:reqId',authMiddleware,updateRequestController)

router.put('/request-user-posts/:reqId',authMiddleware,updateUserRequestController)


router.delete('/request-posts',authMiddleware,deleteAllRequestController)

router.delete('/request-posts/:reqId',authMiddleware,deleteRequestController)

module.exports = router;
