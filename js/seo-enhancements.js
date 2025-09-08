/**
 * SEO Enhancements for Marketing AI Houston
 * Advanced SEO functionality for 28-page Houston digital marketing strategy
 * 
 * Features:
 * - Dynamic breadcrumb generation
 * - FAQ schema generation
 * - Service schema generation
 * - Review schema placeholders
 * - Industry-specific SEO optimization
 * - Houston local business enhancement
 */

// ============================================================================
// PAGE STRUCTURE CONFIGURATION FOR 28-PAGE STRATEGY
// ============================================================================

const HOUSTON_SITE_STRUCTURE = {
    baseUrl: 'https://mark-65-arch.github.io/Marketing-2.0/',
    businessName: 'Marketing AI Houston',
    businessType: 'Digital Marketing Agency',
    serviceArea: 'Greater Houston Area',
    
    // Page hierarchy for breadcrumb generation
    pageHierarchy: {
        // Core pages
        'index.html': { title: 'Home', parent: null, priority: 1.0 },
        'services.html': { title: 'Services', parent: 'index.html', priority: 0.9 },
        'about.html': { title: 'About', parent: 'index.html', priority: 0.8 },
        'contact.html': { title: 'Contact', parent: 'index.html', priority: 0.9 },
        
        // Service pages
        'web-design-houston.html': { title: 'Web Design Houston', parent: 'services.html', priority: 0.8 },
        'seo-houston.html': { title: 'SEO Houston', parent: 'services.html', priority: 0.8 },
        'google-business-profile-houston.html': { title: 'Google Business Profile', parent: 'services.html', priority: 0.8 },
        'ai-marketing-houston.html': { title: 'AI Marketing Houston', parent: 'services.html', priority: 0.8 },
        'google-ads-houston.html': { title: 'Google Ads Houston', parent: 'services.html', priority: 0.8 },
        'lead-generation-houston.html': { title: 'Lead Generation Houston', parent: 'services.html', priority: 0.8 },
        
        // Industry pages
        'contractors-marketing-houston.html': { title: 'Contractors Marketing', parent: 'services.html', priority: 0.7 },
        'medical-marketing-houston.html': { title: 'Medical Marketing', parent: 'services.html', priority: 0.7 },
        'restaurant-marketing-houston.html': { title: 'Restaurant Marketing', parent: 'services.html', priority: 0.7 },
        'real-estate-marketing-houston.html': { title: 'Real Estate Marketing', parent: 'services.html', priority: 0.7 },
        'hvac-marketing-houston.html': { title: 'HVAC Marketing', parent: 'services.html', priority: 0.7 },
        'dental-marketing-houston.html': { title: 'Dental Marketing', parent: 'services.html', priority: 0.7 },
        'legal-marketing-houston.html': { title: 'Legal Marketing', parent: 'services.html', priority: 0.7 },
        
        // Geographic pages
        'marketing-the-heights-houston.html': { title: 'The Heights Marketing', parent: 'services.html', priority: 0.6 },
        'marketing-sugar-land.html': { title: 'Sugar Land Marketing', parent: 'services.html', priority: 0.6 },
        'marketing-katy-texas.html': { title: 'Katy Marketing', parent: 'services.html', priority: 0.6 },
        'marketing-the-woodlands.html': { title: 'The Woodlands Marketing', parent: 'services.html', priority: 0.6 },
        'marketing-pearland-texas.html': { title: 'Pearland Marketing', parent: 'services.html', priority: 0.6 },
        
        // Conversion pages
        'free-marketing-audit.html': { title: 'Free Marketing Audit', parent: 'services.html', priority: 0.8 },
        'case-studies.html': { title: 'Case Studies', parent: 'about.html', priority: 0.7 },
        'testimonials.html': { title: 'Testimonials', parent: 'about.html', priority: 0.7 },
        'pricing.html': { title: 'Pricing', parent: 'services.html', priority: 0.8 },
        'blog.html': { title: 'Blog', parent: 'index.html', priority: 0.6 },
        
        // Legal pages
        'privacy-policy.html': { title: 'Privacy Policy', parent: 'index.html', priority: 0.3 },
        'terms-of-service.html': { title: 'Terms of Service', parent: 'index.html', priority: 0.3 }
    }
};

