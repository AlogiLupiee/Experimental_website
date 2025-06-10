document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
            if (themeToggleButton) {
                themeToggleButton.textContent = 'Dark Mode';
            }
        } else {
            body.classList.remove('light-mode');
            if (themeToggleButton) {
                themeToggleButton.textContent = 'Light Mode';
            }
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const isLightMode = body.classList.contains('light-mode');
            
            if (isLightMode) {
                localStorage.setItem('theme', 'dark');
                applyTheme('dark');
            } else {
                localStorage.setItem('theme', 'light');
                applyTheme('light');
            }
        });
    }
});