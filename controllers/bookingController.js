const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const Tour = require("../models/tourModel");
const Booking = require("../models/bookingModel");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Lấy tour hiện tại đã được đặt
  const tour = await Tour.findById(req.params.tourId);

  // 2) Tạo phiên thanh toán
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/my-tours?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://postimg.cc/gallery/bjb7bBG/${tour.imageCover}`],
          },
          unit_amount: tour.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  // 3) Tạo phản hồi với phiên thanh toán
  res.status(200).json({
    status: "success",
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.query;
  if (!tour && !user && !price) return next();
  await Booking.create({ tour, user, price });
  res.redirect(req.originalUrl.split("?")[0]);
});

exports.deleteBooking = factory.deleteOne(Booking);
exports.getAllBooking = factory.getAll(Booking);
exports.getAllActiveBooking = factory.getAllActive(Booking);