// ============================================================================
// DYNAMIC BREADCRUMB GENERATION
// ============================================================================

/**
 * Generate breadcrumb navigation for any page in the 28-page structure
 * @param {string} currentPage - Current page filename
 * @param {string} containerSelector - CSS selector for breadcrumb container
 */
function generateBreadcrumbs(currentPage = null, containerSelector = '.breadcrumbs') {
    // Auto-detect current page if not provided
    if (!currentPage) {
        currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (!currentPage || currentPage === '') currentPage = 'index.html';
    }
    
    const pageInfo = HOUSTON_SITE_STRUCTURE.pageHierarchy[currentPage];
    if (!pageInfo) {
        console.warn('Page not found in site structure:', currentPage);
        return;
    }
    
    // Build breadcrumb path
    const breadcrumbPath = [];
    let currentPageInfo = pageInfo;
    let currentPageName = currentPage;
    
    // Traverse up the hierarchy
    while (currentPageInfo) {
        breadcrumbPath.unshift({
            title: currentPageInfo.title,
            url: currentPageName === 'index.html' ? HOUSTON_SITE_STRUCTURE.baseUrl : 
                  HOUSTON_SITE_STRUCTURE.baseUrl + currentPageName,
            current: currentPageName === currentPage
        });
        
        if (currentPageInfo.parent) {
            currentPageName = currentPageInfo.parent;
            currentPageInfo = HOUSTON_SITE_STRUCTURE.pageHierarchy[currentPageName];
        } else {
            break;
        }
    }
    
    // Generate breadcrumb HTML
    const breadcrumbContainer = document.querySelector(containerSelector);
    if (breadcrumbContainer) {
        const breadcrumbHTML = generateBreadcrumbHTML(breadcrumbPath);
        breadcrumbContainer.innerHTML = breadcrumbHTML;
        
        // Add schema markup
        addBreadcrumbSchema(breadcrumbPath);
        
        console.log('🍞 Breadcrumbs generated for:', currentPage);
    }
}

/**
 * Generate breadcrumb HTML structure
 * @param {Array} breadcrumbPath - Array of breadcrumb items
 * @returns {string} HTML string
 */
function generateBreadcrumbHTML(breadcrumbPath) {
    let html = '<nav aria-label="Breadcrumb" class="breadcrumb-nav">';
    html += '<ol class="breadcrumb-list">';
    
    breadcrumbPath.forEach((item, index) => {
        const isLast = index === breadcrumbPath.length - 1;
        
        html += '<li class="breadcrumb-item' + (item.current ? ' current' : '') + '">';
        
        if (isLast || item.current) {
            html += '<span class="breadcrumb-current">' + item.title + '</span>';
        } else {
            html += '<a href="' + item.url + '" class="breadcrumb-link">' + item.title + '</a>';
        }
        
        if (!isLast) {
            html += '<span class="breadcrumb-separator" aria-hidden="true"> › </span>';
        }
        
        html += '</li>';
    });
    
    html += '</ol></nav>';
    return html;
}

/**
 * Add breadcrumb schema markup to page
 * @param {Array} breadcrumbPath - Array of breadcrumb items
 */
function addBreadcrumbSchema(breadcrumbPath) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbPath.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.title,
            "item": item.url
        }))
    };
    
    // Add schema to page
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(scriptTag);
    
    console.log('🔍 Breadcrumb schema added');
}

// ============================================================================
// FAQ SCHEMA GENERATION
// ============================================================================

/**
 * Generate FAQ schema for service pages
 * @param {Array} faqData - Array of FAQ objects {question, answer}
 * @param {string} pageTitle - Title of the current page
 */
function generateFAQSchema(faqData, pageTitle = '') {
    if (!faqData || faqData.length === 0) return;
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "name": pageTitle ? `${pageTitle} - Frequently Asked Questions` : "Frequently Asked Questions",
        "mainEntity": faqData.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
    
    // Add schema to page
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(scriptTag);
    
    console.log('❓ FAQ schema generated for', pageTitle || 'current page');
    
    // Track FAQ schema generation
    if (typeof gtag === 'function') {
        gtag('event', 'faq_schema_generated', {
            'event_category': 'SEO Enhancement',
            'event_label': pageTitle || 'Unknown Page',
            'faq_count': faqData.length,
            'houston_lead_type': 'seo_enhancement'
        });
    }
}

