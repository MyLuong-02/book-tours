const express = require("express");

const toursController = require("../controllers/tourController");
const reviewRouter = require("./reviewRoutes");

const authController = require("../controllers/authController");

const router = express.Router();

router.use("/:tourId/reviews", reviewRouter);

router
  .route("/top-5-tours")
  .get(toursController.aliasTopTours, toursController.getAllTours);

router.route("/tour-stats").get(toursController.getTourStats);

router
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    toursController.getMonthlyPlan
  );

router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(toursController.getToursWithin);

router.route("/distances/:latlng/unit/:unit").get(toursController.getDistances);
router.route("/get-tour-active").get(toursController.getActiveTours);

router
  .route("/")
  .get(toursController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", toursController.createTour)
  );

router.route("/:slug").get(toursController.getTour);

router
  .route("/:id")
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    toursController.uploadTourImages,
    toursController.resizeTourImages,
    toursController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    toursController.deleteTour
  );

module.exports = router;
