const express = require("express");
const forumController = require("../controllers/forumController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/posts", forumController.getAllPost);
router.get("/posts/:id", forumController.getPost);

router.use(authController.protect);
router.post(
  "/posts",
  forumController.setPostUserIds,
  forumController.createPost
);
router.patch("/posts/:id", forumController.updatePost);
router.delete("/posts/:id", forumController.deletePost);

router.get("/posts/:postId/replies", forumController.getAllReplies);
router.get("/replies/:id", forumController.getReply);
router.post(
  "/posts/:postId/replies",
  forumController.setPostUserIds,
  forumController.createReply
);
router.patch("/replies/:id", forumController.updateReply);
router.delete("/replies/:id", forumController.deleteReply);

module.exports = router;
