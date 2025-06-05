/* eslint-disable */
import { displayMap } from "./mapbox";
import { navbar, dropDown, themeToggle } from "./navbar";
import { signup } from "./signup";
import { login, logout } from "./login";
import { updateSettings } from "./updateSettings";
import { bookTour } from "./stripe";

import { showAlert } from "./alerts";
//import { themeToggle } from "./themeToggle";
import { addGuide } from "./addGuide";
import { forgotPassword } from "./forgotPassword";
import { resetPassword } from "./resetPassword";
// DOM ELEMENTS
const mapBox = document.getElementById("map");
const signupForm = document.querySelector(".form--signup");
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const logOutBtnMobile = document.querySelector(".nav__el--logout-mobile");
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");
const bookBtn = document.getElementById("book-tour");
const forgotPasswordForm = document.querySelector(".forgot-password-form");
const resetPasswordForm = document.querySelector(".reset-password-form");

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const signupBtn = document.getElementById("signupBtn");
    const catpcha = grecaptcha.getResponse();
    if (!catpcha) {
      showAlert("error", "Please verify reCaptcha", 5);
      return;
    } else {
      signup(name, email, password, passwordConfirm);
      signupBtn.disabled = true;
      signupBtn.textContent = "Signing up...";
    }
  });
}

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const catpcha = grecaptcha.getResponse();
    if (!catpcha) {
      showAlert("error", "Please verify reCaptcha", 5);
      return;
    } else {
      login(email, password);
    }
  });

if (logOutBtn) logOutBtn.addEventListener("click", logout);
if (logOutBtnMobile) logOutBtnMobile.addEventListener("click", logout);

if (userDataForm)
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);

    updateSettings(form, "data");
  });

if (userPasswordForm)
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";

    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password"
    );

    document.querySelector(".btn--save-password").textContent = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });

if (bookBtn)
  bookBtn.addEventListener("click", (e) => {
    e.target.textContent = "Processing...";
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

// const alertMessage = document.querySelector("body").dataset.alert;
// if (alertMessage) showAlert("success", alertMessage, 20);

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    await forgotPassword(email);
  });
}

if (resetPasswordForm) {
  resetPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const token = document.getElementById("token").value;
    await resetPassword(password, passwordConfirm, token);
  });
}

themeToggle();
//MANAGE-REVIEWS
document.addEventListener("DOMContentLoaded", function () {
  const headings = document.querySelectorAll(".card__heading");

  headings.forEach((heading) => {
    heading.addEventListener("click", function () {
      const content = this.nextElementSibling;
      content.style.display =
        content.style.display === "none" || content.style.display === ""
          ? "block"
          : "none";
    });
  });
});
var deleteButtons = document.querySelectorAll(".delete-btn");
deleteButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentButton = button;
    modalText.textContent = "Do you want to remove this review?";
    modal.style.display = "block";

    confirmBtn.onclick = function () {
      var row = currentButton.closest("tr");
      row.parentNode.removeChild(row);
      modal.style.display = "none";
    };
  });
});
