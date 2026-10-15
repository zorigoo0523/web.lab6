"use strict";

// ===== 1. DARK / LIGHT MODE =====
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");

function updateThemeButton(isDark) {
  if (!themeToggle || !themeLabel) return;

  const icon = themeToggle.querySelector("span");

  if (icon) {
    icon.textContent = isDark ? "☀" : "☾";
  }

  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

// Эхний төлөвийг тохируулах
updateThemeButton(
  document.body.classList.contains("dark-mode")
);

// Theme солих
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    updateThemeButton(isDark);
  });
}


// ===== 2. ACCESSIBLE 3D FLIP CARDS =====
const cards = document.querySelectorAll(".flip-card");

cards.forEach((card) => {
  const flipButton = card.querySelector(".flip-button");

  if (!flipButton) return;

  function toggleFlip() {
    const isFlipped = card.classList.toggle("is-flipped");

    flipButton.setAttribute("aria-pressed", String(isFlipped));

    flipButton.textContent = isFlipped
      ? "Зургийг буцаах ↻"
      : "Түүхийг үзэх ↗";
  }

  // Товч дээр дарж карт эргүүлэх
  flipButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFlip();
  });

  // Картын товчноос бусад хэсэг дээр дарж эргүүлэх
  card.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      return;
    }

    toggleFlip();
  });
});


// ===== 3. PAGE LOADER =====
const pageLoader = document.getElementById("pageLoader");

function hideLoader() {
  if (pageLoader) {
    pageLoader.classList.add("is-hidden");
  }
}

// Хуудас ачаалагдсан эсэхийг шалгах
if (document.readyState === "complete") {
  hideLoader();
} else {
  window.addEventListener("load", hideLoader, { once: true });
}
