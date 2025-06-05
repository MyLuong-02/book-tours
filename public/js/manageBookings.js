let currentButton;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    toggleDeleteModal(e.target);
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
  const modalText = `Do you want to cancel this booking?`;
  document.getElementById("modalText").innerText = modalText;
  document.getElementById("deleteBookingModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("deleteBookingModal").style.display = "none";
}

async function confirmDelete() {
  const bookingId = currentButton.getAttribute("data-booking-id");
  try {
    const res = await axios.delete(`/api/v1/bookings/${bookingId}`);
    if (res.status == 204) {
      // Optionally remove the deleted tour from the table
      document
        .querySelector(`button[data-tour-id="${bookingId}"]`)
        .closest("tr")
        .remove();
    } else {
      throw new Error("Failed to delete tour");
    }
  } catch (err) {
    console.error(err);
  }

  closeModal();
  // Optionally remove the deleted booking from the table
  document
    .querySelector(`button[data-booking-id="${bookingId}"]`)
    .closest("tr")
    .remove();
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
        document.querySelectorAll(".manage-bookings-table th")
      )
        .map((th, index) => (th.textContent.trim() === column ? index : null))
        .filter((index) => index !== null);

      if (thIndex.length > 0) {
        const columnIndex = thIndex[0];
        const columnCells = document.querySelectorAll(
          `.manage-bookings-table th:nth-child(${columnIndex + 1}), .manage-bookings-table td:nth-child(${columnIndex + 1})`
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
  downloadLink.download = "bookings_table.xls";
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function exportTableToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.autoTable({ html: "#bookingTable" });
  doc.save("bookings_table.pdf");
}
