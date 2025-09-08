// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            if (validateForm()) {
                // Simulate form submission for development
                submitForm();
            }
        });
    }
    
    function validateForm() {
        const name = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const privacy = document.getElementById('privacyConsent').checked;
        
        // Clear previous error states
        clearErrors();
        
        let isValid = true;
        
        if (!name) {
            showError('fullName', 'Name is required');
            isValid = false;
        }
        
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!privacy) {
            showError('privacyConsent', 'Please agree to the privacy policy');
            isValid = false;
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.classList.add('error');
        
        // Create error message if it doesn't exist
        let errorMsg = field.parentNode.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            field.parentNode.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }
    
    function clearErrors() {
        const errorFields = document.querySelectorAll('.error');
        const errorMessages = document.querySelectorAll('.error-message');
        
        errorFields.forEach(field => field.classList.remove('error'));
        errorMessages.forEach(msg => msg.remove());
    }
    
    function submitForm() {
        // Change button state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Collect form data for analytics tracking
        const formData = new FormData(contactForm);
        const formDataObj = {};
        for (let [key, value] of formData.entries()) {
            formDataObj[key] = value;
        }
        
        // Calculate lead value based on service package interest
        let leadValue = 100; // Base lead value
        if (formDataObj.servicePackage) {
            switch(formDataObj.servicePackage) {
                case 'basic': leadValue = 599; break;
                case 'standard': leadValue = 1199; break;
                case 'premium': leadValue = 2199; break;
                case 'consultation': leadValue = 300; break;
            }
        }
        
        // Track form submission as conversion event with lead scoring (500 points)
        trackHoustonLeadScore('form_submission', {
            business_type: formDataObj.businessType,
            service_package: formDataObj.servicePackage,
            form_value: leadValue
        });
        
        if (typeof gtag === 'function') {
            // Main conversion event with enhanced data
            gtag('event', 'form_submission', {
                'event_category': 'Lead Generation',
                'event_label': 'Contact Form Submitted',
                'value': leadValue,
                'currency': 'USD',
                'houston_lead_type': 'form_conversion',
                'business_type': formDataObj.businessType || 'unknown',
                'service_package': formDataObj.servicePackage || 'unknown',
                'lead_quality': leadQualificationLevel,
                'lead_score': currentLeadScore,
                'form_name': 'contact_form'
            });
            
            // Enhanced conversion tracking
            gtag('event', 'conversion', {
                'send_to': 'GA_MEASUREMENT_ID/form_conversion',
                'value': leadValue,
                'currency': 'USD',
                'lead_score': currentLeadScore,
                'lead_qualification': leadQualificationLevel
            });
            
            // Track as qualified Houston lead with scoring data
            gtag('event', 'houston_qualified_lead', {
                'event_category': 'High Value Leads',
                'event_label': `Form Lead - ${formDataObj.businessType || 'Unknown'} (Score: ${currentLeadScore})`,
                'value': leadValue,
                'currency': 'USD',
                'lead_type': 'contact_form',
                'business_type': formDataObj.businessType,
                'package_interest': formDataObj.servicePackage,
                'lead_score': currentLeadScore,
                'lead_qualification': leadQualificationLevel,
                'houston_lead_type': 'qualified_lead'
            });
            
            console.log('📋 Form submission tracked with GA4 - Value: $' + leadValue + ', Lead Score: ' + currentLeadScore);
        }
        
        // Simulate API call for development
        setTimeout(() => {
            // For development: just show success message
            // In production: integrate with email service or WordPress
            
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Log form data for development testing
            console.log('Form submitted with data:', formDataObj);
            
            // Track successful form completion
            if (typeof gtag === 'function') {
                gtag('event', 'form_completion_success', {
                    'event_category': 'Lead Generation',
                    'event_label': 'Form Successfully Completed',
                    'houston_lead_type': 'successful_conversion'
                });
            }
            
            // Reset form state
            submitBtn.textContent = 'Get My Free Strategy Session';
            submitBtn.disabled = false;
            
        }, 2000);
    }
});

// Additional utility functions for enhanced form experience
function formatPhoneNumber(input) {
    // Format phone number as user types
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
    }
    input.value = value;
}

// Auto-format phone number on input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
});

// Enhanced form interaction tracking for Google Analytics 4
function trackFormInteraction(action, field) {
    console.log('Form interaction:', action, 'on field:', field);
    
    // Track with Google Analytics 4 if available
    if (typeof gtag === 'function') {
        gtag('event', action, {
            'event_category': 'Contact Form',
            'event_label': 'Field: ' + field,
            'field_name': field,
            'houston_lead_type': 'form_interaction'
        });
    }
}

