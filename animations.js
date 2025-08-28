// Enhanced GSAP Animation System with Modular Architecture
class EkaAnimationSystem {
    constructor() {
        this.isInitialized = false;
        this.animations = new Map();
        this.observers = new Set();
        this.isLowEndDevice = false;
        this.debugMode = true; // Enable/disable detailed logging
        this.logThrottle = new Map(); // Throttle logging to reduce spam
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
            this.initializeHeroAnimations.bind(this),
            this.initializeSvgPulse.bind(this),
            this.initializeNestedTabs.bind(this)
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

        // Wait a bit for components to load
        await new Promise(resolve => setTimeout(resolve, 500));

        const counters = document.querySelectorAll('[data-counter]');
        console.log(`Found ${counters.length} stat counters:`, counters);

        if (counters.length === 0) {
            console.warn('⚠️ No stat counters found - components may not be loaded yet');
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

    async initializeSvgPulse() {
        console.log('⚡ Initializing SVG pulse animation...');

        // Register MotionPathPlugin if available
        if (typeof MotionPathPlugin !== 'undefined') {
            gsap.registerPlugin(MotionPathPlugin);
            console.log('✅ MotionPathPlugin registered');
        } else {
            console.warn('⚠️ MotionPathPlugin not available - falling back to basic animation');
        }

        // Check if hero circles exist
        const heroCircles = document.querySelector('.hero-circles');
        if (!heroCircles) {
            console.warn('⚠️ Hero circles not found - SVG pulse animation skipped');
            return;
        }

        // Skip if user prefers reduced motion
        if (this.prefersReducedMotion) {
            console.log('⚠️ SVG pulse animation skipped - reduced motion enabled');
            return;
        }

        // Create pulse elements for each circle
        const circles = heroCircles.querySelectorAll('circle');
        if (circles.length === 0) {
            console.warn('⚠️ No circles found in hero-circles');
            return;
        }

        // Create pulse container
        const pulseContainer = document.createElement('g');
        pulseContainer.className = 'svg-pulse-container';
        heroCircles.appendChild(pulseContainer);

        // Configuration for each pulse - use available circles (0-7) with smaller animation radius
        const pulseConfigs = [
            { circleIndex: 0, delay: 0, speed: 6, color: 'hsl(var(--p))', animationRadius: 80 },
            { circleIndex: 1, delay: 1, speed: 8, color: 'hsl(var(--s))', animationRadius: 70 },
            { circleIndex: 2, delay: 2, speed: 5, color: 'hsl(var(--a))', animationRadius: 90 },
            { circleIndex: 3, delay: 0.5, speed: 7, color: 'hsl(var(--p))', animationRadius: 60 },
            { circleIndex: 4, delay: 1.5, speed: 9, color: 'hsl(var(--s))', animationRadius: 85 },
            { circleIndex: 5, delay: 3, speed: 4, color: 'hsl(var(--a))', animationRadius: 75 },
            { circleIndex: 6, delay: 0.8, speed: 6, color: 'hsl(var(--p))', animationRadius: 65 }
        ];

        // Create and animate pulses
        pulseConfigs.forEach((config, pulseIndex) => {
            const circle = circles[config.circleIndex];
            if (!circle) {
                console.warn(`⚠️ Circle at index ${config.circleIndex} not found`);
                return;
            }

            // Get circle properties with fallbacks
            const cx = parseFloat(circle.getAttribute('cx')) || 720;
            const cy = parseFloat(circle.getAttribute('cy')) || 600;
            const originalRadius = parseFloat(circle.getAttribute('r')) || 400;
            // Use custom animation radius for smaller, visible circles
            const r = config.animationRadius || Math.min(originalRadius * 0.3, 100);

            // Create pulse element
            const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            pulse.setAttribute('cx', cx);
            pulse.setAttribute('cy', cy);
            pulse.setAttribute('r', '12'); // Even larger for testing visibility
            pulse.setAttribute('fill', config.color);
            pulse.setAttribute('opacity', '1'); // Full opacity for testing
            pulse.setAttribute('stroke', '#ffffff');
            pulse.setAttribute('stroke-width', '2');
            pulse.setAttribute('class', `svg-pulse svg-pulse-${pulseIndex}`);

            // Add subtle glow effect
            pulse.style.filter = 'drop-shadow(0 0 4px currentColor)';

            pulseContainer.appendChild(pulse);

            // Create motion path animation
            const tl = gsap.timeline({ repeat: -1, delay: config.delay });

            // Calculate path points for circular motion
            const pathPoints = [];
            const numPoints = 360;
            for (let i = 0; i <= numPoints; i++) {
                const angle = (i / numPoints) * Math.PI * 2;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;
                pathPoints.push({ x, y });
            }

            // Animate pulse along the circular path using manual calculation
            try {
                // Set initial position at center
                pulse.setAttribute('cx', cx);
                pulse.setAttribute('cy', cy);

                tl.to({}, {
                    duration: config.speed,
                    ease: "none",
                    onUpdate: () => {
                        const progress = tl.progress();
                        const angle = progress * Math.PI * 2; // Convert progress to radians

                        // Calculate position on circle
                        const newX = cx + Math.cos(angle) * r;
                        const newY = cy + Math.sin(angle) * r;

                        // Update pulse position
                        pulse.setAttribute('cx', newX);
                        pulse.setAttribute('cy', newY);

                        // Add pulsing effect
                        const scale = 1 + Math.sin(progress * Math.PI * 4) * 0.3;
                        gsap.set(pulse, { scale });

                        // Log position and movement data (throttled to reduce spam)
                        if (this.debugMode) {
                            const currentTime = performance.now();
                            const pulseKey = `pulse-${pulseIndex}`;
                            const lastLogTime = this.logThrottle.get(pulseKey) || 0;

                            // Only log every 500ms to reduce console spam
                            if (currentTime - lastLogTime > 500) {
                                const currentX = parseFloat(pulse.getAttribute('cx'));
                                const currentY = parseFloat(pulse.getAttribute('cy'));
                                const angleDegrees = (progress * Math.PI * 2) * (180 / Math.PI); // Convert to degrees
                                const distanceFromCenter = Math.sqrt(
                                    Math.pow(currentX - cx, 2) + Math.pow(currentY - cy, 2)
                                );

                                console.log(`🔄 Pulse ${pulseIndex} (${config.color}):`, {
                                    progress: `${(progress * 100).toFixed(1)}%`,
                                    position: `(${currentX.toFixed(1)}, ${currentY.toFixed(1)})`,
                                    angle: `${angleDegrees.toFixed(1)}°`,
                                    distanceFromCenter: `${distanceFromCenter.toFixed(1)}px`,
                                    expectedRadius: `${r}px`,
                                    scale: scale.toFixed(2),
                                    speed: `${config.speed}s`,
                                    centerCoords: `(${cx}, ${cy})`
                                });

                                this.logThrottle.set(pulseKey, currentTime);
                            }
                        }
                    }
                });

                // Store animation for cleanup
                this.animations.set(`svg-pulse-${pulseIndex}`, tl);
                console.log(`✅ SVG pulse ${pulseIndex} created successfully (manual calculation)`);
            } catch (error) {
                console.warn(`⚠️ Failed to create SVG pulse ${pulseIndex}:`, error);
                // Remove the pulse element if animation fails
                pulseContainer.removeChild(pulse);
            }
        });

        // Add CSS animation for additional pulse effect
        const style = document.createElement('style');
        style.textContent = `
            .svg-pulse {
                animation: pulse-glow 2s ease-in-out infinite alternate;
            }

            @keyframes pulse-glow {
                0% {
                    r: 4;
                    opacity: 0.7;
                }
                100% {
                    r: 8;
                    opacity: 1;
                }
            }

            /* Performance optimization for mobile */
            @media (max-width: 768px) {
                .svg-pulse {
                    r: 4 !important;
                    animation-duration: 3s;
                }
            }

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                .svg-pulse {
                    animation: none;
                }
            }
        `;
        document.head.appendChild(style);

        console.log('✅ SVG pulse animation initialized');
        console.log('Created', pulseConfigs.length, 'pulse animations');
        console.log('Using circles indices:', pulseConfigs.map(config => config.circleIndex));
        console.log('Animation radii:', pulseConfigs.map(config => config.animationRadius));

        // Debug: Verify pulse elements were created and check SVG positioning
        setTimeout(() => {
            const pulses = document.querySelectorAll('.svg-pulse');
            const svg = document.querySelector('.hero-bg-svg svg');
            const circles = document.querySelectorAll('.hero-circles circle');

            console.log('=== SVG DEBUG INFO ===');
            console.log('SVG element:', svg);
            console.log('SVG viewBox:', svg ? svg.getAttribute('viewBox') : 'not found');
            console.log('Pulse elements after init:', pulses.length);
            console.log('Original circles found:', circles.length);

            // Log original circle positions
            circles.forEach((circle, index) => {
                console.log(`Original Circle ${index}:`, {
                    cx: circle.getAttribute('cx'),
                    cy: circle.getAttribute('cy'),
                    r: circle.getAttribute('r')
                });
            });

            // Log pulse positions
            pulses.forEach((pulse, index) => {
                console.log(`Pulse ${index}:`, {
                    cx: pulse.getAttribute('cx'),
                    cy: pulse.getAttribute('cy'),
                    r: pulse.getAttribute('r'),
                    fill: pulse.getAttribute('fill'),
                    class: pulse.getAttribute('class'),
                    visible: pulse.style.visibility !== 'hidden'
                });
            });

            // Add visual markers for debugging
            if (svg && circles.length > 0) {
                const debugGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                debugGroup.setAttribute('class', 'debug-markers');

                circles.forEach((circle, index) => {
                    const cx = parseFloat(circle.getAttribute('cx'));
                    const cy = parseFloat(circle.getAttribute('cy'));

                    // Add a red dot at the center of each original circle
                    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    marker.setAttribute('cx', cx);
                    marker.setAttribute('cy', cy);
                    marker.setAttribute('r', '4');
                    marker.setAttribute('fill', 'red');
                    marker.setAttribute('stroke', 'white');
                    marker.setAttribute('stroke-width', '1');
                    marker.setAttribute('opacity', '0.8');
                    debugGroup.appendChild(marker);
                });

                svg.appendChild(debugGroup);
                console.log('Added red debug markers at circle centers');
            }
        }, 1000);
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

    async initializeNestedTabs() {
        console.log('📑 Initializing auto-rotating tabs with debugging...');

        if (this.prefersReducedMotion) {
            console.log('🚫 Skipping auto-rotating tab animations due to reduced motion preference');
            return;
        }

        // Initialize the AutoTabSwitcherWithDebug
        new AutoTabSwitcherWithDebug();

        console.log('✅ Auto-rotating tabs with debugging initialized');
    }
}

// Auto-rotating Tabs System with Debug Support
class AutoTabSwitcherWithDebug {
    constructor() {
        this.debug = true; // Set to false to disable debug logs
        this.tabDuration = 4000; // 4 seconds
        this.groups = new Map();
        this.activeIntervals = new Map();
        this.progressTimelines = new Map();

        this.log('🚀 AutoTabSwitcher initialized');
        this.init();
    }

    log(message, data = null) {
        if (this.debug) {
            console.log(`[AutoTabSwitcher] ${message}`, data || '');
        }
    }

    error(message, error = null) {
        console.error(`[AutoTabSwitcher ERROR] ${message}`, error || '');
    }

    init() {
        this.log('🔧 Starting initialization');

        // Check if GSAP is loaded
        if (typeof gsap === 'undefined') {
            this.error('GSAP is not loaded! Please include GSAP library.');
            return;
        }

        // Initialize all nested tab groups
        const tabGroups = document.querySelectorAll('.nested-tabs-container[data-group]');
        this.log(`📊 Found ${tabGroups.length} tab groups`);

        tabGroups.forEach(group => {
            const groupName = group.dataset.group;
            this.log(`🎯 Initializing group: ${groupName}`);
            this.initializeGroup(groupName);
        });

        // Handle main tab switching
        this.initializeMainTabs();

        // Add manual click handlers for nested tabs
        this.initializeManualTabs();

        this.log('✅ Initialization complete');
    }

    initializeGroup(groupName) {
        const tabContainer = document.querySelector(`.nested-tabs-container[data-group="${groupName}"]`);
        const tabInputs = tabContainer.querySelectorAll('input[type="radio"]');
        const imageContainer = document.querySelector(`.image-container[data-group="${groupName}"]`);
        const imageSlides = imageContainer ? imageContainer.querySelectorAll('.image-slide') : [];

        if (!tabContainer) {
            this.error(`Tab container not found for group: ${groupName}`);
            return;
        }

        this.log(`📝 Group ${groupName}: ${tabInputs.length} tabs, ${imageSlides.length} images`);

        const groupData = {
            container: tabContainer,
            inputs: Array.from(tabInputs),
            images: Array.from(imageSlides),
            currentIndex: 0,
            isActive: groupName === 'doctors' // Default to doctors being active
        };

        this.groups.set(groupName, groupData);

        // Start auto-switching if this is the active group
        if (groupData.isActive) {
            this.log(`▶️ Starting auto-switch for active group: ${groupName}`);
            this.startAutoSwitch(groupName);
        }
    }

    initializeMainTabs() {
        const mainTabs = document.querySelectorAll('input[name="main_healthcare_tabs"]');
        this.log(`🎮 Found ${mainTabs.length} main tabs`);

        mainTabs.forEach((tab, index) => {
            tab.addEventListener('change', (e) => {
                if (e.target.checked) {
                    const groupNames = ['doctors', 'clinics', 'labs', 'startups'];
                    const activeGroup = groupNames[index];

                    this.log(`🔄 Main tab switched to: ${activeGroup}`);

                    // Stop all auto-switching
                    this.stopAllAutoSwitch();

                    // Start auto-switching for the active group
                    if (this.groups.has(activeGroup)) {
                        this.groups.forEach((data, name) => {
                            data.isActive = (name === activeGroup);
                        });
                        this.startAutoSwitch(activeGroup);
                    }
                }
            });
        });
    }

    initializeManualTabs() {
        // Add click handlers for manual nested tab switching
        this.groups.forEach((groupData, groupName) => {
            groupData.inputs.forEach((input, index) => {
                input.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        this.log(`👆 Manual click on ${groupName} tab ${index}`);
                        this.switchToTab(groupName, index, true); // true = manual switch
                    }
                });
            });
        });
    }

