const router = require('express').Router();
const Video = require('../models/Video');
const jwt = require("jsonwebtoken");
const bcrypt =require( 'bcryptjs');
const {createError} = require('../utils/createError');

//GET premium scholarships [done]
router.get("/random",  async (req, res) => {
    try{
        const videos = await Video.aggregate([{$sample:{size:38}}]);
        res.status(200).json(videos);
    }catch(err){
        next(err);
    
    }
});

module.exports = router;