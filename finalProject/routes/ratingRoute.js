const express = require('express');
const { createRatingController, getRatingController } = require('../controller/RatingController');
const router = express.Router();


router.post('/create-rating',createRatingController)

router.get('/get-rating/:id',getRatingController)



module.exports = router;
