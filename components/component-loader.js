/**
 * Component Loader System
 * Enables modular, reusable components for static HTML pages
 */
class ComponentLoader {
    constructor() {
        this.cache = new Map();
        this.loading = new Map();
        this.loadedComponents = new Set();
        this.isInitialized = false;
    }

    /**
     * Initialize the component system
     */
    async initialize() {
        if (this.isInitialized) {
            console.log('⚠️ Component system already initialized');
            return;
        }

        console.log('🚀 Initializing Component Loader System...');

        // Set up error handling for failed component loads
        this.setupErrorHandling();

        // Set up cleanup on page unload
        this.setupCleanupHandlers();

        this.isInitialized = true;
        console.log('✅ Component Loader System initialized');
    }

    /**
     * Load a component from a file path
     * @param {string} componentPath - Path to the component file
     * @param {HTMLElement|string} targetElement - Element or selector to load component into
     * @param {Object} variables - Variables to replace in the component
     * @returns {Promise<void>}
     */
    async loadComponent(componentPath, targetElement, variables = {}) {
        try {
            const element = this.getElement(targetElement);
            if (!element) {
                throw new Error(`Target element not found: ${targetElement}`);
            }

            // Check cache first
            if (this.cache.has(componentPath)) {
                console.log(`📦 Loading cached component: ${componentPath}`);
                this.renderComponent(this.cache.get(componentPath), element, variables);
                return;
            }

            // Prevent multiple simultaneous loads
            if (this.loading.has(componentPath)) {
                console.log(`⏳ Component already loading: ${componentPath}`);
                return this.loading.get(componentPath);
            }

            console.log(`📥 Loading component: ${componentPath}`);

            const loadPromise = this.fetchComponent(componentPath);
            this.loading.set(componentPath, loadPromise);

            const html = await loadPromise;
            this.cache.set(componentPath, html);
            this.loading.delete(componentPath);

            this.renderComponent(html, element, variables);

        } catch (error) {
            console.error(`❌ Failed to load component ${componentPath}:`, error);
            this.handleLoadError(componentPath, targetElement, error);
        }
    }

    /**
     * Load multiple components at once
     * @param {Array} components - Array of component configurations
     * @returns {Promise<void>}
     */
    async loadMultiple(components) {
        const promises = components.map(({ path, element, variables = {} }) =>
            this.loadComponent(path, element, variables)
        );

        try {
            await Promise.all(promises);
            console.log(`✅ Loaded ${components.length} components successfully`);
        } catch (error) {
            console.error('❌ Some components failed to load:', error);
        }
    }

