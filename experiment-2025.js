// 🎨 2025 Creative Platform Experiment - Advanced Animation Systems
// This file contains experimental implementations of modern web animation techniques

class Eka2025Experiment {
    constructor() {
        this.isInitialized = false;
        this.animations = new Map();
        this.observers = new Set();
        this.currentTheme = 'healthcare';
        this.isLowEndDevice = false;
        this.prefersReducedMotion = false;
        this.experimentLog = [];
    }

    async initialize() {
        try {
            console.log('🧪 Initializing Eka 2025 Experiment...');
            this.log('🚀 Starting 2025 experiment initialization');

            if (this.isInitialized) {
                console.log('⚠️ Experiment already initialized');
                return;
            }

            this.detectCapabilities();
            await this.initializeExperimentalModules();
            this.setupExperimentalEventHandlers();
            this.setupThemeExperiment();
            this.setupCleanupHandlers();

            this.isInitialized = true;
            console.log('🎉 Eka 2025 Experiment initialized successfully');
            this.log('✅ All experimental modules loaded');

        } catch (error) {
            console.error('❌ Experiment initialization failed:', error);
            this.fallbackInitialization();
        }
    }

    log(message, data = null) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${message}`;
        this.experimentLog.push(logEntry);
        console.log(`🧪 ${logEntry}`, data || '');

        // Update experiment log display if it exists
        const logDisplay = document.getElementById('experiment-log');
        if (logDisplay) {
            logDisplay.innerHTML = this.experimentLog.slice(-10).join('<br>');
        }
    }

    detectCapabilities() {
        this.isLowEndDevice = navigator.hardwareConcurrency <= 2 ||
                               (navigator.deviceMemory && navigator.deviceMemory <= 2);

        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.supportsWebGL = this.detectWebGLSupport();
        this.supportsIntersectionObserver = 'IntersectionObserver' in window;

        this.log('Device capabilities detected', {
            lowEnd: this.isLowEndDevice,
            reducedMotion: this.prefersReducedMotion,
            webGL: this.supportsWebGL,
            intersectionObserver: this.supportsIntersectionObserver
        });
    }

    detectWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
        } catch (e) {
            return false;
        }
    }

    async initializeExperimentalModules() {
        const modules = [
            { name: 'FontAwesome Morphing', fn: this.initializeFontAwesomeMorphing.bind(this) },
            { name: 'Adaptive Components', fn: this.initializeAdaptiveComponents.bind(this) },
            { name: 'Cinematic Storytelling', fn: this.initializeCinematicStorytelling.bind(this) },
            { name: 'Liquid Navigation', fn: this.initializeLiquidNavigation.bind(this) },
            { name: 'Micro-interactions', fn: this.initializeMicroInteractions.bind(this) },
            { name: 'Performance Monitor', fn: this.initializePerformanceMonitor.bind(this) }
        ];

        for (const module of modules) {
            try {
                this.log(`Initializing ${module.name}...`);
                await module.fn();
                this.log(`✅ ${module.name} initialized`);
            } catch (error) {
                this.log(`❌ ${module.name} failed:`, error);
                console.warn(`⚠️ Module ${module.name} initialization failed:`, error);
            }
        }
    }

    // 🎭 EXPERIMENT 1: FontAwesome Morphing Icon System
    async initializeFontAwesomeMorphing() {
        this.log('🎭 Setting up FontAwesome Morphing Icons');

        // Define icon morphing sequences for different healthcare contexts
        this.morphSequences = {
            'shield-to-brain': {
                icons: ['fa-shield-alt', 'fa-chart-line', 'fa-brain', 'fa-heartbeat'],
                duration: 3000,
                description: 'Security → Analytics → AI → Health'
            },
            'user-journey': {
                icons: ['fa-user', 'fa-stethoscope', 'fa-file-medical', 'fa-chart-line'],
                duration: 2500,
                description: 'Patient → Diagnosis → Records → Analytics'
            },
            'health-ecosystem': {
                icons: ['fa-hospital', 'fa-pills', 'fa-microscope', 'fa-network-wired'],
                duration: 4000,
                description: 'Hospital → Pharmacy → Lab → Network'
            }
        };

        // Create morphing animation for each icon
        document.querySelectorAll('.morphing-icon').forEach((icon, index) => {
            const sequenceKey = icon.dataset.morphSequence || 'shield-to-brain';
            const sequence = this.morphSequences[sequenceKey];

            if (!sequence || this.prefersReducedMotion) {
                this.log(`⏭️ Skipping morphing for ${sequenceKey} (reduced motion)`);
                return;
            }

            this.createMorphingAnimation(icon, sequence, index);
        });
    }

    createMorphingAnimation(iconElement, sequence, index) {
        let currentIndex = 0;
        const baseClasses = 'fas text-2xl transition-all duration-300';

        // Add stagger delay based on index
        const staggerDelay = index * 500;

        const morphToNext = () => {
            currentIndex = (currentIndex + 1) % sequence.icons.length;
            const nextIcon = sequence.icons[currentIndex];

            // GSAP-powered morphing with 3D effects
            gsap.timeline()
                .to(iconElement, {
                    scale: 0.7,
                    rotationY: 180,
                    opacity: 0.3,
                    duration: 0.4,
                    ease: 'back.in(1.7)',
                    onComplete: () => {
                        // Change the icon
                        iconElement.className = `${baseClasses} ${nextIcon}`;
                        this.log(`🔄 Icon morphed to: ${nextIcon}`);
                    }
                })
                .to(iconElement, {
                    scale: 1.2,
                    rotationY: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                })
                .to(iconElement, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
        };

        // Start the morphing cycle with stagger
        setTimeout(() => {
            const interval = setInterval(morphToNext, sequence.duration);
            this.animations.set(`morph-${index}`, interval);
        }, staggerDelay);
    }

    // 🎪 EXPERIMENT 2: Adaptive Component Theater
    async initializeAdaptiveComponents() {
        this.log('🎪 Setting up Adaptive Component Theater');

        // Define themes for different healthcare contexts
        this.themes = {
            healthcare: {
                primary: 'blue',
                secondary: 'green',
                accent: 'purple',
                gradient: 'from-blue-50 to-green-50',
                buttonStyle: 'bg-blue-500 hover:bg-blue-600',
                iconColor: 'text-blue-600'
            },
            analytics: {
                primary: 'purple',
                secondary: 'blue',
                accent: 'orange',
                gradient: 'from-purple-50 to-blue-50',
                buttonStyle: 'bg-purple-500 hover:bg-purple-600',
                iconColor: 'text-purple-600'
            },
            enterprise: {
                primary: 'gray',
                secondary: 'blue',
                accent: 'green',
                gradient: 'from-gray-50 to-blue-50',
                buttonStyle: 'bg-gray-700 hover:bg-gray-800',
                iconColor: 'text-gray-600'
            }
        };

        // Create theme morphing for cards
        document.querySelectorAll('.adaptive-card').forEach((card, index) => {
            this.createAdaptiveCard(card, index);
        });
    }

    createAdaptiveCard(cardElement, index) {
        const cardType = cardElement.dataset.cardType || 'healthcare';
        const theme = this.themes[cardType];

        if (!theme) return;

        // Create scroll-triggered theme morphing
        ScrollTrigger.create({
            trigger: cardElement,
            start: 'top 80%',
            end: 'bottom 20%',
            onEnter: () => this.morphCardTheme(cardElement, theme, 'enter'),
            onLeave: () => this.morphCardTheme(cardElement, theme, 'leave'),
            onEnterBack: () => this.morphCardTheme(cardElement, theme, 'enter'),
            onLeaveBack: () => this.morphCardTheme(cardElement, theme, 'leave')
        });

        // Add hover effects
        cardElement.addEventListener('mouseenter', () => {
            if (this.prefersReducedMotion) return;

            gsap.to(cardElement, {
                y: -8,
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });

        cardElement.addEventListener('mouseleave', () => {
            gsap.to(cardElement, {
                y: 0,
                scale: 1,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    morphCardTheme(card, theme, action) {
        const targetProps = action === 'enter' ? {
            background: `linear-gradient(135deg, var(--${theme.primary}-50) 0%, var(--${theme.secondary}-50) 100%)`,
            borderColor: `var(--${theme.primary}-200)`,
            y: -5,
            duration: 0.6,
            ease: 'power2.out'
        } : {
            background: 'white',
            borderColor: 'rgb(243 244 246)',
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
        };

        gsap.to(card, targetProps);

        // Morph icons within the card
        const icons = card.querySelectorAll('i.fas');
        const iconProps = action === 'enter' ? {
            scale: 1.1,
            color: `var(--${theme.primary}-600)`,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        } : {
            scale: 1,
            color: 'rgb(75 85 99)',
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out'
        };

        gsap.to(icons, iconProps);

        this.log(`🎨 Card theme morphed: ${action} → ${theme.primary}`);
    }

    // 🎬 EXPERIMENT 3: Cinematic Scroll Storytelling
    async initializeCinematicStorytelling() {
        this.log('🎬 Setting up Cinematic Scroll Storytelling');

        // Define story sequences for different sections
        this.storySequences = {
            hero: {
                trigger: '.hero-story',
                narrative: 'Welcome to the future of healthcare',
                animations: [
                    { element: '.hero-title', props: { x: -100, opacity: 0, scale: 0.8 } },
                    { element: '.hero-subtitle', props: { x: 100, opacity: 0, scale: 0.8 } },
                    { element: '.hero-cta', props: { y: 50, opacity: 0, scale: 0.8 } }
                ]
            },
            features: {
                trigger: '.features-story',
                narrative: 'Discover our comprehensive platform',
                animations: [
                    { element: '.feature-1', props: { rotationY: -90, opacity: 0 } },
                    { element: '.feature-2', props: { rotationY: 90, opacity: 0 } },
                    { element: '.feature-3', props: { y: 100, opacity: 0 } }
                ]
            },
            journey: {
                trigger: '.journey-story',
                narrative: 'From consultation to care',
                animations: [
                    { element: '.step-1', props: { scale: 0, opacity: 0 } },
                    { element: '.step-2', props: { scale: 0, opacity: 0 } },
                    { element: '.step-3', props: { scale: 0, opacity: 0 } }
                ]
            }
        };

        // Create cinematic sequences
        Object.entries(this.storySequences).forEach(([key, sequence]) => {
            this.createCinematicSequence(key, sequence);
        });
    }

    createCinematicSequence(key, sequence) {
        const trigger = document.querySelector(sequence.trigger);
        if (!trigger) {
            this.log(`⚠️ Story trigger not found: ${sequence.trigger}`);
            return;
        }

        this.log(`📖 Creating cinematic sequence: ${key}`);

        // Create GSAP timeline for the sequence
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: 'top 75%',
                end: 'bottom 25%',
                scrub: 1,
                onEnter: () => this.log(`🎬 Story started: ${sequence.narrative}`),
                onLeave: () => this.log(`🎬 Story ended: ${sequence.narrative}`)
            }
        });

        // Add animations to timeline
        sequence.animations.forEach((anim, index) => {
            const element = trigger.querySelector(anim.element);
            if (element) {
                tl.to(element, {
                    ...anim.props,
                    duration: 1,
                    ease: 'none'
                }, index * 0.2);
            }
        });

        this.animations.set(`story-${key}`, tl);
    }

    // 🌊 EXPERIMENT 4: Liquid Navigation System
    async initializeLiquidNavigation() {
        this.log('🌊 Setting up Liquid Navigation System');

        const navItems = document.querySelectorAll('.nav-liquid');
        const mainLogo = document.querySelector('.logo-liquid');

        // Create liquid morphing effects for navigation
        navItems.forEach((item, index) => {
            this.createLiquidNavItem(item, index);
        });

        // Logo morphing on scroll
        if (mainLogo) {
            this.createLiquidLogo(mainLogo);
        }
    }

    createLiquidNavItem(navItem, index) {
        const icon = navItem.querySelector('i');
        const text = navItem.querySelector('span');

        navItem.addEventListener('mouseenter', () => {
            if (this.prefersReducedMotion) return;

            gsap.timeline()
                .to(navItem, {
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '50px',
                    padding: '12px 24px',
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                })
                .to(icon, {
                    rotation: 360,
                    scale: 1.2,
                    duration: 0.4,
                    ease: 'power2.out'
                }, 0)
                .to(text, {
                    x: 8,
                    duration: 0.3,
                    ease: 'power2.out'
                }, 0);
        });

        navItem.addEventListener('mouseleave', () => {
            gsap.to(navItem, {
                backgroundColor: 'transparent',
                borderRadius: '0px',
                padding: '8px 16px',
                duration: 0.3,
                ease: 'power2.out'
            });

            gsap.to([icon, text], {
                rotation: 0,
                scale: 1,
                x: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    createLiquidLogo(logo) {
        ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                const progress = self.progress;
                const scale = 1 - (progress * 0.2);
                const rotation = progress * 10;

                gsap.to(logo, {
                    scale: scale,
                    rotation: rotation,
                    duration: 0.1,
                    ease: 'none'
                });
            }
        });
    }

    // 🎼 EXPERIMENT 5: Micro-interaction Symphony
    async initializeMicroInteractions() {
        this.log('🎼 Setting up Micro-interaction Symphony');

        // Define interaction groups
        this.interactionGroups = {
            'vitals-group': {
                trigger: '.vitals-trigger',
                targets: ['.vital-1', '.vital-2', '.vital-3'],
                sound: 'pulse'
            },
            'feature-group': {
                trigger: '.feature-trigger',
                targets: ['.feature-icon', '.feature-text', '.feature-cta'],
                sound: 'bounce'
            },
            'button-group': {
                trigger: '.button-symphony',
                targets: ['.button-icon', '.button-text', '.button-bg'],
                sound: 'scale'
            }
        };

        // Create symphony for each group
        Object.entries(this.interactionGroups).forEach(([key, group]) => {
            this.createInteractionSymphony(key, group);
        });
    }

    createInteractionSymphony(key, group) {
        const trigger = document.querySelector(group.trigger);
        if (!trigger) return;

        const targets = group.targets.map(selector => document.querySelector(selector)).filter(Boolean);

        if (targets.length === 0) return;

        trigger.addEventListener('mouseenter', () => {
            if (this.prefersReducedMotion) return;

            this.log(`🎵 Symphony started: ${key}`);

            gsap.timeline()
                .to(targets[0], {
                    scale: 1.1,
                    rotation: 5,
                    duration: 0.2,
                    ease: 'back.out(1.7)'
                })
                .to(targets[1], {
                    scale: 1.15,
                    y: -3,
                    duration: 0.3,
                    ease: 'power2.out'
                }, 0.1)
                .to(targets[2], {
                    opacity: 0.9,
                    scale: 1.2,
                    duration: 0.4,
                    ease: 'sine.out'
                }, 0.2);
        });

        trigger.addEventListener('mouseleave', () => {
            gsap.to(targets, {
                scale: 1,
                rotation: 0,
                y: 0,
                opacity: 1,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.out'
            });
        });
    }

    // 📊 EXPERIMENT 6: Performance Monitor
    async initializePerformanceMonitor() {
        this.log('📊 Setting up Performance Monitor');

        this.performanceMetrics = {
            fps: 0,
            memoryUsage: 0,
            animationCount: 0,
            lastFrameTime: performance.now()
        };

        // Create performance display
        this.createPerformanceDisplay();

        // Start monitoring
        this.startPerformanceMonitoring();
    }

    createPerformanceDisplay() {
        const display = document.createElement('div');
        display.id = 'performance-monitor';
        display.innerHTML = `
            <div style="position: fixed; top: 10px; right: 10px; background: rgba(0,0,0,0.8); color: white; padding: 10px; border-radius: 5px; font-size: 12px; z-index: 1000;">
                <div>🧪 2025 Experiment Monitor</div>
                <div id="fps-display">FPS: --</div>
                <div id="memory-display">Memory: -- MB</div>
                <div id="animations-display">Animations: --</div>
            </div>
        `;
        document.body.appendChild(display);
    }

    startPerformanceMonitoring() {
        let frameCount = 0;
        let lastTime = performance.now();

        const monitor = () => {
            frameCount++;
            const currentTime = performance.now();

            if (currentTime - lastTime >= 1000) {
                this.performanceMetrics.fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                this.performanceMetrics.animationCount = this.animations.size;

                // Update display
                this.updatePerformanceDisplay();

                frameCount = 0;
                lastTime = currentTime;
            }

            // Check memory usage if available
            if (performance.memory) {
                this.performanceMetrics.memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1048576); // Convert to MB
            }

            requestAnimationFrame(monitor);
        };

        requestAnimationFrame(monitor);
    }

    updatePerformanceDisplay() {
        const fpsEl = document.getElementById('fps-display');
        const memoryEl = document.getElementById('memory-display');
        const animationsEl = document.getElementById('animations-display');

        if (fpsEl) fpsEl.textContent = `FPS: ${this.performanceMetrics.fps}`;
        if (memoryEl) memoryEl.textContent = `Memory: ${this.performanceMetrics.memoryUsage} MB`;
        if (animationsEl) animationsEl.textContent = `Animations: ${this.performanceMetrics.animationCount}`;
    }

    setupExperimentalEventHandlers() {
        // Enhanced event handling with performance tracking
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAllAnimations();
                this.log('⏸️ Animations paused - page hidden');
            } else {
                this.resumeAllAnimations();
                this.log('▶️ Animations resumed');
            }
        });

        // Track user interactions
        document.addEventListener('click', (e) => {
            this.log(`👆 Click detected: ${e.target.tagName}.${e.target.className}`);
        });

        document.addEventListener('scroll', () => {
            // Throttled scroll logging
            if (!this.scrollThrottle) {
                this.scrollThrottle = true;
                setTimeout(() => {
                    this.log(`📜 Scroll position: ${Math.round(window.scrollY)}px`);
                    this.scrollThrottle = false;
                }, 100);
            }
        });
    }

    setupThemeExperiment() {
        // Dynamic theme switching experiment
        this.log('🎨 Setting up Theme Experiment');

        const themeButtons = document.querySelectorAll('.theme-switch');
        themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const newTheme = button.dataset.theme;
                this.switchExperimentTheme(newTheme);
            });
        });
    }

    switchExperimentTheme(themeName) {
        const root = document.documentElement;
        const theme = this.themes[themeName];

        if (!theme) return;

        gsap.to(root, {
            '--experiment-primary': theme.primary,
            '--experiment-secondary': theme.secondary,
            duration: 0.6,
            ease: 'power2.out'
        });

        this.currentTheme = themeName;
        this.log(`🎨 Theme switched to: ${themeName}`);
    }

    pauseAllAnimations() {
        this.animations.forEach((animation, key) => {
            if (animation.pause) animation.pause();
            else if (typeof animation === 'number') clearInterval(animation);
        });
    }

    resumeAllAnimations() {
        this.animations.forEach((animation, key) => {
            if (animation.resume) animation.resume();
        });
    }

    setupCleanupHandlers() {
        const cleanup = () => {
            this.pauseAllAnimations();
            this.animations.clear();
            this.observers.forEach(observer => observer.disconnect());
            this.observers.clear();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

            // Remove performance monitor
            const monitor = document.getElementById('performance-monitor');
            if (monitor) monitor.remove();

            this.log('🧹 Experiment cleaned up');
        };

        window.addEventListener('beforeunload', cleanup);
        this.cleanup = cleanup;
    }

    fallbackInitialization() {
        this.log('🔄 Falling back to basic initialization');
        gsap.set('.morphing-icon', { opacity: 1 });
        gsap.set('.adaptive-card', { opacity: 1 });
    }
}

// Initialize the 2025 experiment
document.addEventListener('DOMContentLoaded', function() {
    const experiment2025 = new Eka2025Experiment();
    experiment2025.initialize().catch(error => {
        console.error('❌ 2025 Experiment failed to initialize:', error);
    });
});
