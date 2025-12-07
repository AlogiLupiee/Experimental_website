document.addEventListener('DOMContentLoaded', () => {

    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

    let clickCount = 0;
    let clickTimer = null;

    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.remove('easter-egg-mode');
            body.classList.add('light-mode');
            if (themeToggleButton) themeToggleButton.textContent = 'Dark Mode';
        } else { 
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

    const githubUsername = 'AlogiLupiee';
    const profileCardContainer = document.getElementById('github-profile-card');
    const reposContainer = document.getElementById('github-repos-container');
    const calendarContainer = document.querySelector('.calendar');

    if (calendarContainer) {
        GitHubCalendar(".calendar", githubUsername, {
            responsive: true,
            tooltips: true
        });
    }

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

    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        const glare = card.querySelector('.card-glare');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10; 

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

            if (glare) {
                glare.style.opacity = '1';
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            if (glare) {
                glare.style.opacity = '0';
            }
        });
    });
    const heroBg = document.getElementById('hero-bg');
    const heroTitle = document.querySelector('.hero-title');
    const heroWrapper = document.getElementById('hero-wrapper');

    if (heroBg && heroWrapper) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            const heroHeight = heroWrapper.offsetHeight;

            let opacity = 1 - (scrollPos / (heroHeight * 0.8));
            
            if (opacity < 0) opacity = 0;
            if (opacity > 1) opacity = 1;

            heroBg.style.opacity = opacity;
            
            if (heroTitle) {
                heroTitle.style.opacity = opacity;
                heroTitle.style.transform = `translateY(${scrollPos * 0.5}px)`;
            }
        });
    }
});
