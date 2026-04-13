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
