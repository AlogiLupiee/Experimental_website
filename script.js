document.addEventListener('DOMContentLoaded', () => {

    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // A function to apply the theme based on what's in localStorage
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

    // Check localStorage for a saved theme when the page loads
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to 'dark' if nothing is saved
    applyTheme(savedTheme);


    // The click event listener now also saves the choice to localStorage
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

    // --- UPDATED: BACK TO TOP BUTTON LOGIC ---
    const backToTopButton = document.getElementById('back-to-top-btn');

    if (backToTopButton) {
        // Show button when user scrolls down
        window.onscroll = () => {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };

        // Scroll smoothly to top when button is clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- SCROLL ANIMATION LOGIC ---
    // This will work after you do a hard refresh (Ctrl+Shift+R)
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Triggers when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            observer.observe(el);
        });
    }
});