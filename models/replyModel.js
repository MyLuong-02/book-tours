const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    reply: {
      type: String,
      required: [true, "Reply can not be empty!"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: [true, "Reply must belong to a post."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Reply must belong to a user."],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

replySchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
