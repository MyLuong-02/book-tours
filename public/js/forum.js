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

const createReplyMarkup = (reply) => {
  return `
    <div class="comment" data-comment-id="${reply._id}">
    <img src="img/users/${reply.user.photo}" alt="${reply.user.name}" class="comment-avatar" />
    <div class="comment-content">
      <p class="comment-username">${reply.user.name}</p>
      <p class="comment-text">${reply.reply}</p>
      <div class="comment-options">
        <i class="fas fa-ellipsis-h"></i>
        <div class="comment-options-menu">
          <a href="#" class="comment-option edit-comment" data-comment-id="${reply._id}">Edit</a>
          <a href="#" class="comment-option delete-comment" data-comment-id="${reply._id}">Delete</a>
        </div>
      </div>
    </div>
  </div>
  `;
};

const replies = async (reply, postId) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/v1/forum/posts/${postId}/replies`,
      data: {
        reply,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Reply created successfully!");
      const replyId = res.data.data.data._id;
      const newData = await axios.get(`/api/v1/forum/replies/${replyId}`);
      const newReply = newData.data.data.data;
      const markup = createReplyMarkup(newReply);
      document
        .querySelector(".comment-section")
        .insertAdjacentHTML("beforeend", markup);
      document.getElementById("comment").value = "";
    }
  } catch (err) {
    console.log(err);
    showAlert("error", err.response.data.message);
  }
};

const replyBtn = document.querySelector(".forum-post-comment-submit");
replyBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const reply = document.getElementById("comment").value;
  const postId = document.getElementById("postId").value;
  replies(reply, postId);
});

let currentActionButton;
let isEditAction = false;
let isPostAction = false;

document.addEventListener("DOMContentLoaded", function () {
  const postOptionsIcons = document.querySelectorAll(
    ".forum-post-options .fa-ellipsis-h"
  );
  const commentOptionsIcons = document.querySelectorAll(
    ".comment-options .fa-ellipsis-h"
  );

  postOptionsIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const menu = this.nextElementSibling;
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });
  });

  commentOptionsIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const menu = this.nextElementSibling;
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.matches(".fa-ellipsis-h")) {
      const postMenus = document.querySelectorAll(".post-options-menu");
      const commentMenus = document.querySelectorAll(".comment-options-menu");

      postMenus.forEach((menu) => {
        menu.style.display = "none";
      });

      commentMenus.forEach((menu) => {
        menu.style.display = "none";
      });
    }
  });

  // Add event listeners for edit and delete options
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("post-option")) {
      if (e.target.textContent.trim() === "Edit") {
        isEditAction = true;
        isPostAction = true;
        currentActionButton = e.target;
        const postContent = e.target
          .closest(".forum-post")
          .querySelector(".forum-post-content p").innerText;
        const postTitle = e.target
          .closest(".forum-post")
          .querySelector(".forum-post-title").innerText;
        showEditModal("Edit Post", postTitle, postContent);
      } else if (e.target.textContent.trim() === "Delete") {
        isEditAction = false;
        isPostAction = true;
        currentActionButton = e.target;
        showDeleteModal("Do you want to delete this post?");
      }
    } else if (e.target.classList.contains("comment-option")) {
      if (e.target.textContent.trim() === "Edit") {
        isEditAction = true;
        isPostAction = false;
        currentActionButton = e.target;
        const commentContent = e.target
          .closest(".comment")
          .querySelector(".comment-text").innerText;
        showEditModal("Edit Comment", "", commentContent);
      } else if (e.target.textContent.trim() === "Delete") {
        isEditAction = false;
        isPostAction = false;
        currentActionButton = e.target;
        showDeleteModal("Do you want to delete this comment?");
      }
    }
  });

  const closeModalBtns = document.querySelectorAll(".modal .close");
  closeModalBtns.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document
    .getElementById("cancelDeleteBtn")
    .addEventListener("click", closeModal);
  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", confirmDelete);
  document
    .getElementById("cancelEditBtn")
    .addEventListener("click", closeModal);
  document.getElementById("saveEditBtn").addEventListener("click", saveEdit);
});

function showDeleteModal(message) {
  document.getElementById("deleteModalText").innerText = message;
  document.getElementById("deleteModal").style.display = "flex";
}

function showEditModal(title, editTitle, content) {
  document.getElementById("editModalTitle").innerText = title;
  document.getElementById("editModalTitleInput").value = editTitle;
  document.getElementById("editModalTextarea").value = content;

  if (isPostAction) {
    document.getElementById("editModalLabelTitle").style.display = "block";
    document.getElementById("editModalTitleInput").style.display = "block";
  } else {
    document.getElementById("editModalLabelTitle").style.display = "none";
    document.getElementById("editModalTitleInput").style.display = "none";
  }

  document.getElementById("editModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("deleteModal").style.display = "none";
  document.getElementById("editModal").style.display = "none";
}

function confirmDelete() {
  if (isPostAction) {
    const postId = currentActionButton
      .closest(".forum-post")
      .querySelector("#postId").value;
    deletePost(postId);
  } else {
    const commentId = currentActionButton
      .closest(".comment")
      .getAttribute("data-comment-id");
    deleteComment(commentId);
  }
  closeModal();
}

async function deletePost(postId) {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/v1/forum/posts/${postId}`,
    });

    if (res.status === 204) {
      showAlert("success", "Post deleted successfully!");
      location.assign("/forums");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
}