// ============================================================================
// ENHANCED HOUSTON LEAD QUALIFICATION TRACKING
// ============================================================================

// Lead scoring system for Houston businesses
const HOUSTON_LEAD_SCORING = {
    // Field engagement points
    field_focus: 5,        // User shows interest by focusing on field
    field_complete: 10,    // User completes a field (shows intent)
    
    // Business qualification points  
    business_type_select: 100,    // High-value: indicates business type
    service_package_select: 200,  // Very high-value: indicates budget/intent
    
    // Conversion events
    form_submission: 500,  // Conversion: form submitted
    phone_click: 300,      // High-value: immediate contact intent
    email_click: 150,      // Medium-value: contact interest
    
    // Engagement multipliers by business type
    business_multipliers: {
        'medical': 1.5,      // Medical practices = higher value
        'realestate': 1.4,   // Real estate = high value  
        'professional': 1.3,  // Professional services = good value
        'restaurant': 1.2,   // Restaurants = moderate value
        'homeservices': 1.1, // Home services = baseline
        'retail': 1.0,       // Retail = baseline
        'other': 0.8         // Unknown = lower confidence
    },
    
    // Package value multipliers
    package_multipliers: {
        'premium': 2.0,      // Premium package = highest intent
        'standard': 1.5,     // Standard package = good intent
        'basic': 1.0,        // Basic package = baseline
        'consultation': 0.8   // Just consultation = lower intent
    }
};

// Track cumulative lead score for current session
let currentLeadScore = 0;
let currentBusinessType = '';
let currentServicePackage = '';
let leadQualificationLevel = 'cold';

/**
 * Calculate and track lead score with Houston business intelligence
 * @param {string} eventType - Type of engagement event
 * @param {Object} eventData - Additional event data
 */
function trackHoustonLeadScore(eventType, eventData = {}) {
    let basePoints = HOUSTON_LEAD_SCORING[eventType] || 0;
    let multiplier = 1;
    
    // Apply business type multiplier
    if (currentBusinessType && HOUSTON_LEAD_SCORING.business_multipliers[currentBusinessType]) {
        multiplier *= HOUSTON_LEAD_SCORING.business_multipliers[currentBusinessType];
    }
    
    // Apply package interest multiplier
    if (currentServicePackage && HOUSTON_LEAD_SCORING.package_multipliers[currentServicePackage]) {
        multiplier *= HOUSTON_LEAD_SCORING.package_multipliers[currentServicePackage];
    }
    
    const earnedPoints = Math.round(basePoints * multiplier);
    currentLeadScore += earnedPoints;
    
    // Update lead qualification level
    if (currentLeadScore >= 500) {
        leadQualificationLevel = 'hot';
    } else if (currentLeadScore >= 200) {
        leadQualificationLevel = 'warm';
    } else if (currentLeadScore >= 50) {
        leadQualificationLevel = 'interested';
    }
    
    // Track with Google Analytics
    if (typeof gtag === 'function') {
        gtag('event', 'houston_lead_score_update', {
            'event_category': 'Lead Qualification',
            'event_label': `Score: ${currentLeadScore} (${leadQualificationLevel.toUpperCase()})`,
            'value': earnedPoints,
            'total_score': currentLeadScore,
            'lead_qualification': leadQualificationLevel,
            'business_type': currentBusinessType || 'unknown',
            'service_package': currentServicePackage || 'unknown',
            'event_trigger': eventType,
            'houston_lead_type': 'lead_scoring'
        });
    }
    
    console.log(`🎯 Houston Lead Score: +${earnedPoints} points (Total: ${currentLeadScore}) - Level: ${leadQualificationLevel.toUpperCase()}`);
    
    // Track high-value leads
    if (leadQualificationLevel === 'hot' && earnedPoints > 0) {
        if (typeof gtag === 'function') {
            gtag('event', 'houston_hot_lead_identified', {
                'event_category': 'High Value Leads',
                'event_label': `Hot Lead - ${currentBusinessType || 'Unknown'} Business`,
                'value': currentLeadScore,
                'business_type': currentBusinessType,
                'service_package': currentServicePackage,
                'houston_lead_type': 'hot_lead'
            });
        }
        console.log('🔥 HOT LEAD IDENTIFIED - Score:', currentLeadScore);
    }
    
    return currentLeadScore;
}

