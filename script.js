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
    const savedTheme = localStorage.getItem('theme') || 'dark';
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

    // --- BACK TO TOP BUTTON LOGIC ---
    const backToTopButton = document.getElementById('back-to-top-btn');

    if (backToTopButton) {
        window.onscroll = () => {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // --- NEW: MOBILE NAVIGATION LOGIC ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- REPEATING SCROLL ANIMATION LOGIC ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } 
                else {
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            observer.observe(el);
        });
    }
});