function applyTheme() {
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = storedTheme || (prefersDark ? "dark" : "light");
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains("dark");
  html.classList.toggle("dark", !isDark);
  localStorage.setItem("theme", isDark ? "light" : "dark");
}

// Applique le thème au chargement
applyTheme();

// Met à jour le thème si les préférences système changent
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    console.log("change theme");

    document.documentElement.classList.toggle("dark", e.matches);
    localStorage.setItem("theme", e.matches ? "dark" : "light");
  });