// Enhanced form field focus tracking with GA4 integration and lead scoring
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('.form-control');
    formFields.forEach(field => {
        // Track field focus (shows initial engagement)
        field.addEventListener('focus', function() {
            trackFormInteraction('field_focus', this.name || this.id);
            trackHoustonLeadScore('field_focus', { field_name: this.name });
        });
        
        // Track when fields lose focus with content (shows completion intent)
        field.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                // Standard GA4 tracking
                if (typeof gtag === 'function') {
                    gtag('event', 'form_field_complete', {
                        'event_category': 'Form Engagement',
                        'event_label': 'Completed Field: ' + this.name,
                        'field_name': this.name,
                        'field_value_length': this.value.length,
                        'houston_lead_type': 'form_progress'
                    });
                }
                
                // Lead scoring
                trackHoustonLeadScore('field_complete', { 
                    field_name: this.name, 
                    field_length: this.value.length 
                });
                
                console.log('✅ Field completed:', this.name, '(+10 points)');
            }
        });
    });
    
    // ========================================================================
    // BUSINESS TYPE SELECTION TRACKING (100 POINTS - HIGH VALUE)
    // ========================================================================
    
    const businessTypeSelect = document.getElementById('businessType');
    if (businessTypeSelect) {
        businessTypeSelect.addEventListener('change', function() {
            currentBusinessType = this.value;
            
            // Standard GA4 tracking
            if (typeof gtag === 'function') {
                gtag('event', 'business_type_selected', {
                    'event_category': 'Lead Qualification',
                    'event_label': 'Business Type: ' + this.value,
                    'business_type': this.value,
                    'houston_lead_type': 'high_value_qualification'
                });
            }
            
            // High-value lead scoring (100 points)
            trackHoustonLeadScore('business_type_select', { 
                business_type: this.value 
            });
            
            console.log('🏢 Business type selected:', this.value, '(+100 points with multiplier)');
            
            // Track specific high-value business types
            if (['medical', 'realestate', 'professional'].includes(this.value)) {
                if (typeof gtag === 'function') {
                    gtag('event', 'high_value_business_identified', {
                        'event_category': 'Premium Leads',
                        'event_label': 'High-Value Business: ' + this.value,
                        'business_type': this.value,
                        'lead_quality': 'premium',
                        'houston_lead_type': 'premium_business'
                    });
                }
                console.log('💎 HIGH-VALUE BUSINESS IDENTIFIED:', this.value);
            }
        });
    }
    
    // ========================================================================
    // SERVICE PACKAGE SELECTION TRACKING (200 POINTS - VERY HIGH VALUE)
    // ========================================================================
    
    const servicePackageSelect = document.getElementById('servicePackage');
    if (servicePackageSelect) {
        servicePackageSelect.addEventListener('change', function() {
            currentServicePackage = this.value;
            
            // Calculate package value
            let packageValue = 0;
            const packageValues = {
                'basic': 599,
                'standard': 1199, 
                'premium': 2199,
                'consultation': 300
            };
            packageValue = packageValues[this.value] || 0;
            
            // Standard GA4 tracking
            if (typeof gtag === 'function') {
                gtag('event', 'service_package_selected', {
                    'event_category': 'Revenue Qualification',
                    'event_label': 'Package: ' + this.value + ' ($' + packageValue + ')',
                    'value': packageValue,
                    'currency': 'USD',
                    'service_package': this.value,
                    'potential_revenue': packageValue,
                    'houston_lead_type': 'revenue_qualification'
                });
            }
            
            // Very high-value lead scoring (200 points)
            trackHoustonLeadScore('service_package_select', { 
                service_package: this.value,
                package_value: packageValue 
            });
            
            console.log('💼 Service package selected:', this.value, '$' + packageValue, '(+200 points with multiplier)');
            
            // Track premium package interest (highest value)
            if (this.value === 'premium') {
                if (typeof gtag === 'function') {
                    gtag('event', 'premium_package_interest', {
                        'event_category': 'High Revenue Leads',
                        'event_label': 'Premium Package Interest ($2199)',
                        'value': 2199,
                        'currency': 'USD',
                        'lead_quality': 'premium',
                        'houston_lead_type': 'premium_revenue'
                    });
                }
                console.log('🌟 PREMIUM PACKAGE INTEREST - Highest revenue potential!');
            }
        });
    }
    
    console.log('📋 Enhanced Houston lead qualification tracking ready');
    console.log('🎯 Lead scoring system initialized - Tracking engagement, qualification, and revenue potential');
});