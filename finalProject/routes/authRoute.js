const express = require('express');
const { registerController, loginController,currentUserController, updateUserNotiController, updateproUserCategoryController, deleteCurrentUser } = require('../controller/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


router.post("/register",registerController);


router.post("/login",loginController);

// GET CURRENT USER

router.get("/current-user",authMiddleware,currentUserController)
router.put("/update-noti",authMiddleware,updateUserNotiController)
router.delete("/current-user-delete",authMiddleware,deleteCurrentUser)


router.put("/update-category",authMiddleware,updateproUserCategoryController)


module.exports = router;