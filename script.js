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
                    star.textContent = '⭐';
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
            response: "Thank you so much, I appreciate the review 😊",
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
        return '⭐'.repeat(rating);
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
                        💬 Response from the owner ${review.date}
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
        title.textContent = '🌈 Match the Colors!';
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
        closeBtn.addEventListener('click', () => gameContainer.remove());
        
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
                        scoreDiv.textContent = `Score: ${score} 🎉`;
                        if (score >= 10) {
                            title.textContent = '🏆 Color Master!';
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
            gameContainer.remove();
        });
        
        gameContainer.appendChild(closeBtn);
        gameContainer.appendChild(title);
        gameContainer.appendChild(instruction);
        gameContainer.appendChild(gameArea);
        gameArea.appendChild(catcher);
        gameContainer.appendChild(scoreDiv);
        document.body.appendChild(gameContainer);
        
        const dinoTypes = [
            { color: '#228b22', size: 45, shape: 'trex' },
            { color: '#32cd32', size: 40, shape: 'long' },
            { color: '#3cb371', size: 35, shape: 'stego' },
            { color: '#00ff7f', size: 38, shape: 'raptor' }
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
                top: -50px;
                width: ${type.size}px;
                height: ${type.size}px;
                animation: drop-fall 3.5s linear forwards;
                filter: drop-shadow(2px 6px 10px rgba(0,0,0,0.5));
            `;
            
            // Color gradient calculations for depth
            const baseColor = type.color;
            const darkerShade = type.color === '#8B4513' ? '#5D2E0C' : 
                                type.color === '#556B2F' ? '#3A4A21' :
                                type.color === '#A0522D' ? '#6B3619' : '#4A5A3A';
            const highlightShade = type.color === '#8B4513' ? '#B8651F' : 
                                   type.color === '#556B2F' ? '#6B8B3D' :
                                   type.color === '#A0522D' ? '#CD853F' : '#7A9A52';
            
            if (type.shape === 'trex') {
                dino.innerHTML = `
                    <svg viewBox="0 0 60 60" style="width: 100%; height: 100%;">
                        <defs>
                            <linearGradient id="trexBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:${highlightShade};stop-opacity:1" />
                                <stop offset="50%" style="stop-color:${baseColor};stop-opacity:1" />
                                <stop offset="100%" style="stop-color:${darkerShade};stop-opacity:1" />
                            </linearGradient>
                            <radialGradient id="trexMuscle">
                                <stop offset="0%" style="stop-color:${highlightShade};stop-opacity:0.6" />
                                <stop offset="100%" style="stop-color:${darkerShade};stop-opacity:0" />
                            </radialGradient>
                        </defs>
                        <!-- Body with gradient and depth -->
                        <ellipse cx="22" cy="35" rx="16" ry="22" fill="url(#trexBodyGrad)"/>
                        <!-- Muscle definition -->
                        <ellipse cx="18" cy="32" rx="8" ry="10" fill="url(#trexMuscle)"/>
                        <!-- Head with depth -->
                        <ellipse cx="22" cy="17" rx="13" ry="14" fill="url(#trexBodyGrad)"/>
                        <!-- Jaw detail -->
                        <path d="M 22 24 Q 28 25 30 22 Q 28 24 22 24 Z" fill="${darkerShade}" opacity="0.7"/>
                        <!-- Strong legs -->
                        <ellipse cx="16" cy="52" rx="5" ry="11" fill="url(#trexBodyGrad)"/>
                        <ellipse cx="27" cy="52" rx="5" ry="11" fill="url(#trexBodyGrad)"/>
                        <!-- Feet -->
                        <ellipse cx="16" cy="56" rx="6" ry="3" fill="${darkerShade}"/>
                        <ellipse cx="27" cy="56" rx="6" ry="3" fill="${darkerShade}"/>
                        <!-- Tiny arms -->
                        <ellipse cx="20" cy="28" rx="2" ry="5" fill="url(#trexBodyGrad)" transform="rotate(-20 20 28)"/>
                        <ellipse cx="24" cy="28" rx="2" ry="5" fill="url(#trexBodyGrad)" transform="rotate(20 24 28)"/>
                        <!-- Powerful tail -->
                        <path d="M 34 35 Q 48 32 52 28 Q 48 34 34 37 Z" fill="url(#trexBodyGrad)"/>
                        <!-- Eye with depth -->
                        <circle cx="19" cy="14" r="2.5" fill="${darkerShade}"/>
                        <circle cx="19" cy="14" r="2" fill="#FFF"/>
                        <circle cx="19.5" cy="13.5" r="1.2" fill="#000"/>
                        <circle cx="19.8" cy="13.3" r="0.4" fill="#FFF" opacity="0.8"/>
                        <!-- Scale texture -->
                        <circle cx="22" cy="32" r="1.5" fill="${darkerShade}" opacity="0.3"/>
                        <circle cx="18" cy="38" r="1.5" fill="${darkerShade}" opacity="0.3"/>
                        <circle cx="26" cy="36" r="1.5" fill="${darkerShade}" opacity="0.3"/>
                    </svg>
                `;
            } else if (type.shape === 'long') {
                dino.innerHTML = `
                    <svg viewBox="0 0 60 60" style="width: 100%; height: 100%;">
                        <defs>
                            <linearGradient id="longBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:${highlightShade};stop-opacity:1" />
                                <stop offset="50%" style="stop-color:${baseColor};stop-opacity:1" />
                                <stop offset="100%" style="stop-color:${darkerShade};stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <!-- Large body -->
                        <ellipse cx="30" cy="40" rx="20" ry="14" fill="url(#longBodyGrad)"/>
                        <!-- Belly highlight -->
                        <ellipse cx="30" cy="43" rx="16" ry="9" fill="${highlightShade}" opacity="0.3"/>
                        <!-- Long graceful neck -->
                        <path d="M 18 35 Q 12 25 12 15 Q 14 25 20 33 Z" fill="url(#longBodyGrad)"/>
                        <ellipse cx="15" cy="30" rx="4" ry="14" fill="url(#longBodyGrad)" transform="rotate(-15 15 30)"/>
                        <!-- Head with soft features -->
                        <ellipse cx="12" cy="15" rx="7" ry="9" fill="url(#longBodyGrad)"/>
                        <!-- Snout -->
                        <ellipse cx="10" cy="17" rx="4" ry="3" fill="${baseColor}"/>
                        <!-- Nostril -->
                        <circle cx="9" cy="16" r="0.8" fill="${darkerShade}"/>
                        <!-- Eye -->
                        <circle cx="12" cy="13" r="2" fill="${darkerShade}"/>
                        <circle cx="12" cy="13" r="1.5" fill="#000"/>
                        <circle cx="12.5" cy="12.5" r="0.5" fill="#FFF" opacity="0.9"/>
                        <!-- Front legs -->
                        <ellipse cx="20" cy="52" rx="4" ry="10" fill="url(#longBodyGrad)"/>
                        <ellipse cx="28" cy="52" rx="4" ry="10" fill="url(#longBodyGrad)"/>
                        <!-- Back legs -->
                        <ellipse cx="36" cy="51" rx="5" ry="11" fill="url(#longBodyGrad)"/>
                        <!-- Tail -->
                        <path d="M 48 40 Q 58 38 60 35 Q 56 40 48 42 Z" fill="url(#longBodyGrad)"/>
                        <!-- Subtle spots -->
                        <ellipse cx="28" cy="38" rx="2" ry="3" fill="${darkerShade}" opacity="0.2"/>
                        <ellipse cx="34" cy="42" rx="2.5" ry="3" fill="${darkerShade}" opacity="0.2"/>
                    </svg>
                `;
            } else if (type.shape === 'stego') {
                dino.innerHTML = `
                    <svg viewBox="0 0 60 60" style="width: 100%; height: 100%;">
                        <defs>
                            <linearGradient id="stegoBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:${highlightShade};stop-opacity:1" />
                                <stop offset="50%" style="stop-color:${baseColor};stop-opacity:1" />
                                <stop offset="100%" style="stop-color:${darkerShade};stop-opacity:1" />
                            </linearGradient>
                            <linearGradient id="plateGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" style="stop-color:${baseColor};stop-opacity:1" />
                                <stop offset="100%" style="stop-color:${highlightShade};stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <!-- Robust body -->
                        <ellipse cx="30" cy="42" rx="22" ry="12" fill="url(#stegoBodyGrad)"/>
                        <!-- Back contour -->
                        <path d="M 12 38 Q 30 32 48 38 Q 30 40 12 38 Z" fill="${highlightShade}" opacity="0.4"/>
                        <!-- Head -->
                        <ellipse cx="16" cy="30" rx="8" ry="10" fill="url(#stegoBodyGrad)"/>
                        <!-- Eye -->
                        <circle cx="14" cy="28" r="2" fill="${darkerShade}"/>
                        <circle cx="14" cy="28" r="1.3" fill="#000"/>
                        <circle cx="14.4" cy="27.7" r="0.4" fill="#FFF"/>
                        <!-- Iconic back plates with depth -->
                        <path d="M 18 28 L 22 10 L 26 28 Z" fill="url(#plateGrad)" stroke="${darkerShade}" stroke-width="0.5"/>
                        <ellipse cx="22" cy="22" rx="2" ry="6" fill="${highlightShade}" opacity="0.3"/>
                        <path d="M 26 28 L 30 14 L 34 28 Z" fill="url(#plateGrad)" stroke="${darkerShade}" stroke-width="0.5"/>
                        <ellipse cx="30" cy="22" rx="2" ry="6" fill="${highlightShade}" opacity="0.3"/>
                        <path d="M 34 30 L 38 16 L 42 30 Z" fill="url(#plateGrad)" stroke="${darkerShade}" stroke-width="0.5"/>
                        <ellipse cx="38" cy="24" rx="2" ry="6" fill="${highlightShade}" opacity="0.3"/>
                        <!-- Legs with muscle definition -->
                        <ellipse cx="20" cy="52" rx="4" ry="9" fill="url(#stegoBodyGrad)"/>
                        <ellipse cx="30" cy="52" rx="4" ry="9" fill="url(#stegoBodyGrad)"/>
                        <ellipse cx="40" cy="52" rx="5" ry="10" fill="url(#stegoBodyGrad)"/>
                        <!-- Tail with spikes -->
                        <path d="M 50 42 Q 56 40 58 38" fill="none" stroke="url(#stegoBodyGrad)" stroke-width="6" stroke-linecap="round"/>
                        <path d="M 54 38 L 56 34 L 58 38 Z" fill="${darkerShade}"/>
                    </svg>
                `;
            } else {
                // Raptor - agile and fierce
                dino.innerHTML = `
                    <svg viewBox="0 0 60 60" style="width: 100%; height: 100%;">
                        <defs>
                            <linearGradient id="raptorBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:${highlightShade};stop-opacity:1" />
                                <stop offset="50%" style="stop-color:${baseColor};stop-opacity:1" />
                                <stop offset="100%" style="stop-color:${darkerShade};stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <!-- Lean athletic body -->
                        <ellipse cx="28" cy="35" rx="14" ry="18" fill="url(#raptorBodyGrad)"/>
                        <!-- Muscle definition -->
                        <ellipse cx="24" cy="32" rx="6" ry="8" fill="${highlightShade}" opacity="0.3"/>
                        <!-- Head with intelligent features -->
                        <ellipse cx="25" cy="20" rx="10" ry="11" fill="url(#raptorBodyGrad)"/>
                        <!-- Snout -->
                        <path d="M 28 23 Q 35 22 37 20 Q 35 24 28 25 Z" fill="${baseColor}"/>
                        <!-- Sharp jaw line -->
                        <path d="M 28 25 L 34 24 L 32 26 Z" fill="${darkerShade}" opacity="0.6"/>
                        <!-- Intelligent eye -->
                        <circle cx="23" cy="17" r="2.5" fill="${darkerShade}"/>
                        <circle cx="23" cy="17" r="2" fill="#FFD700"/>
                        <circle cx="23.3" cy="17" r="1.2" fill="#000"/>
                        <circle cx="23.6" cy="16.7" r="0.4" fill="#FFF"/>
                        <!-- Strong arms with claws -->
                        <path d="M 24 28 Q 18 30 16 34" fill="none" stroke="url(#raptorBodyGrad)" stroke-width="4" stroke-linecap="round"/>
                        <path d="M 16 34 L 14 36 M 16 34 L 15 37" stroke="${darkerShade}" stroke-width="1.5" stroke-linecap="round"/>
                        <!-- Powerful legs -->
                        <ellipse cx="24" cy="50" rx="5" ry="13" fill="url(#raptorBodyGrad)"/>
                        <ellipse cx="32" cy="50" rx="5" ry="13" fill="url(#raptorBodyGrad)"/>
                        <!-- Deadly sickle claw -->
                        <path d="M 24 56 Q 22 58 20 57" fill="none" stroke="${darkerShade}" stroke-width="2" stroke-linecap="round"/>
                        <!-- Long balanced tail -->
                        <path d="M 40 36 Q 52 32 56 28" fill="none" stroke="url(#raptorBodyGrad)" stroke-width="7" stroke-linecap="round"/>
                        <!-- Stripes for pattern -->
                        <path d="M 30 30 Q 32 32 30 34" fill="none" stroke="${darkerShade}" stroke-width="1.5" opacity="0.4"/>
                        <path d="M 26 38 Q 28 40 26 42" fill="none" stroke="${darkerShade}" stroke-width="1.5" opacity="0.4"/>
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
        closeBtn.addEventListener('click', () => gameContainer.remove());
        
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
        closeBtn.addEventListener('click', () => gameContainer.remove());
        
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
    
    // WINDOW-WASHING.HTML - Realistic Storm Progression → Window Cleaning Game
    let stormIntensity = 0;
    function windowEasterEgg(clickCount) {
        if (clickCount <= 5) {
            stormIntensity = clickCount;
            createRealisticStorm(clickCount);
        } else {
            startWindowCleaningGame();
        }
    }
    
    function createRealisticStorm(intensity) {
        // Add darkening overlay as storm intensifies
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(20, 30, 48, ${intensity * 0.12});
            pointer-events: none;
            z-index: 9998;
            transition: opacity 0.8s ease;
        `;
        effectContainer.appendChild(overlay);
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 800);
        }, 2000);
        
        // Create ultra-realistic water droplets with depth and refraction
        const dropCount = 12 + (intensity * 10);
        for (let i = 0; i < dropCount; i++) {
            setTimeout(() => {
                const drop = document.createElement('div');
                const size = Math.random() * 12 + 6;
                const xPos = Math.random() * 100;
                const speed = 1.8 - (intensity * 0.15) + Math.random() * 0.6;
                
                // Create multi-layered droplet for depth
                drop.style.cssText = `
                    position: fixed;
                    left: ${xPos}%;
                    top: -30px;
                    width: ${size}px;
                    height: ${size * 3}px;
                    pointer-events: none;
                    animation: realistic-drop-fall ${speed}s linear forwards;
                    z-index: ${9900 + Math.floor(Math.random() * 50)};
                `;
                
                // Main water body with realistic gradient
                const dropBody = document.createElement('div');
                dropBody.style.cssText = `
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(165deg, 
                        rgba(255, 255, 255, 0.95) 0%,
                        rgba(240, 248, 255, 0.9) 15%,
                        rgba(176, 224, 230, 0.85) 35%,
                        rgba(135, 206, 250, 0.9) 65%,
                        rgba(100, 180, 220, 0.95) 100%);
                    border-radius: ${size * 0.4}px ${size * 0.4}px ${size * 0.7}px ${size * 0.7}px;
                    box-shadow: 
                        inset -${size * 0.15}px ${size * 0.2}px ${size * 0.3}px rgba(255, 255, 255, 0.8),
                        inset ${size * 0.1}px -${size * 0.15}px ${size * 0.25}px rgba(0, 100, 150, 0.4),
                        ${size * 0.1}px ${size * 0.3}px ${size * 0.5}px rgba(0, 0, 0, 0.3),
                        0 0 ${size * 0.4}px rgba(135, 206, 250, 0.6);
                    filter: blur(0.2px);
                `;
                
                // Light refraction highlight
                const highlight = document.createElement('div');
                highlight.style.cssText = `
                    position: absolute;
                    top: 10%;
                    left: 25%;
                    width: 40%;
                    height: 25%;
                    background: radial-gradient(ellipse at top left,
                        rgba(255, 255, 255, 0.95) 0%,
                        rgba(255, 255, 255, 0.6) 40%,
                        transparent 70%);
                    border-radius: 50%;
                    filter: blur(0.5px);
                `;
                
                // Secondary highlight for depth
                const highlight2 = document.createElement('div');
                highlight2.style.cssText = `
                    position: absolute;
                    top: 35%;
                    right: 20%;
                    width: 25%;
                    height: 15%;
                    background: radial-gradient(ellipse,
                        rgba(255, 255, 255, 0.7) 0%,
                        transparent 60%);
                    border-radius: 50%;
                    filter: blur(0.4px);
                `;
                
                // Refraction distortion edge
                const refraction = document.createElement('div');
                refraction.style.cssText = `
                    position: absolute;
                    right: 5%;
                    top: 20%;
                    width: 15%;
                    height: 50%;
                    background: linear-gradient(to right,
                        transparent 0%,
                        rgba(180, 220, 240, 0.5) 50%,
                        rgba(200, 230, 255, 0.3) 100%);
                    border-radius: 0 50% 50% 0;
                    filter: blur(0.3px);
                `;
                
                drop.appendChild(dropBody);
                dropBody.appendChild(highlight);
                dropBody.appendChild(highlight2);
                dropBody.appendChild(refraction);
                effectContainer.appendChild(drop);
                
                // Enhanced splash effect with realistic spread
                setTimeout(() => {
                    const splash = document.createElement('div');
                    splash.style.cssText = `
                        position: fixed;
                        left: ${xPos}%;
                        bottom: 0;
                        width: ${size * 4}px;
                        height: ${size * 2.5}px;
                        pointer-events: none;
                    `;
                    
                    // Main splash ring
                    const splashRing = document.createElement('div');
                    splashRing.style.cssText = `
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        background: radial-gradient(ellipse at center, 
                            rgba(255, 255, 255, 0.8) 0%,
                            rgba(200, 230, 255, 0.6) 25%,
                            rgba(135, 206, 250, 0.4) 50%,
                            transparent 75%);
                        border-radius: 50%;
                        animation: splash-expand 0.5s ease-out forwards;
                    `;
                    
                    // Splash droplets
                    for (let j = 0; j < 6; j++) {
                        const droplet = document.createElement('div');
                        const angle = (j * 60) + Math.random() * 30;
                        const dist = size * 2;
                        droplet.style.cssText = `
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            width: ${size * 0.3}px;
                            height: ${size * 0.5}px;
                            background: linear-gradient(180deg,
                                rgba(255, 255, 255, 0.9),
                                rgba(135, 206, 250, 0.7));
                            border-radius: 50%;
                            opacity: 0.8;
                            animation: splash-particle-${j} 0.4s ease-out forwards;
                        `;
                        splash.appendChild(droplet);
                        
                        // Add unique animation for each droplet
                        const style = document.createElement('style');
                        style.textContent = `
                            @keyframes splash-particle-${j} {
                                0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
                                100% { 
                                    transform: translate(
                                        ${Math.cos(angle * Math.PI / 180) * dist}px,
                                        ${-Math.abs(Math.sin(angle * Math.PI / 180) * dist * 0.8)}px
                                    ) scale(0.3); 
                                    opacity: 0; 
                                }
                            }
                        `;
                        document.head.appendChild(style);
                        setTimeout(() => style.remove(), 500);
                    }
                    
                    splash.appendChild(splashRing);
                    effectContainer.appendChild(splash);
                    setTimeout(() => splash.remove(), 500);
                }, speed * 1000);
                
                setTimeout(() => drop.remove(), (speed + 0.5) * 1000);
            }, i * (70 - intensity * 8));
        }
        
        // Add lightning effects at higher intensities
        if (intensity >= 3) {
            const lightningCount = intensity - 2;
            for (let i = 0; i < lightningCount; i++) {
                setTimeout(() => {
                    createLightning();
                }, Math.random() * 2000);
            }
        }
    }
    
    function createLightning() {
        // Full screen lightning flash
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(ellipse at ${Math.random() * 100}% 20%, 
                rgba(255, 255, 255, 0.9) 0%,
                rgba(200, 220, 255, 0.5) 30%,
                transparent 70%);
            pointer-events: none;
            z-index: 9999;
            animation: lightning-flash 0.15s ease-out;
        `;
        effectContainer.appendChild(flash);
        
        // Lightning bolt
        const bolt = document.createElement('div');
        const startX = Math.random() * 80 + 10;
        bolt.style.cssText = `
            position: fixed;
            left: ${startX}%;
            top: 0;
            width: 3px;
            height: ${Math.random() * 40 + 30}%;
            background: linear-gradient(180deg,
                rgba(255, 255, 255, 1) 0%,
                rgba(200, 220, 255, 0.9) 50%,
                rgba(135, 206, 250, 0) 100%);
            box-shadow: 
                0 0 10px rgba(255, 255, 255, 1),
                0 0 20px rgba(200, 220, 255, 0.8),
                0 0 30px rgba(135, 206, 250, 0.6);
            transform: translateX(-50%) skewX(${Math.random() * 6 - 3}deg);
            filter: blur(1px);
            pointer-events: none;
            z-index: 9999;
            animation: lightning-bolt 0.15s ease-out;
        `;
        effectContainer.appendChild(bolt);
        
        setTimeout(() => {
            flash.remove();
            bolt.remove();
        }, 150);
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
                star.textContent = '⭐';
                star.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -30px;
                    font-size: ${Math.random() * 25 + 20}px;
                    animation: star-fall ${Math.random() * 2 + 2}s linear forwards;
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
            max-width: 500px;
            height: 85vh;
            max-height: 600px;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            border-radius: 20px;
            padding: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            overflow: hidden;
        `;
        
        const title = document.createElement('div');
        title.textContent = '⭐ Star Burst Challenge!';
        title.style.cssText = 'color: white; font-size: 26px; font-weight: bold; text-align: center; margin-bottom: 10px;';
        
        const instruction = document.createElement('div');
        instruction.textContent = 'Tap the stars before they disappear!';
        instruction.style.cssText = 'color: white; font-size: 16px; text-align: center; margin-bottom: 10px;';
        
        const gameArea = document.createElement('div');
        gameArea.style.cssText = 'width: 100%; height: calc(100% - 140px); position: relative; background: rgba(0,0,0,0.3); border-radius: 10px; overflow: hidden;';
        
        const scoreDiv = document.createElement('div');
        scoreDiv.style.cssText = 'color: white; font-size: 22px; font-weight: bold; text-align: center; margin-top: 10px;';
        
        const timerDiv = document.createElement('div');
        timerDiv.style.cssText = 'color: white; font-size: 18px; text-align: center; margin-top: 5px;';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '\u2715';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.3); color: white; border: 2px solid white; font-size: 24px; font-weight: bold; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; z-index: 10002;';
        closeBtn.addEventListener('click', () => {
            if (spawnInterval) clearInterval(spawnInterval);
            if (timerInterval) clearInterval(timerInterval);
            gameContainer.remove();
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
        let timeLeft = 30;
        let spawnInterval;
        let timerInterval;
        
        function spawnStar() {
            const star = document.createElement('div');
            const size = Math.random() * 20 + 40;
            star.textContent = '⭐';
            star.style.cssText = `
                position: absolute;
                left: ${Math.random() * 85}%;
                top: ${Math.random() * 85}%;
                font-size: ${size}px;
                cursor: pointer;
                animation: pulse-glow 0.5s ease-in-out infinite alternate;
                transition: transform 0.2s;
            `;
            
            let clicked = false;
            
            star.addEventListener('click', function() {
                if (!clicked) {
                    clicked = true;
                    score++;
                    scoreDiv.textContent = `⭐ Stars: ${score} | Missed: ${missed}`;
                    this.style.transform = 'scale(1.5) rotate(360deg)';
                    this.style.opacity = '0';
                    createSparkles(this.getBoundingClientRect().left + size/2, this.getBoundingClientRect().top + size/2);
                    setTimeout(() => this.remove(), 300);
                    
                    if (score >= 30) {
                        clearInterval(spawnInterval);
                        clearInterval(timerInterval);
                        title.textContent = '🏆 5-Star Champion!';
                        instruction.textContent = `Perfect score: ${score}!`;
                        createConfetti();
                        setTimeout(() => gameContainer.remove(), 3000);
                    }
                }
            });
            
            gameArea.appendChild(star);
            
            setTimeout(() => {
                if (!clicked && star.parentNode) {
                    star.style.opacity = '0';
                    missed++;
                    scoreDiv.textContent = `⭐ Stars: ${score} | Missed: ${missed}`;
                    setTimeout(() => star.remove(), 300);
                    
                    if (missed >= 10) {
                        clearInterval(spawnInterval);
                        clearInterval(timerInterval);
                        title.textContent = 'Game Over!';
                        instruction.textContent = `Final Score: ${score} stars`;
                        createWindowCelebration();
                        setTimeout(() => gameContainer.remove(), 3000);
                    }
                }
            }, 1500);
        }
        
        scoreDiv.textContent = '⭐ Stars: 0 | Missed: 0';
        timerDiv.textContent = `Time: ${timeLeft}s`;
        
        spawnInterval = setInterval(() => {
            if (missed < 10 && score < 30 && timeLeft > 0) {
                spawnStar();
            }
        }, 800);
        
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDiv.textContent = `Time: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(spawnInterval);
                clearInterval(timerInterval);
                title.textContent = 'Time Up!';
                instruction.textContent = `Final Score: ${score} stars!`;
                if (score >= 20) createConfetti();
                setTimeout(() => gameContainer.remove(), 3000);
            }
        }, 1000);
    }
    
    // QUOTE.HTML - Sparkles → Bubble Pop Cleaning Game
    function quoteEasterEgg(clickCount) {
        if (clickCount <= 5) {
            createSparkles(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            overflow: hidden;
        `;
        
        const title = document.createElement('div');
        title.textContent = '🫧 Bubble Pop Cleaning!';
        title.style.cssText = 'color: white; font-size: 26px; font-weight: bold; text-align: center; margin-bottom: 10px;';
        
        const instruction = document.createElement('div');
        instruction.textContent = 'Pop the soap bubbles before they escape!';
        instruction.style.cssText = 'color: white; font-size: 16px; text-align: center; margin-bottom: 10px;';
        
        const gameArea = document.createElement('div');
        gameArea.style.cssText = 'width: 100%; height: calc(100% - 140px); position: relative; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden;';
        
        const scoreDiv = document.createElement('div');
        scoreDiv.style.cssText = 'color: white; font-size: 22px; font-weight: bold; text-align: center; margin-top: 10px;';
        
        const timerDiv = document.createElement('div');
        timerDiv.style.cssText = 'color: white; font-size: 18px; text-align: center; margin-top: 5px;';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '\u2715';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.3); color: white; border: 2px solid white; font-size: 24px; font-weight: bold; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; z-index: 10002;';
        closeBtn.addEventListener('click', () => {
            if (spawnInterval) clearInterval(spawnInterval);
            if (timerInterval) clearInterval(timerInterval);
            gameContainer.remove();
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
        let timeLeft = 40;
        let spawnInterval;
        let timerInterval;
        
        const bubbleColors = [
            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(135,206,250,0.6), rgba(100,149,237,0.4))',
            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(144,238,144,0.6), rgba(60,179,113,0.4))',
            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,182,193,0.6), rgba(255,105,180,0.4))',
            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(221,160,221,0.6), rgba(186,85,211,0.4))'
        ];
        
        function spawnBubble() {
            const bubble = document.createElement('div');
            const size = Math.random() * 40 + 40;
            const leftPos = Math.random() * (gameArea.offsetWidth - size);
            const floatDuration = Math.random() * 3 + 3; // 3-6 seconds
            const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
            
            bubble.style.cssText = `
                position: absolute;
                left: ${leftPos}px;
                bottom: -${size}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                border: 2px solid rgba(255,255,255,0.5);
                cursor: pointer;
                transition: all 0.1s;
                box-shadow: inset -10px -10px 20px rgba(255,255,255,0.5),
                            inset 5px 5px 10px rgba(0,0,0,0.1),
                            0 8px 15px rgba(0,0,0,0.2);
                animation: bubble-float ${floatDuration}s linear forwards;
            `;
            
            let popped = false;
            
            bubble.addEventListener('click', function() {
                if (!popped) {
                    popped = true;
                    score++;
                    scoreDiv.textContent = `Popped: ${score} 🫧 | Missed: ${missed}`;
                    
                    // Pop animation
                    this.style.transform = 'scale(1.3)';
                    this.style.opacity = '0';
                    
                    // Create pop sparkles
                    for (let i = 0; i < 3; i++) {
                        setTimeout(() => {
                            const sparkle = document.createElement('div');
                            sparkle.textContent = '✨';
                            sparkle.style.cssText = `
                                position: absolute;
                                left: ${leftPos + size/2}px;
                                bottom: ${this.offsetTop}px;
                                font-size: 20px;
                                animation: sparkle-float 1s ease-out forwards;
                            `;
                            gameArea.appendChild(sparkle);
                            setTimeout(() => sparkle.remove(), 1000);
                        }, i * 100);
                    }
                    
                    setTimeout(() => this.remove(), 200);
                    
                    if (score >= 40) {
                        clearInterval(spawnInterval);
                        clearInterval(timerInterval);
                        title.textContent = '🏆 Bubble Master!';
                        instruction.textContent = `Incredible! ${score} bubbles popped!`;
                        createConfetti();
                        setTimeout(() => gameContainer.remove(), 3000);
                    }
                }
            });
            
            gameArea.appendChild(bubble);
            
            // Check if bubble escaped
            setTimeout(() => {
                if (!popped && bubble.parentNode) {
                    missed++;
                    scoreDiv.textContent = `Popped: ${score} 🫧 | Missed: ${missed}`;
                    bubble.remove();
                    
                    if (missed >= 15) {
                        clearInterval(spawnInterval);
                        clearInterval(timerInterval);
                        title.textContent = 'Too Many Escaped!';
                        instruction.textContent = `Final Score: ${score} bubbles popped`;
                        if (score >= 25) createConfetti();
                        setTimeout(() => gameContainer.remove(), 3000);
                    }
                }
            }, floatDuration * 1000);
        }
        
        scoreDiv.textContent = 'Popped: 0 🫧 | Missed: 0';
        timerDiv.textContent = `Time: ${timeLeft}s`;
        
        // Spawn bubbles at increasing rate
        spawnInterval = setInterval(() => {
            if (missed < 15 && score < 40 && timeLeft > 0) {
                spawnBubble();
                // Occasionally spawn double bubbles for challenge
                if (Math.random() > 0.7) {
                    setTimeout(() => spawnBubble(), 200);
                }
            }
        }, 800);
        
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDiv.textContent = `Time: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(spawnInterval);
                clearInterval(timerInterval);
                title.textContent = 'Time Up!';
                instruction.textContent = `You popped ${score} bubbles!`;
                if (score >= 25) createConfetti();
                setTimeout(() => gameContainer.remove(), 3000);
            }
        }, 1000);
    }
    
    // Helper functions
    function createSparkles(x, y) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    font-size: ${Math.random() * 30 + 20}px;
                    animation: sparkle-float 2s ease-out forwards;
                `;
                effectContainer.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 2000);
            }, i * 100);
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
        gameContainer.id = 'window-game-container';
        gameContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90vw;
            max-width: 400px;
            height: 85vh;
            max-height: 500px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        `;
        
        const gameTitle = document.createElement('div');
        gameTitle.textContent = '🪟 Clean the Window! 🧼';
        gameTitle.style.cssText = `
            color: white;
            font-size: 22px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
        `;
        
        const windowPane = document.createElement('div');
        windowPane.style.cssText = `
            width: 100%;
            height: 350px;
            background: rgba(255,255,255,0.3);
            border: 8px solid #8B4513;
            border-radius: 10px;
            position: relative;
            overflow: hidden;
            cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><text y="20" font-size="20">🧽</text></svg>') 12 12, auto;
        `;
        
        const scoreBoard = document.createElement('div');
        scoreBoard.style.cssText = `
            color: white;
            font-size: 18px;
            text-align: center;
            margin-top: 10px;
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
        closeBtn.addEventListener('click', () => gameContainer.remove());
        
        gameContainer.appendChild(closeBtn);
        gameContainer.appendChild(gameTitle);
        gameContainer.appendChild(windowPane);
        gameContainer.appendChild(scoreBoard);
        document.body.appendChild(gameContainer);
        
        let score = 0;
        const totalSpots = 15;
        
        for (let i = 0; i < totalSpots; i++) {
            const spot = document.createElement('div');
            const size = Math.random() * 40 + 30;
            spot.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(139,69,19,0.7), rgba(139,69,19,0.3));
                border-radius: 50%;
                left: ${Math.random() * 80 + 5}%;
                top: ${Math.random() * 80 + 5}%;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            spot.addEventListener('click', function(e) {
                e.stopPropagation();
                this.style.transform = 'scale(1.3)';
                this.style.opacity = '0';
                
                score++;
                scoreBoard.textContent = `Cleaned: ${score}/${totalSpots} spots!`;
                
                for (let j = 0; j < 3; j++) {
                    setTimeout(() => {
                        const sparkle = document.createElement('div');
                        sparkle.textContent = '✨';
                        sparkle.style.cssText = `
                            position: absolute;
                            left: ${e.offsetX}px;
                            top: ${e.offsetY}px;
                            font-size: 20px;
                            pointer-events: none;
                            animation: sparkle-float 1s ease-out forwards;
                        `;
                        windowPane.appendChild(sparkle);
                        setTimeout(() => sparkle.remove(), 1000);
                    }, j * 100);
                }
                
                setTimeout(() => this.remove(), 300);
                
                if (score === totalSpots) {
                    setTimeout(() => {
                        windowPane.style.background = 'linear-gradient(135deg, rgba(135,206,250,0.8), rgba(255,255,255,0.9))';
                        gameTitle.textContent = 'PERFECTLY CLEAN!';
                        createWindowCelebration();
                        
                        setTimeout(() => {
                            gameContainer.style.opacity = '0';
                            gameContainer.style.transition = 'opacity 0.5s ease';
                            setTimeout(() => gameContainer.remove(), 500);
                        }, 3000);
                    }, 500);
                }
            });
            
            windowPane.appendChild(spot);
        }
        
        scoreBoard.textContent = `Cleaned: 0/${totalSpots} spots!`;
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
    
    .easter-egg-trigger:hover {
        opacity: 0.8;
        transition: opacity 0.2s ease;
    }
`;
document.head.appendChild(style);
