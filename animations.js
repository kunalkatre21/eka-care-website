// Enhanced GSAP Animation System with Modular Architecture
class EkaAnimationSystem {
    constructor() {
        this.isInitialized = false;
        this.animations = new Map();
        this.observers = new Set();
        this.isLowEndDevice = false;
    }

    async initialize() {
        try {
            console.log('🚀 Initializing Eka Animation System...');

            if (this.isInitialized) {
                console.log('⚠️ Animation system already initialized');
                return;
            }

            this.detectDeviceCapabilities();
            await this.initializeModules();
            this.setupEventHandlers();
            this.setupCleanupHandlers();

            this.isInitialized = true;
            console.log('🎉 Eka Animation System initialized successfully');

        } catch (error) {
            console.error('❌ Animation system initialization failed:', error);
            this.fallbackInitialization();
        }
    }

    detectDeviceCapabilities() {
        // Enhanced device detection with hardware concurrency and memory checks
        this.isLowEndDevice = navigator.hardwareConcurrency <= 2 ||
                               (navigator.deviceMemory && navigator.deviceMemory <= 2);

        // Check for reduced motion preference
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        console.log('🎯 Accessibility: Reduced motion', this.prefersReducedMotion ? 'enabled' : 'disabled');
        console.log('🎯 Device Performance:', this.isLowEndDevice ? 'Low-end' : 'High-performance');
    }

    async initializeModules() {
        const modules = [
            this.initializeFloatingCards.bind(this),
            this.initializeLogoScroller.bind(this),
            this.initializeStatsCounter.bind(this),
            this.initializeHeroAnimations.bind(this)
        ];

        for (const module of modules) {
            try {
                await module();
            } catch (error) {
                console.warn('⚠️ Module initialization failed:', error);
            }
        }
    }

    setupCleanupHandlers() {
        // Enhanced cleanup function for memory management and performance
        const cleanup = () => {
            this.animations.forEach((animation, key) => {
                if (animation.kill) animation.kill();
            });
            this.animations.clear();
            this.observers.forEach(observer => observer.disconnect());
            this.observers.clear();
            console.log('🧹 Animation system cleaned up');
        };

        // Cleanup on page unload
        window.addEventListener('beforeunload', cleanup);

        // Store cleanup function for potential manual cleanup
        this.cleanup = cleanup;
    }

    fallbackInitialization() {
        console.log('🔄 Falling back to basic initialization');
        // Basic setup without advanced animations
        gsap.set('.floating-card', { opacity: 1 });
    }

    async initializeFloatingCards() {
        console.log('🎴 Initializing floating cards...');

        const tl = gsap.timeline();

        // Initial state - optimized for performance with conditional complexity
        gsap.set('.floating-card', {
            opacity: 0,
            scale: 0.8,
            y: 80,
            rotationY: this.isLowEndDevice ? 0 : 30,
            transformOrigin: 'center bottom',
            force3D: !this.isLowEndDevice
        });

        // Staggered entrance with optimized easing
        tl.to('.floating-card', {
            duration: 1.0,
            opacity: 1,
            scale: 1,
            y: 0,
            rotationY: 0,
            ease: 'power3.out',
            stagger: {
                amount: 1.8,
                from: 'random',
                ease: 'power2.inOut'
            }
        }, 0.3);

        // Optimized continuous floating animations with natural variation and performance considerations
        const createFloatingAnimation = (selector, config) => {
            // Reduce animation complexity for low-end devices
            const reducedConfig = this.isLowEndDevice ? {
                ...config,
                rotation: (config.rotation || 0) * 0.5, // Reduce rotation
                duration: (config.duration || 4) * 1.5, // Slower animations
            } : config;

            const animation = gsap.to(selector, {
                y: reducedConfig.y || -12,
                x: reducedConfig.x || 0,
                rotation: reducedConfig.rotation || 1,
                duration: reducedConfig.duration || 4.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: reducedConfig.delay || 0,
                force3D: !this.isLowEndDevice,
                // Performance optimization: Use transform properties only
                transformOrigin: 'center center'
            });

            this.animations.set(selector, animation);
            return animation;
        };

        // Apply optimized floating animations with natural timing and performance monitoring
        const floatingAnimations = [
            createFloatingAnimation('.floating-card-1', { y: -12, x: 4, rotation: 1.5, duration: 4.8, delay: 0 }),
            createFloatingAnimation('.floating-card-2', { y: -16, x: -6, rotation: -1.2, duration: 5.2, delay: 0.8 }),
            createFloatingAnimation('.floating-card-3', { y: -10, x: 3, rotation: 1.8, duration: 4.3, delay: 1.6 }),
            createFloatingAnimation('.floating-card-4', { y: -14, x: -4, rotation: -1.8, duration: 4.1, delay: 2.4 }),
            createFloatingAnimation('.floating-card-5', { y: -8, x: 5, rotation: 1.2, duration: 4.6, delay: 0.4 }),
            createFloatingAnimation('.floating-card-6', { y: -18, x: -2, rotation: -1.5, duration: 5.4, delay: 1.2 }),
            createFloatingAnimation('.floating-card-7', { y: -11, x: 3, rotation: 2.1, duration: 3.9, delay: 2.8 })
        ];

        console.log('✅ Floating cards initialized successfully');
    }

