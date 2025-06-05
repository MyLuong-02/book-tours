const deleteAccountBtn = document.querySelector(".btn--delete-account");
const cancelBtn = document.querySelector(".cancelBtn");
const confirmBtn = document.querySelector(".confirmBtn");
if(deleteAccountBtn){
  deleteAccountBtn.addEventListener("click", showModal);
}

cancelBtn.addEventListener("click", closeModal);
confirmBtn.addEventListener("click", confirmAction);

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

function showModal() {
  const modal = document.getElementById("confirmationModal");
  const modalHeading = document.getElementById("modalHeading");
  const modalText = document.getElementById("modalText");

  modalHeading.textContent = "Are you sure you want to delete the account?";
  modalText.innerHTML =
    "Deleting your account is permanent. All your data (bookings, reviews, and feedbacks) will be removed and you will not be able to retrieve your account anymore.";

  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("confirmationModal");
  modal.style.display = "none";
}

async function confirmAction() {
  try {
    const res = await axios({
      method: "DELETE",
      url: "/api/v1/users/deleteMe",
    });

    if (res.status == "204") {
      showAlert("success", "Account deleted successfully!");
      try {
        const res = await axios({
          method: "GET",
          url: "/api/v1/users/logout",
        });
        if (res.data.status === "success") {
          location.assign("/");
        }
      } catch (err) {
        showAlert("error", "Error logging out! Try again.");
      }
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
}
//IMG PREVIEW
document.addEventListener('DOMContentLoaded', function() {
  const photoInput = document.getElementById('photo');
  
  const userPhoto = document.querySelector('.form__user-photo');

  photoInput.addEventListener('change', function(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();


      reader.onload = function(event) {
        userPhoto.src = event.target.result;
      };


      reader.readAsDataURL(selectedFile);
    }
  });
});