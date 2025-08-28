/**
 * Simple Component Loader - Works with local files (file:// protocol)
 * No network requests, direct HTML embedding
 */

// Component definitions - embedded directly in JavaScript
const COMPONENTS = {
    cta: `
<!-- CTA Section Component -->
<section class="cta-section py-16" role="complementary" aria-labelledby="cta-heading">
    <div class="container mx-auto px-4 text-center">
        <h2 id="cta-heading" class="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">Join thousands of users who have transformed their healthcare experience.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" class="btn btn-primary rounded-full px-8 py-4 text-lg border-none shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started
                <i class="fas fa-arrow-right ml-2" aria-hidden="true"></i>
            </a>
            <a href="#" class="btn btn-outline rounded-full px-8 py-4 text-lg">
                Learn More
            </a>
        </div>
    </div>
</section>
    `,

    featureGrid: `
<!-- Feature Grid Component -->
<section class="feature-grid py-16 bg-white" role="region" aria-labelledby="features-heading">
    <div class="container mx-auto px-4">
        <div class="text-center mb-12">
            <h2 id="features-heading" class="text-4xl font-bold mb-4">Complete Solution</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to get started with modern healthcare solutions.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="feature-card p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
                <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                    <i class="fas fa-heart text-white text-xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4">Patient Management</h3>
                <p class="text-gray-600 mb-4">Comprehensive patient records with AI-powered health insights and automated data entry.</p>
                <ul class="space-y-2 text-sm text-gray-600">
                    <li>• Digital health records</li>
                    <li>• Appointment scheduling</li>
                    <li>• Patient portal access</li>
                </ul>
            </div>

            <div class="feature-card p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100">
                <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                    <i class="fas fa-chart-line text-white text-xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4">Analytics & Reporting</h3>
                <p class="text-gray-600 mb-4">Real-time analytics and automated reporting to optimize your practice performance.</p>
                <ul class="space-y-2 text-sm text-gray-600">
                    <li>• Practice analytics</li>
                    <li>• Revenue tracking</li>
                    <li>• Compliance reports</li>
                </ul>
            </div>

            <div class="feature-card p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
                <div class="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                    <i class="fas fa-mobile-alt text-white text-xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4">Mobile Access</h3>
                <p class="text-gray-600 mb-4">Access your data anywhere with our mobile app and web-based platform.</p>
                <ul class="space-y-2 text-sm text-gray-600">
                    <li>• Mobile app access</li>
                    <li>• Cloud synchronization</li>
                    <li>• Offline capability</li>
                </ul>
            </div>
        </div>
    </div>
</section>
    `,

    testimonial: `
<!-- Testimonial Component -->
<section class="testimonial py-20 bg-white" role="region" aria-labelledby="testimonial-heading">
    <div class="container mx-auto px-4">
        <h2 id="testimonial-heading" class="text-4xl font-bold text-center mb-12 text-gray-900">Real Impact Delivered</h2>
        <div class="max-w-4xl mx-auto bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
            <div class="grid md:grid-cols-3 gap-8 items-center">
                <div class="md:col-span-2">
                    <div class="flex mb-4">
                        <span class="text-yellow-400">★★★★★</span>
                    </div>
                    <blockquote class="text-xl font-medium text-gray-800">"This platform has completely transformed how we handle patient data and clinical workflows. The AI features are incredible."</blockquote>
                    <div class="mt-6">
                        <p class="font-bold text-gray-900">Dr. Sarah Johnson</p>
                        <p class="text-gray-600">Chief Medical Officer, Healthcare Plus</p>
                    </div>
                </div>
                <div class="flex justify-center">
                    <div class="w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-user-md text-white text-4xl"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    `,

    faq: `
<!-- FAQ Component -->
<section class="faq py-20 bg-white" role="region" aria-labelledby="faq-heading">
    <div class="container mx-auto px-4 max-w-4xl">
        <h2 id="faq-heading" class="text-4xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
        <div class="space-y-4">
            <div class="collapse collapse-plus bg-gray-50 border border-gray-100 rounded-xl">
                <input type="radio" name="faq-accordion" checked="checked" />
                <div class="collapse-title text-xl font-medium text-gray-900">What is this platform?</div>
                <div class="collapse-content"><p class="text-gray-600">This is a comprehensive healthcare platform that combines AI-powered tools with modern practice management solutions.</p></div>
            </div>
            <div class="collapse collapse-plus bg-gray-50 border border-gray-100 rounded-xl">
                <input type="radio" name="faq-accordion" />
                <div class="collapse-title text-xl font-medium text-gray-900">Is it HIPAA compliant?</div>
                <div class="collapse-content"><p class="text-gray-600">Yes, we adhere to the highest standards of security and privacy, including HIPAA compliance to ensure all patient data is protected.</p></div>
            </div>
            <div class="collapse collapse-plus bg-gray-50 border border-gray-100 rounded-xl">
                <input type="radio" name="faq-accordion" />
                <div class="collapse-title text-xl font-medium text-gray-900">How much time can it save?</div>
                <div class="collapse-content"><p class="text-gray-600">Users typically save 10-15 hours per week on administrative tasks, allowing more focus on patient care.</p></div>
            </div>
        </div>
    </div>
</section>
    `,

    floatingCards: `
<!-- Floating Cards Container Component -->
<div class="floating-cards-container absolute inset-0 pointer-events-none z-10" role="presentation" aria-hidden="true">
    <!-- Demo Card: Top Right -->
    <div class="floating-card floating-card-1 absolute" style="top: 15%; right: 8%; width: 320px;" tabindex="-1">
        <div class="card bg-base-100 shadow-2xl border border-gray-100/50" role="article" aria-label="Demo dashboard">
            <div class="card-body p-6">
                <header class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center" role="img" aria-label="AI icon">
                            <i class="fas fa-brain text-white text-sm" aria-hidden="true"></i>
                        </div>
                        <span class="font-semibold text-gray-800">AI Dashboard</span>
                    </div>
                    <div class="text-xs text-blue-600 font-medium">Live Demo</div>
                </header>
                <div class="space-y-3" role="list" aria-label="Demo metrics">
                    <div class="flex items-center justify-between" role="listitem">
                        <span class="text-sm text-gray-600">Active Users</span>
                        <span class="text-sm font-semibold text-blue-600">1,247</span>
                    </div>
                    <div class="flex items-center justify-between" role="listitem">
                        <span class="text-sm text-gray-600">Response Time</span>
                        <span class="text-sm font-semibold text-green-600">45ms</span>
                    </div>
                    <div class="flex items-center justify-between" role="listitem">
                        <span class="text-sm text-gray-600">Accuracy</span>
                        <span class="text-sm font-semibold text-green-600">98.5%</span>
                    </div>
                    <div class="mt-4 p-3 bg-blue-50 rounded-xl" role="status" aria-live="polite">
                        <div class="text-xs text-blue-700 font-medium">All systems operational</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Analytics Card: Left Side -->
    <div class="floating-card floating-card-2 absolute" style="top: 25%; left: 5%; width: 360px;">
        <div class="card bg-base-100 shadow-2xl border border-gray-100/50">
            <div class="card-body p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="card-title text-lg font-bold text-gray-800">Analytics Overview</h3>
                    <div class="text-xs text-purple-600 font-medium">Real-time</div>
                </div>
                <div class="space-y-4">
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-chart-line text-white"></i>
                        </div>
                        <div>
                            <div class="font-semibold text-gray-800">Performance Metrics</div>
                            <div class="text-xs text-gray-600">Updated every 5 minutes</div>
                        </div>
                        <div class="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            +12%
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-green-50 p-3 rounded-xl text-center">
                            <div class="text-lg font-bold text-green-600">99.9%</div>
                            <div class="text-xs text-green-700">Uptime</div>
                        </div>
                        <div class="bg-blue-50 p-3 rounded-xl text-center">
                            <div class="text-lg font-bold text-blue-600">2.1M</div>
                            <div class="text-xs text-blue-700">Requests</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Features Card: Bottom Right -->
    <div class="floating-card floating-card-3 absolute" style="top: 55%; right: 12%; width: 340px;">
        <div class="card bg-base-100 shadow-2xl border border-gray-100/50">
            <div class="card-body p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="card-title text-lg font-bold text-gray-800">Key Features</h3>
                    <div class="text-xs text-green-600 font-medium">Active</div>
                </div>
                <div class="space-y-3">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-check text-white text-sm"></i>
                        </div>
                        <span class="text-sm text-gray-700">AI-Powered Analytics</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-check text-white text-sm"></i>
                        </div>
                        <span class="text-sm text-gray-700">Real-time Monitoring</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-check text-white text-sm"></i>
                        </div>
                        <span class="text-sm text-gray-700">Automated Insights</span>
                    </div>
                    <div class="mt-4 p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white text-center">
                        <div class="text-lg font-bold">15+</div>
                        <div class="text-xs opacity-90">Integrated Tools</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `,

    animatedStatsSection: `
<!-- Enhanced Stats Bar with GSAP Animations -->
<section class="py-16 bg-white" aria-labelledby="stats-heading">
    <div class="container mx-auto px-4">
        <h2 id="stats-heading" class="text-center text-3xl font-bold mb-12 text-gray-800">Trusted by Healthcare Leaders Nationwide</h2>
        <div class="stats shadow w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
            <div class="stat" data-target="30000000">
                <div class="stat-figure text-blue-600">
                    <i class="fas fa-file-medical-alt fa-3x" aria-hidden="true"></i>
                </div>
                <div class="stat-title text-gray-600 font-medium">Digital Health Records</div>
                <div class="stat-value text-blue-700 text-3xl font-bold" data-counter="0">0</div>
                <div class="stat-desc text-blue-600">Secure and accessible</div>
            </div>

            <div class="stat" data-target="100000">
                <div class="stat-figure text-green-600">
                    <i class="fas fa-stethoscope fa-3x" aria-hidden="true"></i>
                </div>
                <div class="stat-title text-gray-600 font-medium">Active Healthcare Providers</div>
                <div class="stat-value text-green-700 text-3xl font-bold" data-counter="0">0</div>
                <div class="stat-desc text-green-600">Trusted by professionals</div>
            </div>

            <div class="stat" data-target="2500">
                <div class="stat-figure text-purple-600">
                    <i class="fas fa-clinic-medical fa-3x" aria-hidden="true"></i>
                </div>
                <div class="stat-title text-gray-600 font-medium">Connected Clinics</div>
                <div class="stat-value text-purple-700 text-3xl font-bold" data-counter="0">0</div>
                <div class="stat-desc text-purple-600">Nationwide network</div>
            </div>

            <div class="stat" data-target="50">
                <div class="stat-figure text-orange-600">
                    <i class="fas fa-network-wired fa-3x" aria-hidden="true"></i>
                </div>
                <div class="stat-title text-gray-600 font-medium">Enterprise Integrations</div>
                <div class="stat-value text-orange-700 text-3xl font-bold" data-counter="0">0</div>
                <div class="stat-desc text-orange-600">Seamless connectivity</div>
            </div>
        </div>

        <!-- Additional Trust Indicators -->
        <div class="grid md:grid-cols-3 gap-8 mt-16">
            <div class="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-shield-check text-white fa-2x" aria-hidden="true"></i>
                </div>
                <h3 class="text-xl font-bold text-green-800 mb-2">HIPAA Compliant</h3>
                <p class="text-green-700">Fully compliant with healthcare data protection standards</p>
            </div>

            <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-headset text-white fa-2x" aria-hidden="true"></i>
                </div>
                <h3 class="text-xl font-bold text-blue-800 mb-2">24/7 Support</h3>
                <p class="text-blue-700">Round-the-clock technical and medical support available</p>
            </div>

            <div class="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-100">
                <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-crown text-white fa-2x" aria-hidden="true"></i>
                </div>
                <h3 class="text-xl font-bold text-purple-800 mb-2">Industry Leader</h3>
                <p class="text-purple-700">Recognized as the leading healthcare AI platform in India</p>
            </div>
        </div>
    </div>
</section>
    `,

    // Keep the original static version for backward compatibility
    statsSection: `
<!-- Stats Section Component -->
<section class="stats-section py-20 bg-white" role="region" aria-labelledby="stats-heading">
    <div class="container mx-auto px-4">
        <div class="text-center mb-16">
            <h2 id="stats-heading" class="text-4xl font-bold mb-4">Trusted by Healthcare Professionals</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Join thousands of healthcare providers who have transformed their practice with our platform.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="stat-card text-center p-8 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl">
                <div class="stat-icon w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-users text-white text-2xl"></i>
                </div>
                <div class="stat-number text-4xl font-bold text-blue-600 mb-2">40K+</div>
                <div class="stat-label text-lg font-semibold text-gray-800 mb-2">Healthcare Professionals</div>
                <div class="stat-description text-sm text-gray-600">Doctors and staff using our platform</div>
            </div>

            <div class="stat-card text-center p-8 bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl">
                <div class="stat-icon w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-clock text-white text-2xl"></i>
                </div>
                <div class="stat-number text-4xl font-bold text-green-600 mb-2">12hrs</div>
                <div class="stat-label text-lg font-semibold text-gray-800 mb-2">Time Saved Weekly</div>
                <div class="stat-description text-sm text-gray-600">Average administrative time reduction</div>
            </div>

            <div class="stat-card text-center p-8 bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl">
                <div class="stat-icon w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-chart-line text-white text-2xl"></i>
                </div>
                <div class="stat-number text-4xl font-bold text-purple-600 mb-2">98%</div>
                <div class="stat-label text-lg font-semibold text-gray-800 mb-2">Accuracy Rate</div>
                <div class="stat-description text-sm text-gray-600">AI-powered documentation accuracy</div>
            </div>

            <div class="stat-card text-center p-8 bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl">
                <div class="stat-icon w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-star text-white text-2xl"></i>
                </div>
                <div class="stat-number text-4xl font-bold text-orange-600 mb-2">4.9/5</div>
                <div class="stat-label text-lg font-semibold text-gray-800 mb-2">User Satisfaction</div>
                <div class="stat-description text-sm text-gray-600">Based on 10,000+ reviews</div>
            </div>
        </div>
    </div>
</section>
    `,

    header: `
<!-- Skip to main content link for accessibility -->
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50" aria-label="Skip to main content">
    Skip to main content
</a>

<!-- Main Wrapper -->
<div class="bg-white">

    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50" role="banner">
        <div class="container mx-auto navbar px-4">
            <div class="navbar-start">
                <!-- Mobile dropdown -->
                <div class="dropdown" role="navigation" aria-label="Mobile navigation">
                    <label tabindex="0" class="btn btn-ghost lg:hidden" aria-label="Open mobile menu" aria-expanded="false" aria-haspopup="true">
                        <i class="fas fa-bars h-5 w-5" aria-hidden="true"></i>
                    </label>
                    <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52" role="menu" aria-label="Mobile menu items">
                        <li>
                            <details>
                                <summary aria-label="Product suite menu" aria-expanded="false">Product suite</summary>
                                <ul class="p-2" role="menu">
                                    <li role="menuitem"><a href="emr-components.html" aria-label="Electronic Medical Records system">Eka EMR</a></li>
                                    <li role="menuitem"><a href="scribe-components.html" aria-label="AI-powered medical scribe">Eka Scribe</a></li>
                                    <li role="menuitem"><a href="phr-components.html" aria-label="Personal Health Records platform">Eka PHR</a></li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary aria-label="Solutions menu" aria-expanded="false">Solutions</summary>
                                <ul class="p-2" role="menu">
                                    <li role="menuitem"><a href="#" aria-label="Artificial Intelligence healthcare solutions">Health AI</a></li>
                                    <li role="menuitem"><a href="#" aria-label="Health assessment tools">Assessment</a></li>
                                    <li role="menuitem"><a href="#" aria-label="Medical documentation assistant">EkaScribe</a></li>
                                    <li role="menuitem"><a href="#" aria-label="Medical document parsing service">Medical Document Parsing</a></li>
                                    <li role="menuitem"><a href="#" aria-label="Doctor productivity tools">Doctor Tool</a></li>
                                    <li role="menuitem"><a href="#" aria-label="Ayushman Bharat Digital Mission integration">ABDM Connect</a></li>
                                    <li role="menuitem"><a href="#" aria-label="Medical knowledge database">Medical Knowledge Base</a></li>
                                    <li role="menuitem"><a href="#" aria-label="Medical records management">Medical Records</a></li>
                                    <li role="menuitem"><a href="#" aria-label="Patient mobile application">User App</a></li>
                                    <li role="menuitem"><a href="#" aria-label="Health assessment quiz">Health Quiz</a></li>
                                    <li role="menuitem"><a href="#" aria-label="Medication search and information">Medication Search</a></li>
                                    <li role="menuitem"><a href="#" aria-label="Appointment scheduling system">Appointments Management</a></li>
                                    <li role="menuitem"><a href="#" aria-label="Patient management applications">Patient Management Apps</a></li>
                                </ul>
                            </details>
                        </li>
                        <li role="menuitem"><a href="#" aria-label="View pricing information">Pricing</a></li>
                        <li role="menuitem"><a href="#" aria-label="Read our blog posts">Blogs</a></li>
                        <li role="menuitem"><a href="#" aria-label="Request a product demonstration">Request a demo</a></li>
                    </ul>
                </div>
                <!-- Logo -->
                <a href="index-components.html" class="btn btn-ghost text-xl p-0 h-auto" aria-label="Homepage">
                    <img src="https://cdn.prod.website-files.com/64d0bd8b475d468c8b1aa632/68ad4ddd03888c7fc6b9b036_eka-black-logo.svg" alt="Eka.care Prioritize Health" class="h-10">
                </a>
            </div>
            <nav class="navbar-center hidden lg:flex" role="navigation" aria-label="Main navigation">
                <ul class="menu menu-horizontal px-1 font-medium">
                    <li>
                        <details role="menu" aria-label="Product suite navigation">
                            <summary aria-label="Product suite menu" aria-expanded="false" aria-haspopup="true">Product suite</summary>
                            <ul class="p-2 bg-base-100 shadow rounded-box w-48 z-10" role="menu">
                                <li role="menuitem"><a href="emr-components.html" aria-label="Electronic Medical Records system">Eka EMR</a></li>
                                <li role="menuitem"><a href="scribe-components.html" aria-label="AI-powered medical scribe">Eka Scribe</a></li>
                                <li role="menuitem"><a href="phr-components.html" aria-label="Personal Health Records platform">Eka PHR</a></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                         <details role="menu" aria-label="Solutions navigation">
                            <summary aria-label="Solutions menu" aria-expanded="false" aria-haspopup="true">Solutions</summary>
                            <ul class="p-2 bg-base-100 shadow rounded-box w-64 z-10 menu" role="menu">
                                <li role="presentation"><h2 class="menu-title text-gray-400">Health AI</h2></li>
                                <li role="menuitem"><a href="#" aria-label="Health assessment tools">Assessment</a></li>
                                <li role="menuitem"><a href="#" aria-label="Medical documentation assistant">EkaScribe</a></li>
                                <li class="my-1 h-px bg-gray-100" role="separator" aria-hidden="true"></li>
                                <li role="presentation"><h2 class="menu-title text-gray-400">General tools</h2></li>
                                <li role="menuitem"><a href="#" aria-label="Medical document parsing service">Medical Document Parsing</a></li>
                                <li role="menuitem"><a href="#" aria-label="Doctor productivity tools">Doctor Tool</a></li>
                                <li role="menuitem"><a href="#" aria-label="Ayushman Bharat Digital Mission integration">ABDM Connect</a></li>
                                <li role="menuitem"><a href="#" aria-label="Medical knowledge database">Medical Knowledge Base</a></li>
                                <li role="menuitem"><a href="#" aria-label="Medical records management">Medical Records</a></li>
                                <li role="menuitem"><a href="#" aria-label="Patient mobile application">User App</a></li>
                                <li class="my-1 h-px bg-gray-100" role="separator" aria-hidden="true"></li>
                                <li role="presentation"><h2 class="menu-title text-gray-400">Examples</h2></li>
                                <li role="menuitem"><a href="#" aria-label="Health assessment quiz">Health Quiz</a></li>
                                <li role="menuitem"><a href="#" aria-label="Medication search and information">Medication Search</a></li>
                                <li role="menuitem"><a href="#" aria-label="Appointment scheduling system">Appointments Management</a></li>
                                <li role="menuitem"><a href="#" aria-label="Patient management applications">Patient Management Apps</a></li>
                            </ul>
                        </details>
                    </li>
                    <li role="menuitem"><a href="#" aria-label="View pricing information">Pricing</a></li>
                    <li role="menuitem"><a href="#" aria-label="Read our blog posts">Blogs</a></li>
                    <li role="menuitem"><a href="#" aria-label="Request a product demonstration">Request a demo</a></li>
                </ul>
            </nav>
            <div class="navbar-end space-x-2">
                <a href="#" class="btn btn-soft px-6 hidden sm:inline-flex" aria-label="Log in to your account">Log in</a>
                <a href="#" class="btn btn-neutral px-6 border-outline-pulse rounded-lg" aria-label="Get started with Eka Care">Get started</a>
            </div>
        </div>
    </header>
    `,

    footer: `
        </main>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white">
            <div class="container mx-auto px-4 py-12">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <!-- Product Suite Section -->
                    <div class="space-y-4">
                        <h6 class="text-lg font-semibold text-white">Product Suite</h6>
                        <div class="space-y-2">
                            <a href="emr-components.html" class="block text-gray-300 hover:text-white transition-colors">Eka EMR</a>
                            <a href="scribe-components.html" class="block text-gray-300 hover:text-white transition-colors">Eka Scribe</a>
                            <a href="phr-components.html" class="block text-gray-300 hover:text-white transition-colors">Eka PHR</a>
                        </div>
                    </div>

                    <!-- Solutions Section -->
                    <div class="space-y-4">
                        <h6 class="text-lg font-semibold text-white">Solutions</h6>
                        <div class="space-y-2">
                            <h6 class="text-sm font-medium text-gray-400 uppercase tracking-wide">Health AI</h6>
                            <a class="block text-gray-300 hover:text-white transition-colors ml-2">Assessment</a>
                            <a class="block text-gray-300 hover:text-white transition-colors ml-2">EkaScribe</a>

                            <h6 class="text-sm font-medium text-gray-400 uppercase tracking-wide mt-4">General Tools</h6>
                            <a class="block text-gray-300 hover:text-white transition-colors ml-2">Medical Document Parsing</a>
                            <a class="block text-gray-300 hover:text-white transition-colors ml-2">Doctor Tool</a>
                            <a class="block text-gray-300 hover:text-white transition-colors ml-2">ABDM Connect</a>
                            <a class="block text-gray-300 hover:text-white transition-colors ml-2">Medical Knowledge Base</a>
                            <a class="block text-gray-300 hover:text-white transition-colors ml-2">Medical Records</a>
                            <a class="block text-gray-300 hover:text-white transition-colors ml-2">User App</a>

                            <h6 class="text-sm font-medium text-gray-400 uppercase tracking-wide mt-4">Examples</h6>
                            <a class="block text-gray-300 hover:text-white transition-colors ml-2">Health Quiz</a>
                            <a class="block text-gray-300 hover:text-white transition-colors ml-2">Medication Search</a>
                            <a class="block text-gray-300 hover:text-white transition-colors ml-2">Appointments Management</a>
                            <a class="block text-gray-300 hover:text-white transition-colors ml-2">Patient Management Apps</a>
                        </div>
                    </div>

                    <!-- Specialities Section -->
                    <div class="space-y-4">
                        <h6 class="text-lg font-semibold text-white">Specialities</h6>
                        <div class="space-y-2">
                            <a href="https://www.eka.care/s/for-doctors/neurologists" target="_blank" class="block text-gray-300 hover:text-white transition-colors">Neurologists</a>
                            <a href="https://www.eka.care/s/for-doctors/dentists" target="_blank" class="block text-gray-300 hover:text-white transition-colors">Dentists</a>
                            <a href="https://www.eka.care/s/for-doctors/pediatricians" target="_blank" class="block text-gray-300 hover:text-white transition-colors">Pediatricians</a>
                            <a href="https://www.eka.care/s/for-doctors/ophthalmologists" target="_blank" class="block text-gray-300 hover:text-white transition-colors">Ophthalmologists</a>
                            <a href="https://www.eka.care/s/for-doctors/cardiologists" target="_blank" class="block text-gray-300 hover:text-white transition-colors">Cardiologists</a>
                        </div>
                    </div>

                    <!-- Company Section -->
                    <div class="space-y-4">
                        <h6 class="text-lg font-semibold text-white">Company</h6>
                        <div class="space-y-2">
                            <a href="index-components.html" class="block text-gray-300 hover:text-white transition-colors">Home</a>
                            <a class="block text-gray-300 hover:text-white transition-colors">About</a>
                            <a class="block text-gray-300 hover:text-white transition-colors">Team</a>
                            <a class="block text-gray-300 hover:text-white transition-colors">Careers</a>
                            <a class="block text-gray-300 hover:text-white transition-colors">Blogs</a>
                            <a class="block text-gray-300 hover:text-white transition-colors">Pricing</a>
                            <a class="block text-gray-300 hover:text-white transition-colors">Request a demo</a>
                        </div>
                    </div>

                    <!-- Support & Legal Section -->
                    <div class="space-y-4">
                        <h6 class="text-lg font-semibold text-white">Support & Legal</h6>
                        <div class="space-y-2">
                            <a class="block text-gray-300 hover:text-white transition-colors">Terms & Conditions</a>
                            <a class="block text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
                            <a class="block text-gray-300 hover:text-white transition-colors">Security</a>
                            <a class="block text-gray-300 hover:text-white transition-colors">Contact Us</a>
                            <a class="block text-gray-300 hover:text-white transition-colors">Help Center</a>
                        </div>
                    </div>
                </div>

                <!-- Footer Bottom -->
                <div class="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div class="flex items-center space-x-4 mb-4 md:mb-0">
                        <img src="https://cdn.prod.website-files.com/64d0bd8b475d468c8b1aa632/68ad4ddd03888c7fc6b9b036_eka-black-logo.svg" alt="Eka Care" class="h-8 brightness-0 invert">
                        <p class="text-gray-400">© 2024 Eka Care. All rights reserved.</p>
                    </div>
                    <div class="flex space-x-4">
                        <a href="https://www.instagram.com/ekacarehq/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                            <i class="fab fa-instagram w-5 h-5"></i>
                        </a>
                        <a href="https://in.linkedin.com/company/ekacare" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                            <i class="fab fa-linkedin w-5 h-5"></i>
                        </a>
                        <a href="https://www.facebook.com/ekacareHQ" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                            <i class="fab fa-facebook w-5 h-5"></i>
                        </a>
                        <a href="https://twitter.com/ekacareHQ" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                            <i class="fab fa-twitter w-5 h-5"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    `
};

