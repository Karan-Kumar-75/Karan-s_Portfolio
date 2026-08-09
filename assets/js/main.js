// ============================================
// MAIN ENTRY POINT
// Karan Kumar Portfolio
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Core initialization (runs on every page)
    initializeTheme();
    initializeNavigation();
    initializeMobileMenu();
    initializeBackToTop();
    initializeScrollAnimations();

    // Page-specific initialization
    initializeTypingAnimation();  // Only runs if #typingText exists
    initializeCounters();         // Only runs if .stat-number exists
    initializeContactForm();      // Only runs if #contactForm exists

    // Respect user motion preferences
    if (prefersReducedMotion()) {
        document.documentElement.style.setProperty('--transition-fast', '0ms');
        document.documentElement.style.setProperty('--transition-base', '0ms');
        document.documentElement.style.setProperty('--transition-slow', '0ms');
    }

    // Add focus styles for keyboard navigation
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        body.user-is-tabbing *:focus {
            outline: 2px solid var(--primary-blue) !important;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(focusStyle);
});

/**
 * Initialize contact form with validation and mailto fallback
 */
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('formName');
        const email = document.getElementById('formEmail');
        const subject = document.getElementById('formSubject');
        const message = document.getElementById('formMessage');
        const submitBtn = document.getElementById('formSubmitBtn');

        // Clear previous errors
        [name, email, message].forEach(el => el.classList.remove('error'));

        // Validate
        let isValid = true;

        if (!name.value.trim()) {
            name.classList.add('error');
            isValid = false;
        }

        if (!email.value.trim() || !isValidEmail(email.value)) {
            email.classList.add('error');
            isValid = false;
        }

        if (!message.value.trim()) {
            message.classList.add('error');
            isValid = false;
        }

        if (!isValid) return;

        // Construct mailto link
        const subjectText = subject.value.trim() || 'Portfolio Contact';
        const bodyText = `Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\n\n${message.value.trim()}`;
        const mailtoLink = `mailto:karankumarm956@gmail.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

        // Open mailto
        window.location.href = mailtoLink;

        // Show success state
        submitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Opening Email Client...</span>
        `;

        // Reset form after brief delay
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                <span>Send Message</span>
            `;
        }, 3000);
    });
}

/**
 * Basic email validation
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Page load complete
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #5B7CFF; font-weight: bold;');
    }
});

// Console easter egg
console.log('%c👋 Hello, Developer!', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #5B7CFF, #9F7AFF); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%c✨ Interested in the code? Check out my GitHub!', 'font-size: 14px; color: #5B7CFF;');
console.log('%c💼 Built with passion by Karan Kumar', 'font-size: 12px; color: #666;');

// Error handling
window.addEventListener('error', function (e) {
    console.error('An error occurred:', e.error);
});
