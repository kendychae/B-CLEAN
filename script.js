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

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });

        // Close mobile menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
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
    
    // Reviews Page - Star Rating animation
    const brandTextReviews = document.getElementById('brand-text-reviews');
    if (brandTextReviews) {
        brandTextReviews.addEventListener('click', function() {
            if (!this.classList.contains('animating')) {
                this.classList.add('animating');
                const letters = this.querySelectorAll('.brand-letter');
                
                // Create star elements
                for (let i = 0; i < 5; i++) {
                    const star = document.createElement('div');
                    star.className = 'star-rating';
                    
                    const starId = `brandStar${i}${Date.now()}`;
                    const colors = [
                        ['#FFD700', '#FFA500'],
                        ['#FFDF00', '#FFB700'],
                        ['#FFE44D', '#FFC700'],
                        ['#FFEA00', '#FF9500'],
                        ['#FFF44F', '#FFB900']
                    ];
                    const color = colors[i % colors.length];
                    
                    star.innerHTML = `
                        <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="${starId}" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" style="stop-color:${color[0]};stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:${color[1]};stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <path d="M 50 10 L 61 40 L 93 40 L 67 58 L 78 88 L 50 70 L 22 88 L 33 58 L 7 40 L 39 40 Z" 
                                  fill="url(#${starId})" 
                                  stroke="#FFFFFF" 
                                  stroke-width="2"
                                  filter="drop-shadow(0 0 8px ${color[0]})" />
                        </svg>
                    `;
                    star.style.left = `${20 + i * 15}%`;
                    star.style.animationDelay = `${i * 0.15}s`;
                    this.appendChild(star);
                    
                    // Remove star after animation
                    setTimeout(() => star.remove(), 2500);
                }
                
                // Pop letters with star effect
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

// Blog Post Modal/Carousel
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the blog page
    const blogCards = document.querySelectorAll('.blog-card');
    if (blogCards.length === 0) return;
    
    // Create blog modal HTML structure
    const blogModalHTML = `
        <div class="blog-modal" id="blog-modal">
            <button class="blog-modal-close" id="blog-modal-close">&times;</button>
            <button class="blog-modal-nav blog-modal-prev" id="blog-modal-prev">&#10094;</button>
            <div class="blog-modal-content" id="blog-modal-content">
                <div class="blog-modal-meta">
                    <span class="blog-modal-date" id="blog-modal-date"></span>
                    <span class="blog-modal-category" id="blog-modal-category"></span>
                </div>
                <h2 id="blog-modal-title"></h2>
                <div class="blog-modal-text" id="blog-modal-text"></div>
                <div class="blog-modal-footer">
                    <span class="blog-modal-author" id="blog-modal-author"></span>
                </div>
            </div>
            <button class="blog-modal-nav blog-modal-next" id="blog-modal-next">&#10095;</button>
            <div class="blog-modal-counter" id="blog-modal-counter"></div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', blogModalHTML);
    
    // Blog posts data with full content
    const blogPosts = [
        {
            date: "January 15, 2026",
            category: "Window Cleaning",
            title: "5 Signs Your Windows Need Professional Cleaning",
            content: "Hard water stains, streaks, and buildup can damage your windows over time. Visible water spots, cloudy glass, difficulty seeing through windows, debris in tracks, and reduced natural light are all signs it's time to call a professional. Don't let mineral deposits permanently etch your glass—regular professional cleaning protects your investment and keeps your home looking its best.\n\nIn Cache Valley, our hard water is particularly tough on windows. The mineral content in our water leaves behind deposits that, over time, can actually etch into the glass surface. Once this happens, the damage is permanent and cannot be removed. That's why regular professional window cleaning is not just about aesthetics—it's about protecting your investment.\n\nProfessional window cleaners have the right tools, techniques, and solutions to safely and effectively remove these deposits before they cause permanent damage. We use specialized products that can dissolve mineral buildup without scratching your glass, and our squeegee techniques ensure a streak-free, crystal-clear finish every time.",
            author: "By Danzen"
        },
        {
            date: "January 10, 2026",
            category: "Carpet Care",
            title: "How Often Should You Deep Clean Your Carpets?",
            content: "Regular carpet cleaning extends the life of your flooring and improves indoor air quality. Most homes should have carpets professionally cleaned every 12-18 months, but high-traffic areas, homes with pets or children, or allergy sufferers may benefit from cleaning every 6-12 months. Professional steam cleaning removes deep-seated dirt, allergens, and bacteria that vacuuming can't reach, keeping your home healthier and your carpets looking newer longer.\n\nThe truth is, your carpets are working hard every day to filter the air in your home. They trap dust, allergens, pet dander, and countless other particles. While regular vacuuming removes surface dirt, it can't extract the deep-down contaminants that accumulate in the carpet fibers over time.\n\nProfessional hot water extraction (steam cleaning) is the most effective method recommended by carpet manufacturers. It penetrates deep into the carpet pile to loosen and remove embedded dirt, kill dust mites and bacteria, and rinse away cleaning solutions—all while being safe for your family and pets. Regular professional cleaning not only keeps your carpets looking great but also extends their lifespan by preventing the buildup of abrasive particles that wear down fibers.",
            author: "By Danzen"
        },
        {
            date: "January 2, 2026",
            category: "Window Cleaning",
            title: "The Hidden Benefits of Clean Windows",
            content: "Clean windows do more than just improve your view. They increase natural light, which can boost mood and productivity while reducing energy costs. Regular window cleaning prevents permanent damage from hard water and mineral deposits, extends the life of your windows, and significantly improves your home's curb appeal and property value. In Cache Valley's harsh climate, professional cleaning is essential for maintaining your windows' integrity and appearance.\n\nStudies have shown that natural light has a profound impact on our mental and physical health. It regulates our circadian rhythms, improves mood, increases productivity, and even helps us sleep better at night. When your windows are covered in grime, you're blocking out this beneficial natural light and forcing your home to rely more on artificial lighting—which costs you money.\n\nBut the benefits go beyond just letting in more light. Clean windows also allow you to better monitor the condition of your window frames and seals. During the cleaning process, professionals can spot early signs of wear, rot, or seal failure that could lead to costly repairs if left unchecked. Regular maintenance truly is the key to protecting your home's value and your family's comfort.",
            author: "By Danzen"
        },
        {
            date: "December 28, 2025",
            category: "Maintenance Tips",
            title: "Winter Window Care: Preventing Ice and Condensation",
            content: "Utah winters can be tough on windows. Learn how to prevent frost buildup, condensation damage, and maintain crystal clear windows throughout the cold season. Proper ventilation, maintaining consistent indoor temperatures, and professional cleaning before winter sets in can prevent ice damage and condensation issues that lead to mold and water damage.\n\nCondensation on windows is more than just an annoyance—it's a sign that moisture is accumulating in your home, and that moisture has to go somewhere. When condensation repeatedly forms and freezes on your windows, it can damage window seals, frames, and sills. Over time, this can lead to rot, mold growth, and decreased energy efficiency.\n\nThe key to preventing winter window problems starts before the cold weather arrives. Have your windows professionally cleaned in the fall to remove any buildup that could trap moisture. Ensure your windows are properly sealed and that your home has adequate ventilation. During winter, maintain consistent indoor temperatures and humidity levels. Use exhaust fans in bathrooms and kitchens, and consider a dehumidifier if you notice persistent condensation. These simple steps can save you thousands in potential repair costs.",
            author: "By Danzen"
        },
        {
            date: "December 20, 2025",
            category: "Carpet Care",
            title: "Why Professional Carpet Cleaning Matters for Your Health",
            content: "Your carpets trap allergens, dust mites, bacteria, and pollutants that can affect your family's health. Professional carpet cleaning removes these hidden contaminants that regular vacuuming misses. Using hot water extraction (steam cleaning), professionals can eliminate up to 98% of allergens and bacteria, significantly improving indoor air quality. This is especially important for families with young children, pets, or anyone with allergies or respiratory issues.\n\nMost people don't realize that carpets act as a giant air filter for your home. Every time someone walks across the carpet, dust and particles are kicked up into the air you breathe. While this is normal, it means your carpets are constantly collecting and holding onto these contaminants. Regular vacuuming helps, but it only removes surface-level dirt.\n\nProfessional carpet cleaning goes much deeper. The hot water extraction process uses heated water and powerful suction to penetrate deep into carpet fibers, loosening and removing embedded dirt, oils, and allergens. The high temperature also kills dust mites, bacteria, and other microorganisms that can trigger allergies and respiratory problems. For families with asthma, allergies, or young children who play on the floor, professional carpet cleaning isn't just about appearance—it's about creating a healthier living environment.",
            author: "By Danzen"
        },
        {
            date: "December 15, 2025",
            category: "Business Tips",
            title: "Why Commercial Properties Need Regular Window Cleaning",
            content: "First impressions matter in business. Clean windows boost curb appeal, improve employee morale, and can even increase natural light and energy efficiency. Professional window cleaning for commercial properties shows attention to detail and professionalism that clients notice. Regular maintenance also prevents costly glass replacement from permanent staining and damage.\n\nWhen clients or customers approach your business, they're making judgments about your company before they even walk through the door. Dirty, streaked windows send a message of neglect and poor attention to detail. In contrast, sparkling clean windows suggest professionalism, success, and care—qualities every business wants to project.\n\nBut clean windows aren't just about external appearances. They also have a significant impact on your employees. Natural light has been proven to increase productivity, reduce eye strain and headaches, and improve overall workplace satisfaction. When your windows are clean and allowing maximum light transmission, you're creating a better working environment for your team.\n\nFinally, consider the financial benefits. Regular professional window cleaning prevents the buildup of contaminants that can permanently damage glass. Replacing commercial windows is expensive—much more expensive than maintaining them properly. A regular cleaning schedule is an investment that protects your property value and saves money in the long run.",
            author: "By Danzen"
        }
    ];
    
    let currentBlogIndex = 0;
    
    const blogModal = document.getElementById('blog-modal');
    const blogModalClose = document.getElementById('blog-modal-close');
    const blogModalPrev = document.getElementById('blog-modal-prev');
    const blogModalNext = document.getElementById('blog-modal-next');
    const blogModalDate = document.getElementById('blog-modal-date');
    const blogModalCategory = document.getElementById('blog-modal-category');
    const blogModalTitle = document.getElementById('blog-modal-title');
    const blogModalText = document.getElementById('blog-modal-text');
    const blogModalAuthor = document.getElementById('blog-modal-author');
    const blogModalCounter = document.getElementById('blog-modal-counter');
    
    // Function to open blog modal
    function openBlogModal(index) {
        currentBlogIndex = index;
        updateBlogModal();
        blogModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close blog modal
    function closeBlogModal() {
        blogModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Function to update blog modal content
    function updateBlogModal() {
        const post = blogPosts[currentBlogIndex];
        blogModalDate.textContent = post.date;
        blogModalCategory.textContent = post.category;
        blogModalTitle.textContent = post.title;
        blogModalText.textContent = post.content;
        blogModalAuthor.textContent = post.author;
        blogModalCounter.textContent = `${currentBlogIndex + 1} / ${blogPosts.length}`;
    }
    
    // Function to show next blog post
    function showNextBlog() {
        currentBlogIndex = (currentBlogIndex + 1) % blogPosts.length;
        updateBlogModal();
    }
    
    // Function to show previous blog post
    function showPrevBlog() {
        currentBlogIndex = (currentBlogIndex - 1 + blogPosts.length) % blogPosts.length;
        updateBlogModal();
    }
    
    // Add click event to all blog cards
    blogCards.forEach((card, index) => {
        card.addEventListener('click', () => openBlogModal(index));
    });
    
    // Close modal events
    blogModalClose.addEventListener('click', closeBlogModal);
    blogModal.addEventListener('click', (e) => {
        if (e.target === blogModal) {
            closeBlogModal();
        }
    });
    
    // Navigation events
    blogModalNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextBlog();
    });
    
    blogModalPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevBlog();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (blogModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeBlogModal();
            } else if (e.key === 'ArrowRight') {
                showNextBlog();
            } else if (e.key === 'ArrowLeft') {
                showPrevBlog();
            }
        }
    });
});

// Reviews Page - Modal Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const reviewsGrid = document.getElementById('reviews-grid');
    if (!reviewsGrid) return; // Exit if not on reviews page
    
    const reviewModal = document.getElementById('review-modal');
    const reviewModalClose = document.getElementById('review-modal-close');
    const reviewModalBody = document.getElementById('review-modal-body');
    const reviewModalCounter = document.getElementById('review-modal-counter');
    const reviewModalNext = document.getElementById('review-next-btn');
    const reviewModalPrev = document.getElementById('review-prev-btn');
    
    let currentReviewIndex = 0;
    
    // Reviews data from Google
    const reviews = [
        {
            author: "Chip Midkiff",
            initials: "CM",
            rating: 5,
            date: "7 months ago",
            text: "Danzen does impeccable work and knows what he's doing. We get horrible hard water scale from our sprinkler system and B Clean makes our windows look like new. We've hired Danzen for multiple properties for a couple years now and can't recommend him enough. Incredible work and a great price.",
            response: "Thank you so much, I appreciate the review",
            badge: "Local Guide"
        },
        {
            author: "Elisa Patterson",
            initials: "EP",
            rating: 5,
            date: "a year ago",
            text: "Danzen knocked on my door and told me about his 4-step window cleaning process. He also gave a reasonable bid so it was easy for me to make the decision to have him clean my windows. He did a great job and they are sparkling clean. So clean that my humming bird ran into one! I love clean windows!",
            response: "Elisa! So glad you chose B Clean. Thank you for the review and I hope your humming bird will forgive me :)",
            badge: null
        },
        {
            author: "Wendy Martinez",
            initials: "WM",
            rating: 5,
            date: "a year ago",
            text: "B Clean knocked on my door last spring and I gave it a chance. What an amazing service! They are back this summer and did a great job! I know other homes in the neighborhood use B Clean also. The gentleman is on time, works hard, and sends updates on progress. Great value and highly recommend B Clean!",
            response: "Thanks Wendy! Love taking care of your windows!",
            badge: null
        },
        {
            author: "DaJon Bingham",
            initials: "DB",
            rating: 5,
            date: "a year ago",
            text: "Awesome service! Sparkling clean! Excellent value. Highly recommend",
            response: null,
            badge: null
        },
        {
            author: "Elisabeth Yancey",
            initials: "EY",
            rating: 5,
            date: "a year ago",
            text: "Very hard working, high quality, reliable service! Would use again.",
            response: null,
            badge: null
        },
        {
            author: "Conner",
            initials: "C",
            rating: 5,
            date: "a year ago",
            text: "Works hard and gets the job done.",
            response: null,
            badge: "Local Guide"
        },
        {
            author: "K B",
            initials: "KB",
            rating: 5,
            date: "a year ago",
            text: "Gets the job done right.",
            response: null,
            badge: null
        }
    ];
    
    // Function to generate star rating HTML
    function generateStars(rating) {
        let starsHTML = '';
        for (let i = 0; i < rating; i++) {
            const starId = `reviewStar${i}${Math.random().toString(36).substr(2, 9)}`;
            starsHTML += `
                <svg width="20" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle; margin-right:2px;">
                    <defs>
                        <linearGradient id="${starId}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <path d="M 50 10 L 61 40 L 93 40 L 67 58 L 78 88 L 50 70 L 22 88 L 33 58 L 7 40 L 39 40 Z" 
                          fill="url(#${starId})" 
                          stroke="#FFFFFF" 
                          stroke-width="2" />
                </svg>
            `;
        }
        return starsHTML;
    }
    
    // Function to generate review cards
    function generateReviewCards() {
        reviewsGrid.innerHTML = reviews.map((review, index) => `
            <div class="review-card" data-index="${index}">
                <div class="review-header">
                    <div class="review-avatar">${review.initials}</div>
                    <div class="review-author-info">
                        <div class="review-author">${review.author}</div>
                        <div class="review-meta">
                            <span class="review-rating">${generateStars(review.rating)}</span>
                            <span class="review-date">${review.date}</span>
                        </div>
                    </div>
                </div>
                <div class="review-text">
                    ${review.text.length > 150 ? review.text.substring(0, 150) + '...' : review.text}
                </div>
                ${review.text.length > 150 ? '<span class="review-read-more">Read more</span>' : ''}
            </div>
        `).join('');
        
        // Add click events to review cards
        const reviewCards = document.querySelectorAll('.review-card');
        reviewCards.forEach((card, index) => {
            card.addEventListener('click', () => openReviewModal(index));
        });
    }
    
    // Function to open review modal
    function openReviewModal(index) {
        currentReviewIndex = index;
        updateReviewModal();
        reviewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close review modal
    function closeReviewModal() {
        reviewModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Function to update modal content
    function updateReviewModal() {
        const review = reviews[currentReviewIndex];
        
        reviewModalBody.innerHTML = `
            <div class="review-modal-header">
                <div class="review-modal-avatar">${review.initials}</div>
                <div class="review-modal-author-info">
                    <div class="review-modal-author">
                        ${review.author}
                        ${review.badge ? `<span style="color: var(--text-light); font-size: 0.85rem; font-weight: 400;"> • ${review.badge}</span>` : ''}
                    </div>
                    <div class="review-modal-meta">
                        <span class="review-modal-rating">${generateStars(review.rating)}</span>
                        <span class="review-modal-date">${review.date}</span>
                    </div>
                </div>
            </div>
            
            <div class="review-modal-text">${review.text}</div>
            
            ${review.response ? `
                <div class="review-modal-response">
                    <div class="review-response-header">
                        Response from the owner ${review.date}
                    </div>
                    <div class="review-response-text">${review.response}</div>
                </div>
            ` : ''}
        `;
        
        // Update counter
        reviewModalCounter.textContent = `${currentReviewIndex + 1} of ${reviews.length}`;
        
        // Update navigation buttons
        reviewModalPrev.disabled = currentReviewIndex === 0;
        reviewModalNext.disabled = currentReviewIndex === reviews.length - 1;
    }
    
    // Function to show next review
    function showNextReview() {
        currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
        updateReviewModal();
    }
    
    // Function to show previous review
    function showPrevReview() {
        currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
        updateReviewModal();
    }
    
    // Initialize review cards
    generateReviewCards();
    
    // Close modal events
    reviewModalClose.addEventListener('click', closeReviewModal);
    reviewModal.addEventListener('click', (e) => {
        if (e.target === reviewModal) {
            closeReviewModal();
        }
    });
    
    // Navigation events
    reviewModalNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextReview();
    });
    
    reviewModalPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevReview();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (reviewModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeReviewModal();
            } else if (e.key === 'ArrowRight') {
                showNextReview();
            } else if (e.key === 'ArrowLeft') {
                showPrevReview();
            }
        }
    });
});

// Page-Specific Easter Egg Functionality for Footer Copyright
document.addEventListener('DOMContentLoaded', function() {
    const copyrightText = document.getElementById('copyright-text');
    if (!copyrightText) return;
    
    // Detect current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    let clickCount = 0;
    let resetTimer = null;
    
    // Create shared container for effects
    const effectContainer = document.createElement('div');
    effectContainer.id = 'effect-container';
    effectContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(effectContainer);
    
    // INDEX.HTML - Rainbow Ripples → Color Matching Game
    function indexEasterEgg(clickCount) {
        if (clickCount <= 5) {
            createRainbowRipple();
        } else {
            startColorMatchGame();
        }
    }
    
    function createRainbowRipple() {
        const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8b00ff'];
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            opacity: 0.6;
            animation: ripple-expand 2s ease-out forwards;
        `;
        effectContainer.appendChild(ripple);
        setTimeout(() => ripple.remove(), 2000);
    }
    
    function startColorMatchGame() {
        const gameContainer = document.createElement('div');
        gameContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90vw;
            max-width: 450px;
            max-height: 90vh;
            overflow-y: auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        `;
        
        const title = document.createElement('div');
        title.textContent = 'Match the Colors';
        title.style.cssText = 'color: white; font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 20px;';
        
        const colorDisplay = document.createElement('div');
        colorDisplay.style.cssText = `
            width: 100%;
            height: 80px;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: inset 0 4px 8px rgba(0,0,0,0.3);
        `;
        
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 15px;';
        
        const scoreDiv = document.createElement('div');
        scoreDiv.style.cssText = 'color: white; font-size: 20px; font-weight: bold; text-align: center;';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.3); color: white; border: 2px solid white; font-size: 24px; font-weight: bold; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; z-index: 10002;';
        closeBtn.addEventListener('click', () => {
            createQuickCelebration();
            setTimeout(() => gameContainer.remove(), 800);
        });
        
        gameContainer.appendChild(closeBtn);
        gameContainer.appendChild(title);
        gameContainer.appendChild(colorDisplay);
        gameContainer.appendChild(buttonContainer);
        gameContainer.appendChild(scoreDiv);
        document.body.appendChild(gameContainer);
        
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const colorNames = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Cyan'];
        let score = 0;
        let targetColor;
        
        function newRound() {
            targetColor = colors[Math.floor(Math.random() * colors.length)];
            colorDisplay.style.background = targetColor;
            buttonContainer.innerHTML = '';
            
            const options = [...colors].sort(() => Math.random() - 0.5).slice(0, 6);
            if (!options.includes(targetColor)) options[0] = targetColor;
            
            options.forEach((color, index) => {
                const btn = document.createElement('button');
                btn.style.cssText = `
                    background: ${color};
                    border: 3px solid white;
                    padding: 20px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: transform 0.2s;
                `;
                btn.addEventListener('mousedown', () => btn.style.transform = 'scale(0.9)');
                btn.addEventListener('mouseup', () => btn.style.transform = 'scale(1)');
                btn.addEventListener('click', () => {
                    if (color === targetColor) {
                        score++;
                        scoreDiv.textContent = `Score: ${score}`;
                        if (score >= 10) {
                            title.textContent = 'Color Master!';
                            createConfetti();
                            setTimeout(() => gameContainer.remove(), 3000);
                        } else {
                            newRound();
                        }
                    } else {
                        btn.style.opacity = '0.3';
                    }
                });
                buttonContainer.appendChild(btn);
            });
            
            scoreDiv.textContent = `Score: ${score}/10`;
        }
        
        newRound();
    }
    
    // ABOUT.HTML - Prehistoric Atmosphere → Dinosaur Catch Game
    function aboutEasterEgg(clickCount) {
        if (clickCount <= 5) {
            createPrehistoricEffect(clickCount);
        } else {
            startDinosaurGame();
        }
    }
    
    function createPrehistoricEffect(intensity) {
        // Create volcanic glow effect
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: fixed;
            left: 50%;
            bottom: -20%;
            transform: translateX(-50%);
            width: ${80 + intensity * 20}%;
            height: ${60 + intensity * 15}%;
            background: radial-gradient(ellipse at center bottom,
                rgba(255, 69, 0, ${0.2 + intensity * 0.05}) 0%,
                rgba(255, 140, 0, ${0.15 + intensity * 0.03}) 30%,
                rgba(139, 69, 19, ${0.1 + intensity * 0.02}) 60%,
                transparent 100%);
            pointer-events: none;
            z-index: 9998;
            animation: volcanic-pulse ${2 - intensity * 0.1}s ease-out forwards;
        `;
        effectContainer.appendChild(glow);
        setTimeout(() => glow.remove(), 2000);
        
        // Add prehistoric plant silhouettes
        const plantCount = 3 + intensity;
        for (let i = 0; i < plantCount; i++) {
            setTimeout(() => {
                const plant = document.createElement('div');
                const leftPos = Math.random() * 90 + 5;
                const height = Math.random() * 30 + 20;
                
                plant.style.cssText = `
                    position: fixed;
                    left: ${leftPos}%;
                    bottom: 0;
                    width: ${8 + Math.random() * 6}px;
                    height: ${height}vh;
                    background: linear-gradient(180deg,
                        transparent 0%,
                        rgba(34, 139, 34, 0.6) 20%,
                        rgba(34, 139, 34, 0.8) 100%);
                    clip-path: polygon(
                        50% 0%, 
                        ${30 + Math.random() * 20}% 30%, 
                        45% 50%, 
                        ${25 + Math.random() * 15}% 70%, 
                        40% 100%, 
                        60% 100%, 
                        ${75 + Math.random() * 10}% 70%, 
                        55% 50%, 
                        ${70 + Math.random() * 20}% 30%
                    );
                    pointer-events: none;
                    animation: plant-grow 1.2s ease-out forwards;
                    transform-origin: bottom center;
                `;
                effectContainer.appendChild(plant);
                setTimeout(() => {
                    plant.style.animation = 'plant-fade 0.8s ease-out forwards';
                    setTimeout(() => plant.remove(), 800);
                }, 1200);
            }, i * 200);
        }
        
        // Add meteor streaks at higher intensities
        if (intensity >= 3) {
            for (let i = 0; i < intensity - 2; i++) {
                setTimeout(() => {
                    const meteor = document.createElement('div');
                    const startX = Math.random() * 100;
                    
                    meteor.style.cssText = `
                        position: fixed;
                        left: ${startX}%;
                        top: -10%;
                        width: 3px;
                        height: ${Math.random() * 50 + 30}px;
                        background: linear-gradient(180deg,
                            rgba(255, 255, 255, 0) 0%,
                            rgba(255, 200, 100, 0.9) 30%,
                            rgba(255, 100, 0, 0.8) 100%);
                        box-shadow: 0 0 10px rgba(255, 150, 50, 0.8);
                        transform: rotate(25deg);
                        pointer-events: none;
                        animation: meteor-fall 1.5s linear forwards;
                    `;
                    effectContainer.appendChild(meteor);
                    setTimeout(() => meteor.remove(), 1500);
                }, Math.random() * 1000);
            }
        }
    }
    
    function startDinosaurGame() {
        const gameContainer = document.createElement('div');
        gameContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90vw;
            max-width: 500px;
            height: 85vh;
            max-height: 600px;
            background: linear-gradient(135deg, #2d5016 0%, #3d6e1f 50%, #4a7c2d 100%);
            border-radius: 20px;
            padding: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            overflow: hidden;
        `;
        
        const title = document.createElement('div');
        title.textContent = 'Dinosaur Collector';
        title.style.cssText = 'color: white; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);';
        
        const instruction = document.createElement('div');
        instruction.textContent = 'Catch the dinosaurs!';
        instruction.style.cssText = 'color: rgba(255,255,255,0.9); font-size: 16px; text-align: center; margin-bottom: 10px;';
        
        const gameArea = document.createElement('div');
        gameArea.style.cssText = `
            width: 100%;
            height: 420px;
            position: relative;
            background: linear-gradient(to bottom, 
                rgba(135, 206, 235, 0.2) 0%,
                rgba(100, 149, 237, 0.15) 40%,
                rgba(139, 69, 19, 0.3) 100%);
            border-radius: 10px;
            overflow: hidden;
            border: 3px solid rgba(139, 69, 19, 0.5);
            box-shadow: inset 0 -50px 50px rgba(139, 69, 19, 0.3);
        `;
        
        const catcher = document.createElement('div');
        catcher.style.cssText = `
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 50px;
            background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
            border-radius: 10px 10px 0 0;
            border: 3px solid #654321;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            transition: left 0.1s;
            
            &::before {
                content: '';
                position: absolute;
                top: -10px;
                left: 50%;
                transform: translateX(-50%);
                width: 40px;
                height: 15px;
                background: #654321;
                border-radius: 5px;
            }
        `;
        catcher.innerHTML = `
            <div style="
                position: absolute;
                top: 5px;
                left: 50%;
                transform: translateX(-50%);
                width: 70%;
                height: 70%;
                background: rgba(139, 69, 19, 0.6);
                border-radius: 5px;
                border: 2px solid rgba(101, 67, 33, 0.8);
            "></div>
        `;
        
        const scoreDiv = document.createElement('div');
        scoreDiv.style.cssText = 'color: white; font-size: 20px; font-weight: bold; text-align: center; margin-top: 10px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.3); color: white; border: 2px solid white; font-size: 24px; font-weight: bold; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; z-index: 10002;';
        closeBtn.addEventListener('click', () => {
            document.removeEventListener('mousemove', moveCatcher);
            document.removeEventListener('touchmove', moveCatcherTouch);
            createQuickCelebration();
            setTimeout(() => gameContainer.remove(), 800);
        });
        
        gameContainer.appendChild(closeBtn);
        gameContainer.appendChild(title);
        gameContainer.appendChild(instruction);
        gameContainer.appendChild(gameArea);
        gameArea.appendChild(catcher);
        gameContainer.appendChild(scoreDiv);
        document.body.appendChild(gameContainer);
        
        const dinoTypes = [
            { color: '#2C3E50', size: 80, shape: 'trex' },
            { color: '#34495E', size: 75, shape: 'stego' },
            { color: '#1C2833', size: 70, shape: 'raptor' }
        ];
        
        let score = 0;
        let missed = 0;
        const maxMissed = 5;
        
        function moveCatcher(e) {
            const rect = gameArea.getBoundingClientRect();
            const x = e.clientX - rect.left;
            catcher.style.left = Math.max(30, Math.min(rect.width - 30, x)) + 'px';
        }
        
        function moveCatcherTouch(e) {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = gameArea.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            catcher.style.left = Math.max(30, Math.min(rect.width - 30, x)) + 'px';
        }
        
        document.addEventListener('mousemove', moveCatcher);
        document.addEventListener('touchmove', moveCatcherTouch, { passive: false });
        
        function createDinoShape(type) {
            const dino = document.createElement('div');
            dino.style.cssText = `
                position: absolute;
                left: ${Math.random() * 85}%;
                top: -80px;
                width: ${type.size}px;
                height: ${type.size}px;
                animation: drop-fall 3.5s linear forwards;
                filter: drop-shadow(3px 5px 8px rgba(0,0,0,0.4));
            `;
            
            const dinoColor = type.color;
            
            if (type.shape === 'trex') {
                // Simple T-Rex silhouette
                dino.innerHTML = `
                    <svg viewBox="0 0 100 120" style="width: 100%; height: 100%;">
                        <path d="
                            M 40 100 L 38 80 L 36 70 L 35 60 L 36 50 L 38 40
                            L 40 30 L 42 22 L 44 18 L 46 15 L 50 13 L 54 15
                            L 56 18 L 58 22 L 60 30 L 62 40 L 64 50 L 65 60
                            L 64 70 L 62 80 L 60 100 L 56 100 L 56 85 L 55 75
                            L 54 70 L 50 70 L 49 75 L 48 85 L 48 100 L 44 100
                            L 44 85 L 43 75 L 42 70 L 40 72 Z
                            M 38 40 L 36 42 L 32 44 L 30 43 L 32 40 L 35 38 Z
                            M 58 22 L 62 20 L 66 20 L 68 22 L 66 24 L 62 24 Z
                            M 53 18 Q 54 17 55 18
                        " fill="${dinoColor}"/>
                    </svg>
                `;
            } else if (type.shape === 'stego') {
                // Simple Stegosaurus silhouette with plates
                dino.innerHTML = `
                    <svg viewBox="0 0 120 100" style="width: 100%; height: 100%;">
                        <path d="
                            M 20 70 L 18 65 L 18 60 L 20 55 L 25 52 L 35 50
                            L 50 50 L 65 50 L 80 52 L 90 55 L 92 60 L 92 65
                            L 90 70 L 88 75 L 85 82 L 83 90 L 80 95 L 75 95
                            L 77 88 L 78 80 L 78 75 L 68 75 L 68 80 L 68 88
                            L 66 95 L 61 95 L 63 88 L 64 80 L 64 75 L 54 75
                            L 54 80 L 54 88 L 52 95 L 47 95 L 49 88 L 50 80
                            L 50 75 L 40 75 L 40 80 L 40 88 L 38 95 L 33 95
                            L 35 88 L 36 80 L 36 75 L 26 75 L 26 82 L 25 90
                            L 23 95 L 18 95 L 20 88 L 22 80 L 23 75 Z
                            M 30 50 L 32 35 L 34 30 L 36 35 L 38 50 Z
                            M 42 50 L 44 30 L 46 25 L 48 30 L 50 50 Z
                            M 54 50 L 56 32 L 58 27 L 60 32 L 62 50 Z
                            M 66 50 L 68 34 L 70 29 L 72 34 L 74 50 Z
                            M 78 50 L 80 36 L 82 31 L 84 36 L 86 50 Z
                            M 18 62 L 14 58 L 12 55 L 14 53 L 18 55 Z
                            M 91 60 L 95 58 L 98 60 L 95 63 Z
                        " fill="${dinoColor}"/>
                    </svg>
                `;
            } else {
                // Simple Velociraptor silhouette
                dino.innerHTML = `
                    <svg viewBox="0 0 100 120" style="width: 100%; height: 100%;">
                        <path d="
                            M 42 95 L 40 82 L 38 70 L 37 60 L 38 50 L 40 40
                            L 42 32 L 44 25 L 46 20 L 48 16 L 52 14 L 56 16
                            L 58 20 L 60 25 L 62 30 L 64 36 L 66 44 L 67 52
                            L 66 62 L 64 72 L 62 82 L 60 95 L 56 95 L 57 85
                            L 58 75 L 58 70 L 54 70 L 53 75 L 52 85 L 51 95
                            L 47 95 L 48 85 L 49 75 L 48 70 L 44 72 Z
                            M 40 45 L 36 48 L 32 50 L 28 50 L 25 48 L 27 45
                            L 30 43 L 34 42 L 38 42 Z
                            M 58 20 L 62 18 L 66 18 L 70 20 L 68 22 L 64 22 Z
                            M 63 50 L 68 48 L 73 48 L 76 50 L 73 52 L 68 52 Z
                            M 42 92 L 38 88 L 36 86 L 38 84 L 40 86 Z
                            M 53 17 Q 54 16 55 17
                        " fill="${dinoColor}"/>
                    </svg>
                `;
            }
            
            return dino;
        }
        
        function dropDinosaur() {
            if (missed >= maxMissed) {
                title.textContent = 'Dinosaurs Escaped!';
                instruction.textContent = `Final Score: ${score}`;
                document.removeEventListener('mousemove', moveCatcher);
                document.removeEventListener('touchmove', moveCatcherTouch);
                createAboutCelebration();
                setTimeout(() => gameContainer.remove(), 3000);
                return;
            }
            
            const type = dinoTypes[Math.floor(Math.random() * dinoTypes.length)];
            const dino = createDinoShape(type);
            gameArea.appendChild(dino);
            
            const checkInterval = setInterval(() => {
                const dinoRect = dino.getBoundingClientRect();
                const catcherRect = catcher.getBoundingClientRect();
                
                if (dinoRect.bottom >= catcherRect.top &&
                    dinoRect.left < catcherRect.right &&
                    dinoRect.right > catcherRect.left) {
                    score++;
                    scoreDiv.textContent = `Collected: ${score} | Escaped: ${missed}/${maxMissed}`;
                    dino.remove();
                    clearInterval(checkInterval);
                    
                    // Create professional sparkle effect
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            const sparkle = document.createElement('div');
                            sparkle.style.cssText = `
                                position: fixed;
                                left: ${catcherRect.left + Math.random() * catcherRect.width}px;
                                top: ${catcherRect.top + Math.random() * catcherRect.height}px;
                                width: 8px;
                                height: 8px;
                                background: radial-gradient(circle, #ffd700 0%, transparent 100%);
                                border-radius: 50%;
                                box-shadow: 0 0 10px #ffd700;
                                animation: sparkle-float 1s ease-out forwards;
                                pointer-events: none;
                            `;
                            effectContainer.appendChild(sparkle);
                            setTimeout(() => sparkle.remove(), 1000);
                        }, i * 80);
                    }
                    
                    if (score >= 20) {
                        title.textContent = 'Dinosaur Expert!';
                        instruction.textContent = 'You collected them all!';
                        document.removeEventListener('mousemove', moveCatcher);
                        document.removeEventListener('touchmove', moveCatcherTouch);
                        createAboutCelebration();
                        setTimeout(() => gameContainer.remove(), 3000);
                    }
                } else if (dinoRect.top > window.innerHeight) {
                    missed++;
                    scoreDiv.textContent = `Collected: ${score} | Escaped: ${missed}/${maxMissed}`;
                    dino.remove();
                    clearInterval(checkInterval);
                }
            }, 50);
            
            setTimeout(() => {
                clearInterval(checkInterval);
                dino.remove();
            }, 3500);
        }
        
        scoreDiv.textContent = `Collected: 0 | Escaped: 0/${maxMissed}`;
        const dropInterval = setInterval(() => {
            if (missed >= maxMissed || score >= 20) {
                clearInterval(dropInterval);
            } else {
                dropDinosaur();
            }
        }, 900);
    }
    
    // BLOG.HTML - Immersive Aurora Wave → Word Association Game
    function blogEasterEgg(clickCount) {
        if (clickCount <= 5) {
            createAuroraWave(clickCount);
        } else {
            startWordGame();
        }
    }
    
    function createAuroraWave(intensity) {
        // Create multiple wave layers for depth
        const waveCount = 3 + intensity;
        const colors = [
            ['rgba(255, 0, 150, 0.4)', 'rgba(255, 100, 200, 0.3)', 'rgba(148, 0, 211, 0.2)'],
            ['rgba(0, 191, 255, 0.4)', 'rgba(30, 144, 255, 0.3)', 'rgba(65, 105, 225, 0.2)'],
            ['rgba(255, 215, 0, 0.4)', 'rgba(255, 165, 0, 0.3)', 'rgba(255, 140, 0, 0.2)'],
            ['rgba(0, 255, 127, 0.4)', 'rgba(50, 205, 50, 0.3)', 'rgba(34, 139, 34, 0.2)'],
            ['rgba(186, 85, 211, 0.4)', 'rgba(138, 43, 226, 0.3)', 'rgba(147, 112, 219, 0.2)']
        ];
        
        for (let i = 0; i < waveCount; i++) {
            setTimeout(() => {
                const wave = document.createElement('div');
                const colorSet = colors[i % colors.length];
                const startSide = Math.random() > 0.5 ? 'left' : 'right';
                const verticalPos = Math.random() * 100;
                
                wave.style.cssText = `
                    position: fixed;
                    ${startSide}: -100%;
                    top: ${verticalPos}%;
                    width: 200%;
                    height: ${40 + intensity * 10}vh;
                    background: linear-gradient(${startSide === 'left' ? '90' : '270'}deg,
                        ${colorSet[0]} 0%,
                        ${colorSet[1]} 50%,
                        ${colorSet[2]} 100%);
                    transform: translateY(-50%) skewY(${Math.random() * 6 - 3}deg);
                    border-radius: 50%;
                    filter: blur(40px);
                    pointer-events: none;
                    z-index: 9998;
                    animation: aurora-sweep-${startSide} ${3 - intensity * 0.3}s ease-out forwards;
                    opacity: 0;
                `;
                effectContainer.appendChild(wave);
                setTimeout(() => wave.remove(), 3000);
            }, i * (400 - intensity * 40));
        }
        
        // Add particle burst
        for (let i = 0; i < 20 + (intensity * 5); i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const size = Math.random() * 6 + 3;
                const color = colors[Math.floor(Math.random() * colors.length)][0];
                
                particle.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    box-shadow: 0 0 ${size * 3}px ${color};
                    pointer-events: none;
                    animation: particle-burst ${1 + Math.random()}s ease-out forwards;
                `;
                effectContainer.appendChild(particle);
                setTimeout(() => particle.remove(), 2000);
            }, i * 30);
        }
    }
    
    function startWordGame() {
        const gameContainer = document.createElement('div');
        gameContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90vw;
            max-width: 520px;
            max-height: 90vh;
            overflow-y: auto;
            padding: 30px 20px;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            border-radius: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        `;
        
        const title = document.createElement('div');
        title.textContent = 'Color Memory';
        title.style.cssText = 'color: white; font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 10px;';
        
        const instruction = document.createElement('div');
        instruction.textContent = 'Watch the pattern, then repeat it';
        instruction.style.cssText = 'color: rgba(255,255,255,0.9); font-size: 16px; text-align: center; margin-bottom: 25px;';
        
        const colorGrid = document.createElement('div');
        colorGrid.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; max-width: 400px; margin: 0 auto 20px auto;';
        
        const scoreDiv = document.createElement('div');
        scoreDiv.style.cssText = 'color: white; font-size: 20px; font-weight: bold; text-align: center; margin-top: 15px;';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.3); color: white; border: 2px solid white; font-size: 24px; font-weight: bold; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; z-index: 10002;';
        closeBtn.addEventListener('click', () => {
            createQuickCelebration();
            setTimeout(() => gameContainer.remove(), 800);
        });
        
        gameContainer.appendChild(closeBtn);
        gameContainer.appendChild(title);
        gameContainer.appendChild(instruction);
        gameContainer.appendChild(colorGrid);
        gameContainer.appendChild(scoreDiv);
        document.body.appendChild(gameContainer);
        
        // Define vibrant colors for the game
        const gameColors = [
            { color: '#FF3B30', name: 'red', glow: 'rgba(255, 59, 48, 0.6)' },
            { color: '#34C759', name: 'green', glow: 'rgba(52, 199, 89, 0.6)' },
            { color: '#007AFF', name: 'blue', glow: 'rgba(0, 122, 255, 0.6)' },
            { color: '#FFD60A', name: 'yellow', glow: 'rgba(255, 214, 10, 0.6)' },
            { color: '#FF9500', name: 'orange', glow: 'rgba(255, 149, 0, 0.6)' },
            { color: '#AF52DE', name: 'purple', glow: 'rgba(175, 82, 222, 0.6)' },
            { color: '#FF2D92', name: 'pink', glow: 'rgba(255, 45, 146, 0.6)' },
            { color: '#00C7BE', name: 'cyan', glow: 'rgba(0, 199, 190, 0.6)' },
            { color: '#5E5CE6', name: 'indigo', glow: 'rgba(94, 92, 230, 0.6)' }
        ];
        
        let sequence = [];
        let playerSequence = [];
        let level = 1;
        let isPlaying = false;
        let canClick = false;
        
        // Create color buttons
        const colorButtons = [];
        gameColors.forEach((colorData) => {
            const btn = document.createElement('div');
            btn.dataset.color = colorData.name;
            btn.style.cssText = `
                width: 100%;
                aspect-ratio: 1;
                border-radius: 15px;
                background: ${colorData.color};
                cursor: pointer;
                transition: all 0.15s ease;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                position: relative;
                overflow: hidden;
            `;
            
            // Add shine effect
            const shine = document.createElement('div');
            shine.style.cssText = `
                position: absolute;
                top: 10%;
                left: 10%;
                width: 40%;
                height: 40%;
                background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
            `;
            btn.appendChild(shine);
            
            btn.addEventListener('mousedown', () => {
                if (canClick && !isPlaying) {
                    btn.style.transform = 'scale(0.95)';
                }
            });
            
            btn.addEventListener('mouseup', () => {
                btn.style.transform = 'scale(1)';
            });
            
            btn.addEventListener('click', () => {
                if (!isPlaying && canClick) {
                    handlePlayerClick(colorData.name);
                    flashButton(btn, colorData);
                }
            });
            
            colorButtons.push({ btn, data: colorData });
            colorGrid.appendChild(btn);
        });
        
        function flashButton(btn, colorData, duration = 400) {
            btn.style.background = `radial-gradient(circle, #ffffff 0%, ${colorData.color} 100%)`;
            btn.style.boxShadow = `0 0 30px ${colorData.glow}, 0 4px 15px rgba(0,0,0,0.3)`;
            btn.style.transform = 'scale(1.05)';
            
            // Play a tone (visual indication only, no actual sound)
            const pulse = document.createElement('div');
            pulse.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                animation: color-pulse 0.4s ease-out forwards;
            `;
            btn.appendChild(pulse);
            setTimeout(() => pulse.remove(), 400);
            
            setTimeout(() => {
                btn.style.background = colorData.color;
                btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                btn.style.transform = 'scale(1)';
            }, duration);
        }
        
        function playSequence() {
            isPlaying = true;
            canClick = false;
            instruction.textContent = 'Watch carefully...';
            
            sequence.forEach((colorName, index) => {
                setTimeout(() => {
                    const colorBtn = colorButtons.find(cb => cb.data.name === colorName);
                    if (colorBtn) {
                        flashButton(colorBtn.btn, colorBtn.data, 600);
                    }
                    
                    if (index === sequence.length - 1) {
                        setTimeout(() => {
                            isPlaying = false;
                            canClick = true;
                            instruction.textContent = 'Your turn! Repeat the pattern';
                        }, 700);
                    }
                }, index * 900);
            });
        }
        
        function handlePlayerClick(colorName) {
            playerSequence.push(colorName);
            
            const currentIndex = playerSequence.length - 1;
            if (playerSequence[currentIndex] !== sequence[currentIndex]) {
                // Wrong color
                instruction.textContent = 'Wrong pattern! Try from level 1';
                instruction.style.color = '#ff6b6b';
                canClick = false;
                setTimeout(() => {
                    instruction.style.color = 'rgba(255,255,255,0.9)';
                    level = 1;
                    sequence = [];
                    playerSequence = [];
                    nextRound();
                }, 1500);
                return;
            }
            
            if (playerSequence.length === sequence.length) {
                // Completed sequence correctly
                if (level >= 10) {
                    title.textContent = 'Perfect Memory!';
                    instruction.textContent = 'You completed all 10 levels!';
                    instruction.style.color = '#4ade80';
                    canClick = false;
                    createBlogCelebration();
                    setTimeout(() => gameContainer.remove(), 3000);
                } else {
                    level++;
                    playerSequence = [];
                    scoreDiv.textContent = `Level: ${level}`;
                    instruction.textContent = 'Correct! Next pattern...';
                    instruction.style.color = '#4ade80';
                    canClick = false;
                    setTimeout(() => {
                        instruction.style.color = 'rgba(255,255,255,0.9)';
                        nextRound();
                    }, 1200);
                }
            }
        }
        
        function nextRound() {
            // Add one more color to the sequence
            const randomColor = gameColors[Math.floor(Math.random() * gameColors.length)];
            sequence.push(randomColor.name);
            playerSequence = [];
            playSequence();
        }
        
        // Add animation CSS
        if (!document.getElementById('color-memory-animations')) {
            const style = document.createElement('style');
            style.id = 'color-memory-animations';
            style.textContent = `
                @keyframes color-pulse {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(3);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        scoreDiv.textContent = `Level: ${level}`;
        setTimeout(() => nextRound(), 500);
    }
    
    // CARPET-CLEANING.HTML - Ripple Wave → Pattern Recognition Game
    function carpetEasterEgg(clickCount) {
        if (clickCount <= 5) {
            createRippleWave();
        } else {
            startPatternGame();
        }
    }
    
    function createRippleWave() {
        // Create multiple layered waves for dramatic impact
        const centerX = 50;
        const centerY = window.innerHeight - 50;
        const colors = [
            'rgba(70, 130, 180, 0.5)',
            'rgba(100, 149, 237, 0.5)',
            'rgba(65, 105, 225, 0.5)',
            'rgba(30, 144, 255, 0.5)'
        ];
        
        // Create 6 expanding waves for dramatic effect
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const wave = document.createElement('div');
                wave.style.cssText = `
                    position: fixed;
                    left: ${centerX}%;
                    bottom: 50px;
                    transform: translateX(-50%);
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: ${colors[i % colors.length]};
                    box-shadow: 
                        0 0 30px ${colors[i % colors.length]},
                        inset 0 0 20px rgba(255, 255, 255, 0.3);
                    animation: ripple-wave-expand 2.5s ease-out forwards;
                    pointer-events: none;
                    z-index: ${9900 + i};
                `;
                effectContainer.appendChild(wave);
                setTimeout(() => wave.remove(), 2500);
            }, i * 150);
        }
        
        // Add particle burst for extra impact
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const angle = (Math.PI * 2 * i) / 20;
                const distance = 150 + Math.random() * 100;
                const size = Math.random() * 8 + 4;
                
                particle.style.cssText = `
                    position: fixed;
                    left: ${centerX}%;
                    bottom: 50px;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: radial-gradient(circle, 
                        rgba(135, 206, 250, 1) 0%,
                        rgba(70, 130, 180, 0.8) 100%);
                    box-shadow: 0 0 10px rgba(135, 206, 250, 0.8);
                    pointer-events: none;
                    z-index: 9950;
                `;
                
                // Animate particle
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;
                
                particle.animate([
                    { 
                        transform: 'translate(-50%, -50%) scale(0.3)',
                        opacity: 1
                    },
                    { 
                        transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1)`,
                        opacity: 0.6,
                        offset: 0.7
                    },
                    { 
                        transform: `translate(calc(-50% + ${endX * 1.2}px), calc(-50% + ${endY * 1.2}px)) scale(0.2)`,
                        opacity: 0
                    }
                ], {
                    duration: 1500,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });
                
                effectContainer.appendChild(particle);
                setTimeout(() => particle.remove(), 1500);
            }, 300 + i * 30);
        }
        
        // Add sweeping light rays
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const ray = document.createElement('div');
                const angle = (360 / 8) * i;
                
                ray.style.cssText = `
                    position: fixed;
                    left: ${centerX}%;
                    bottom: 50px;
                    width: 4px;
                    height: 200px;
                    background: linear-gradient(to top,
                        rgba(135, 206, 250, 0.8) 0%,
                        rgba(100, 149, 237, 0.6) 50%,
                        transparent 100%);
                    transform-origin: bottom center;
                    transform: translateX(-50%) rotate(${angle}deg);
                    box-shadow: 0 0 15px rgba(135, 206, 250, 0.8);
                    pointer-events: none;
                    animation: ray-extend 1.2s ease-out forwards;
                    z-index: 9940;
                `;
                effectContainer.appendChild(ray);
                setTimeout(() => ray.remove(), 1200);
            }, 200 + i * 60);
        }
        
        // Add CSS animations if not already present
        if (!document.getElementById('carpet-wave-animations')) {
            const style = document.createElement('style');
            style.id = 'carpet-wave-animations';
            style.textContent = `
                @keyframes ripple-wave-expand {
                    0% {
                        transform: translateX(-50%) scale(0.2);
                        opacity: 0.8;
                    }
                    50% {
                        opacity: 0.6;
                    }
                    100% {
                        transform: translateX(-50%) scale(12);
                        opacity: 0;
                    }
                }
                @keyframes ray-extend {
                    0% {
                        height: 0;
                        opacity: 1;
                    }
                    70% {
                        height: 250px;
                        opacity: 0.8;
                    }
                    100% {
                        height: 200px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function startPatternGame() {
        const gameContainer = document.createElement('div');
        gameContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90vw;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            padding: 20px;
            background: linear-gradient(135deg, #4a90e2 0%, #7b68ee 100%);
            border-radius: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        `;
        
        const title = document.createElement('div');
        title.textContent = 'Pattern Recognition';
        title.style.cssText = 'color: white; font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 20px;';
        
        const instruction = document.createElement('div');
        instruction.textContent = 'Remember the pattern and repeat it';
        instruction.style.cssText = 'color: rgba(255,255,255,0.9); font-size: 16px; text-align: center; margin-bottom: 20px;';
        
        const grid = document.createElement('div');
        grid.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 15px;';
        
        const scoreDiv = document.createElement('div');
        scoreDiv.style.cssText = 'color: white; font-size: 20px; font-weight: bold; text-align: center;';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.3); color: white; border: 2px solid white; font-size: 24px; font-weight: bold; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; z-index: 10002;';
        closeBtn.addEventListener('click', () => {
            createQuickCelebration();
            setTimeout(() => gameContainer.remove(), 800);
        });
        
        gameContainer.appendChild(closeBtn);
        gameContainer.appendChild(title);
        gameContainer.appendChild(instruction);
        gameContainer.appendChild(grid);
        gameContainer.appendChild(scoreDiv);
        document.body.appendChild(gameContainer);
        
        const tiles = [];
        let sequence = [];
        let playerSequence = [];
        let level = 1;
        let isPlaying = false;
        
        // Create 9 tiles
        for (let i = 0; i < 9; i++) {
            const tile = document.createElement('div');
            tile.dataset.index = i;
            tile.style.cssText = `
                background: rgba(255,255,255,0.2);
                height: 90px;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.2s;
                border: 2px solid rgba(255,255,255,0.3);
            `;
            tile.addEventListener('click', () => handleTileClick(i));
            grid.appendChild(tile);
            tiles.push(tile);
        }
        
        function lightUpTile(index) {
            return new Promise(resolve => {
                tiles[index].style.background = 'rgba(255,255,255,0.9)';
                tiles[index].style.transform = 'scale(0.95)';
                setTimeout(() => {
                    tiles[index].style.background = 'rgba(255,255,255,0.2)';
                    tiles[index].style.transform = 'scale(1)';
                    setTimeout(resolve, 200);
                }, 500);
            });
        }
        
        async function playSequence() {
            isPlaying = true;
            instruction.textContent = 'Watch the pattern...';
            for (let index of sequence) {
                await lightUpTile(index);
            }
            instruction.textContent = 'Now repeat the pattern!';
            isPlaying = false;
        }
        
        function handleTileClick(index) {
            if (isPlaying) return;
            
            playerSequence.push(index);
            tiles[index].style.background = 'rgba(255,255,255,0.9)';
            setTimeout(() => {
                tiles[index].style.background = 'rgba(255,255,255,0.2)';
            }, 200);
            
            const currentStep = playerSequence.length - 1;
            if (playerSequence[currentStep] !== sequence[currentStep]) {
                instruction.textContent = 'Wrong! Game Over';
                scoreDiv.textContent = `Final Level: ${level - 1}`;
                createCarpetCelebration();
                setTimeout(() => gameContainer.remove(), 3000);
                return;
            }
            
            if (playerSequence.length === sequence.length) {
                if (level >= 10) {
                    title.textContent = 'Perfect!';
                    instruction.textContent = 'You completed all levels!';
                    createCarpetCelebration();
                    setTimeout(() => gameContainer.remove(), 3000);
                } else {
                    level++;
                    scoreDiv.textContent = `Level: ${level}`;
                    playerSequence = [];
                    setTimeout(nextRound, 1000);
                }
            }
        }
        
        function nextRound() {
            sequence.push(Math.floor(Math.random() * 9));
            playSequence();
        }
        
        scoreDiv.textContent = `Level: ${level}`;
        nextRound();
    }
    
    // WINDOW-WASHING.HTML - Light Bursts → Window Cleaning Game
    function windowEasterEgg(clickCount) {
        if (clickCount <= 5) {
            createLightBursts(clickCount);
        } else {
            startWindowCleaningGame();
        }
    }
    
    function createLightBursts(intensity) {
        // Create multiple light bursts radiating from footer
        const centerX = 50;
        const burstCount = 8 + (intensity * 4);
        
        // Create radial light burst pattern
        for (let i = 0; i < burstCount; i++) {
            setTimeout(() => {
                const burst = document.createElement('div');
                const angle = (360 / burstCount) * i + Math.random() * 20;
                const distance = 100 + Math.random() * 150;
                const size = Math.random() * 30 + 20;
                
                burst.style.cssText = `
                    position: fixed;
                    left: ${centerX}%;
                    bottom: 50px;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: radial-gradient(circle,
                        rgba(255, 255, 255, 1) 0%,
                        rgba(173, 216, 230, 0.8) 30%,
                        rgba(135, 206, 250, 0.4) 70%,
                        transparent 100%);
                    box-shadow: 
                        0 0 20px rgba(173, 216, 230, 0.8),
                        0 0 40px rgba(135, 206, 250, 0.6),
                        inset 0 0 15px rgba(255, 255, 255, 0.5);
                    pointer-events: none;
                    z-index: ${9900 + i};
                `;
                
                const endX = Math.cos(angle * Math.PI / 180) * distance;
                const endY = Math.sin(angle * Math.PI / 180) * distance;
                
                burst.animate([
                    {
                        transform: 'translate(-50%, -50%) scale(0.2)',
                        opacity: 1
                    },
                    {
                        transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1.2)`,
                        opacity: 0.8,
                        offset: 0.6
                    },
                    {
                        transform: `translate(calc(-50% + ${endX * 1.3}px), calc(-50% + ${endY * 1.3}px)) scale(0.4)`,
                        opacity: 0
                    }
                ], {
                    duration: 1500,
                    easing: 'ease-out'
                });
                
                effectContainer.appendChild(burst);
                setTimeout(() => burst.remove(), 1500);
            }, i * 40);
        }
        
        // Add sweeping light waves
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const wave = document.createElement('div');
                wave.style.cssText = `
                    position: fixed;
                    left: ${centerX}%;
                    bottom: 50px;
                    transform: translateX(-50%);
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    border: 3px solid rgba(173, 216, 230, 0.6);
                    box-shadow: 
                        0 0 20px rgba(173, 216, 230, 0.8),
                        inset 0 0 20px rgba(255, 255, 255, 0.3);
                    pointer-events: none;
                    z-index: 9890;
                `;
                
                wave.animate([
                    {
                        transform: 'translateX(-50%) scale(0.5)',
                        opacity: 0.9
                    },
                    {
                        transform: 'translateX(-50%) scale(8)',
                        opacity: 0
                    }
                ], {
                    duration: 2000,
                    easing: 'ease-out'
                });
                
                effectContainer.appendChild(wave);
                setTimeout(() => wave.remove(), 2000);
            }, i * 200);
        }
    }
    
    // REVIEWS.HTML - Falling Stars → Star Burst Tap Game
    function reviewsEasterEgg(clickCount) {
        if (clickCount <= 5) {
            createFallingStars(clickCount * 3);
        } else {
            startStarBurstGame();
        }
    }
    
    function createFallingStars(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                const size = Math.random() * 25 + 20;
                const colors = [
                    ['#FFD700', '#FFA500'],
                    ['#FFFFFF', '#E0E0E0'],
                    ['#87CEEB', '#4682B4'],
                    ['#FFB6C1', '#FF69B4']
                ];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                star.innerHTML = `
                    <svg viewBox="0 0 100 100" style="width: ${size}px; height: ${size}px;">
                        <defs>
                            <linearGradient id="starGrad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:${color[0]};stop-opacity:1" />
                                <stop offset="100%" style="stop-color:${color[1]};stop-opacity:1" />
                            </linearGradient>
                            <radialGradient id="starGlow${i}">
                                <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:0.8" />
                                <stop offset="100%" style="stop-color:${color[0]};stop-opacity:0" />
                            </radialGradient>
                        </defs>
                        <path d="M 50 10 L 61 40 L 93 40 L 67 58 L 78 88 L 50 70 L 22 88 L 33 58 L 7 40 L 39 40 Z" 
                              fill="url(#starGrad${i})" 
                              stroke="#FFFFFF" 
                              stroke-width="2"
                              filter="drop-shadow(0 0 8px ${color[0]})" />
                        <circle cx="50" cy="50" r="35" fill="url(#starGlow${i})" opacity="0.3"/>
                    </svg>
                `;
                
                star.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -50px;
                    pointer-events: none;
                    animation: star-fall ${Math.random() * 2 + 2}s linear forwards;
                    z-index: ${9900 + i};
                `;
                effectContainer.appendChild(star);
                setTimeout(() => star.remove(), 4000);
            }, i * 150);
        }
    }
    
    function startStarBurstGame() {
        const gameContainer = document.createElement('div');
        gameContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90vw;
            max-width: 450px;
            padding: 30px;
            background: linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%);
            border-radius: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        `;
        
        const title = document.createElement('div');
        title.textContent = 'Celestial Tic-Tac-Toe';
        title.style.cssText = 'color: #FFD700; font-size: 26px; font-weight: bold; text-align: center; margin-bottom: 20px; text-shadow: 0 0 10px rgba(255,215,0,0.5);';
        
        const board = document.createElement('div');
        board.style.cssText = `
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            max-width: 350px;
            margin: 0 auto 20px auto;
            aspect-ratio: 1;
        `;
        
        const statusDiv = document.createElement('div');
        statusDiv.style.cssText = 'color: white; font-size: 18px; text-align: center; margin-top: 15px; height: 25px;';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.2); color: white; border: 2px solid rgba(255,255,255,0.3); font-size: 24px; font-weight: bold; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; z-index: 10002;';
        closeBtn.addEventListener('click', () => {
            createQuickCelebration();
            setTimeout(() => gameContainer.remove(), 800);
        });
        
        gameContainer.appendChild(closeBtn);
        gameContainer.appendChild(title);
        gameContainer.appendChild(board);
        gameContainer.appendChild(statusDiv);
        document.body.appendChild(gameContainer);
        
        let currentPlayer = 'star';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;
        
        function createStar() {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 100 100');
            svg.style.cssText = 'width: 70%; height: 70%;';
            
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', `starGrad${Math.random()}`);
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('style', 'stop-color:#FFD700;stop-opacity:1');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('style', 'stop-color:#FFA500;stop-opacity:1');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            svg.appendChild(defs);
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M 50 10 L 61 40 L 93 40 L 67 58 L 78 88 L 50 70 L 22 88 L 33 58 L 7 40 L 39 40 Z');
            path.setAttribute('fill', `url(#${gradient.getAttribute('id')})`);
            path.setAttribute('stroke', '#FFFFFF');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('filter', 'drop-shadow(0 0 10px #FFD700)');
            svg.appendChild(path);
            
            return svg;
        }
        
        function createMoon() {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 100 100');
            svg.style.cssText = 'width: 70%; height: 70%;';
            
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
            gradient.setAttribute('id', `moonGrad${Math.random()}`);
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('style', 'stop-color:#FFFFFF;stop-opacity:1');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('style', 'stop-color:#D3D3D3;stop-opacity:1');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            svg.appendChild(defs);
            
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '50');
            circle.setAttribute('cy', '50');
            circle.setAttribute('r', '40');
            circle.setAttribute('fill', `url(#${gradient.getAttribute('id')})`);
            circle.setAttribute('stroke', '#E0E0E0');
            circle.setAttribute('stroke-width', '2');
            circle.setAttribute('filter', 'drop-shadow(0 0 10px rgba(255,255,255,0.7))');
            svg.appendChild(circle);
            
            // Add craters
            const crater1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            crater1.setAttribute('cx', '40');
            crater1.setAttribute('cy', '40');
            crater1.setAttribute('r', '8');
            crater1.setAttribute('fill', 'rgba(180,180,180,0.5)');
            svg.appendChild(crater1);
            
            const crater2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            crater2.setAttribute('cx', '60');
            crater2.setAttribute('cy', '55');
            crater2.setAttribute('r', '6');
            crater2.setAttribute('fill', 'rgba(180,180,180,0.5)');
            svg.appendChild(crater2);
            
            return svg;
        }
        
        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            
            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    return gameBoard[a];
                }
            }
            
            if (!gameBoard.includes('')) {
                return 'tie';
            }
            
            return null;
        }
        
        function handleCellClick(index, cell) {
            if (!gameActive || gameBoard[index] !== '') return;
            
            gameBoard[index] = currentPlayer;
            cell.innerHTML = '';
            cell.appendChild(currentPlayer === 'star' ? createStar() : createMoon());
            cell.style.pointerEvents = 'none';
            
            const winner = checkWinner();
            if (winner) {
                gameActive = false;
                if (winner === 'star') {
                    statusDiv.textContent = 'Stars Win!';
                    createConfetti();
                } else if (winner === 'moon') {
                    statusDiv.textContent = 'Moon Wins!';
                    createConfetti();
                } else {
                    statusDiv.textContent = "It's a Tie!";
                }
                setTimeout(() => {
                    gameContainer.style.opacity = '0';
                    gameContainer.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => gameContainer.remove(), 500);
                }, 3000);
            } else {
                currentPlayer = currentPlayer === 'star' ? 'moon' : 'star';
                statusDiv.textContent = `${currentPlayer === 'star' ? 'Star' : 'Moon'}'s turn`;
            }
        }
        
        // Create board cells
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.style.cssText = `
                background: rgba(255,255,255,0.1);
                border: 3px solid rgba(255,255,255,0.3);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            cell.addEventListener('mouseenter', () => {
                if (gameActive && gameBoard[i] === '') {
                    cell.style.background = 'rgba(255,255,255,0.2)';
                    cell.style.borderColor = 'rgba(255,255,255,0.5)';
                }
            });
            
            cell.addEventListener('mouseleave', () => {
                if (gameActive && gameBoard[i] === '') {
                    cell.style.background = 'rgba(255,255,255,0.1)';
                    cell.style.borderColor = 'rgba(255,255,255,0.3)';
                }
            });
            
            cell.addEventListener('click', () => handleCellClick(i, cell));
            board.appendChild(cell);
        }
        
        statusDiv.textContent = "Star's turn";
    }
    
    // QUOTE.HTML - Light Sparkles → Bubble Pop Cleaning Game
    function quoteEasterEgg(clickCount) {
        if (clickCount <= 5) {
            createProfessionalSparkles(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        } else {
            startBubblePopGame();
        }
    }
    
    function startBubblePopGame() {
        const gameContainer = document.createElement('div');
        gameContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90vw;
            max-width: 500px;
            height: 85vh;
            max-height: 600px;
            background: linear-gradient(135deg, #7CB342 0%, #558B2F 100%);
            border-radius: 20px;
            padding: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            overflow: hidden;
        `;
        
        const title = document.createElement('div');
        title.textContent = 'Dino Blocks';
        title.style.cssText = 'color: white; font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 10px; text-shadow: 3px 3px 0 rgba(0,0,0,0.3);';
        
        const instruction = document.createElement('div');
        instruction.textContent = 'Mine the dino blocks!';
        instruction.style.cssText = 'color: white; font-size: 16px; text-align: center; margin-bottom: 10px;';
        
        const gameArea = document.createElement('div');
        gameArea.style.cssText = 'width: 100%; height: calc(100% - 140px); position: relative; background: linear-gradient(180deg, #87CEEB 0%, #7CB342 50%, #6D5C4D 100%); border-radius: 10px; overflow: hidden; box-shadow: inset 0 5px 15px rgba(0,0,0,0.3);';
        
        const scoreDiv = document.createElement('div');
        scoreDiv.style.cssText = 'color: white; font-size: 22px; font-weight: bold; text-align: center; margin-top: 10px; text-shadow: 2px 2px 0 rgba(0,0,0,0.3);';
        
        const timerDiv = document.createElement('div');
        timerDiv.style.cssText = 'color: white; font-size: 18px; text-align: center; margin-top: 5px;';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '\u2715';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.3); color: white; border: 2px solid white; font-size: 24px; font-weight: bold; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; z-index: 10002;';
        closeBtn.addEventListener('click', () => {
            if (spawnInterval) clearInterval(spawnInterval);
            if (timerInterval) clearInterval(timerInterval);
            createQuickCelebration();
            setTimeout(() => gameContainer.remove(), 800);
        });
        
        gameContainer.appendChild(closeBtn);
        gameContainer.appendChild(title);
        gameContainer.appendChild(instruction);
        gameContainer.appendChild(gameArea);
        gameContainer.appendChild(scoreDiv);
        gameContainer.appendChild(timerDiv);
        document.body.appendChild(gameContainer);
        
        let score = 0;
        let missed = 0;
        let timeLeft = 50;
        let spawnInterval;
        let timerInterval;
        
        const dinoBlocks = [
            { color: '#8B7355', shadow: '#6D5C4D', name: 'brown' },
            { color: '#A0826D', shadow: '#8B7355', name: 'tan' },
            { color: '#9E9E9E', shadow: '#757575', name: 'grey' },
            { color: '#6D4C41', shadow: '#5D4037', name: 'dark' }
        ];
        
        function createDinoBlock() {
            const block = document.createElement('div');
            const size = 50;
            const leftPos = Math.random() * (gameArea.offsetWidth - size);
            const fallDuration = Math.random() * 2 + 3;
            const blockType = dinoBlocks[Math.floor(Math.random() * dinoBlocks.length)];
            
            block.style.cssText = `
                position: absolute;
                left: ${leftPos}px;
                top: -${size}px;
                width: ${size}px;
                height: ${size}px;
                background: ${blockType.color};
                border: 3px solid ${blockType.shadow};
                box-shadow: inset -5px -5px 0 ${blockType.shadow},
 inset 5px 5px 0 rgba(255,255,255,0.3),
                            5px 5px 10px rgba(0,0,0,0.4);
                cursor: pointer;
                transition: all 0.1s;
                animation: drop-fall ${fallDuration}s linear forwards;
                image-rendering: pixelated;
            `;
            
            const dinoIcon = document.createElement('div');
            dinoIcon.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                opacity: 0.6;
            `;
            dinoIcon.innerHTML = `
                <svg viewBox="0 0 20 20" style="width: 70%; height: 70%; opacity: 0.4;">
                    <rect x="5" y="8" width="10" height="8" fill="black"/>
                    <rect x="6" y="6" width="3" height="2" fill="black"/>
                    <rect x="11" y="6" width="3" height="2" fill="black"/>
                    <rect x="4" y="14" width="2" height="4" fill="black"/>
                    <rect x="8" y="14" width="2" height="4" fill="black"/>
                    <rect x="12" y="14" width="2" height="4" fill="black"/>
                </svg>
            `;
            block.appendChild(dinoIcon);
            
            let mined = false;
            
            block.addEventListener('click', function() {
                if (!mined) {
                    mined = true;
                    score++;
                    scoreDiv.textContent = `Mined: ${score}`;
                    
                    this.style.transform = 'scale(0) rotate(45deg)';
                    this.style.opacity = '0';
                    
                    for (let i = 0; i < 8; i++) {
                        setTimeout(() => {
                            const particle = document.createElement('div');
                            const angle = (i / 8) * Math.PI * 2;
                            const distance = 30;
                            
                            particle.style.cssText = `
                                position: absolute;
                                left: ${leftPos + size/2 + Math.cos(angle) * distance}px;
                                top: ${parseInt(this.style.top) + size/2 + Math.sin(angle) * distance}px;
                                width: 6px;
                                height: 6px;
                                background: ${blockType.color};
                                border: 1px solid ${blockType.shadow};
                                opacity: 1;
                                animation: sparkle-fade-out 0.6s ease-out forwards;
                            `;
                            gameArea.appendChild(particle);
                            setTimeout(() => particle.remove(), 600);
                        }, i * 40);
                    }
                    
                    setTimeout(() => this.remove(), 200);
                    
                    if (score >= 50) {
                        clearInterval(spawnInterval);
                        clearInterval(timerInterval);
                        title.textContent = 'Master Miner!';
                        instruction.textContent = `${score} blocks mined!`;
                        createConfetti();
                        setTimeout(() => gameContainer.remove(), 3000);
                    }
                }
            });
            
            gameArea.appendChild(block);
            
            setTimeout(() => {
                if (!mined && block.parentNode) {
                    missed++;
                    block.remove();
                    
                    if (missed >= 20) {
                        clearInterval(spawnInterval);
                        clearInterval(timerInterval);
                        title.textContent = 'Out of Time!';
                        instruction.textContent = `Final Score: ${score} blocks`;
                        if (score >= 30) createConfetti();
                        setTimeout(() => gameContainer.remove(), 3000);
                    }
                }
            }, fallDuration * 1000);
        }
        
        scoreDiv.textContent = 'Mined: 0';
        timerDiv.textContent = `Time: ${timeLeft}s`;
        
        spawnInterval = setInterval(() => {
            if (missed < 20 && score < 50 && timeLeft > 0) {
                createDinoBlock();
                if (Math.random() > 0.6) {
                    setTimeout(() => createDinoBlock(), 300);
                }
            }
        }, 700);
        
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDiv.textContent = `Time: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(spawnInterval);
                clearInterval(timerInterval);
                title.textContent = 'Times Up!';
                instruction.textContent = `You mined ${score} blocks!`;
                if (score >= 30) createConfetti();
                setTimeout(() => gameContainer.remove(), 3000);
            }
        }, 1000);
    }
    
    // Helper functions
    function createProfessionalSparkles(x, y) {
        // Create radial burst of light particles
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                const angle = (i / 8) * Math.PI * 2;
                const distance = Math.random() * 60 + 40;
                const size = Math.random() * 12 + 6;
                
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: radial-gradient(circle, #ffffff, #ffd700, transparent);
                    border-radius: 50%;
                    box-shadow: 0 0 20px #ffd700;
                    opacity: 1;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    animation: sparkle-burst-${i} 1.5s ease-out forwards;
                `;
                
                // Create dynamic keyframe animation for each particle
                const styleSheet = document.styleSheets[0];
                const keyframes = `
                    @keyframes sparkle-burst-${i} {
                        0% {
                            transform: translate(-50%, -50%) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0);
                            opacity: 0;
                        }
                    }
                `;
                
                try {
                    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
                } catch (e) {
                    // Rule might already exist
                }
                
                effectContainer.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1500);
            }, i * 80);
        }
    }
    
    function createQuickCelebration() {
        // Quick colorful particle burst for game close events
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const angle = (Math.random() * Math.PI * 2);
                const distance = Math.random() * 300 + 100;
                const size = Math.random() * 10 + 5;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const startX = window.innerWidth / 2;
                const startY = window.innerHeight / 2;
                
                particle.style.cssText = `
                    position: fixed;
                    left: ${startX}px;
                    top: ${startY}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: radial-gradient(circle, ${color}, transparent);
                    border-radius: 50%;
                    box-shadow: 0 0 15px ${color};
                    opacity: 1;
                    pointer-events: none;
                    z-index: 10003;
                    animation: quick-celebration-${i} 0.8s ease-out forwards;
                `;
                
                // Create dynamic keyframe animation
                const styleSheet = document.styleSheets[0];
                const keyframes = `
                    @keyframes quick-celebration-${i} {
                        0% {
                            transform: translate(-50%, -50%) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0);
                            opacity: 0;
                        }
                    }
                `;
                
                try {
                    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
                } catch (e) {
                    // Rule might already exist
                }
                
                effectContainer.appendChild(particle);
                setTimeout(() => particle.remove(), 800);
            }, i * 20);
        }
    }
    
    // Page-Specific Celebration Effects
    function createCarpetCelebration() {
        // Blue wave celebration for carpet page - Professional cascade
        const colors = ['#4169e1', '#1e90ff', '#00bfff', '#87ceeb', '#4682b4', '#5f9ea0'];
        
        // Create wave effects
        for (let w = 0; w < 5; w++) {
            setTimeout(() => {
                const wave = document.createElement('div');
                wave.style.cssText = `
                    position: fixed;
                    left: -10%;
                    top: ${w * 20}%;
                    width: 120%;
                    height: 25vh;
                    background: linear-gradient(90deg,
                        transparent 0%,
                        ${colors[w % colors.length]} 50%,
                        transparent 100%);
                    opacity: 0;
                    pointer-events: none;
                    animation: wave-sweep 2s ease-out forwards;
                    transform: skewY(-2deg);
                    filter: blur(20px);
                `;
                effectContainer.appendChild(wave);
                setTimeout(() => wave.remove(), 2000);
            }, w * 200);
        }
        
        // Add particle burst
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -10px;
                    width: ${Math.random() * 10 + 4}px;
                    height: ${Math.random() * 10 + 4}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    box-shadow: 0 0 15px ${colors[Math.floor(Math.random() * colors.length)]};
                    animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
                `;
                effectContainer.appendChild(particle);
                setTimeout(() => particle.remove(), 5000);
            }, i * 20);
        }
    }
    
    function createBlogCelebration() {
        // Vibrant spectrum celebration for blog page
        const colors = ['#ff0080', '#ff69b4', '#ffd700', '#00ff7f', '#00bfff', '#9370db', '#ff1493'];
        
        // Create radial bursts from multiple points
        const burstPoints = [
            {x: 25, y: 25}, {x: 75, y: 25}, {x: 50, y: 50}, {x: 25, y: 75}, {x: 75, y: 75}
        ];
        
        burstPoints.forEach((point, index) => {
            setTimeout(() => {
                for (let i = 0; i < 15; i++) {
                    const beam = document.createElement('div');
                    const angle = (360 / 15) * i;
                    beam.style.cssText = `
                        position: fixed;
                        left: ${point.x}%;
                        top: ${point.y}%;
                        width: 4px;
                        height: 0;
                        background: linear-gradient(180deg,
                            ${colors[index % colors.length]} 0%,
                            ${colors[(index + 1) % colors.length]} 100%);
                        transform-origin: top center;
                        transform: rotate(${angle}deg);
                        box-shadow: 0 0 10px ${colors[index % colors.length]};
                        animation: beam-extend 1.5s ease-out forwards;
                        pointer-events: none;
                    `;
                    effectContainer.appendChild(beam);
                    setTimeout(() => beam.remove(), 1500);
                }
            }, index * 150);
        });
        
        // Add color wash overlay
        const wash = document.createElement('div');
        wash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg,
                rgba(255, 0, 128, 0.2) 0%,
                rgba(255, 215, 0, 0.2) 25%,
                rgba(0, 255, 127, 0.2) 50%,
                rgba(0, 191, 255, 0.2) 75%,
                rgba(147, 112, 219, 0.2) 100%);
            pointer-events: none;
            animation: color-pulse 2s ease-in-out;
        `;
        effectContainer.appendChild(wash);
        setTimeout(() => wash.remove(), 2000);
    }
    
    function createAboutCelebration() {
        // Prehistoric volcanic celebration with professional effects
        const volcanicColors = ['#ff4500', '#ff6347', '#ffa500', '#ff8c00', '#cd5c5c'];
        const plantColors = ['#228b22', '#32cd32', '#00ff7f', '#3cb371'];
        
        // Volcanic eruption effect from bottom
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const burst = document.createElement('div');
                const xPos = 40 + Math.random() * 20;
                burst.style.cssText = `
                    position: fixed;
                    left: ${xPos}%;
                    bottom: 0;
                    width: ${Math.random() * 60 + 40}px;
                    height: 0;
                    background: radial-gradient(ellipse at center,
                        ${volcanicColors[i % volcanicColors.length]} 0%,
                        transparent 70%);
                    filter: blur(10px);
                    pointer-events: none;
                    animation: volcanic-burst 2s ease-out forwards;
                    opacity: 0.8;
                `;
                effectContainer.appendChild(burst);
                setTimeout(() => burst.remove(), 2000);
            }, i * 100);
        }
        
        // Growing vegetation from sides
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const plant = document.createElement('div');
                const isLeft = i % 2 === 0;
                plant.style.cssText = `
                    position: fixed;
                    ${isLeft ? 'left' : 'right'}: 0;
                    bottom: ${Math.random() * 40}%;
                    width: ${Math.random() * 100 + 50}px;
                    height: ${Math.random() * 15 + 10}vh;
                    background: linear-gradient(${isLeft ? '45' : '135'}deg,
                        transparent 0%,
                        ${plantColors[i % plantColors.length]} 50%,
                        transparent 100%);
                    clip-path: polygon(
                        ${isLeft ? '100%' : '0%'} 0%,
                        ${isLeft ? '70%' : '30%'} 25%,
                        ${isLeft ? '80%' : '20%'} 50%,
                        ${isLeft ? '60%' : '40%'} 75%,
                        ${isLeft ? '50%' : '50%'} 100%,
                        ${isLeft ? '100%' : '0%'} 100%
                    );
                    pointer-events: none;
                    transform-origin: ${isLeft ? 'left' : 'right'} bottom;
                    animation: plant-sweep 1.5s ease-out forwards;
                    opacity: 0;
                `;
                effectContainer.appendChild(plant);
                setTimeout(() => plant.remove(), 1500);
            }, i * 80);
        }
        
        // Particle shower
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const color = [...volcanicColors, ...plantColors][Math.floor(Math.random() * 9)];
                particle.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -10px;
                    width: ${Math.random() * 8 + 3}px;
                    height: ${Math.random() * 8 + 3}px;
                    background: ${color};
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0%'};
                    box-shadow: 0 0 10px ${color};
                    animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
                    transform: rotate(${Math.random() * 360}deg);
                `;
                effectContainer.appendChild(particle);
                setTimeout(() => particle.remove(), 5000);
            }, i * 25);
        }
    }
    
    function createWindowCelebration() {
        // Crystal clear sparkle celebration for window washing page
        const sparkleColors = ['#ffffff', '#e0f7ff', '#b0e0e6', '#add8e6', '#87ceeb'];
        
        // Create diamond sparkle pattern
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 8; col++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.style.cssText = `
                        position: fixed;
                        left: ${col * 12.5 + 6.25}%;
                        top: ${row * 20 + 10}%;
                        width: 30px;
                        height: 30px;
                        background: radial-gradient(circle,
                            ${sparkleColors[0]} 0%,
                            ${sparkleColors[2]} 50%,
                            transparent 100%);
                        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                        pointer-events: none;
                        animation: sparkle-shine 1.5s ease-out forwards;
                        opacity: 0;
                        filter: blur(1px);
                        box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
                    `;
                    effectContainer.appendChild(sparkle);
                    setTimeout(() => sparkle.remove(), 1500);
                }, (row * 8 + col) * 30);
            }
        }
        
        // Add sweeping glass reflection
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sweep = document.createElement('div');
                sweep.style.cssText = `
                    position: fixed;
                    left: -20%;
                    top: ${i * 33}%;
                    width: 25%;
                    height: 35vh;
                    background: linear-gradient(90deg,
                        transparent 0%,
                        rgba(255, 255, 255, 0.6) 50%,
                        transparent 100%);
                    pointer-events: none;
                    animation: glass-sweep 2s ease-in-out forwards;
                    transform: skewX(-20deg);
                    filter: blur(5px);
                `;
                effectContainer.appendChild(sweep);
                setTimeout(() => sweep.remove(), 2000);
            }, i * 300);
        }
    }
    
    function createConfetti() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#ffd700'];
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -10px;
                    width: ${Math.random() * 10 + 5}px;
                    height: ${Math.random() * 10 + 5}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
                `;
                effectContainer.appendChild(confetti);
                setTimeout(() => confetti.remove(), 5000);
            }, i * 30);
        }
    }
    
    // Window Cleaning Game (Window-Washing page)
    function startWindowCleaningGame() {
        const gameContainer = document.createElement('div');
        gameContainer.id = 'chess-game-container';
        gameContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90vw;
            max-width: 460px;
            padding: 20px;
            background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
            border-radius: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        `;
        
        const gameTitle = document.createElement('div');
        gameTitle.textContent = 'Dinosaur Chess';
        gameTitle.style.cssText = `
            color: white;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 15px;
        `;
        
        const chessBoard = document.createElement('div');
        chessBoard.style.cssText = `
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 0;
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            aspect-ratio: 1;
            border: 4px solid #1C2833;
            border-radius: 8px;
            overflow: hidden;
        `;
        
        const statusDiv = document.createElement('div');
        statusDiv.style.cssText = `
            color: white;
            font-size: 16px;
            text-align: center;
            margin-top: 15px;
            font-weight: bold;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255,255,255,0.3);
            color: white;
            border: 2px solid white;
            font-size: 24px;
            font-weight: bold;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 10002;
        `;
        closeBtn.addEventListener('click', () => {
            createQuickCelebration();
            setTimeout(() => gameContainer.remove(), 800);
        });
        
        gameContainer.appendChild(closeBtn);
        gameContainer.appendChild(gameTitle);
        gameContainer.appendChild(chessBoard);
        gameContainer.appendChild(statusDiv);
        document.body.appendChild(gameContainer);
        
        let selectedPiece = null;
        let selectedSquare = null;
        let currentPlayer = 'light';
        let moveCount = 0;
        
        // Dinosaur chess pieces as SVG
        function createDinoPiece(type, color) {
            const fillColor = color === 'light' ? '#D4AF37' : '#5D4E37';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 60 60');
            svg.style.cssText = 'width: 100%; height: 100%; pointer-events: none;';
            
            let path = '';
            if (type === 'pawn') {
                path = 'M 30 10 L 25 15 L 25 25 L 20 30 L 20 40 L 22 45 L 25 50 L 35 50 L 38 45 L 40 40 L 40 30 L 35 25 L 35 15 Z M 28 12 Q 30 11 32 12';
            } else if (type === 'rook') {
                path = 'M 20 15 L 20 20 L 23 20 L 23 18 L 27 18 L 27 20 L 30 20 L 30 18 L 33 18 L 33 20 L 37 20 L 37 18 L 40 18 L 40 25 L 38 30 L 38 45 L 22 45 L 22 30 L 20 25 Z M 18 45 L 18 50 L 42 50 L 42 45 Z';
            } else if (type === 'knight') {
                path = 'M 35 12 L 32 10 L 28 10 L 25 12 L 23 15 L 22 20 L 22 25 L 24 30 L 26 32 L 26 40 L 24 45 L 24 48 L 36 48 L 36 45 L 34 40 L 34 32 L 38 28 L 40 22 L 40 18 L 38 14 Z M 32 14 Q 33 13 34 14';
            } else if (type === 'bishop') {
                path = 'M 30 8 L 27 12 L 26 16 L 26 22 L 24 28 L 22 35 L 22 45 L 38 45 L 38 35 L 36 28 L 34 22 L 34 16 L 33 12 Z M 20 45 L 20 50 L 40 50 L 40 45 Z M 29 10 Q 30 9 31 10';
            } else if (type === 'queen') {
                path = 'M 30 6 L 28 10 L 26 14 L 24 18 L 22 24 L 21 32 L 22 40 L 24 46 L 36 46 L 38 40 L 39 32 L 38 24 L 36 18 L 34 14 L 32 10 Z M 19 46 L 19 50 L 41 50 L 41 46 Z M 28 8 L 26 8 L 26 10 L 28 10 Z M 32 8 L 34 8 L 34 10 L 32 10 Z';
            } else if (type === 'king') {
                path = 'M 30 6 L 28 8 L 28 12 L 26 12 L 26 16 L 24 20 L 22 26 L 21 34 L 22 42 L 24 47 L 36 47 L 38 42 L 39 34 L 38 26 L 36 20 L 34 16 L 34 12 L 32 12 L 32 8 Z M 19 47 L 19 52 L 41 52 L 41 47 Z M 28 6 L 32 6 L 32 8 L 28 8 Z';
            }
            
            const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathElement.setAttribute('d', path);
            pathElement.setAttribute('fill', fillColor);
            pathElement.setAttribute('stroke', '#1C2833');
            pathElement.setAttribute('stroke-width', '1.5');
            svg.appendChild(pathElement);
            
            return svg;
        }
        
        // Initialize board
        const board = [
            ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
            ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
            ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
        ];
        
        const pieceColors = [];
        for (let row = 0; row < 8; row++) {
            pieceColors[row] = [];
            for (let col = 0; col < 8; col++) {
                if (row < 2) pieceColors[row][col] = 'dark';
                else if (row > 5) pieceColors[row][col] = 'light';
                else pieceColors[row][col] = null;
            }
        }
        
        function renderBoard() {
            chessBoard.innerHTML = '';
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    const square = document.createElement('div');
                    const isLight = (row + col) % 2 === 0;
                    square.style.cssText = `
                        background: ${isLight ? '#E8DCC4' : '#86654A'};
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: background 0.2s;
                        position: relative;
                    `;
                    
                    if (selectedSquare && selectedSquare.row === row && selectedSquare.col === col) {
                        square.style.background = '#7FB3D5';
                    }
                    
                    if (board[row][col]) {
                        const piece = createDinoPiece(board[row][col], pieceColors[row][col]);
                        square.appendChild(piece);
                    }
                    
                    square.addEventListener('click', () => handleSquareClick(row, col, square));
                    chessBoard.appendChild(square);
                }
            }
        }
        
        function handleSquareClick(row, col, square) {
            if (selectedPiece) {
                // Move piece
                if (board[row][col] === null || pieceColors[row][col] !== currentPlayer) {
                    board[row][col] = selectedPiece.type;
                    pieceColors[row][col] = currentPlayer;
                    board[selectedSquare.row][selectedSquare.col] = null;
                    pieceColors[selectedSquare.row][selectedSquare.col] = null;
                    
                    selectedPiece = null;
                    selectedSquare = null;
                    currentPlayer = currentPlayer === 'light' ? 'dark' : 'light';
                    moveCount++;
                    statusDiv.textContent = `Move ${moveCount} - ${currentPlayer === 'light' ? 'Gold' : 'Brown'}'s turn`;
                    
                    // Check for win condition (simplified - king captured)
                    let lightKing = false, darkKing = false;
                    for (let r = 0; r < 8; r++) {
                        for (let c = 0; c < 8; c++) {
                            if (board[r][c] === 'king') {
                                if (pieceColors[r][c] === 'light') lightKing = true;
                                if (pieceColors[r][c] === 'dark') darkKing = true;
                            }
                        }
                    }
                    
                    if (!lightKing || !darkKing) {
                        const winner = lightKing ? 'Gold' : 'Brown';
                        statusDiv.textContent = `${winner} wins!`;
                        createWindowCelebration();
                        setTimeout(() => {
                            gameContainer.style.opacity = '0';
                            gameContainer.style.transition = 'opacity 0.5s ease';
                            setTimeout(() => gameContainer.remove(), 500);
                        }, 3000);
                    }
                } else {
                    selectedPiece = null;
                    selectedSquare = null;
                }
                renderBoard();
            } else if (board[row][col] && pieceColors[row][col] === currentPlayer) {
                selectedPiece = { type: board[row][col], color: pieceColors[row][col] };
                selectedSquare = { row, col };
                renderBoard();
            }
        }
        
        statusDiv.textContent = `Move ${moveCount} - ${currentPlayer === 'light' ? 'Gold' : 'Brown'}'s turn`;
        renderBoard();
    }
    
    // Main click handler
    copyrightText.addEventListener('click', function(e) {
        clickCount++;
        clearTimeout(resetTimer);
        
        // Bounce the copyright text
        copyrightText.style.animation = 'none';
        setTimeout(() => {
            copyrightText.style.animation = 'bounce 0.5s ease';
        }, 10);
        
        // Route to page-specific easter egg
        if (currentPage.includes('index.html') || currentPage === '') {
            indexEasterEgg(clickCount);
        } else if (currentPage.includes('about.html')) {
            aboutEasterEgg(clickCount);
        } else if (currentPage.includes('blog.html')) {
            blogEasterEgg(clickCount);
        } else if (currentPage.includes('carpet-cleaning.html')) {
            carpetEasterEgg(clickCount);
        } else if (currentPage.includes('window-washing.html')) {
            windowEasterEgg(clickCount);
        } else if (currentPage.includes('reviews.html')) {
            reviewsEasterEgg(clickCount);
        } else if (currentPage.includes('quote.html')) {
            quoteEasterEgg(clickCount);
        }
        
        // Reset counter after 5 seconds of inactivity
        resetTimer = setTimeout(() => {
            clickCount = 0;
        }, 5000);
    });
    
    // Add cursor style
    copyrightText.style.cursor = 'pointer';
    copyrightText.style.userSelect = 'none';
});

