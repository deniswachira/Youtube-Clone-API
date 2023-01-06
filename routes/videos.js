const router = require('express').Router();
const {verifyToken} = require('../utils/verifyToken');
const { addView, uploadVideo, deleteVideo, getByTag, getVideo, random, search, sub, trends, updateVideo } = require ('../controllers/video.js');
//GET Random video [done]
router.get("/random", random);

//Upload video [done]
router.post("/uploadVideo",verifyToken, uploadVideo);

//Update video details [done]
router.put("/:id",verifyToken, updateVideo);

//Delete video [done]
router.delete("/:id",verifyToken, deleteVideo);

//Get  video by id [done]
router.get("/find/:id", getVideo);

//Get  video by trends [done]
router.get("/trends", trends);

//Add  video view [done]
router.put("/view/:id", addView);

//Get subcribed videos by id [done]
router.get("/sub",verifyToken,  sub);

//Get  video by tags [done]
router.get("/tags", getByTag);

//Get  video by query [done]
router.get("/search",search);

module.exports = router;