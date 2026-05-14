document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Contact Overlay Logic
    const contactTrigger = document.getElementById('contact-trigger');
    const contactOverlay = document.getElementById('contact-overlay');
    const closeOverlay = document.getElementById('close-overlay');

    if (contactTrigger && contactOverlay && closeOverlay) {
        contactTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            contactOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        closeOverlay.addEventListener('click', () => {
            contactOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });

        // Close on background click
        contactOverlay.addEventListener('click', (e) => {
            if (e.target === contactOverlay) {
                contactOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Smooth header appearance
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.padding = '15px 10%';
            header.style.background = 'rgba(5, 5, 5, 0.9)';
        } else {
            header.style.padding = '30px 10%';
            header.style.background = 'rgba(5, 5, 5, 0.8)';
        }
    });

    // --- LOGIQUE DE CONNEXION PERSISTANTE ---
    const navUl = document.querySelector('nav ul');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (navUl) {
        // On cherche le lien Connexion existant
        const navLinks = navUl.querySelectorAll('li a');
        navLinks.forEach(link => {
            if (link.textContent.toLowerCase() === 'connexion') {
                if (isLoggedIn) {
                    // Si connecté : On transforme le bouton Connexion
                    link.textContent = 'Nouvelle Demande';
                    link.href = 'demande.html';
                    link.style.color = 'var(--accent-primary)';
                    
                    // On ajoute un bouton de déconnexion
                    const logoutLi = document.createElement('li');
                    logoutLi.innerHTML = '<a href="#" id="logout-btn" style="color: #e74c3c; font-size: 0.8rem; opacity: 0.8;">Déconnexion</a>';
                    navUl.appendChild(logoutLi);

                    document.getElementById('logout-btn').addEventListener('click', (e) => {
                        e.preventDefault();
                        localStorage.removeItem('isLoggedIn');
                        window.location.href = 'index.html';
                    });
                }
            }
        });
    }

    // Protection des pages réservées (optionnel mais recommandé)
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'demande.html' && !isLoggedIn) {
        window.location.href = 'connexion.html';
    }
});