/**
 * Simple Component Loader - No network requests, works with local files
 */
class SimpleComponentLoader {
    constructor() {
        this.isInitialized = false;
        this.loadedComponents = new Set();
    }

    /**
     * Initialize the component system
     */
    async initialize() {
        if (this.isInitialized) {
            console.log('⚠️ Simple component loader already initialized');
            return;
        }

        console.log('🚀 Initializing Simple Component Loader...');
        this.isInitialized = true;
        console.log('✅ Simple Component Loader initialized');
    }

    /**
     * Load a component by name
     * @param {string} componentName - Name of the component (header, footer)
     * @param {HTMLElement} targetElement - Element to load component into
     * @param {Object} variables - Variables to replace in the component
     * @returns {Promise<void>}
     */
    async loadComponent(componentName, targetElement, variables = {}) {
        try {
            console.log(`📦 Loading component: ${componentName}`);

            const componentHtml = COMPONENTS[componentName];
            if (!componentHtml) {
                throw new Error(`Component "${componentName}" not found. Available: ${Object.keys(COMPONENTS).join(', ')}`);
            }

            // Process variables in the HTML
            let processedHtml = this.processVariables(componentHtml, variables);

            // Set the HTML content
            targetElement.innerHTML = processedHtml;

            // Mark component as loaded
            this.loadedComponents.add(componentName);

            console.log(`✅ Component "${componentName}" loaded successfully`);

        } catch (error) {
            console.error(`❌ Failed to load component "${componentName}":`, error);
            this.handleLoadError(componentName, targetElement, error);
        }
    }

