/**
 * Creeping Cards Animation for Hero Section
 * Creates smooth slide-up animation for product cards from bottom of hero
 * Similar to Pera wallet's product showcase animation
 */

(function() {
    'use strict';

    // Animation configuration
    const ANIMATION_CONFIG = {
        triggerPoint: 0.7, // Trigger when 70% of hero is visible
        animationDuration: 1000, // Duration of slide-up animation (ms)
        staggerDelay: 200, // Delay between each card animation (ms)
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth easing
        enableHover: true, // Enable hover effects
        enableScrollTrigger: true // Enable scroll-triggered animation
    };

    let animationTriggered = false;
    let observer = null;

    /**
     * Initialize creeping cards animation
     */
    function initCreepingCards() {
        console.log('🎬 Initializing creeping cards animation...');

        const wrapper = document.querySelector('.creeping-cards-wrapper');
        const cards = document.querySelectorAll('.creeping-card');
        
        if (!wrapper || cards.length === 0) {
            console.log('⚠️ No creeping cards found');
            return false;
        }

        // Add hover effects if enabled
        if (ANIMATION_CONFIG.enableHover) {
            cards.forEach(card => setupHoverEffects(card));
        }

        // Setup scroll-triggered animation
        if (ANIMATION_CONFIG.enableScrollTrigger) {
            setupScrollTrigger();
        } else {
            // Trigger animation immediately if scroll trigger is disabled
            triggerAnimation();
        }

        console.log(`✅ Creeping cards animation initialized for ${cards.length} cards`);
        return true;
    }

    /**
     * Setup scroll-based animation trigger
     */
    function setupScrollTrigger() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) {
            console.log('⚠️ Hero section not found, triggering animation immediately');
            triggerAnimation();
            return;
        }

        // Use Intersection Observer for performance
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !animationTriggered) {
                    console.log('🎯 Hero section in view, triggering creeping animation');
                    // Add a small delay to make it feel more natural
                    setTimeout(() => {
                        triggerAnimation();
                    }, 500);
                }
            });
        }, {
            threshold: ANIMATION_CONFIG.triggerPoint,
            rootMargin: '0px 0px -100px 0px'
        });

        observer.observe(heroSection);
    }

    /**
     * Trigger the creeping animation for all cards
     */
    function triggerAnimation() {
        if (animationTriggered) return;
        animationTriggered = true;

        const wrapper = document.querySelector('.creeping-cards-wrapper');
        const cards = document.querySelectorAll('.creeping-card');
        
        if (!wrapper) {
            console.log('⚠️ Cards wrapper not found');
            return;
        }

        // First animate the wrapper sliding up
        wrapper.classList.add('animate-in');
        
        // Then animate individual cards with stagger
        cards.forEach((card, index) => {
            const delay = index * ANIMATION_CONFIG.staggerDelay;
            
            setTimeout(() => {
                card.classList.add('animate-in');
                console.log(`🎭 Card ${index + 1} animated in`);
            }, delay);
        });

        // Cleanup observer after animation
        if (observer) {
            setTimeout(() => {
                observer.disconnect();
                observer = null;
            }, ANIMATION_CONFIG.animationDuration + (cards.length * ANIMATION_CONFIG.staggerDelay));
        }

        console.log('🎉 All creeping cards animation triggered');
    }

    /**
     * Setup hover effects for individual cards
     */
    function setupHoverEffects(card) {
        let hoverTimeout;

        card.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            if (card.classList.contains('animate-in')) {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            }
        });

        card.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                if (card.classList.contains('animate-in')) {
                    card.style.transform = 'translateY(0) scale(1)';
                    card.style.boxShadow = '';
                }
            }, 100);
        });
    }

    /**
     * Reset animation state (useful for development/testing)
     */
    function resetAnimation() {
        console.log('🔄 Resetting creeping cards animation...');
        
        animationTriggered = false;
        
        const wrapper = document.querySelector('.creeping-cards-wrapper');
        const cards = document.querySelectorAll('.creeping-card');
        
        if (wrapper) {
            wrapper.classList.remove('animate-in');
        }
        
        cards.forEach(card => {
            card.classList.remove('animate-in');
            card.style.transform = '';
            card.style.boxShadow = '';
        });

        // Reinitialize if needed
        if (ANIMATION_CONFIG.enableScrollTrigger) {
            setupScrollTrigger();
        }
        
        console.log('✅ Animation reset complete');
    }

    /**
     * Handle reduced motion preference
     */
    function handleReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            console.log('♿ Reduced motion detected, simplifying animations');
            
            const wrapper = document.querySelector('.creeping-cards-wrapper');
            const cards = document.querySelectorAll('.creeping-card');
            
            if (wrapper) {
                wrapper.style.transform = 'translateY(0)';
                wrapper.classList.add('animate-in');
            }
            
            cards.forEach(card => {
                card.style.transition = 'opacity 0.3s ease';
                card.style.transform = 'translateY(0) scale(1)';
                card.classList.add('animate-in');
            });
            
            return true;
        }
        
        return false;
    }

    /**
     * Cleanup function
     */
    function cleanup() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        animationTriggered = false;
    }

    // Export functions to global scope for external access
    window.creepingCardsAnimation = {
        init: initCreepingCards,
        reset: resetAnimation,
        trigger: triggerAnimation,
        cleanup: cleanup
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if (!handleReducedMotion()) {
                    initCreepingCards();
                }
            }, 100);
        });
    } else {
        setTimeout(() => {
            if (!handleReducedMotion()) {
                initCreepingCards();
            }
        }, 100);
    }

    console.log('📦 Creeping cards animation module loaded');
})();
