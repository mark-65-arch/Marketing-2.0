// =====================================================================================
// CENTRAL PACKAGE CONTENT - Update descriptions here and they reflect across all pages
// =====================================================================================
// This centralized system ensures 100% consistency across all 28+ service pages
// When scaling the website, all package content updates happen in ONE location

const PACKAGES = {
  package1: {
    name: "Get Found Online Package",
    price: "$599",
    originalPrice: null,
    savings: null,
    badge: null,
    description: "5-page professional website that works on all devices with Google Business Profile setup and local SEO optimization for Houston businesses",
    subtitle: "What You Get:",
    features: [
      "5-page professional website that works on all devices",
      "Google Business Profile setup for Houston visibility", 
      "Local Houston SEO optimization",
      "30-day support included"
    ],
    note: null,
    ideal_for: "Small businesses, startups, service providers looking to establish online presence",
    cta_text: "Start Building Online Presence",
    schema_category: "Website Design & SEO",
    schema_description: "5-page professional website with Google Business Profile setup and local SEO optimization for Houston businesses"
  },
  
  package2: {
    name: "Get More Customers Package", 
    price: "$1,199",
    originalPrice: "$1,499",
    savings: "Save $300",
    badge: "✨ Most Popular",
    description: "8-page conversion website with lead capture system and review management setup for Houston contractors and medical practices",
    subtitle: "What You Get:",
    features: [
      "8-page conversion website with lead capture forms",
      "Lead capture system setup for Houston customers",
      "Review management setup for local reputation", 
      "Social media integration for Houston market",
      "90-day support included"
    ],
    note: null,
    ideal_for: "Growing businesses, contractors, medical practices looking to generate more leads",
    cta_text: "Generate More Leads",
    schema_category: "Lead Generation & Conversion", 
    schema_description: "8-page conversion website with lead capture system and review management setup for Houston contractors and medical practices"
  },
  
  package3: {
    name: "Lead Your Market Package",
    price: "Starting at $2,199", 
    originalPrice: "$2,999",
    savings: "Save $800",
    badge: "💰 Best Value",
    description: "Up to 15 pages with advanced automation tools and multi-location optimization for Houston restaurants and real estate",
    subtitle: "What You Get:",
    features: [
      "Up to 15 pages + custom features for Houston businesses",
      "Advanced marketing automation tools",
      "Competitive analysis report for Houston market",
      "Multi-location optimization for Greater Houston area", 
      "Priority support for 6 months"
    ],
    note: "Additional pages available at $150 each",
    ideal_for: "Large businesses, multiple locations, industry leaders ready to dominate their market",
    cta_text: "Lead Your Market", 
    schema_category: "Enterprise Marketing Solutions",
    schema_description: "Up to 15 pages with advanced automation tools and multi-location optimization for Houston restaurants and real estate"
  }
};

// =====================================================================================
// ALL SERVICE PAGES USE SAME PRICING AS HOMEPAGE - NO SEPARATE PRICING STRUCTURES
// =====================================================================================

// REMOVED WEB_DESIGN_PACKAGES - All pages now use consistent PACKAGES pricing

// =====================================================================================
// LAUNCH SPECIAL BANNER CONTENT
// =====================================================================================

const LAUNCH_SPECIAL = {
  headline: "🚀 Launch Special: Limited spots available - contact us to check current availability for 20% off any package + extended support",
  description: "Limited time offer for Houston businesses ready to grow online",
  background: "linear-gradient(45deg, #0891b2, #1e3a8a)"
};

// =====================================================================================
// PRICING DISPLAY FUNCTIONS
// =====================================================================================

/**
 * Generate HTML for homepage pricing packages
 * @param {Object} packages - PACKAGES object from above
 * @returns {string} HTML string for pricing section
 */
