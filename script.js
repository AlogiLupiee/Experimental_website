
document.addEventListener('DOMContentLoaded', () => {

    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            body.classList.toggle('light-mode');

            const isLightMode = body.classList.contains('light-mode');
            if (isLightMode) {
                themeToggleButton.textContent = 'Dark Mode';
            } else {
                themeToggleButton.textContent = 'Light Mode';
            }
        });
    }
});