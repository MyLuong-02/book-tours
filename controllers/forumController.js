const Reply = require("../models/replyModel");
const factory = require("./handlerFactory");
const Post = require("../models/postModel");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.setPostUserIds = (req, res, next) => {
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReplies = factory.getAll(Reply);
exports.getReply = factory.getOne(Reply);
exports.createReply = factory.createOne(Reply);
exports.updateReply = factory.updateOne(Reply);
exports.deleteReply = factory.realDeleteOne(Reply);

exports.getAllPost = factory.getAll(Post);
exports.getPost = factory.getOne(Post, { path: "replies" });
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = (req, res, next) => {
  // Delete all related comments
  Reply.deleteMany({ post: req.params.postId })
    .then(() => {
      // Delete the post
      factory.realDeleteOne(Post)(req, res, next);
    })
    .catch((err) => {
      next(err);
    });
};
