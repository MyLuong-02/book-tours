const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showAlert = (type, msg, time = 7) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}" role="alert" aria-live="assertive">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, time * 1000);
};

const reviewBtn = document.getElementById("review-submit");
reviewBtn.addEventListener("click", (event) => {
  event.preventDefault();
  createReview();
});

const createReview = async () => {
  const review = document.getElementById("review").value;
  const tourId = reviewBtn.getAttribute("data-tour-id");
  try {
    const res = await axios({
      method: "POST",
      url: `/api/v1/reviews`,
      data: {
        review: review,
        tour: tourId,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Review created successfully!");
      location.reload();
    }
  } catch (err) {
    console.log(err.response.data.message);
    showAlert("error", err.response.data.message);
  }
};
