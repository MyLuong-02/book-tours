const { default: axios } = require("axios");
const catchAsync = require("../utils/catchAsync");
const Tour = require("../models/tourModel");
const AppError = require("../utils/appError");
const Booking = require("../models/bookingModel");
const crypto = require('crypto');


exports.getLanding = (req, res, next) => {
  res.status(200).render("index", {
    title: "Welcome to Natours",
    currentUser: req.user,
  });
};

// Middleware to generate nonce
const generateNonce = (req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  let limit = 6;
  let url = `http://127.0.0.1:8000/api/v1/tours/get-tour-active?limit=${limit}`;
  if (req.query.page) {
    url += `&page=${req.query.page}`;
  }
  if (req.query.name) {
    url += `&name=${req.query.name}`;
  }
  if (req.query.sort) {
    url += `&sort=${req.query.sort}`;
  }
  const tours = await axios.get(url);
  currentPage = Number(req.query.page) || 1;

  res.status(200).render("overview", {
    title: "All Tours",
    tours: tours.data.data.data,
    currentUser: req.user,
    totalPages: 10,
    currentPage,
    limit: limit,
    queryParams: req.query,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const data = await axios.get(
    "http://127.0.0.1:8000/api/v1/tours/" + req.params.slug
  );
  if (req.query.sort) {
    url += `&sort=${req.query.sort}`;
  }

  let tour = data.data.data.tour;

  res.status(200).render("tourcopy", {
    currentUser: req.user,
    title: data.name,
    tour,
  });
});

exports.getTourReview = catchAsync(async (req, res) => {
  const data = await axios.get(
    "http://127.0.0.1:8000/api/v1/tours/" + req.params.slug
  );
  let tour = data.data.data.tour;

  res.status(200).render("review", {
    currentUser: req.user,
    title: "Review Tour",
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
    currentUser: req.user,
  });
};
exports.getForgotPassword = async (req, res) => {
  res.status(200).render("forgotPassword", {
    currentUser: req.user,
    title: "Forgot Password",
  });
};

exports.getResetPassword = async (req, res) => {
  res.status(200).render("resetPassword", {
    currentUser: req.user,
    token: req.params.token,
    title: "Reset Password",
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render("signup", {
    title: "Create your account",
    currentUser: req.user,
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    currentUser: req.user,
    title: "My Account",
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render("my_tours", {
    currentUser: req.user,
    title: "My Bookings",
    tours,
  });
});

exports.getMyReview = async (req, res) => {
  res.status(200).render("my_reviews", {
    currentUser: req.user,
    title: "My Review",
  });
};
exports.getBilling = async (req, res) => {
  res.status(200).render("billing", {
    currentUser: req.user,
    title: "My Billing Information",
  });
};
exports.getManageTours = catchAsync(async (req, res, next) => {
  let url = `http://127.0.0.1:8000/api/v1/tours?`;
  if (req.query.name) {
    url += `&name=${req.query.name}`;
  }
  const data = await axios.get(url);
  let tours = data.data.data.data;
  res.status(200).render("manageTours", {
    currentUser: req.user,
    title: "Admin Panel - Manage Tours",
    tours,
    queryParams: req.query,
  });
});

exports.getManageUsers = catchAsync(async (req, res, next) => {
  let limit = 10;

  let url = `http://127.0.0.1:8000/api/v1/users?limit=${limit}`;
  if (req.query.page) {
    url += `&page=${req.query.page}`;
  }
  if (req.query.name) {
    url += `&name=${req.query.name}`;
  }
  const data = await axios({
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${req.cookies.jwt}`,
    },
  });
  currentPage = Number(req.query.page) || 1;

  res.status(200).render("manageUsers", {
    currentUser: req.user,
    title: "Admin Panel - Manage Users",
    users: data.data.data.data,
    totalPages: 10,
    currentPage,
    limit: limit,
    queryParams: req.query,
  });
});

exports.getManageReviews = catchAsync(async (req, res, next) => {
  const reviews = await axios.get('http://127.0.0.1:8000/api/v1/reviews');

  res.status(200).render("manageReviews", {
    currentUser: req.user,
    title: "Admin Panel - Manage Reviews",
    reviews: reviews.data.data.data,
  });
});

exports.getManageBookings = catchAsync(async (req, res) => {
  const booking = await axios({
    method: "GET",
    url: "http://127.0.0.1:8000/api/v1/bookings",
    headers: {
      Authorization: `Bearer ${req.cookies.jwt}`,
    },
  });

  res.status(200).render("manageBookings", {
    currentUser: req.user,
    title: "Admin Panel - Manage Bookings",
    bookings: booking.data.data.data,
  });
});

exports.getTourForm = async (req, res) => {
  res.status(200).render("tourForm", {
    currentUser: req.user,
    title: "Create New Tour",
  });
};
exports.getAbout = async (req, res) => {
  res.status(200).render("about", {
    currentUser: req.user,
    title: "About Us",
  });
};

exports.getForums = catchAsync(async (req, res) => {
  let limit = 6;
  let url = `http://127.0.0.1:8000/api/v1/forum/posts?limit=${limit}`;
  if (req.query.page) {
    url += `&page=${req.query.page}`;
  }
  if (req.query.title) {
    url += `&title=${req.query.title}`;
  }
  if (req.query.sort) {
    url += `&sort=${req.query.sort}`;
  }
  const forums = await axios.get(url);

  currentPage = Number(req.query.page) || 1;

  res.status(200).render("forums", {
    currentUser: req.user,
    title: "Forums",
    posts: forums.data.data.data,
    totalPages: 10,
    currentPage,
    limit: limit,
    queryParams: req.query,
  });
});

exports.getForum = catchAsync(async (req, res, next) => {
  let url = "http://127.0.0.1:8000/api/v1/forum/posts/" + req.params.id + "?";
  if (req.query.name) {
    url += `&name=${req.query.name}`;
  }
  if (req.query.sort) {
    url += `&sort=${req.query.sort}`;
  }
  const post = await axios.get(url);

  res.status(200).render("forum", {
    currentUser: req.user,
    title: "Post Details",
    post: post.data.data.data,
    queryParams: req.query,
    currentSort: req.query.sort || "desc",
  });
});

exports.getContact = async (req, res) => {
  res.status(200).render("contact", {
    currentUser: req.user,
    title: "Contact Us",
  });
};

exports.getPolicy = async (req, res) => {
  res.status(200).render("policy", {
    currentUser: req.user,
    title: "Terms and policy",
  });
};

exports.getSitemap = async (req, res) => {
  res.status(200).render("sitemap", {
    currentUser: req.user,
    title: "Sitemap",
  });
};
