const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Tour = require("../../models/tourModel");
const User = require("../../models/userModel");
const Review = require("../../models/reviewModel");
const Post = require("../../models/postModel");
const Reply = require("../../models/replyModel");

dotenv.config({
  path: "config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);
const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`, "utf-8"));
const replies = JSON.parse(
  fs.readFileSync(`${__dirname}/replies.json`, "utf-8")
);
//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    await Post.create(posts);
    await Reply.create(replies);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//DELETE EXIST DATA
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    await Post.deleteMany();
    await Reply.deleteMany();
    console.log("All data deleted!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//console
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