    /**
     * Fetch component HTML from file
     * @param {string} componentPath - Path to component file
     * @returns {Promise<string>} - Component HTML content
     */
    async fetchComponent(componentPath) {
        // Check if we're running from file:// protocol
        const isFileProtocol = window.location.protocol === 'file:';

        if (isFileProtocol) {
            // Use XMLHttpRequest for local files to avoid CORS issues
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', componentPath, true);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300)) {
                            console.log(`📄 Loaded component: ${componentPath} (${xhr.responseText.length} chars)`);
                            resolve(xhr.responseText);
                        } else {
                            reject(new Error(`Failed to load ${componentPath}: ${xhr.status}`));
                        }
                    }
                };
                xhr.onerror = function() {
                    reject(new Error(`Network error loading ${componentPath}`));
                };
                xhr.send();
            });
        } else {
            // Use fetch for HTTP/HTTPS protocols
            const response = await fetch(componentPath);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const html = await response.text();
            console.log(`📄 Fetched component: ${componentPath} (${html.length} chars)`);

            return html;
        }
    }

    /**
     * Render component HTML to target element
     * @param {string} html - Component HTML
     * @param {HTMLElement} element - Target element
     * @param {Object} variables - Variables to replace
     */
    renderComponent(html, element, variables) {
        // Replace variables in the HTML
        let processedHtml = this.processVariables(html, variables);

        // Set the HTML content
        element.innerHTML = processedHtml;

        // Execute any scripts in the component
        this.executeScripts(element);

        // Mark component as loaded
        this.loadedComponents.add(element.id || element.className || 'unnamed');

        console.log(`✅ Component rendered in: ${element.id || element.className || 'unnamed'}`);
    }

    /**
     * Process variables in HTML template
     * @param {string} html - HTML template
     * @param {Object} variables - Variables object
     * @returns {string} - Processed HTML
     */
    processVariables(html, variables) {
        let processedHtml = html;

        Object.keys(variables).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            processedHtml = processedHtml.replace(regex, variables[key]);
        });

        return processedHtml;
    }

    /**
     * Execute scripts found in component HTML
     * @param {HTMLElement} element - Element containing scripts
     */
    executeScripts(element) {
        const scripts = element.querySelectorAll('script');

        scripts.forEach(script => {
            const newScript = document.createElement('script');

            // Copy script attributes
            Array.from(script.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });

            // Set script content
            if (script.src) {
                newScript.src = script.src;
                newScript.async = true;
            } else {
                newScript.textContent = script.textContent;
            }

            // Add to document head
            document.head.appendChild(newScript);

            // Remove original script
            script.remove();
        });

        if (scripts.length > 0) {
            console.log(`🔧 Executed ${scripts.length} scripts`);
        }
    }

    /**
     * Get element from selector or return element if already provided
     * @param {HTMLElement|string} elementOrSelector - Element or CSS selector
     * @returns {HTMLElement|null} - Found element or null
     */
    getElement(elementOrSelector) {
        if (typeof elementOrSelector === 'string') {
            return document.querySelector(elementOrSelector);
        }
        return elementOrSelector;
    }

    /**
     * Handle component load errors
     * @param {string} componentPath - Failed component path
     * @param {HTMLElement|string} targetElement - Target element
     * @param {Error} error - Error object
     */
    handleLoadError(componentPath, targetElement, error) {
        const element = this.getElement(targetElement);
        if (element) {
            element.innerHTML = `
                <div class="component-error" style="padding: 1rem; background: #fee; border: 1px solid #fcc; color: #c33;">
                    <strong>Component Load Error</strong>
                    <p>Failed to load component: ${componentPath}</p>
                    <small>${error.message}</small>
                </div>
            `;
        }
    }

    /**
     * Set up error handling
     */
    setupErrorHandling() {
        // Handle unhandled promise rejections from component loading
        window.addEventListener('unhandledrejection', (event) => {
            if (event.reason && event.reason.message && event.reason.message.includes('Component')) {
                console.error('🚨 Unhandled component error:', event.reason);
                event.preventDefault();
            }
        });
    }

    /**
     * Set up cleanup handlers
     */
    setupCleanupHandlers() {
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });

        // Store cleanup function for manual cleanup
        this.cleanup = () => {
            this.cache.clear();
            this.loading.clear();
            this.loadedComponents.clear();
            console.log('🧹 Component loader cleaned up');
        };
    }

    /**
     * Get loading status
     * @returns {Object} - Loading status information
     */
    getStatus() {
        return {
            cached: this.cache.size,
            loading: this.loading.size,
            loaded: this.loadedComponents.size,
            initialized: this.isInitialized
        };
    }

    /**
     * Reload a specific component
     * @param {string} componentPath - Path to reload
     * @param {HTMLElement|string} targetElement - Target element
     * @param {Object} variables - Variables to replace
     */
    async reloadComponent(componentPath, targetElement, variables = {}) {
        // Clear from cache
        this.cache.delete(componentPath);

        // Reload
        await this.loadComponent(componentPath, targetElement, variables);
        console.log(`🔄 Reloaded component: ${componentPath}`);
    }
}

// Global instance
const componentLoader = new ComponentLoader();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    await componentLoader.initialize();
});
