let currentButton;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    toggleDeleteModal(e.target);
  } else if (e.target.classList.contains("btn-edit")) {
    const tourId = e.target.getAttribute("data-tour-id");
    window.location.href = `/edit-tour/${tourId}`;
  } else if (e.target.id === "closeModalBtn" || e.target.id === "cancelBtn") {
    closeModal();
  } else if (e.target.id === "confirmBtn") {
    confirmDelete();
  } else if (e.target.id === "copyBtn") {
    copyTable();
  } else if (e.target.id === "excelBtn") {
    exportTableToExcel();
  } else if (e.target.id === "pdfBtn") {
    exportTableToPDF();
  }
});

function toggleDeleteModal(button) {
  currentButton = button;
  const modalText = `Do you want to delete this tour?`;
  document.getElementById("modalText").innerText = modalText;
  document.getElementById("deleteTourModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("deleteTourModal").style.display = "none";
}

async function confirmDelete() {
  const tourId = currentButton.getAttribute("data-tour-id");
  // Add your deletion logic here, for example an AJAX request to delete the tour
  try {
    const res = await axios.delete(`/api/v1/tours/${tourId}`);
    if (res.status == 204) {
      // Optionally remove the deleted tour from the table
      document
        .querySelector(`button[data-tour-id="${tourId}"]`)
        .closest("tr")
        .remove();
    } else {
      throw new Error("Failed to delete tour");
    }
  } catch (err) {
    console.error(err);
  }
  // After deletion logic
  closeModal();
  // Optionally remove the deleted tour from the table
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("closeModalBtn")
    .addEventListener("click", closeModal);
  document.getElementById("cancelBtn").addEventListener("click", closeModal);
  document
    .getElementById("confirmBtn")
    .addEventListener("click", confirmDelete);

  document.querySelectorAll(".dropdown-content a").forEach((link) => {
    link.addEventListener("click", () => {
      const column = link.dataset.column;
      const thIndex = Array.from(
        document.querySelectorAll(".manage-tours-table th")
      )
        .map((th, index) => (th.textContent.trim() === column ? index : null))
        .filter((index) => index !== null);

      if (thIndex.length > 0) {
        const columnIndex = thIndex[0];
        const columnCells = document.querySelectorAll(
          `.manage-tours-table th:nth-child(${columnIndex + 1}), .manage-tours-table td:nth-child(${columnIndex + 1})`
        );
        columnCells.forEach((cell) => cell.classList.toggle("hidden"));
      }
    });
  });
});

function copyTable() {
  const table = document.getElementById("bookingTable");
  const range = document.createRange();
  range.selectNode(table);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  alert("Table copied to clipboard");
}

function exportTableToExcel() {
  const table = document.getElementById("bookingTable");
  let tableHTML = table.outerHTML.replace(/ /g, "%20");

  const downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);

  downloadLink.href = "data:application/vnd.ms-excel," + tableHTML;
  downloadLink.download = "tours_table.xls";
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function exportTableToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.autoTable({ html: "#bookingTable" });
  doc.save("tours_table.pdf");
}
//FILTER-BTN
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.querySelector(".searchs-input");
  const searchForm = document.querySelector(".searchs");

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

  
        // Navigate to the new URL with updated query parameters
        window.location.search = searchParams.toString();
      });
    });
});
