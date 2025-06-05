let currentButton;

document.addEventListener("click", (e) => {
  if (
    e.target.tagName === "BUTTON" &&
    e.target.classList.contains("status-btn")
  ) {
    toggleStatus(e.target);
  } else if (e.target.id === "copyBtn") {
    copyTable();
  } else if (e.target.id === "excelBtn") {
    exportTableToExcel();
  } else if (e.target.id === "pdfBtn") {
    exportTableToPDF();
  }
});

function toggleStatus(button) {
  currentButton = button;
  const currentStatus = button.innerText.trim();
  const actionText = currentStatus === "ACTIVE" ? "ban" : "activate";
  const modalText = `Do you want to ${actionText} this user?`;
  document.getElementById("modalText").innerText = modalText;
  document.getElementById("statusModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("statusModal").style.display = "none";
}

async function confirmStatusChange() {
  const currentStatus = currentButton.innerText.trim();
  const userId = currentButton.getAttribute("data-user-id");
  try {
    if (currentStatus === "ACTIVE") {
      await axios.delete(`/api/v1/users/${userId}`);
      currentButton.classList.remove("status-banned");
      currentButton.classList.add("status-banned");
      currentButton.innerText = "BANNED";
    } else {
      await axios.patch(`/api/v1/users/${userId}`, { active: true });
      currentButton.classList.add("status-banned");
      currentButton.classList.remove("status-banned");
      currentButton.innerText = "ACTIVATE";
    }
  } catch (err) {
    console.error(err);
  }
  closeModal();
}

document.addEventListener("DOMContentLoaded", () => {
  const closeModalBtn = document.getElementById("closeModalBtn");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  closeModalBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  confirmBtn.addEventListener("click", confirmStatusChange);

  document.querySelectorAll(".dropdown-content a").forEach((link) => {
    link.addEventListener("click", () => {
      const column = link.dataset.column;
      const thIndex = Array.from(
        document.querySelectorAll(".manage-users-table th")
      )
        .map((th, index) => (th.textContent.trim() === column ? index : null))
        .filter((index) => index !== null);

      if (thIndex.length > 0) {
        const columnIndex = thIndex[0];
        const columnCells = document.querySelectorAll(
          `.manage-users-table th:nth-child(${columnIndex + 1}), .manage-users-table td:nth-child(${columnIndex + 1})`
        );
        columnCells.forEach((cell) => cell.classList.toggle("hidden"));
      }
    });
  });
});

function copyTable() {
  const table = document.getElementById("userTable");
  const range = document.createRange();
  range.selectNode(table);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  alert("Table copied to clipboard");
}

function exportTableToExcel() {
  const table = document.getElementById("userTable");
  let tableHTML = table.outerHTML.replace(/ /g, "%20");

  const downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);

  downloadLink.href = "data:application/vnd.ms-excel," + tableHTML;
  downloadLink.download = "users_table.xls";
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function exportTableToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.autoTable({ html: "#userTable" });
  doc.save("users_table.pdf");
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
