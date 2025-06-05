document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.querySelector(".searchs-input");
  const searchForm = document.querySelector(".searchs");
  function formatDates() {
    const dateElements = document.querySelectorAll('.tour-date');
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

  

  // Handle form submission to include search term in the query parameters
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("name", searchInput.value);
    searchParams.set("page", 1); // Reset to the first page on search

    window.location.search = searchParams.toString();
  });
  // Add event listeners to filter buttons
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