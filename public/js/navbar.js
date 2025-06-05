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
};*/
//theme
export const themeToggle = () => {
  
  const setTheme = (themeName) => {
    localStorage.setItem('theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
    document.getElementById('darkmode-toggle').checked = themeName === 'dark';
  };


  const toggleTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  document.getElementById('darkmode-toggle').addEventListener('change', toggleTheme);

  // Apply the saved theme on initial load
  if (localStorage.getItem('theme') === 'dark') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
};



    export const navbar = () => {
      const hamburger = document.getElementById("hamburger-menu");
      const mobileNav = document.getElementById("nav-mobile");
    
      hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("open");
        mobileNav.classList.toggle("open");
      });
    
      // Highlight current page link
      const currentPath = window.location.pathname;
      const navLinks = document.querySelectorAll('.nav__el');
      
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
          link.classList.add('nav__el--active');
        }
      });
    };
    
    // Ensure to call the navbar function in your main script to initialize the navbar behavior.
    document.addEventListener('DOMContentLoaded', () => {
      navbar();
    });
    
    
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
    };
    