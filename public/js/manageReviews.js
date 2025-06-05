document.addEventListener('DOMContentLoaded', function() {
  let currentButton;

  // Toggle the dropdown menu for reviews
  document.querySelectorAll('.card__heading').forEach(heading => {
    heading.addEventListener('click', function() {
      const content = this.nextElementSibling;
      content.style.display = content.style.display === 'none' || content.style.display === '' ? 'block' : 'none';
    });
  });

  // Handle delete button click
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
      currentButton = button;
      document.getElementById('deleteReviewModal').style.display = 'flex';
    });
  });

  // Handle close modal button
  document.getElementById('closeModalBtn').addEventListener('click', function() {
    document.getElementById('deleteReviewModal').style.display = 'none';
  });

  // Handle confirm delete
  document.getElementById('confirmBtn').addEventListener('click', function() {
    const reviewId = currentButton.getAttribute('data-review-id');
    deleteReview(reviewId);
  });

  // Handle cancel delete
  document.getElementById('cancelBtn').addEventListener('click', function() {
    document.getElementById('deleteReviewModal').style.display = 'none';
  });

  // Function to delete review
  async function deleteReview(reviewId) {
    try {
      const res = await axios({
        method: 'DELETE',
        url: `/api/v1/reviews/${reviewId}`
      });

      if (res.status === 204) {
        currentButton.closest('.review-container').remove();
        document.getElementById('deleteReviewModal').style.display = 'none';
        showAlert('success', 'Review deleted successfully!');
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  }

  // Show alert
  function showAlert(type, msg) {
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
  }

  // Hide alert
  function hideAlert() {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
  }
});