/**
 * Generate Houston-specific FAQ data for different service pages
 * @param {string} serviceType - Type of service (seo, web-design, etc.)
 * @returns {Array} Array of FAQ objects
 */
function generateHoustonServiceFAQs(serviceType) {
    const baseFAQs = [
        {
            question: "Do you work with businesses outside Houston?",
            answer: "While we specialize in Houston and surrounding areas like The Woodlands, Sugar Land, and Katy, we do work with Texas businesses statewide using our AI-powered marketing strategies."
        },
        {
            question: "How long does it take to see results?",
            answer: "Most Houston businesses start seeing improved online visibility within 2-4 weeks. Lead generation improvements typically show results within 30-60 days, while SEO improvements show substantial growth within 90 days."
        },
        {
            question: "What makes Marketing AI Houston different?",
            answer: "We combine local Houston market knowledge with cutting-edge AI technology. We're Google Business Profile certified and offer project-based packages with no long-term contracts."
        }
    ];
    
    const serviceFAQs = {
        'seo': [
            {
                question: "What does Houston SEO include?",
                answer: "Our Houston SEO services include local keyword research, Google Business Profile optimization, local citation building, on-page optimization, and Houston-specific content creation to help your business rank higher in local search results."
            },
            {
                question: "How do you optimize for Houston local search?",
                answer: "We focus on Houston neighborhood targeting, local keyword optimization, NAP consistency across directories, Google My Business optimization, and building local citations from Houston-based websites and directories."
            }
        ],
        'web-design': [
            {
                question: "Do you design websites specifically for Houston businesses?",
                answer: "Yes, our Houston web design incorporates local market knowledge, Houston-area imagery when appropriate, and optimization for local search terms that Houston customers use to find businesses like yours."
            },
            {
                question: "What's included in a Houston business website?",
                answer: "All our Houston business websites include mobile-responsive design, fast loading speeds, SEO optimization, Google Business Profile integration, and local Houston market targeting."
            }
        ],
        'contractors': [
            {
                question: "Do you work with all types of Houston contractors?",
                answer: "Yes, we work with HVAC contractors, plumbers, electricians, roofers, landscapers, and other home service providers throughout the Greater Houston area including Sugar Land, Katy, and The Woodlands."
            },
            {
                question: "How do you generate leads for Houston contractors?",
                answer: "We use targeted Google Ads, local SEO, Google Business Profile optimization, and lead-capturing websites designed specifically for Houston homeowners searching for contractor services."
            }
        ]
    };
    
    return [...baseFAQs, ...(serviceFAQs[serviceType] || [])];
}

// ============================================================================
// SERVICE SCHEMA GENERATION
// ============================================================================

/**
 * Generate service schema for individual service pages
 * @param {Object} serviceData - Service information object
 */
function generateServiceSchema(serviceData) {
    const {
        name,
        description,
        serviceType = 'ProfessionalService',
        priceRange = '$599-$2199',
        areaServed = 'Houston, TX',
        provider = 'Marketing AI Houston'
    } = serviceData;
    
    const schema = {
        "@context": "https://schema.org",
        "@type": serviceType,
        "name": name,
        "description": description,
        "provider": {
            "@type": "LocalBusiness",
            "name": provider,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Houston",
                "addressRegion": "TX",
                "addressCountry": "US"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.7604,
                "longitude": -95.3698
            }
        },
        "areaServed": {
            "@type": "Place",
            "name": areaServed
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": `${name} Packages`,
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": `${name} - Basic Package`
                    },
                    "price": "599",
                    "priceCurrency": "USD"
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": `${name} - Standard Package`
                    },
                    "price": "1199",
                    "priceCurrency": "USD"
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": `${name} - Premium Package`
                    },
                    "price": "2199",
                    "priceCurrency": "USD"
                }
            ]
        },
        "priceRange": priceRange,
        "serviceOutput": "Increased online visibility and lead generation for Houston businesses",
        "category": "Digital Marketing Services"
    };
    
    // Add schema to page
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(scriptTag);
    
    console.log('🛠️ Service schema generated for:', name);
    
    // Track service schema generation
    if (typeof gtag === 'function') {
        gtag('event', 'service_schema_generated', {
            'event_category': 'SEO Enhancement',
            'event_label': name,
            'service_type': serviceType,
            'houston_lead_type': 'seo_enhancement'
        });
    }
}

