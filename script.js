document.addEventListener('DOMContentLoaded', () => {

    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // --- Easter Egg Variables ---
    let clickCount = 0;
    let clickTimer = null;

    // A function to apply the theme based on what's in localStorage
    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.remove('easter-egg-mode');
            body.classList.add('light-mode');
            if (themeToggleButton) themeToggleButton.textContent = 'Dark Mode';
        } else { // 'dark'
            body.classList.remove('easter-egg-mode');
            body.classList.remove('light-mode');
            if (themeToggleButton) themeToggleButton.textContent = 'Light Mode';
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            clearTimeout(clickTimer);
            clickCount++;
            if (body.classList.contains('easter-egg-mode')) {
                body.classList.remove('easter-egg-mode');
                clickCount = 0;
                applyTheme(localStorage.getItem('theme') || 'dark');
                return;
            }
            if (clickCount === 6) {
                clickCount = 0;
                body.classList.add('easter-egg-mode');
                themeToggleButton.textContent = "???";
                return; 
            }
            clickTimer = setTimeout(() => { clickCount = 0; }, 500);

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
        backToTopButton.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }
    
    // --- MOBILE NAVIGATION LOGIC ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
                else entry.target.classList.remove('visible');
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => { observer.observe(el); });
    }

    // --- GITHUB INTEGRATION (for index.html) ---
    const githubUsername = 'AlogiLupiee';
    const profileCardContainer = document.getElementById('github-profile-card');
    const reposContainer = document.getElementById('github-repos-container');
    const calendarContainer = document.querySelector('.calendar');

    // GitHub Activity Calendar
    if (calendarContainer) {
        GitHubCalendar(".calendar", githubUsername, {
            responsive: true,
            tooltips: true
        });
    }

    // GitHub Profile and Repos
    if (profileCardContainer && reposContainer) {
        fetch(`https://api.github.com/users/${githubUsername}`)
            .then(response => response.json())
            .then(data => {
                const profileHTML = `
                    <div class="profile-avatar">
                        <img src="${data.avatar_url}" alt="GitHub Avatar">
                    </div>
                    <div class="profile-details">
                        <h3><a href="${data.html_url}" target="_blank">${data.name || data.login}</a></h3>
                        <p>${data.bio || 'No bio provided.'}</p>
                        <div class="profile-stats">
                            <span>${data.followers} Followers</span>
                            <span>Following ${data.following}</span>
                            <span>Public Repos: ${data.public_repos}</span>
                        </div>
                    </div>
                `;
                profileCardContainer.innerHTML = profileHTML;
            })
            .catch(error => profileCardContainer.innerHTML = `<p>Error loading GitHub profile.</p>`);

        fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`)
            .then(response => response.json())
            .then(data => {
                let reposHTML = '';
                data.slice(0, 6).forEach(repo => {
                    reposHTML += `
                        <div class="repo-card">
                            <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
                            <p>${repo.description || 'No description.'}</p>
                            <div class="repo-stats">
                                <span>${repo.language || 'N/A'}</span>
                                <span>⭐ ${repo.stargazers_count}</span>
                            </div>
                        </div>
                    `;
                });
                reposContainer.innerHTML = reposHTML;
            })
            .catch(error => reposContainer.innerHTML = `<p>Error loading repositories.</p>`);
    }
});