export const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
export const showAlert = (type, msg, time = 7) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}" role="alert" aria-live="assertive">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, time * 1000);
};

document.getElementById("open-modal-btn").onclick = function () {
  document.getElementById("create-post-modal").style.display = "block";
};

document.getElementById("close-modal-btn").onclick = function () {
  document.getElementById("create-post-modal").style.display = "none";
};

window.onclick = function (event) {
  if (event.target == document.getElementById("create-post-modal")) {
    document.getElementById("create-post-modal").style.display = "none";
  }
};

const post = async (title, content) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/forum/posts",
      data: {
        title,
        content,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Post created successfully!");
      window.setTimeout(() => {
        location.assign("/forums");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

const postForm = document.getElementById("create-post-form");

postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  post(title, content);
});

const truncateText = (elements) => {
  elements.forEach((element) => {
    const text = element.textContent.trim();
    const firstPeriodIndex = text.indexOf(".");
    if (firstPeriodIndex !== -1) {
      element.textContent = text.substring(0, firstPeriodIndex + 1) + "...";
    }
  });
};

// Call the truncateText function on elements with the class 'post-content'
document.addEventListener("DOMContentLoaded", () => {
  const postContentElements = document.querySelectorAll(".post-content");
  truncateText(postContentElements, 50); // Change 100 to your desired maximum length
});

//FILTER-BTN
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.querySelector(".searchs-input");
  const searchForm = document.querySelector(".searchs");
  function formatDates() {
    const dateElements = document.querySelectorAll('.forum-post-time');
    dateElements.forEach(dateElement => {
      const originalDate = new Date(dateElement.textContent);
      const formattedDate = originalDate.toLocaleString(); // Change this line for custom format if needed
      dateElement.textContent = formattedDate;
    });
  }
  formatDates();
  // Initialize the sort icons based on the current sort state
  const searchParams = new URLSearchParams(window.location.search);
  const currentSort = searchParams.get("sort");

  if (currentSort) {
    filterButtons.forEach((button) => {
      const sortType = button.getAttribute("data-sort");
      const arrow = button.querySelector(".arrow");

      if (currentSort === sortType) {
        arrow.classList.add("fa-arrow-down");
        button.classList.add("btn-active");
      } else if (currentSort === `-${sortType}`) {
        arrow.classList.add("fa-arrow-up");
        button.classList.add("btn-active");
      }
    });
  }

  // Add event listeners to filter buttons
  

  // Handle form submission to include search term in the query parameters
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("title", searchInput.value);
    searchParams.set("page", 1); // Reset to the first page on search


    window.location.search = searchParams.toString();
  });
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const sortType = this.getAttribute("data-sort");
      const arrow = button.querySelector(".arrow");
      const searchParams = new URLSearchParams(window.location.search);

      // Set the sort parameter
      const currentSort = searchParams.get("sort");
      if (currentSort === sortType) {
        searchParams.set("sort", `-${sortType}`);
      } else {
        searchParams.set("sort", sortType);
      }

      // Reset to the first page on filter change
      searchParams.set("page", 1);

      // Navigate to the new URL with updated query parameters
      window.location.search = searchParams.toString();
    });
  });
});