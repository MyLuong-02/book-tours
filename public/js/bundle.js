/* eslint-disable */ /* eslint-disable */ const $7464264e645443a6$export$4c5dd147b21b9176 = (locations)=>{
    mapboxgl.accessToken = "pk.eyJ1IjoiaHVuZ2xlZS1ybWl0IiwiYSI6ImNsdjlucnR0OTBheTEya3MyejNheHIyMWgifQ.kPIDln6DvJuWSyAiE2O-CA";
    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/hunglee-rmit/clwr6y4ac00ym01qxbh49ewjd"
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc)=>{
        // Create marker
        const el = document.createElement("div");
        el.className = "marker";
        // Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: "bottom"
        }).setLngLat(loc.coordinates).addTo(map);
        //Add popup
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);
        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        },
        maxZoom: 15,
        duration: 2000
    });
};


/*export const navbar = () => {
  const hamburger = document.getElementById("hamburger-menu");
  const mobileNav = document.getElementById("nav-mobile");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
  });
};

export const dropDown = () => {
  var reviewContainers = document.querySelectorAll(".review-container");

  // Loop through each review container
  reviewContainers.forEach(function (container) {
    // Get the button and dropdown content within each container
    var dropdown = container.querySelector(".dropdown");
    var dropdownContent = container.querySelector(".review__content");

    // Add event listener to the button
    dropdown.addEventListener("click", function () {
      // Toggle the display of dropdown content
      if (
        dropdownContent.style.display === "none" ||
        dropdownContent.style.display === ""
      ) {
        dropdownContent.style.display = "block";
      } else {
        dropdownContent.style.display = "none";
      }
    });
  });
};*/ //theme
const $5a40279f06d9f5a0$export$bfcc790a4733fb08 = ()=>{
    const setTheme = (themeName)=>{
        localStorage.setItem("theme", themeName);
        document.documentElement.setAttribute("data-theme", themeName);
        document.getElementById("darkmode-toggle").checked = themeName === "dark";
    };
    const toggleTheme = ()=>{
        if (localStorage.getItem("theme") === "dark") setTheme("light");
        else setTheme("dark");
    };
    document.getElementById("darkmode-toggle").addEventListener("change", toggleTheme);
    // Apply the saved theme on initial load
    if (localStorage.getItem("theme") === "dark") setTheme("dark");
    else setTheme("light");
};
const $5a40279f06d9f5a0$export$58733aaf927c3bbe = ()=>{
    const hamburger = document.getElementById("hamburger-menu");
    const mobileNav = document.getElementById("nav-mobile");
    hamburger.addEventListener("click", function() {
        hamburger.classList.toggle("open");
        mobileNav.classList.toggle("open");
    });
    // Highlight current page link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav__el");
    navLinks.forEach((link)=>{
        const href = link.getAttribute("href");
        if (href === currentPath) link.classList.add("nav__el--active");
    });
};
// Ensure to call the navbar function in your main script to initialize the navbar behavior.
document.addEventListener("DOMContentLoaded", ()=>{
    $5a40279f06d9f5a0$export$58733aaf927c3bbe();
});
const $5a40279f06d9f5a0$export$bd4558eab3154e95 = ()=>{
    var reviewContainers = document.querySelectorAll(".review-container");
    // Loop through each review container
    reviewContainers.forEach(function(container) {
        // Get the button and dropdown content within each container
        var dropdown = container.querySelector(".dropdown");
        var dropdownContent = container.querySelector(".review__content");
        // Add event listener to the button
        dropdown.addEventListener("click", function() {
            // Toggle the display of dropdown content
            if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") dropdownContent.style.display = "block";
            else dropdownContent.style.display = "none";
        });
    });
};


/* eslint-disable */ /* eslint-disable */ const $5bdcc18e63fa8fe3$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const $5bdcc18e63fa8fe3$export$de026b00723010c1 = (type, msg, time = 7)=>{
    $5bdcc18e63fa8fe3$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}" role="alert" aria-live="assertive">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout($5bdcc18e63fa8fe3$export$516836c6a9dfc573, time * 1000);
};


const $cbd016933ecb5281$export$7200a869094fec36 = async (name, email, password, passwordConfirm)=>{
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/users/signup",
            data: {
                name: name,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            }
        });
        if (res.data.status === "success") {
            (0, $5bdcc18e63fa8fe3$export$de026b00723010c1)("success", "signed up in successfully!");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1000);
        }
    } catch (err) {
        (0, $5bdcc18e63fa8fe3$export$de026b00723010c1)("error", err.response.data.message);
        window.setTimeout(()=>{
            location.reload(true);
        }, 1000);
    }
};


