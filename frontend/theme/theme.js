const themeToggle = document.getElementById('theme-toggle');
const themeKey = 'preferredTheme';

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem(themeKey, theme);
}

function getPreferredTheme() {
    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme) {
        return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

if (themeToggle) {
    const initialTheme = getPreferredTheme();
    setTheme(initialTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
    });
}
