document.addEventListener("DOMContentLoaded", () => {
  const sections = ["about", "discover", "faq", "login"];
  const navLinks = document.querySelectorAll(".nav-links a");

  function setActiveSection() {
    const scrollPosition = window.scrollY + 120;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (!element) continue;

      const { offsetTop, offsetHeight } = element;

      if (
        scrollPosition >= offsetTop &&
        scrollPosition < offsetTop + offsetHeight
      ) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.dataset.section === section
          );
        });
        break;
      }
    }
  }

  window.addEventListener("scroll", setActiveSection);
});