// Add necessary CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle-float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes confetti-fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
    
    @keyframes rainbow {
        0% { color: #ff0000; }
        16.6% { color: #ff7f00; }
        33.3% { color: #ffff00; }
        50% { color: #00ff00; }
        66.6% { color: #0000ff; }
        83.3% { color: #8b00ff; }
        100% { color: #ff0000; }
    }
    
    @keyframes ripple-expand {
        0% {
            transform: translateX(-50%) scale(0);
            opacity: 0.6;
        }
        100% {
            transform: translateX(-50%) scale(10);
            opacity: 0;
        }
    }
    
    @keyframes ripple-wave {
        0% {
            transform: translateX(-50%) scale(0);
            opacity: 0.5;
        }
        100% {
            transform: translateX(-50%) scale(8);
            opacity: 0;
        }
    }
    
    @keyframes shimmer-pulse {
        0% {
            transform: translateX(-50%) scale(0);
            opacity: 0.4;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            transform: translateX(-50%) scale(6);
            opacity: 0;
        }
    }
    
    @keyframes gentle-fade {
        0% {
            transform: translateX(-50%) scale(0);
            opacity: 0.5;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            transform: translateX(-50%) scale(5);
            opacity: 0;
        }
    }
    
    @keyframes realistic-drop-fall {
        0% {
            transform: translateY(0) scaleY(1);
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) scaleY(1.2);
            opacity: 0;
        }
    }
    
    @keyframes splash-expand {
        0% {
            transform: scale(0);
            opacity: 0.8;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes lightning-flash {
        0%, 100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
    
    @keyframes lightning-bolt {
        0% {
            opacity: 0;
            transform: translateX(-50%) skewX(0deg) scaleY(0);
        }
        30% {
            opacity: 1;
            transform: translateX(-50%) skewX(var(--skew, 0deg)) scaleY(1);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) skewX(var(--skew, 0deg)) scaleY(1);
        }
    }
    
    @keyframes aurora-sweep-left {
        0% {
            left: -100%;
            opacity: 0;
        }
        30% {
            opacity: 0.9;
        }
        100% {
            left: 100%;
            opacity: 0;
        }
    }
    
    @keyframes aurora-sweep-right {
        0% {
            right: -100%;
            opacity: 0;
        }
        30% {
            opacity: 0.9;
        }
        100% {
            right: 100%;
            opacity: 0;
        }
    }
    
    @keyframes particle-burst {
        0% {
            transform: scale(0) translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: scale(2) translate(
                ${Math.random() * 200 - 100}px,
                ${Math.random() * 200 - 100}px
            );
            opacity: 0;
        }
    }
    
    @keyframes volcanic-pulse {
        0% {
            transform: translateX(-50%) scale(0.8);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateX(-50%) scale(1.2);
            opacity: 0;
        }
    }
    
    @keyframes plant-grow {
        0% {
            transform: scaleY(0);
            opacity: 0;
        }
        100% {
            transform: scaleY(1);
            opacity: 1;
        }
    }
    
    @keyframes plant-fade {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: scaleY(0.8);
        }
    }
    
    @keyframes meteor-fall {
        0% {
            transform: translate(0, -100px) rotate(25deg);
            opacity: 1;
        }
        100% {
            transform: translate(150px, 100vh) rotate(25deg);
            opacity: 0;
        }
    }
    
    @keyframes bounce-fall {
        0% {
            top: -50px;
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        70% {
            top: 80%;
        }
        85% {
            top: 70%;
        }
        100% {
            top: 80%;
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes scroll-left {
        0% {
            right: -50px;
            opacity: 1;
        }
        100% {
            right: 110%;
            opacity: 0;
        }
    }
    
    @keyframes vacuum-away {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateY(100vh);
            opacity: 0;
        }
    }
    
    @keyframes drop-fall {
        0% {
            top: -20px;
            opacity: 1;
        }
        100% {
            top: 100%;
            opacity: 0.3;
        }
    }
    
    @keyframes star-fall {
        0% {
            top: -30px;
            opacity: 1;
            transform: rotate(0deg);
        }
        100% {
            top: 100%;
            opacity: 0;
            transform: rotate(360deg);
        }
    }
    
    @keyframes pulse-glow {
        0%, 100% {
            filter: brightness(1) drop-shadow(0 0 5px currentColor);
        }
        50% {
            filter: brightness(1.2) drop-shadow(0 0 15px currentColor);
        }
    }
    
    @keyframes bubble-float {
        0% {
            bottom: -80px;
            opacity: 0.8;
        }
        100% {
            bottom: 120%;
            opacity: 0;
        }
    }
    
    @keyframes wave-sweep {
        0% {
            left: -120%;
            opacity: 0;
        }
        30% {
            opacity: 0.7;
        }
        100% {
            left: 100%;
            opacity: 0;
        }
    }
    
    @keyframes beam-extend {
        0% {
            height: 0;
            opacity: 1;
        }
        70% {
            height: 150vh;
            opacity: 0.8;
        }
        100% {
            height: 150vh;
            opacity: 0;
        }
    }
    
    @keyframes color-pulse {
        0%, 100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
    
    @keyframes volcanic-burst {
        0% {
            height: 0;
            opacity: 0;
        }
        50% {
            height: 80vh;
            opacity: 1;
        }
        100% {
            height: 100vh;
            opacity: 0;
        }
    }
    
    @keyframes plant-sweep {
        0% {
            transform: scaleX(0);
            opacity: 0;
        }
        50% {
            opacity: 0.9;
        }
        100% {
            transform: scaleX(1);
            opacity: 0;
        }
    }
    
    @keyframes sparkle-shine {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.8) rotate(360deg);
        }
    }
    
    @keyframes glass-sweep {
        0% {
            left: -25%;
            opacity: 0;
        }
        30% {
            opacity: 0.8;
        }
        100% {
            left: 120%;
            opacity: 0;
        }
    }
    
    @keyframes sparkle-fade-out {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.3);
        }
    }
    
    .easter-egg-trigger:hover {
        opacity: 0.8;
        transition: opacity 0.2s ease;
    }
`;
document.head.appendChild(style);
