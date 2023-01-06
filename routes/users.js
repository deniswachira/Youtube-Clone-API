const router = require('express').Router();
const { deleteUser, dislike, getUser, like, subscribe, unsubcribe, updateUser } = require ('../controllers/user.js');

const {verifyToken} = require('../utils/verifyToken');

//update user
router.put("/:id",verifyToken, updateUser);

//delete user
router.delete("/:id",verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

// //subsribe a user
router.put("/sub/:id",verifyToken, subscribe);

// //unsubribe a user
router.put("/unsub/:id",verifyToken, unsubcribe);

// //like a video
router.put("/like/:videoId",verifyToken, like);

// //dislike a video
router.put("/dislike/:videoId",verifyToken, dislike);
module.exports = router; 