    startAutoSwitch(groupName) {
        if (this.activeIntervals.has(groupName)) {
            this.log(`⏸️ Stopping existing interval for ${groupName}`);
            clearInterval(this.activeIntervals.get(groupName));
        }

        const groupData = this.groups.get(groupName);
        if (!groupData) {
            this.error(`Group not found: ${groupName}`);
            return;
        }

        this.log(`⏱️ Starting auto-switch for ${groupName} (${groupData.inputs.length} tabs, ${this.tabDuration}ms interval)`);

        // Start immediately with current tab
        this.switchToTab(groupName, groupData.currentIndex);

        const intervalId = setInterval(() => {
            if (groupData.isActive) {
                groupData.currentIndex = (groupData.currentIndex + 1) % groupData.inputs.length;
                this.log(`🔄 Auto-switching ${groupName} to tab ${groupData.currentIndex}`);
                this.switchToTab(groupName, groupData.currentIndex);
            } else {
                this.log(`⏸️ Group ${groupName} is not active, skipping auto-switch`);
            }
        }, this.tabDuration);

        this.activeIntervals.set(groupName, intervalId);
    }

    switchToTab(groupName, tabIndex, isManual = false) {
        const groupData = this.groups.get(groupName);
        if (!groupData) {
            this.error(`Cannot switch tab - group not found: ${groupName}`);
            return;
        }

        if (tabIndex >= groupData.inputs.length) {
            this.error(`Invalid tab index ${tabIndex} for group ${groupName}`);
            return;
        }

        this.log(`🎯 Switching ${groupName} to tab ${tabIndex} ${isManual ? '(manual)' : '(auto)'}`);

        // Update current index
        groupData.currentIndex = tabIndex;

        // Check the appropriate radio button
        const targetInput = groupData.inputs[tabIndex];
        if (!targetInput.checked) {
            targetInput.checked = true;
            this.log(`✅ Radio button checked for ${groupName} tab ${tabIndex}`);
        }

        // Switch image
        this.switchImage(groupName, tabIndex);

        // Start progress bar animation (only for auto-switch)
        if (!isManual) {
            this.animateProgressBar(groupName, tabIndex);
        }
    }