// ============================================================================
// REVIEW SCHEMA PLACEHOLDER
// ============================================================================

/**
 * Generate review schema for testimonials page
 * @param {Array} reviewData - Array of review objects
 */
function generateReviewSchema(reviewData) {
    if (!reviewData || reviewData.length === 0) return;
    
    // Calculate aggregate rating
    const totalRating = reviewData.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / reviewData.length).toFixed(1);
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": HOUSTON_SITE_STRUCTURE.businessName,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": averageRating,
            "reviewCount": reviewData.length,
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": reviewData.map(review => ({
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": review.authorName
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
                "bestRating": "5",
                "worstRating": "1"
            },
            "reviewBody": review.text,
            "datePublished": review.date || new Date().toISOString().split('T')[0]
        }))
    };
    
    // Add schema to page
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(scriptTag);
    
    console.log('⭐ Review schema generated with', reviewData.length, 'reviews, average rating:', averageRating);
    
    // Track review schema generation
    if (typeof gtag === 'function') {
        gtag('event', 'review_schema_generated', {
            'event_category': 'SEO Enhancement',
            'event_label': 'Business Reviews',
            'review_count': reviewData.length,
            'average_rating': averageRating,
            'houston_lead_type': 'seo_enhancement'
        });
    }
}

// ============================================================================
// INDUSTRY-SPECIFIC SEO ENHANCEMENTS
// ============================================================================

/**
 * Generate industry-specific schema and content enhancements
 * @param {string} industry - Industry type (contractors, medical, restaurant, etc.)
 * @param {Object} options - Additional options
 */
function enhancePageForIndustry(industry, options = {}) {
    const industryEnhancements = {
        contractors: {
            serviceType: 'HomeAndConstructionBusiness',
            keywords: ['houston contractors', 'home improvement houston', 'houston construction'],
            schema: {
                "@type": "HomeAndConstructionBusiness",
                "category": "Home Improvement Services Marketing"
            }
        },
        medical: {
            serviceType: 'MedicalBusiness',
            keywords: ['houston medical marketing', 'healthcare marketing houston', 'medical practice houston'],
            schema: {
                "@type": "MedicalBusiness",
                "category": "Medical Practice Marketing"
            }
        },
        restaurant: {
            serviceType: 'FoodEstablishment',
            keywords: ['houston restaurant marketing', 'food service marketing houston', 'restaurant promotion houston'],
            schema: {
                "@type": "FoodEstablishment",
                "category": "Restaurant Marketing Services"
            }
        },
        realestate: {
            serviceType: 'RealEstateAgent',
            keywords: ['houston real estate marketing', 'realtor marketing houston', 'real estate leads houston'],
            schema: {
                "@type": "RealEstateAgent",
                "category": "Real Estate Marketing Services"
            }
        }
    };
    
    const enhancement = industryEnhancements[industry];
    if (!enhancement) return;
    
    // Generate industry-specific FAQs
    const faqData = generateHoustonServiceFAQs(industry);
    generateFAQSchema(faqData, `Houston ${industry.charAt(0).toUpperCase() + industry.slice(1)} Marketing`);
    
    // Track industry enhancement
    if (typeof gtag === 'function') {
        gtag('event', 'industry_page_enhanced', {
            'event_category': 'SEO Enhancement',
            'event_label': 'Industry: ' + industry,
            'industry': industry,
            'houston_lead_type': 'seo_enhancement'
        });
    }
    
    console.log('🏢 Industry enhancement applied for:', industry);
}

// ============================================================================
// HOUSTON GEOGRAPHIC SEO ENHANCEMENTS
// ============================================================================

/**
 * Add geographic-specific schema and content for Houston areas
 * @param {string} area - Geographic area (heights, sugar-land, etc.)
 */
