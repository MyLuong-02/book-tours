/* eslint-disable */

import { showAlert } from "./alerts";

const stripe = Stripe(
  "pk_test_51P822k06D9rTsXc6qZbOyMCkxXiVPglOlu9ma31orVCSymtsKmhiynmdKR60uC26iTjY72EHkviRIcZUtXbA0FGP00DPvAjpox"
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
