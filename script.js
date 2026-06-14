document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-list a");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navToggle.setAttribute("aria-label", expanded ? "Open menu" : "Close menu");
      navList.classList.toggle("is-open", !expanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
        navList.classList.remove("is-open");
      });
    });
  }

  const cursorFollower = document.querySelector(".cursor-follower");
  const canUseCustomCursor = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (cursorFollower && canUseCustomCursor) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    const moveCursor = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursorFollower.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(moveCursor);
    };

    window.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      document.body.classList.add("cursor-active");
    });

    window.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-active");
    });

    document.querySelectorAll("a, button").forEach((element) => {
      element.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      element.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });

    moveCursor();
  }

  const experienceTabs = document.querySelectorAll("[data-experience-tab]");
  const experiencePanels = document.querySelectorAll(".timeline-group[role='tabpanel']");

  experienceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPanelId = tab.dataset.experienceTab;

      experienceTabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });

      experiencePanels.forEach((panel) => {
        panel.hidden = panel.id !== targetPanelId;
      });
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  document
    .querySelectorAll(".hero-copy, .hero-panel, .section-heading, .work-item, .profile-stack, .skill-matrix article, .timeline-item, .contact-card")
    .forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });

  const sections = document.querySelectorAll("main section[id]");

  const setActiveLink = () => {
    let currentId = "";

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 140) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  };

  setActiveLink();
  window.addEventListener("scroll", setActiveLink, { passive: true });
});