/* eslint-disable */ 
const $12b329720db331db$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/users/login",
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === "success") location.assign("/");
    } catch (err) {
        (0, $5bdcc18e63fa8fe3$export$de026b00723010c1)("error", err.response.data.message);
    }
};
const $12b329720db331db$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await axios({
            method: "GET",
            url: "/api/v1/users/logout"
        });
        if (res.data.status === "success") location.assign("/");
    } catch (err) {
        (0, $5bdcc18e63fa8fe3$export$de026b00723010c1)("error", "Error logging out! Try again.");
    }
};


/* eslint-disable */ 
const $2f19d0d4466f23cb$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === "password" ? "/api/v1/users/updateMyPassword" : "/api/v1/users/updateMe";
        const res = await axios({
            method: "PATCH",
            url: url,
            data: data
        });
        if (res.data.status === "success") {
            (0, $5bdcc18e63fa8fe3$export$de026b00723010c1)("success", `${type.toUpperCase()} updated successfully!`);
            window.setTimeout(()=>{
                location.reload(true);
            }, 1500);
        }
    } catch (err) {
        (0, $5bdcc18e63fa8fe3$export$de026b00723010c1)("error", err.response.data.message);
    }
};


/* eslint-disable */ 
const $94d4ea331c96dc3f$var$stripe = Stripe("pk_test_51P822k06D9rTsXc6qZbOyMCkxXiVPglOlu9ma31orVCSymtsKmhiynmdKR60uC26iTjY72EHkviRIcZUtXbA0FGP00DPvAjpox");
const $94d4ea331c96dc3f$export$8d5bdbf26681c0c2 = async (tourId)=>{
    try {
        // 1) Get checkout session from API
        const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
        // console.log(session);
        // 2) Create checkout form + charge credit card
        await $94d4ea331c96dc3f$var$stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log(err);
        (0, $5bdcc18e63fa8fe3$export$de026b00723010c1)("error", err);
    }
};



const $d8574a0ff7371adf$export$a0551d12d6c29d65 = ()=>{
    document.getElementById("addGuideBtn").addEventListener("click", function() {
        // Container where new elements will be added
        const container = document.querySelector(".more-guides");
        // Create a new detail div
        const newDetail = document.createElement("div");
        newDetail.classList.add("overview-box__detail");
        // Create the select element
        const select = document.createElement("select");
        select.classList.add("form__input");
        [
            "Lead guide",
            "Tour guide",
            "Intern"
        ].forEach(function(role) {
            const option = document.createElement("option");
            option.value = role.toLowerCase().replace(" ", "-");
            option.textContent = role;
            select.appendChild(option);
        });
        newDetail.appendChild(select);
        // Create the input element
        const input = document.createElement("input");
        input.placeholder = "Enter name";
        input.classList.add("form__input");
        newDetail.appendChild(input);
        // Create the delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "-";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.classList.add("btn");
        deleteBtn.classList.add("btn--red");
        deleteBtn.onclick = function() {
            newDetail.remove();
        };
        newDetail.appendChild(deleteBtn);
        // Append the new detail div to the container
        container.appendChild(newDetail);
    });
};



const $d58680d785cf9ead$export$66791fb2cfeec3e = async (email)=>{
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/users/forgotPassword",
            data: {
                email: email
            }
        });
        if (res.data.status === "success") (0, $5bdcc18e63fa8fe3$export$de026b00723010c1)("success", "Token sent to email!");
    } catch (err) {
        (0, $5bdcc18e63fa8fe3$export$de026b00723010c1)("error", err.response.data.message);
    }
};



const $49b3dd5a076c694f$export$dc726c8e334dd814 = async (password, passwordConfirm, token)=>{
    try {
        const res = await axios({
            method: "PATCH",
            url: `/api/v1/users/resetPassword/${token}`,
            data: {
                password: password,
                passwordConfirm: passwordConfirm
            }
        });
        if (res.data.status === "success") {
            (0, $5bdcc18e63fa8fe3$export$de026b00723010c1)("success", "Password reset successfully!");
            window.setTimeout(()=>{
                location.assign("/login");
            }, 1500);
        }
    } catch (err) {
        (0, $5bdcc18e63fa8fe3$export$de026b00723010c1)("error", err.response.data.message);
    }
};