function generateHomepagePricing(packages = PACKAGES) {
  let html = '<div class="packages-grid">';
  
  Object.keys(packages).forEach(key => {
    const pkg = packages[key];
    const badgeHtml = pkg.badge ? `<div class="wp-package-badge wp-${key === 'package2' ? 'popular' : key === 'package3' ? 'value' : ''}">${pkg.badge}</div>` : '';
    const savingsHtml = pkg.savings ? `<div class="wp-save-badge">${pkg.savings}</div>` : '';
    const noteHtml = pkg.note ? `<p class="wp-package-note">${pkg.note}</p>` : '';
    const featuredClass = key === 'package2' ? ' wp-featured' : '';
    
    html += `
      <div class="wp-package-card${featuredClass}">
        ${badgeHtml}
        ${savingsHtml}
        <h3 class="wp-package-title" id="${key}">${pkg.name}</h3>
        <div class="wp-package-price">${pkg.price}</div>
        <div class="wp-package-content">
          <h4 class="wp-package-subtitle">${pkg.subtitle}</h4>
          <ul class="wp-package-features">
            ${pkg.features.map(feature => `<li class="wp-package-feature">${feature}</li>`).join('')}
          </ul>
          ${noteHtml}
        </div>
        <a href="contact.html" class="wp-package-cta" aria-describedby="${key}">${pkg.cta_text}</a>
      </div>
    `;
  });
  
  html += '</div>';
  return html;
}

/**
 * Generate HTML for service page pricing (uses same PACKAGES as homepage)
 * @param {Object} packages - PACKAGES object from above  
 * @returns {string} HTML string for service page pricing section
 */
function generateServicePagePricing(packages = PACKAGES) {
  let html = '<div class="packages-grid">';
  
  Object.keys(packages).forEach(key => {
    const pkg = packages[key];
    const badgeHtml = pkg.badge ? `<div class="popular-badge">${pkg.badge}</div>` : '';
    const savingsHtml = pkg.savings ? `<div class="save-badge">${pkg.savings}</div>` : '';
    const featuredClass = key === 'package2' ? ' featured' : '';
    
    html += `
      <div class="package-card${featuredClass}">
        ${badgeHtml}
        ${savingsHtml}
        <h4>${pkg.name}</h4>
        <div class="package-price">${pkg.price}</div>
        <ul class="package-features">
          ${pkg.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <p class="package-ideal">Perfect for: ${pkg.ideal_for}</p>
      </div>
    `;
  });
  
  html += '</div>';
  return html;
}

/**
 * Generate Schema.org structured data for pricing
 * @param {Object} packages - Package object to use
 * @returns {Object} Schema.org structured data
 */
function generatePricingSchema(packages = PACKAGES) {
  return {
    "@context": "https://schema.org",
    "@type": "Service", 
    "name": "Houston Digital Marketing Services",
    "offers": Object.keys(packages).map(key => {
      const pkg = packages[key];
      return {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": pkg.name,
          "description": pkg.schema_description || pkg.description,
          "category": pkg.schema_category,
          "provider": {
            "@type": "LocalBusiness", 
            "name": "Marketing AI Houston"
          }
        },
        "price": pkg.price.replace(/[^0-9]/g, '') || "599",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      };
    })
  };
}

// =====================================================================================
// AUTO-UPDATE FUNCTIONS FOR EXISTING PAGES
// =====================================================================================

/**
 * Update pricing content on page load
 * Call this function on each page to ensure consistent pricing
 */
function updatePricingContent() {
  // Update homepage pricing if pricing section exists
  const homepagePricing = document.querySelector('.packages-grid');
  if (homepagePricing && !document.querySelector('.package-card')) {
    // This is homepage pricing (uses wp-package-card class)
    homepagePricing.innerHTML = generateHomepagePricing().replace('<div class="packages-grid">', '').replace('</div>', '');
  }
  
  // Update service page pricing if it exists  
  if (homepagePricing && document.querySelector('.package-card')) {
    // This is service page pricing (uses package-card class)
    homepagePricing.innerHTML = generateServicePagePricing().replace('<div class="packages-grid">', '').replace('</div>', '');
  }
  
  // Update launch special banner
  const launchBanner = document.querySelector('[style*="Launch Special"]');
  if (launchBanner) {
    launchBanner.innerHTML = `
      <h3 style="font-size: 1.8rem; margin-bottom: 1rem; font-weight: 700;">${LAUNCH_SPECIAL.headline}</h3>
      <p style="font-size: 1.1rem; opacity: 0.9;">${LAUNCH_SPECIAL.description}</p>
    `;
  }
}

// =====================================================================================
// EXPORT FOR MODULES (if using module system)
// =====================================================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PACKAGES,
    LAUNCH_SPECIAL,
    generateHomepagePricing,
    generateServicePagePricing,
    generatePricingSchema,
    updatePricingContent
  };
}

// Auto-update pricing when DOM is loaded
document.addEventListener('DOMContentLoaded', updatePricingContent);