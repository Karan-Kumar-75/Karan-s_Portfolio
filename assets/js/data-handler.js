// ============================================
// DATA HANDLER MODULE
// Loads shared components (navbar, footer) into pages
// ============================================

/**
 * Load an HTML component into a target element
 * @param {string} url - Path to the component HTML file
 * @param {string} targetId - ID of the element to inject content into
 */
async function loadComponent(url, targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        const html = await response.text();
        target.innerHTML = html;
    } catch (error) {
        console.warn(`Component load failed: ${url}`, error);
    }
}

/**
 * Load site configuration
 */
async function loadSiteConfig() {
    try {
        const response = await fetch('config/site-config.json');
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.warn('Could not load site config:', error);
        return null;
    }
}

/**
 * Load project data from JSON
 */
async function loadProjectData() {
    try {
        const response = await fetch('assets/data/json/projects.json');
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.warn('Could not load project data:', error);
        return [];
    }
}