// DOM ELEMENTS
const $03694d79d4fdfabe$var$mapBox = document.getElementById("map");
const $03694d79d4fdfabe$var$signupForm = document.querySelector(".form--signup");
const $03694d79d4fdfabe$var$loginForm = document.querySelector(".form--login");
const $03694d79d4fdfabe$var$logOutBtn = document.querySelector(".nav__el--logout");
const $03694d79d4fdfabe$var$logOutBtnMobile = document.querySelector(".nav__el--logout-mobile");
const $03694d79d4fdfabe$var$userDataForm = document.querySelector(".form-user-data");
const $03694d79d4fdfabe$var$userPasswordForm = document.querySelector(".form-user-password");
const $03694d79d4fdfabe$var$bookBtn = document.getElementById("book-tour");
const $03694d79d4fdfabe$var$forgotPasswordForm = document.querySelector(".forgot-password-form");
const $03694d79d4fdfabe$var$resetPasswordForm = document.querySelector(".reset-password-form");
// DELEGATION
if ($03694d79d4fdfabe$var$mapBox) {
    const locations = JSON.parse($03694d79d4fdfabe$var$mapBox.dataset.locations);
    (0, $7464264e645443a6$export$4c5dd147b21b9176)(locations);
}
if ($03694d79d4fdfabe$var$signupForm) $03694d79d4fdfabe$var$signupForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const signupBtn = document.getElementById("signupBtn");
    const catpcha = grecaptcha.getResponse();
    if (!catpcha) {
        (0, $5bdcc18e63fa8fe3$export$de026b00723010c1)("error", "Please verify reCaptcha", 5);
        return;
    } else {
        (0, $cbd016933ecb5281$export$7200a869094fec36)(name, email, password, passwordConfirm);
        signupBtn.disabled = true;
        signupBtn.textContent = "Signing up...";
    }
});
if ($03694d79d4fdfabe$var$loginForm) $03694d79d4fdfabe$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const catpcha = grecaptcha.getResponse();
    if (!catpcha) {
        (0, $5bdcc18e63fa8fe3$export$de026b00723010c1)("error", "Please verify reCaptcha", 5);
        return;
    } else (0, $12b329720db331db$export$596d806903d1f59e)(email, password);
});
if ($03694d79d4fdfabe$var$logOutBtn) $03694d79d4fdfabe$var$logOutBtn.addEventListener("click", (0, $12b329720db331db$export$a0973bcfe11b05c9));
if ($03694d79d4fdfabe$var$logOutBtnMobile) $03694d79d4fdfabe$var$logOutBtnMobile.addEventListener("click", (0, $12b329720db331db$export$a0973bcfe11b05c9));
if ($03694d79d4fdfabe$var$userDataForm) $03694d79d4fdfabe$var$userDataForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    (0, $2f19d0d4466f23cb$export$f558026a994b6051)(form, "data");
});
if ($03694d79d4fdfabe$var$userPasswordForm) $03694d79d4fdfabe$var$userPasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await (0, $2f19d0d4466f23cb$export$f558026a994b6051)({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, "password");
    document.querySelector(".btn--save-password").textContent = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
});
if ($03694d79d4fdfabe$var$bookBtn) $03694d79d4fdfabe$var$bookBtn.addEventListener("click", (e)=>{
    e.target.textContent = "Processing...";
    const { tourId: tourId } = e.target.dataset;
    (0, $94d4ea331c96dc3f$export$8d5bdbf26681c0c2)(tourId);
});
// const alertMessage = document.querySelector("body").dataset.alert;
// if (alertMessage) showAlert("success", alertMessage, 20);
if ($03694d79d4fdfabe$var$forgotPasswordForm) $03694d79d4fdfabe$var$forgotPasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    await (0, $d58680d785cf9ead$export$66791fb2cfeec3e)(email);
});
if ($03694d79d4fdfabe$var$resetPasswordForm) $03694d79d4fdfabe$var$resetPasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const token = document.getElementById("token").value;
    await (0, $49b3dd5a076c694f$export$dc726c8e334dd814)(password, passwordConfirm, token);
});
(0, $5a40279f06d9f5a0$export$bfcc790a4733fb08)();
//MANAGE-REVIEWS
document.addEventListener("DOMContentLoaded", function() {
    const headings = document.querySelectorAll(".card__heading");
    headings.forEach((heading)=>{
        heading.addEventListener("click", function() {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === "none" || content.style.display === "" ? "block" : "none";
        });
    });
});
var $03694d79d4fdfabe$var$deleteButtons = document.querySelectorAll(".delete-btn");
$03694d79d4fdfabe$var$deleteButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        currentButton = button;
        modalText.textContent = "Do you want to remove this review?";
        modal.style.display = "block";
        confirmBtn.onclick = function() {
            var row = currentButton.closest("tr");
            row.parentNode.removeChild(row);
            modal.style.display = "none";
        };
    });
});


//# sourceMappingURL=bundle.js.map