function enhancePageForHoustonArea(area) {
    const areaData = {
        'heights': {
            name: 'The Heights, Houston',
            coordinates: { lat: 29.8021, lng: -95.4086 }
        },
        'sugar-land': {
            name: 'Sugar Land, TX',
            coordinates: { lat: 29.6197, lng: -95.6349 }
        },
        'katy': {
            name: 'Katy, TX',
            coordinates: { lat: 29.7858, lng: -95.8244 }
        },
        'woodlands': {
            name: 'The Woodlands, TX',
            coordinates: { lat: 30.1588, lng: -95.4613 }
        },
        'pearland': {
            name: 'Pearland, TX',
            coordinates: { lat: 29.5638, lng: -95.2861 }
        }
    };
    
    const locationInfo = areaData[area];
    if (!locationInfo) return;
    
    // Generate location-specific service schema
    const serviceData = {
        name: `Digital Marketing Services in ${locationInfo.name}`,
        description: `Professional digital marketing services specifically for businesses in ${locationInfo.name}. Local SEO, web design, and lead generation.`,
        areaServed: locationInfo.name
    };
    
    generateServiceSchema(serviceData);
    
    // Track geographic enhancement
    if (typeof gtag === 'function') {
        gtag('event', 'geographic_page_enhanced', {
            'event_category': 'SEO Enhancement',
            'event_label': 'Area: ' + locationInfo.name,
            'geographic_area': area,
            'houston_lead_type': 'seo_enhancement'
        });
    }
    
    console.log('📍 Geographic enhancement applied for:', locationInfo.name);
}

// ============================================================================
// AUTOMATIC SEO ENHANCEMENTS INITIALIZATION
// ============================================================================

/**
 * Initialize SEO enhancements based on current page
 */
function initializeSEOEnhancements() {
    // Generate breadcrumbs automatically
    generateBreadcrumbs();
    
    // Detect page type and apply appropriate enhancements
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Apply industry-specific enhancements
    if (currentPage.includes('contractors')) {
        enhancePageForIndustry('contractors');
    } else if (currentPage.includes('medical')) {
        enhancePageForIndustry('medical');
    } else if (currentPage.includes('restaurant')) {
        enhancePageForIndustry('restaurant');
    } else if (currentPage.includes('real-estate')) {
        enhancePageForIndustry('realestate');
    }
    
    // Apply geographic enhancements
    if (currentPage.includes('heights')) {
        enhancePageForHoustonArea('heights');
    } else if (currentPage.includes('sugar-land')) {
        enhancePageForHoustonArea('sugar-land');
    } else if (currentPage.includes('katy')) {
        enhancePageForHoustonArea('katy');
    } else if (currentPage.includes('woodlands')) {
        enhancePageForHoustonArea('woodlands');
    } else if (currentPage.includes('pearland')) {
        enhancePageForHoustonArea('pearland');
    }
    
    console.log('🚀 SEO enhancements initialized for:', currentPage);
    
    // Track SEO enhancement initialization
    if (typeof gtag === 'function') {
        gtag('event', 'seo_enhancements_initialized', {
            'event_category': 'SEO Enhancement',
            'event_label': 'Page: ' + currentPage,
            'page_name': currentPage,
            'houston_lead_type': 'seo_enhancement'
        });
    }
}

// ============================================================================
// UTILITY FUNCTIONS FOR MANUAL ENHANCEMENT
// ============================================================================

/**
 * Add custom schema to page
 * @param {Object} schemaData - Schema.org structured data
 */
function addCustomSchema(schemaData) {
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(schemaData, null, 2);
    document.head.appendChild(scriptTag);
    
    console.log('📊 Custom schema added:', schemaData['@type']);
}

/**
 * Generate meta description for current page
 * @param {string} description - Meta description text
 */
function updateMetaDescription(description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
    
    console.log('📝 Meta description updated');
}

// ============================================================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// ============================================================================

// Make functions globally available
window.SEOEnhancements = {
    generateBreadcrumbs,
    generateFAQSchema,
    generateServiceSchema,
    generateReviewSchema,
    enhancePageForIndustry,
    enhancePageForHoustonArea,
    initializeSEOEnhancements,
    addCustomSchema,
    updateMetaDescription,
    generateHoustonServiceFAQs
};

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSEOEnhancements();
    console.log('🎯 Marketing AI Houston SEO Enhancements Ready');
    console.log('📊 Available functions:', Object.keys(window.SEOEnhancements));
});