export type Theme = "light" | "dark" | "system";

export function resolveIsDark(theme: Theme): boolean {
  return (
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", resolveIsDark(theme));
}

export function updateActionIcon(isDark: boolean): void {
  const path = isDark ? "/icon128-dark.png" : "/icon128.png";
  chrome.action.setIcon({ path });
}
