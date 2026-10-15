const themeButton = document.getElementById('theme-toggle');
const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
let hasSavedTheme = false;

try {
  hasSavedTheme = ['light', 'dark'].includes(localStorage.getItem('theme'));
} catch {
  // The theme still works for this visit when storage is unavailable.
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  themeButton.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
  themeButton.title = `Switch to ${nextTheme} mode`;
}

setTheme(document.documentElement.dataset.theme || (colorScheme.matches ? 'dark' : 'light'));

themeButton.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  hasSavedTheme = true;
  try {
    localStorage.setItem('theme', nextTheme);
  } catch {
    // Keep the selected theme for this visit.
  }
});

colorScheme.addEventListener('change', (event) => {
  if (!hasSavedTheme) setTheme(event.matches ? 'dark' : 'light');
});
