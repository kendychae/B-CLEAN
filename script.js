// B CLEAN Website JavaScript

// Display last updated timestamp in MST (Mountain Standard Time - Blackfoot, Idaho)
document.addEventListener('DOMContentLoaded', function() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        const now = new Date();
        const options = {
            timeZone: 'America/Boise',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        };
        lastUpdatedElement.textContent = now.toLocaleString('en-US', options);
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
});

// Quote Form Handling
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            count: document.getElementById('count').value,
            date: document.getElementById('date').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        console.log('Form submitted:', formData);

        // Show success message
        document.querySelector('.quote-form').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';

        // Optional: You can integrate with email services like EmailJS, Formspree, or your backend
        // Example with EmailJS (you'd need to set this up):
        // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
        //     .then(function(response) {
        //         console.log('SUCCESS!', response.status, response.text);
        //     }, function(error) {
        //         console.log('FAILED...', error);
        //     });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .step, .value-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        e.target.value = value;
    });
}

// Set minimum date for date picker to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Image Lightbox / Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox HTML structure
    const lightboxHTML = `
        <div class="lightbox" id="lightbox">
            <button class="lightbox-close" id="lightbox-close">&times;</button>
            <button class="lightbox-prev" id="lightbox-prev">&#10094;</button>
            <div class="lightbox-content">
                <img class="lightbox-image" id="lightbox-image" src="" alt="Enlarged view">
            </div>
            <button class="lightbox-next" id="lightbox-next">&#10095;</button>
            <div class="lightbox-counter" id="lightbox-counter"></div>
        </div>
    `;
    
    // Add lightbox to body
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Get all clickable images
    const images = document.querySelectorAll('.service-image, .gallery-item img, .owner-photo, .photo-grid img, .showcase-item img');
    const imageArray = Array.from(images);
    let currentIndex = 0;
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    // Function to open lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function to close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Function to update lightbox image
    function updateLightbox() {
        if (imageArray.length > 0) {
            lightboxImage.src = imageArray[currentIndex].src;
            lightboxImage.alt = imageArray[currentIndex].alt;
            lightboxCounter.textContent = `${currentIndex + 1} / ${imageArray.length}`;
        }
    }
    
    // Function to show next image
    function showNext() {
        currentIndex = (currentIndex + 1) % imageArray.length;
        updateLightbox();
    }
    
    // Function to show previous image
    function showPrev() {
        currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
        updateLightbox();
    }
    
    // Add click event to all images
    images.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });
    
    // Close lightbox events
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation events
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });
    
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNext();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            }
        }
    });
});

// Back to Top Button (All Screen Sizes)
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Brand Text Easter Egg Animations
document.addEventListener('DOMContentLoaded', function() {
    // Get all brand text elements
    const brandTextHome = document.getElementById('brand-text-home');
    const brandTextWindow = document.getElementById('brand-text-window');
    const brandTextCarpet = document.getElementById('brand-text-carpet');
    const brandTextAbout = document.getElementById('brand-text-about');
    const brandTextQuote = document.getElementById('brand-text-quote');
    
    // Home Page - Squeegee animation
    if (brandTextHome) {
        brandTextHome.addEventListener('click', function() {
            if (!this.classList.contains('animating')) {
                this.classList.add('dirty', 'animating');
                const letters = this.querySelectorAll('.brand-letter');
                
                // Clean each letter sequentially
                letters.forEach((letter, index) => {
                    setTimeout(() => {
                        letter.style.animation = 'letterClean 0.5s ease forwards';
                    }, index * 300);
                });
                
                setTimeout(() => {
                    this.classList.remove('dirty', 'animating');
                    letters.forEach(letter => {
                        letter.style.animation = '';
                    });
                }, 2500);
            }
        });
    }
    
    // Window Washing Page - Water drop animation
    if (brandTextWindow) {
        brandTextWindow.addEventListener('click', function() {
            if (!this.classList.contains('animating')) {
                this.classList.add('animating');
                const letters = this.querySelectorAll('.brand-letter');
                
                // Make letters shine as water passes
                letters.forEach((letter, index) => {
                    setTimeout(() => {
                        letter.classList.add('pop');
                        setTimeout(() => letter.classList.remove('pop'), 600);
                    }, index * 200);
                });
                
                setTimeout(() => {
                    this.classList.remove('animating');
                }, 2000);
            }
        });
    }
    
    // Carpet Cleaning Page - Vacuum animation
    if (brandTextCarpet) {
        brandTextCarpet.addEventListener('click', function() {
            if (!this.classList.contains('animating')) {
                this.classList.add('dirty', 'animating');
                const letters = this.querySelectorAll('.brand-letter');
                
                // Clean letters as vacuum passes
                letters.forEach((letter, index) => {
                    setTimeout(() => {
                        letter.style.animation = 'letterClean 0.5s ease forwards';
                    }, index * 300);
                });
                
                setTimeout(() => {
                    this.classList.remove('dirty', 'animating');
                    letters.forEach(letter => {
                        letter.style.animation = '';
                    });
                }, 2500);
            }
        });
    }
    
    // About Page - Sparkle animation
    if (brandTextAbout) {
        brandTextAbout.addEventListener('click', function() {
            if (!this.classList.contains('animating')) {
                this.classList.add('animating');
                const letters = this.querySelectorAll('.brand-letter');
                
                // Pop letters with sparkle
                letters.forEach((letter, index) => {
                    setTimeout(() => {
                        letter.classList.add('pop');
                        setTimeout(() => letter.classList.remove('pop'), 600);
                    }, index * 150);
                });
                
                setTimeout(() => {
                    this.classList.remove('animating');
                }, 2500);
            }
        });
    }
    
    // Quote Page - Shine animation
    if (brandTextQuote) {
        brandTextQuote.addEventListener('click', function() {
            if (!this.classList.contains('animating')) {
                this.classList.add('animating');
                const letters = this.querySelectorAll('.brand-letter');
                
                // Light up letters as shine passes
                letters.forEach((letter, index) => {
                    setTimeout(() => {
                        letter.classList.add('pop');
                        setTimeout(() => letter.classList.remove('pop'), 600);
                    }, index * 200);
                });
                
                setTimeout(() => {
                    this.classList.remove('animating');
                }, 2000);
            }
        });
    }
    
    // Blog Page - Bubble animation
    const brandTextBlog = document.getElementById('brand-text-blog');
    if (brandTextBlog) {
        brandTextBlog.addEventListener('click', function() {
            if (!this.classList.contains('animating')) {
                this.classList.add('animating');
                const letters = this.querySelectorAll('.brand-letter');
                
                // Pop letters as bubbles float up
                letters.forEach((letter, index) => {
                    setTimeout(() => {
                        letter.classList.add('pop');
                        setTimeout(() => letter.classList.remove('pop'), 600);
                    }, index * 200);
                });
                
                setTimeout(() => {
                    this.classList.remove('animating');
                }, 2500);
            }
        });
    }
});