    // Optimized hover interactions with performance enhancements
    initializeHoverAnimations() {
        const hoverAnimations = new Map();
        const floatingCards = document.querySelectorAll('.floating-card');

        floatingCards.forEach((card, index) => {
            const cardInner = card.querySelector('.card');
            let isHovering = false;

            const enterAnimation = () => {
                if (isHovering) return;
                isHovering = true;

                gsap.to(card, {
                    duration: 0.35,
                    scale: 1.06,
                    z: 80,
                    rotationY: 0,
                    ease: 'back.out(1.7)',
                    force3D: true,
                    overwrite: 'auto'
                });

                gsap.to(cardInner, {
                    duration: 0.25,
                    y: -4,
                    ease: 'power2.out'
                });
            };

            const leaveAnimation = () => {
                if (!isHovering) return;
                isHovering = false;

                gsap.to(card, {
                    duration: 0.4,
                    scale: 1,
                    z: 0,
                    rotationY: 0,
                    ease: 'power2.out',
                    force3D: true,
                    overwrite: 'auto'
                });

                gsap.to(cardInner, {
                    duration: 0.3,
                    y: 0,
                    ease: 'power2.out'
                });
            };

            // Enhanced event handling with performance optimizations
            card.addEventListener('mouseenter', enterAnimation);
            card.addEventListener('mouseleave', leaveAnimation);

            // Store animations for potential cleanup
            hoverAnimations.set(card, { enterAnimation, leaveAnimation });
        });

        // Optimized scroll-based animations with performance considerations and batch processing
        const scrollTriggerBatch = ScrollTrigger.batch('.floating-card', {
            start: 'top 85%',
            end: 'bottom 15%',
            onEnter: (elements) => {
                gsap.fromTo(elements, {
                    opacity: 0,
                    y: 50,
                    scale: 0.9
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    force3D: true
                });
            },
            onLeave: (elements) => {
                gsap.to(elements, {
                    opacity: 0.7,
                    y: -30,
                    scale: 0.95,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            },
            onEnterBack: (elements) => {
                gsap.to(elements, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power3.out'
                });
            },
            onLeaveBack: (elements) => {
                gsap.to(elements, {
                    opacity: 0.8,
                    y: 40,
                    scale: 0.92,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        });

        // Store ScrollTrigger for cleanup
        this.animations.set('scrollTriggerBatch', scrollTriggerBatch);

        console.log('✅ Hover and scroll animations initialized');
    }

    async initializeLogoScroller() {
        console.log('🏢 Initializing logo scroller...');

        const logoContainer = document.querySelector('.logo-scroll-container');
        if (!logoContainer) {
            console.warn('⚠️ Logo scroller container not found');
            return;
        }

        // Get all logo tracks
        const logoTracks = document.querySelectorAll('.logo-track');
        if (logoTracks.length === 0) {
            console.warn('⚠️ No logo tracks found');
            return;
        }

        // Create seamless infinite loop with optimized performance
        const tl = gsap.timeline({ repeat: -1 });

        // Calculate optimal speed based on screen size
        const speedMultiplier = window.innerWidth < 768 ? 0.5 : 1;

        // Animate each logo track - adjusted duration for better visual flow with increased spacing
        logoTracks.forEach((track, index) => {
            tl.to(track, {
                x: '-100%',
                duration: 40 * speedMultiplier, // Increased from 30 to 40 for better visual flow
                ease: 'none'
            }, 0); // Start all at the same time
        });

        // Enhanced hover-to-pause functionality with smooth transitions
        let isPaused = false;
        const pauseAnimation = () => {
            if (isPaused) return;
            isPaused = true;
            tl.pause();
            gsap.to('.logo-track img', {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out',
                stagger: 0.02
            });
            console.log('▶️ Logo scroller paused');
        };

        const resumeAnimation = () => {
            if (!isPaused) return;
            isPaused = false;
            gsap.to('.logo-track img', {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                stagger: 0.02
            });
            tl.resume();
            console.log('▶️ Logo scroller resumed');
        };

        logoContainer.addEventListener('mouseenter', pauseAnimation);
        logoContainer.addEventListener('mouseleave', resumeAnimation);

        // Individual logo floating effects for enhanced visual appeal
        const logoItems = document.querySelectorAll('.logo-track img');
        logoItems.forEach((logo, index) => {
            const floatAnimation = gsap.to(logo, {
                y: -8,
                duration: 3 + (index * 0.2),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: index * 0.1
            });

            this.animations.set(`logo-${index}`, floatAnimation);
        });

        console.log('✅ Logo scroller initialized');
    }

    async initializeStatsCounter() {
        console.log('📊 Initializing statistics counter...');

        const counters = document.querySelectorAll('[data-counter]');
        if (counters.length === 0) {
            console.warn('⚠️ No stat counters found');
            return;
        }

        // Enhanced counting animation with performance optimizations
        const countUp = (element, target, duration = 2000) => {
            const start = performance.now();
            const startValue = 0;

            const update = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(startValue + (target - startValue) * easeOut);

                element.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            };

            requestAnimationFrame(update);
        };

        // Use Intersection Observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const statElement = counter.closest('.stat');
                    const target = parseInt(statElement.dataset.target) || 0;
                    countUp(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });

        counters.forEach(counter => observer.observe(counter));
        this.observers.add(observer);

        console.log('✅ Statistics counter initialized');
    }

    async initializeHeroAnimations() {
        console.log('🎬 Initializing hero animations...');

        // Check if hero elements exist
        const heroTitle = document.querySelector('#hero-heading');
        const heroContent = document.querySelector('.hero-content');
        const heroSection = document.querySelector('.hero');

        if (!heroTitle || !heroContent || !heroSection) {
            console.warn('⚠️ Hero elements not found');
            return;
        }

        // Enhanced hero entrance animation with staggered elements
        const heroTl = gsap.timeline();

        // Animate hero title
        heroTl.from(heroTitle, {
            opacity: 0,
            y: 60,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Animate hero subtitle (the p element inside hero-content)
        const heroSubtitle = heroContent.querySelector('p');
        if (heroSubtitle) {
            heroTl.from(heroSubtitle, {
                opacity: 0,
                y: 40,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.4');
        }

        // Simple entrance animation for hero CTA button
        const heroCta = heroContent.querySelector('button');
        if (heroCta) {
            heroTl.fromTo(heroCta, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
            }, '-=0.2');
        }

        // Add subtle continuous animations for visual interest on the hero section
        gsap.to(heroSection, {
            backgroundPosition: '50% 50%',
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        console.log('✅ Hero animations initialized');
    }

    setupEventHandlers() {
        // Enhanced visibility change handling for performance
        let hiddenStartTime = 0;

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                hiddenStartTime = performance.now();
                this.animations.forEach((animation, key) => {
                    if (animation.pause) animation.pause();
                });
                console.log('⏸️ Animations paused - page hidden');
            } else {
                const hiddenDuration = performance.now() - hiddenStartTime;
                if (hiddenDuration > 5000) { // If hidden for more than 5 seconds
                    // Restart animations smoothly
                    this.animations.forEach((animation, key) => {
                        if (animation.resume) animation.resume();
                    });
                }
                console.log('▶️ Animations resumed');
            }
        });

        console.log('🎧 Event handlers set up');
    }
}

// Initialize the enhanced animation system
document.addEventListener('DOMContentLoaded', function() {
    const animationSystem = new EkaAnimationSystem();
    animationSystem.initialize().catch(error => {
        console.error('❌ Animation system failed to initialize:', error);
    });
});