    /**
     * Load multiple components at once
     * @param {Array} components - Array of component configurations
     * @returns {Promise<void>}
     */
    async loadMultiple(components) {
        const promises = components.map(({ name, element, variables = {} }) =>
            this.loadComponent(name, element, variables)
        );

        try {
            await Promise.all(promises);
            console.log(`✅ Loaded ${components.length} components successfully`);
        } catch (error) {
            console.error('❌ Some components failed to load:', error);
        }
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
     * Handle component load errors
     * @param {string} componentName - Failed component name
     * @param {HTMLElement} targetElement - Target element
     * @param {Error} error - Error object
     */
    handleLoadError(componentName, targetElement, error) {
        const errorHtml = `
            <div class="component-error" style="padding: 1rem; background: #fee; border: 1px solid #fcc; color: #c33; margin: 1rem 0;">
                <strong>Component Load Error</strong>
                <p>Failed to load component: ${componentName}</p>
                <small>${error.message}</small>
                <p style="margin-top: 0.5rem;"><strong>Available components:</strong> ${Object.keys(COMPONENTS).join(', ')}</p>
            </div>
        `;
        targetElement.innerHTML = errorHtml;
    }

    /**
     * Get loading status
     * @returns {Object} - Status information
     */
    getStatus() {
        return {
            availableComponents: Object.keys(COMPONENTS),
            loadedComponents: Array.from(this.loadedComponents),
            initialized: this.isInitialized
        };
    }
}

// Global instance
const simpleComponentLoader = new SimpleComponentLoader();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    await simpleComponentLoader.initialize();
});
