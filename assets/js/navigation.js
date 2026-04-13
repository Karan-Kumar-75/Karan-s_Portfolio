// ============================================
// NAVIGATION MODULE
// ============================================

/**
 * Initialize theme — dark mode is permanent
 */
function initializeTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');
}

/**
 * Initialize navigation (scroll spy, smooth scroll, navbar shrink)
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero-section');
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault();

                const navMenu = document.getElementById('navMenu');
                if (navMenu) navMenu.classList.remove('active');

                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
            // For multi-page links (about.html, projects.html, etc.), let default behavior work
        });
    });

    // Scroll spy — only for single-page sections
    if (sections.length > 0) {
        let ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    updateActiveNavLink(sections, navbar, navLinks);
                    updateNavbarOnScroll(navbar);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Still apply scrolled class on multi-page sites
    window.addEventListener('scroll', function () {
        updateNavbarOnScroll(navbar);
    });

    // Highlight current page in nav
    highlightCurrentPage(navLinks);
}

function updateActiveNavLink(sections, navbar, navLinks) {
    let current = '';
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === '#' + current) {
            link.classList.add('active');
        }
    });
}

function updateNavbarOnScroll(navbar) {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/**
 * Highlight current page link in navigation
 */
function highlightCurrentPage(navLinks) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize mobile menu
 */
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (!mobileMenuToggle || !navMenu) return;

    function openMenu() {
        navMenu.classList.add('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }

    mobileMenuToggle.addEventListener('click', function () {
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when a nav link is clicked (mobile navigation)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                closeMenu();
            }
        }
    });
}

/**
 * Initialize back to top button
 */
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Keyboard navigation — Escape closes mobile menu
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            if (mobileMenuToggle) {
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        }
    }
});

// Focus visible for keyboard navigation
document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
    }
});

document.addEventListener('mousedown', function () {
    document.body.classList.remove('user-is-tabbing');
});
