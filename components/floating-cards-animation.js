/**
 * Floating Cards Animation Component
 * Reusable animation system for floating cards across multiple pages
 */
class FloatingCardsAnimation {
    constructor(options = {}) {
        this.options = {
            enableHover: true,
            enableScrollTrigger: true,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            isLowEndDevice: navigator.hardwareConcurrency <= 2 || (navigator.deviceMemory && navigator.deviceMemory <= 2),
            ...options
        };
        
        this.animations = new Map();
        this.isInitialized = false;
        
        console.log('🎴 FloatingCardsAnimation instance created');
    }

    /**
     * Initialize floating cards animations
     * Call this AFTER the floating cards HTML is loaded
     */
    async initialize(container = document) {
        try {
            console.log('🚀 Initializing floating cards animations...');
            
            if (this.isInitialized) {
                console.log('⚠️ Floating cards animation already initialized');
                return;
            }

            // Wait for GSAP to be available
            if (typeof gsap === 'undefined') {
                console.log('⏳ Waiting for GSAP to load...');
                await this.waitForGSAP();
            }

            // Register ScrollTrigger if available
            if (typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
            }

            // Check if floating cards exist
            const floatingCards = container.querySelectorAll('.floating-card');
            if (floatingCards.length === 0) {
                console.warn('⚠️ No floating cards found in container');
                return false;
            }

            console.log(`📦 Found ${floatingCards.length} floating cards`);

            // Initialize animations based on device capabilities
            await this.initializeCardAnimations(floatingCards);
            
            if (this.options.enableHover) {
                this.initializeHoverEffects(floatingCards);
            }
            
            if (this.options.enableScrollTrigger && typeof ScrollTrigger !== 'undefined') {
                this.initializeScrollTrigger(floatingCards);
            }

            this.isInitialized = true;
            console.log('✅ Floating cards animations initialized successfully');
            return true;

        } catch (error) {
            console.error('❌ Failed to initialize floating cards animations:', error);
            return false;
        }
    }

    async waitForGSAP(timeout = 5000) {
        return new Promise((resolve, reject) => {
            const checkGSAP = () => {
                if (typeof gsap !== 'undefined') {
                    resolve();
                } else {
                    setTimeout(checkGSAP, 100);
                }
            };
            
            checkGSAP();
            
            // Timeout fallback
            setTimeout(() => {
                if (typeof gsap === 'undefined') {
                    reject(new Error('GSAP not loaded within timeout'));
                }
            }, timeout);
        });
    }

    async initializeCardAnimations(cards) {
        // Set initial state for entrance animation
        cards.forEach((card, index) => {
            gsap.set(card, {
                y: 50,
                opacity: 0,
                rotationY: this.options.reducedMotion ? 0 : (index % 2 === 0 ? -15 : 15),
                scale: 0.9,
                force3D: !this.options.isLowEndDevice
            });
        });

        // Staggered entrance animation
        const entranceTl = gsap.timeline();
        entranceTl.to(cards, {
            y: 0,
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 1.2,
            ease: 'back.out(1.7)',
            stagger: {
                amount: cards.length * 0.2,
                from: 'random'
            }
        });

        this.animations.set('entrance', entranceTl);

        // Create continuous floating animations if motion is allowed
        if (!this.options.reducedMotion) {
            this.createFloatingAnimations(cards);
        }
    }

    createFloatingAnimations(cards) {
        cards.forEach((card, index) => {
            // Create subtle floating animation for each card
            const floatingTl = gsap.timeline({ repeat: -1, yoyo: true });
            
            const yMovement = this.options.isLowEndDevice ? 5 : 10;
            const rotationMovement = this.options.isLowEndDevice ? 1 : 2;
            const duration = 3 + (index * 0.5); // Vary duration for natural effect
            
            floatingTl.to(card, {
                y: `random(-${yMovement}, ${yMovement})`,
                rotationX: `random(-${rotationMovement}, ${rotationMovement})`,
                rotationY: `random(-${rotationMovement}, ${rotationMovement})`,
                duration: duration,
                ease: 'sine.inOut',
                delay: Math.random() * 2 // Random delay for natural effect
            });

            this.animations.set(`floating-${index}`, floatingTl);
        });
    }

    initializeHoverEffects(cards) {
        cards.forEach((card, index) => {
            const cardInner = card.querySelector('.card');
            let isHovering = false;

            const enterAnimation = () => {
                if (isHovering || this.options.reducedMotion) return;
                isHovering = true;

                gsap.to(card, {
                    duration: 0.3,
                    scale: 1.05,
                    y: -8,
                    rotationY: 0,
                    ease: 'power2.out',
                    force3D: true,
                    overwrite: 'auto'
                });

                if (cardInner) {
                    gsap.to(cardInner, {
                        duration: 0.3,
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        ease: 'power2.out'
                    });
                }
            };

            const leaveAnimation = () => {
                if (!isHovering) return;
                isHovering = false;

                gsap.to(card, {
                    duration: 0.4,
                    scale: 1,
                    y: 0,
                    ease: 'power2.out',
                    force3D: true,
                    overwrite: 'auto'
                });

                if (cardInner) {
                    gsap.to(cardInner, {
                        duration: 0.4,
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        ease: 'power2.out'
                    });
                }
            };

            card.addEventListener('mouseenter', enterAnimation);
            card.addEventListener('mouseleave', leaveAnimation);

            // Store for cleanup
            this.animations.set(`hover-${index}`, { enterAnimation, leaveAnimation });
        });
    }

    initializeScrollTrigger(cards) {
        const scrollTriggerBatch = ScrollTrigger.batch(cards, {
            start: 'top 85%',
            end: 'bottom 15%',
            onEnter: (elements) => {
                gsap.fromTo(elements, {
                    opacity: 0.7,
                    y: 20,
                    scale: 0.95
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out',
                    force3D: true
                });
            },
            onLeave: (elements) => {
                gsap.to(elements, {
                    opacity: 0.8,
                    y: -10,
                    scale: 0.98,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            },
            onEnterBack: (elements) => {
                gsap.to(elements, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: 'power2.out'
                });
            }
        });

        this.animations.set('scrollTrigger', scrollTriggerBatch);
    }

    /**
     * Destroy all animations and clean up
     */
    destroy() {
        this.animations.forEach((animation) => {
            if (animation && typeof animation.kill === 'function') {
                animation.kill();
            }
        });
        this.animations.clear();
        this.isInitialized = false;
        console.log('🧹 Floating cards animations destroyed');
    }

    /**
     * Pause all animations
     */
    pause() {
        this.animations.forEach((animation) => {
            if (animation && typeof animation.pause === 'function') {
                animation.pause();
            }
        });
    }

    /**
     * Resume all animations
     */
    resume() {
        this.animations.forEach((animation) => {
            if (animation && typeof animation.resume === 'function') {
                animation.resume();
            }
        });
    }
}

// Global utility function for easy initialization
window.initFloatingCardsAnimation = function(container, options = {}) {
    const animation = new FloatingCardsAnimation(options);
    return animation.initialize(container);
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FloatingCardsAnimation;
}
