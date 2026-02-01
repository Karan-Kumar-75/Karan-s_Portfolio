

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
    initializeNavigation();
    initializeMobileMenu();
    initializeTypingAnimation();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeCounters();
    initializeBackToTop();
});

// ============================================
// THEME TOGGLE (LIGHT/DARK MODE)
// ============================================
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', function () {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Add smooth transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

// ============================================
// NAVIGATION
// ============================================
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero-section');
    const navbar = document.getElementById('navbar');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href && href.startsWith('#')) {
                e.preventDefault();

                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                navMenu.classList.remove('active');

                const targetId = href;
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Update active nav link on scroll
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

// ============================================
// MOBILE MENU
// ============================================
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            const spans = this.querySelectorAll('span');

            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const spans = mobileMenuToggle.querySelectorAll('span');
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '';
                    spans[2].style.transform = '';
                }
            }
        });
    }
}

// ============================================
// TYPING ANIMATION
// ============================================
function initializeTypingAnimation() {
    const typingElement = document.getElementById('typingText');

    if (!typingElement) return;

    const titles = [
        'CSE Student',
        'Data Science Aspirant',
        'Data Analytics Enthusiast',
        'Python Developer',
        'Problem Solver'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // When word is complete
        if (!isDeleting && charIndex === currentTitle.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing animation
    setTimeout(type, 1000);
}

// ============================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ============================================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Add staggered animation for children
                if (entry.target.classList.contains('about-content') ||
                    entry.target.classList.contains('projects-grid') ||
                    entry.target.classList.contains('achievements-grid') ||
                    entry.target.classList.contains('contact-cards')) {

                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`
        .about-content,
        .timeline-item,
        .skill-group,
        .project-card,
        .achievement-card,
        .contact-card
    `);

    animatedElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function initializeSkillBars() {
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    let animated = false;

    const skillsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;

                skillBars.forEach((bar, index) => {
                    const progress = bar.getAttribute('data-progress');

                    // Delay animation for staggered effect
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, index * 100);
                });

                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

// ============================================
// NUMBER COUNTER ANIMATION
// ============================================
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        // Format number with one decimal if needed
                        counter.textContent = target % 1 !== 0 ? current.toFixed(1) : Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target % 1 !== 0 ? target.toFixed(1) : target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
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

    // Scroll to top on click
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Debounce function for performance
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
    // Escape key closes mobile menu
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

// Add focus styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    body.user-is-tabbing *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// ============================================
// PRELOADER (OPTIONAL)
// ============================================
window.addEventListener('load', function () {
    // Trigger any load-complete animations here
    document.body.classList.add('loaded');

    // Log performance metrics in development
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #667eea; font-weight: bold;');
    }
});

// ============================================
// CONSOLE MESSAGE (DEVELOPER EASTER EGG)
// ============================================
console.log('%c👋 Hello, Developer!', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%c✨ Interested in the code? Check out my GitHub!', 'font-size: 14px; color: #667eea;');
console.log('%c💼 Built with passion by Karan Kumar', 'font-size: 12px; color: #666;');
console.log('%c📧 Contact: karankr9237@gmail.com', 'font-size: 12px; color: #666;');

// ============================================
// SMOOTH SCROLL POLYFILL CHECK
// ============================================
if (!('scrollBehavior' in document.documentElement.style)) {
    // Import smooth scroll polyfill for older browsers if needed
    console.warn('Smooth scroll not supported in this browser');
}

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', function (e) {
    console.error('An error occurred:', e.error);
    // You might want to send errors to an analytics service here
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to get scroll percentage
function getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / docHeight) * 100;
}

// Function to detect if user prefers reduced motion
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Respect user's motion preferences
if (prefersReducedMotion()) {
    // Disable or reduce animations
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
    console.log('Animations reduced due to user preference');
}

// ============================================
// EXPORT FUNCTIONS (IF USING MODULES)
// ============================================
// Uncomment if using ES6 modules
// export { initializeTheme, initializeNavigation, initializeTypingAnimation };
