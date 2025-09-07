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
        
        // Simulate API call for development
        setTimeout(() => {
            // For development: just show success message
            // In production: integrate with email service or WordPress
            
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Log form data for development testing
            const formData = new FormData(contactForm);
            console.log('Form submitted with data:');
            for (let [key, value] of formData.entries()) {
                console.log(key + ': ' + value);
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

// Enhanced form interaction tracking for analytics
function trackFormInteraction(action, field) {
    // This can be integrated with Google Analytics or other tracking tools
    console.log('Form interaction:', action, 'on field:', field);
    
    // Example: Google Analytics event tracking
    // gtag('event', action, {
    //     'event_category': 'Contact Form',
    //     'event_label': field
    // });
}

// Track form field focus for analytics
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('.form-control');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            trackFormInteraction('field_focus', this.name || this.id);
        });
    });
});