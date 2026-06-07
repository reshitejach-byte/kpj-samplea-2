// ============= Loading Screen Setup =============
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Show loading screen for 3.5 seconds then fade out
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 3500);
});

// ============= Smooth Scroll Navigation =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============= Mobile Menu Toggle =============
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
    siteNav?.classList.toggle('active');
});

// ============= Form Handling - Consultation Form =============
const consultationForm = document.getElementById('consultationForm');

consultationForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        dob: formData.get('dob'),
        time: formData.get('time'),
        message: formData.get('message'),
        timestamp: new Date().toLocaleString()
    };
    
    // Validate data
    if (!data.name || !data.email || !data.phone || !data.dob || !data.time) {
        console.error('Form validation failed:', data);
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    // Store in localStorage
    const consultations = JSON.parse(localStorage.getItem('consultations')) || [];
    consultations.push(data);
    localStorage.setItem('consultations', JSON.stringify(consultations));
    
    // Debug log
    console.log('✅ Consultation saved! Total records:', consultations.length);
    console.log('Saved data:', data);
    
    // Show success message
    showNotification('Consultation request submitted successfully! We will contact you soon.', 'success');
    
    // Reset form
    this.reset();
});

// ============= Form Handling - Contact Form =============
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toLocaleString()
    };
    
    // Validate data
    if (!data.name || !data.email || !data.message) {
        console.error('Form validation failed:', data);
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    // Store in localStorage
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(data);
    localStorage.setItem('messages', JSON.stringify(messages));
    
    // Debug log
    console.log('✅ Message saved! Total records:', messages.length);
    console.log('Saved data:', data);
    
    // Show success message
    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    
    // Reset form
    this.reset();
});

// ============= Notification Function =============
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#25D366' : '#3498db'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============= Add Animation Styles for Notifications =============
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ============= Scroll Animation for Elements =============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section-panel').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// ============= Active Navigation Link Highlight =============
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============= Parallax Effect for Hero =============
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        const heroHeight = hero.clientHeight;
        
        if (scrollPosition < heroHeight) {
            hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
        }
    }
});

// ============= Dynamic Year in Footer =============
const footerText = document.querySelector('.site-footer .footer-bottom p');
if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.textContent = `© ${currentYear} SREE KPJ GEMS. All rights reserved. | Established for 40+ Years of Excellence`;
}

// ============= Counter Animation for Stats =============
function animateCounters() {
    const stats = document.querySelectorAll('.stat-card h3');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isNumber = /^\d+/.test(target);
        
        if (isNumber) {
            const number = parseInt(target);
            let current = 0;
            const increment = number / 50;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 30);
        }
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.getElementById('about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// ============= WhatsApp Integration =============
// When user clicks WhatsApp button, it opens the group link
const whatsappButtons = document.querySelectorAll('[href*="whatsapp.com"]');

whatsappButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        console.log('Opening WhatsApp: ' + this.href);
    });
});

// ============= Form Validation =============
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+()]{10,}$/;
    return re.test(phone);
}

// Add validation to forms
const formInputs = document.querySelectorAll('input[type="email"]');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#c41e3a';
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });
});

// ============= Keyboard Shortcuts =============
document.addEventListener('keydown', (e) => {
    // Press '?' for help/shortcuts menu
    if (e.key === '?' && e.ctrlKey) {
        console.log('Keyboard shortcuts: Use arrow keys to navigate, # followed by section name to jump');
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        const siteNav = document.querySelector('.site-nav');
        if (siteNav) {
            siteNav.classList.remove('active');
        }
    }
});

// ============= Accessibility - Skip to Main Content =============
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.className = 'skip-to-main';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    left: -9999px;
    z-index: 999;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.left = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.left = '-9999px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ============= Console Welcome Message =============
console.log('%c🎁 Welcome to SREE KPJ GEMS 🎁', 'font-size: 20px; color: #d4af37; font-weight: bold;');
console.log('%cYour trusted partner in achieving success through certified astro gemstones.', 'font-size: 14px; color: #1a1a1a;');
console.log('%cBook your consultation today! Welcome to the World of Astrology', 'font-size: 12px; color: #c41e3a; font-style: italic;');

// ============= Gem Card Animation on Hover =============
const gemCards = document.querySelectorAll('.gem-card');

gemCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const gemIcon = this.querySelector('.gem-icon');
        if (gemIcon) {
            gemIcon.style.animation = 'spin 2s linear infinite';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const gemIcon = this.querySelector('.gem-icon');
        if (gemIcon) {
            gemIcon.style.animation = 'spin 3s linear infinite';
        }
    });
});

// ============= Date Input Today's Date =============
const dobInput = document.getElementById('dob');
if (dobInput) {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const formattedDate = maxDate.toISOString().split('T')[0];
    dobInput.setAttribute('max', formattedDate);
}

// ============= Initialize Website =============
console.log('SREE KPJ GEMS website loaded successfully!');
console.log('Thank you for choosing our astrology services - KPJ Delivers the Better Solution!');
