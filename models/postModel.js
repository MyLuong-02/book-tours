const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A post must have a title"],
      trim: true,
      minlength: [
        10,
        "A post title must have more or equal then 10 characters",
      ],
    },
    content: {
      type: String,
      required: [true, "A post must have a content"],
      trim: true,
      minlength: [
        10,
        "A post content must have more or equal then 10 characters",
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A post must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

postSchema.virtual("replies", {
  ref: "Reply",
  foreignField: "post",
  localField: "_id",
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
