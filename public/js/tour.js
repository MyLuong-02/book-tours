window.addEventListener("mousemove", function () {
  const section = document.querySelector(".section-pictures");
  section.style.lineHeight = "1.7";
  window.removeEventListener("mousemove", handleMouseMove);
});
