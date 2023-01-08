const router = require('express').Router();
const {verifyToken} = require('../utils/verifyToken');
const { addComment, deleteComment, getComments } = require ('../controllers/comment.js');

router.post("/", verifyToken, addComment)

router.delete("/:id", verifyToken, deleteComment)
router.get("/:videoId", getComments)

module.exports = router; 