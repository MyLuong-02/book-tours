const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");

const CSP = "Content-Security-Policy";
const POLICY =
  "default-src 'self' https://*.mapbox.com ;" +
  "frame-src https://www.google.com https://js.stripe.com ;" +
  "base-uri 'self';block-all-mixed-content;" +
  "font-src 'self' https: data:;" +
  "frame-ancestors 'self';" +
  "img-src http://localhost:8000 'self' blob: data:;" +
  "object-src 'none';" +
  "script-src https: cdn.jsdelivr.net cdnjs.cloudflare.com api.mapbox.com 'self' blob: ;" +
  "connect-src https: http://localhost:8000 'self' https://cdn.mysitemapgenerator.com/api/embedmap.m.js;" +
  "script-src-attr 'none';" +
  "style-src 'self' https: 'unsafe-inline';" +
  "upgrade-insecure-requests;";

const router = express.Router();

router.use("", (req, res, next) => {
  res.setHeader(CSP, POLICY);
  next();
});

router.use(authController.isLoggedIn);
router.get("/", viewController.getLanding);
router.get("/overview", viewController.getOverview);
router.get("/tour/:slug", viewController.getTour); //change dynamic
router.get("/review/:slug", viewController.getTourReview); //change dynamic
router.get("/login", authController.isLoggedIn, viewController.getLoginForm);
router.get("/signup", viewController.getSignupForm);
router.get("/resetPassword/:token?", viewController.getResetPassword);
router.get("/me", authController.protect, viewController.getAccount);
router.get("/forgot-password", viewController.getForgotPassword);
router.get("/signup", viewController.getSignupForm);
router.get("/me", authController.protect, viewController.getAccount); //
router.get(
  "/my-tours",
  authController.protect,
  bookingController.createBookingCheckout,
  viewController.getMyTours
);
router.get("/my-reviews", authController.protect, viewController.getMyReview);
router.get("/billing", authController.protect, viewController.getBilling);
router.get(
  "/manage-tours",
  authController.protect,
  viewController.getManageTours
);
router.get(
  "/manage-reviews",
  authController.protect,
  viewController.getManageReviews
);
router.get(
  "/manage-users",
  authController.protect,
  viewController.getManageUsers
);
router.get(
  "/manage-bookings",
  authController.protect,
  viewController.getManageBookings
);
router.get("/add-tour", viewController.getTourForm);
router.get("/about", viewController.getAbout);
router.get("/contact", viewController.getContact);

router.get("/policy", viewController.getPolicy);

router.get("/forum/:id", viewController.getForum);
router.get("/forums", viewController.getForums);
router.get("/sitemap", viewController.getSitemap);

router.get('/manage-reviews', authController.protect, authController.restrictTo('admin'), viewController.getManageReviews);


module.exports = router;