    switchImage(groupName, tabIndex) {
        const groupData = this.groups.get(groupName);
        if (!groupData || !groupData.images.length) {
            this.log(`⚠️ No images to switch for ${groupName}`);
            return;
        }

        this.log(`🖼️ Switching image for ${groupName} to index ${tabIndex}`);

        // Hide all images
        groupData.images.forEach((img, index) => {
            if (index === tabIndex) {
                img.classList.add('active');
                gsap.to(img, {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            } else {
                img.classList.remove('active');
                gsap.to(img, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    }

    animateProgressBar(groupName, tabIndex) {
        const groupData = this.groups.get(groupName);
        if (!groupData) return;

        const progressKey = `${groupName}-${tabIndex}`;

        // Kill existing progress animation
        if (this.progressTimelines.has(progressKey)) {
            this.progressTimelines.get(progressKey).kill();
        }

        // Find the progress bar for this tab
        const activeTab = groupData.inputs[tabIndex];
        const tabContent = activeTab.nextElementSibling;
        const progressBar = tabContent.querySelector('.progress-value');

        if (!progressBar) {
            this.log(`⚠️ Progress bar not found for ${groupName} tab ${tabIndex}`);
            return;
        }

        this.log(`📊 Animating progress bar for ${groupName} tab ${tabIndex}`);

        // Create new timeline
        const tl = gsap.timeline();

        // Reset to 0 and animate to 100%
        tl.set(progressBar, { width: '0%' })
          .to(progressBar, {
              width: '100%',
              duration: this.tabDuration / 1000,
              ease: 'none',
              onComplete: () => {
                  this.log(`✅ Progress completed for ${groupName} tab ${tabIndex}`);
              }
          });

        this.progressTimelines.set(progressKey, tl);
    }

    stopAllAutoSwitch() {
        this.log('🛑 Stopping all auto-switch intervals');

        this.activeIntervals.forEach((intervalId, groupName) => {
            clearInterval(intervalId);
            this.log(`⏹️ Stopped interval for ${groupName}`);
        });

        this.activeIntervals.clear();

        // Kill all progress animations
        this.progressTimelines.forEach((timeline, key) => {
            timeline.kill();
            this.log(`🔪 Killed progress timeline: ${key}`);
        });

        this.progressTimelines.clear();
    }

    // Public method to enable/disable debugging
    setDebug(enabled) {
        this.debug = enabled;
        this.log(enabled ? 'Debug enabled' : 'Debug disabled');
    }

    // Public method to get current state
    getState() {
        const state = {};
        this.groups.forEach((data, name) => {
            state[name] = {
                currentIndex: data.currentIndex,
                isActive: data.isActive,
                hasInterval: this.activeIntervals.has(name),
                tabCount: data.inputs.length,
                imageCount: data.images.length
            };
        });
        return state;
    }
}

// Initialize the enhanced animation system
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌟 DOM loaded, initializing AutoTabSwitcher');

    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.error('❌ GSAP not loaded! Please include GSAP library before this script.');
        return;
    }

    const animationSystem = new EkaAnimationSystem();
    // Make it globally accessible for debugging
    window.animationSystem = animationSystem;

    animationSystem.initialize().catch(error => {
        console.error('❌ Animation system failed to initialize:', error);
    });

    // Add some debugging helpers to window for manual testing
    window.debugTabs = {
        getState: () => window.autoTabSwitcher ? window.autoTabSwitcher.getState() : 'AutoTabSwitcher not initialized yet',
        enableDebug: () => window.autoTabSwitcher ? window.autoTabSwitcher.setDebug(true) : console.log('AutoTabSwitcher not ready'),
        disableDebug: () => window.autoTabSwitcher ? window.autoTabSwitcher.setDebug(false) : console.log('AutoTabSwitcher not ready'),
        switchTo: (group, index) => {
            if (window.autoTabSwitcher) {
                window.autoTabSwitcher.switchToTab(group, index, true);
            } else {
                console.log('AutoTabSwitcher not ready');
            }
        }
    };

    console.log('🎮 Debug helpers available: window.debugTabs');
    console.log('  - window.debugTabs.getState() - Get current state');
    console.log('  - window.debugTabs.enableDebug() - Enable debug logging');
    console.log('  - window.debugTabs.disableDebug() - Disable debug logging');
    console.log('  - window.debugTabs.switchTo("doctors", 2) - Manually switch tab');
});