async function deleteComment(commentId) {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/v1/forum/replies/${commentId}`,
    });

    if (res.status === 204) {
      showAlert("success", "Comment deleted successfully!");
      currentActionButton.closest(".comment").remove();
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
}

async function saveEdit() {
  const newTitle = document.getElementById("editModalTitleInput").value;
  const newContent = document.getElementById("editModalTextarea").value;
  if (isPostAction) {
    const postId = currentActionButton
      .closest(".forum-post")
      .querySelector("#postId").value;
    try {
      const res = await axios({
        method: "PATCH",
        url: `/api/v1/forum/posts/${postId}`,
        data: {
          title: newTitle,
          content: newContent,
        },
      });

      if (res.data.status === "success") {
        showAlert("success", "Post updated successfully!");
        currentActionButton
          .closest(".forum-post")
          .querySelector(".forum-post-title").innerText = newTitle;
        currentActionButton
          .closest(".forum-post")
          .querySelector(".forum-post-content p").innerText = newContent;
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  } else {
    const commentId = currentActionButton
      .closest(".comment")
      .getAttribute("data-comment-id");
    try {
      const res = await axios({
        method: "PATCH",
        url: `/api/v1/forum/replies/${commentId}`,
        data: {
          reply: newContent,
        },
      });

      if (res.data.status === "success") {
        showAlert("success", "Comment updated successfully!");
        currentActionButton
          .closest(".comment")
          .querySelector(".comment-text").innerText = newContent;
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  }
  closeModal();
}
//FILTER-BTN
document.addEventListener('DOMContentLoaded', function() {
  const postOptionsIcons = document.querySelectorAll('.forum-post-options .fa-ellipsis-h');
  const commentOptionsIcons = document.querySelectorAll('.comment-options .fa-ellipsis-h');

  postOptionsIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const menu = this.nextElementSibling;
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
  });

  commentOptionsIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const menu = this.nextElementSibling;
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Close menus if clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.matches('.fa-ellipsis-h')) {
      const postMenus = document.querySelectorAll('.post-options-menu');
      const commentMenus = document.querySelectorAll('.comment-options-menu');

      postMenus.forEach(menu => {
        menu.style.display = 'none';
      });

      commentMenus.forEach(menu => {
        menu.style.display = 'none';
      });
    }
  });

  // Function to format dates
  function formatDates() {
    const postDate = document.querySelector(".forum-post-time")
    const originalPostDate = new Date(postDate.textContent);
    const formattedPost= originalPostDate.toLocaleString()
    postDate.textContent= formattedPost

    
    
    const dateElements = document.querySelectorAll('.comment-text.float-right');
    dateElements.forEach(dateElement => {
      const originalDate = new Date(dateElement.textContent);
      const formattedDate = originalDate.toLocaleString(); // Change this line for custom format if needed
      dateElement.textContent = formattedDate;
    });
  }

  // Initial date formatting on page load
  formatDates();

  // Add sort functionality for comments by date posted
  const sortButton = document.querySelector('.filter-btn');

  sortButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default behavior

    const commentsSection = document.querySelector('.comment-section');
    const comments = Array.from(commentsSection.querySelectorAll('.comment'));
    const sortOrder = this.dataset.sortOrder === 'asc' ? 'desc' : 'asc';

    comments.sort((a, b) => {
      const dateA = new Date(a.querySelector('.comment-text.float-right').textContent);
      const dateB = new Date(b.querySelector('.comment-text.float-right').textContent);

      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    // Clear current comments
    commentsSection.innerHTML = '';

    // Append sorted comments
    comments.forEach(comment => commentsSection.appendChild(comment));

    // Format dates after sorting
    formatDates();

    // Update sort order
    this.dataset.sortOrder = sortOrder;

    // Toggle arrow direction
    const arrow = this.querySelector('.arrow');
    if (sortOrder === 'asc') {
      arrow.classList.remove('fa-arrow-down');
      arrow.classList.add('fa-arrow-up');
    } else {
      arrow.classList.remove('fa-arrow-up');
      arrow.classList.add('fa-arrow-down');
    }
  });

  // Ensure all buttons of type "button" do not cause a page reload
  const buttons = document.querySelectorAll('button[type="button"]');
  buttons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default behavior
    });
  });
});