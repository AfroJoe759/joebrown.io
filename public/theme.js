(function () {
  try {
    var storedTheme = localStorage.getItem("theme");
    var prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
    var theme =
      storedTheme === "dark" || (!storedTheme && prefersDark)
        ? "dark"
        : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    var fallbackTheme = matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    document.documentElement.dataset.theme = fallbackTheme;
    document.documentElement.style.colorScheme = fallbackTheme;
  }
})();
