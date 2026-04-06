const html = document.documentElement;
const icon = document.getElementById("themeIcon");
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Apply system theme
function applySystemTheme() {
  const isDark = mediaQuery.matches;

  if (isDark) {
    html.setAttribute("data-bs-theme", "dark");
    icon.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
  } else {
    html.setAttribute("data-bs-theme", "light");
    icon.classList.replace("bi-sun-fill", "bi-moon-stars-fill");
  }
}

// Your updated toggle function
function toggleTheme() {
  const currentTheme = html.getAttribute("data-bs-theme");

  if (currentTheme === "light") {
    html.setAttribute("data-bs-theme", "dark");
    icon.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
    localStorage.setItem("theme", "dark");
  } else {
    html.setAttribute("data-bs-theme", "light");
    icon.classList.replace("bi-sun-fill", "bi-moon-stars-fill");
    localStorage.setItem("theme", "light");
  }
}

// Load theme on start
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    html.setAttribute("data-bs-theme", savedTheme);

    if (savedTheme === "dark") {
      icon.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
    } else {
      icon.classList.replace("bi-sun-fill", "bi-moon-stars-fill");
    }
  } else {
    applySystemTheme();
  }
}

// Listen for real-time system changes (only if user hasn't overridden)
mediaQuery.addEventListener("change", () => {
  if (!localStorage.getItem("theme")) {
    applySystemTheme();
  }
});

// Run on page load
loadTheme();



// 2. Scroll Reveal Animation
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

const form = document.getElementById("form");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append("access_key", "08d2eff9-d16f-49fb-82d4-4d8bfbf674de");

  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert("Success! Your message has been sent.");
      form.reset();
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});
