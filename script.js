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
            width: 450px;
            padding: 30px;
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
        closeBtn.textContent = '❌';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 50%; cursor: pointer;';
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
    
    // ABOUT.HTML - Bouncing Emojis → Catch the Items Game
    function aboutEasterEgg(clickCount) {
        if (clickCount <= 5) {
            const emojis = ['👨‍💼', '🧼', '🪟', '⭐', '💼', '🎓'];
            createBouncingEmoji(emojis[clickCount - 1]);
        } else {
            startCatchGame();
        }
    }
    
    function createBouncingEmoji(emoji) {
        const bouncer = document.createElement('div');
        bouncer.textContent = emoji;
        bouncer.style.cssText = `
            position: fixed;
            left: ${Math.random() * 80 + 10}%;
            top: -50px;
            font-size: 50px;
            animation: bounce-fall 2s ease-out forwards;
        `;
        effectContainer.appendChild(bouncer);
        setTimeout(() => bouncer.remove(), 2000);
    }
    
    function startCatchGame() {
        const gameContainer = document.createElement('div');
        gameContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            height: 600px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            overflow: hidden;
        `;
        
        const title = document.createElement('div');
        title.textContent = '🧼 Catch the Cleaning Supplies!';
        title.style.cssText = 'color: white; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 10px;';
        
        const gameArea = document.createElement('div');
        gameArea.style.cssText = 'width: 100%; height: 450px; position: relative; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden;';
        
        const basket = document.createElement('div');
        basket.textContent = '🧺';
        basket.style.cssText = 'position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font-size: 60px; transition: left 0.1s;';
        
        const scoreDiv = document.createElement('div');
        scoreDiv.style.cssText = 'color: white; font-size: 22px; font-weight: bold; text-align: center; margin-top: 10px;';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '❌';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 50%; cursor: pointer; z-index: 10;';
        closeBtn.addEventListener('click', () => {
            document.removeEventListener('mousemove', moveBasket);
            gameContainer.remove();
        });
        
        gameContainer.appendChild(closeBtn);
        gameContainer.appendChild(title);
        gameContainer.appendChild(gameArea);
        gameArea.appendChild(basket);
        gameContainer.appendChild(scoreDiv);
        document.body.appendChild(gameContainer);
        
        const items = ['🧼', '🪟', '🧽', '🧴', '🪣', '🧹'];
        let score = 0;
        let missed = 0;
        const maxMissed = 5;
        
        function moveBasket(e) {
            const rect = gameArea.getBoundingClientRect();
            const x = e.clientX - rect.left;
            basket.style.left = Math.max(30, Math.min(rect.width - 30, x)) + 'px';
        }
        
        document.addEventListener('mousemove', moveBasket);
        
        function dropItem() {
            if (missed >= maxMissed) {
                title.textContent = `Game Over! Score: ${score}`;
                document.removeEventListener('mousemove', moveBasket);
                setTimeout(() => gameContainer.remove(), 3000);
                return;
            }
            
            const item = document.createElement('div');
            item.textContent = items[Math.floor(Math.random() * items.length)];
            item.style.cssText = `
                position: absolute;
                left: ${Math.random() * 90}%;
                top: -50px;
                font-size: 40px;
                animation: drop-fall 3s linear forwards;
            `;
            gameArea.appendChild(item);
            
            const checkInterval = setInterval(() => {
                const itemRect = item.getBoundingClientRect();
                const basketRect = basket.getBoundingClientRect();
                
                if (itemRect.bottom >= basketRect.top &&
                    itemRect.left < basketRect.right &&
                    itemRect.right > basketRect.left) {
                    score++;
                    scoreDiv.textContent = `Score: ${score} | Missed: ${missed}/${maxMissed}`;
                    item.remove();
                    clearInterval(checkInterval);
                    createSparkles(basketRect.left + basketRect.width/2, basketRect.top);
                    
                    if (score >= 20) {
                        title.textContent = '🏆 Cleaning Master!';
                        document.removeEventListener('mousemove', moveBasket);
                        createConfetti();
                        setTimeout(() => gameContainer.remove(), 3000);
                    }
                } else if (itemRect.top > window.innerHeight) {
                    missed++;
                    scoreDiv.textContent = `Score: ${score} | Missed: ${missed}/${maxMissed}`;
                    item.remove();
                    clearInterval(checkInterval);
                }
            }, 50);
            
            setTimeout(() => {
                clearInterval(checkInterval);
                item.remove();
            }, 3000);
        }
        
        scoreDiv.textContent = `Score: 0 | Missed: 0/${maxMissed}`;
        const dropInterval = setInterval(() => {
            if (missed >= maxMissed || score >= 20) {
                clearInterval(dropInterval);
            } else {
                dropItem();
            }
        }, 800);
    }
    
    // BLOG.HTML - Floating Icons → Memory Card Game
    function blogEasterEgg(clickCount) {
        if (clickCount <= 5) {
            createFloatingIcon();
        } else {
            startMemoryGame();
        }
    }
    
    function createFloatingIcon() {
        const icons = ['💡', '📝', '✨', '🏆', '⭐', '💬'];
        const icon = document.createElement('div');
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        icon.style.cssText = `
            position: fixed;
            right: -50px;
            top: ${Math.random() * 80 + 10}%;
            font-size: 40px;
            animation: scroll-left 3s linear forwards;
        `;
        effectContainer.appendChild(icon);
        setTimeout(() => icon.remove(), 3000);
    }
    
    function startMemoryGame() {
        const gameContainer = document.createElement('div');
        gameContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 520px;
            padding: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        `;
        
        const title = document.createElement('div');
        title.textContent = '🧠 Memory Match!';
        title.style.cssText = 'color: white; font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 20px;';
        
        const grid = document.createElement('div');
        grid.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 15px;';
        
        const scoreDiv = document.createElement('div');
        scoreDiv.style.cssText = 'color: white; font-size: 20px; font-weight: bold; text-align: center;';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '❌';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 50%; cursor: pointer;';
        closeBtn.addEventListener('click', () => gameContainer.remove());
        
        gameContainer.appendChild(closeBtn);
        gameContainer.appendChild(title);
        gameContainer.appendChild(grid);
        gameContainer.appendChild(scoreDiv);
        document.body.appendChild(gameContainer);
        
        const icons = ['🧼', '🪟', '💧', '✨', '⭐', '🧽', '🪣', '💡'];
        const cards = [...icons, ...icons].sort(() => Math.random() - 0.5);
        let flipped = [];
        let matched = 0;
        let moves = 0;
        
        cards.forEach((icon, index) => {
            const card = document.createElement('div');
            card.style.cssText = `
                background: white;
                height: 80px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 40px;
                cursor: pointer;
                transition: transform 0.3s;
            `;
            card.innerHTML = '<span style="opacity: 0;">?</span>';
            card.dataset.icon = icon;
            card.dataset.index = index;
            
            card.addEventListener('click', function() {
                if (flipped.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
                    this.querySelector('span').style.opacity = '1';
                    this.querySelector('span').textContent = icon;
                    this.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
                    this.classList.add('flipped');
                    flipped.push(this);
                    
                    if (flipped.length === 2) {
                        moves++;
                        scoreDiv.textContent = `Moves: ${moves} | Matched: ${matched}/8`;
                        
                        if (flipped[0].dataset.icon === flipped[1].dataset.icon) {
                            flipped.forEach(card => card.classList.add('matched'));
                            matched++;
                            flipped = [];
                            
                            if (matched === 8) {
                                title.textContent = `🎉 You Win! ${moves} moves!`;
                                createConfetti();
                                setTimeout(() => gameContainer.remove(), 3000);
                            }
                        } else {
                            setTimeout(() => {
                                flipped.forEach(card => {
                                    card.querySelector('span').style.opacity = '0';
                                    card.querySelector('span').textContent = '?';
                                    card.style.background = 'white';
                                    card.classList.remove('flipped');
                                });
                                flipped = [];
                            }, 800);
                        }
                    }
                }
            });
            
            grid.appendChild(card);
        });
        
        scoreDiv.textContent = 'Moves: 0 | Matched: 0/8';
    }
    
    // CARPET-CLEANING.HTML - Dirt Particles → Whack-a-Spot Game
    function carpetEasterEgg(clickCount) {
        if (clickCount <= 5) {
            createDirtParticles();
        } else {
            startWhackSpotGame();
        }
    }
    
    function createDirtParticles() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const dirt = document.createElement('div');
                dirt.textContent = ['•', '◦', '∙'][Math.floor(Math.random() * 3)];
                dirt.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    font-size: ${Math.random() * 15 + 10}px;
                    color: #8b4513;
                    animation: vacuum-away 1.5s ease-in forwards;
                `;
                effectContainer.appendChild(dirt);
                setTimeout(() => dirt.remove(), 1500);
            }, i * 50);
        }
    }
    
    function startWhackSpotGame() {
        const gameContainer = document.createElement('div');
        gameContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            padding: 30px;
            background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
            border-radius: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        `;
        
        const title = document.createElement('div');
        title.textContent = '🧹 Whack the Dirt Spots!';
        title.style.cssText = 'color: white; font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 20px;';
        
        const grid = document.createElement('div');
        grid.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 15px;';
        
        const scoreDiv = document.createElement('div');
        scoreDiv.style.cssText = 'color: white; font-size: 20px; font-weight: bold; text-align: center;';
        
        const timerDiv = document.createElement('div');
        timerDiv.style.cssText = 'color: white; font-size: 18px; text-align: center; margin-top: 10px;';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '❌';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 50%; cursor: pointer;';
        closeBtn.addEventListener('click', () => {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            gameContainer.remove();
        });
        
        gameContainer.appendChild(closeBtn);
        gameContainer.appendChild(title);
        gameContainer.appendChild(grid);
        gameContainer.appendChild(scoreDiv);
        gameContainer.appendChild(timerDiv);
        document.body.appendChild(gameContainer);
        
        let score = 0;
        let timeLeft = 30;
        const spots = [];
        
        for (let i = 0; i < 9; i++) {
            const spot = document.createElement('div');
            spot.style.cssText = `
                background: rgba(255,255,255,0.3);
                height: 100px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 50px;
                transition: transform 0.1s;
            `;
            spot.addEventListener('click', function() {
                if (this.textContent === '•') {
                    score++;
                    scoreDiv.textContent = `Score: ${score}`;
                    this.textContent = '';
                    this.style.background = 'rgba(255,255,255,0.3)';
                    createSparkles(this.getBoundingClientRect().left + 50, this.getBoundingClientRect().top + 50);
                }
            });
            grid.appendChild(spot);
            spots.push(spot);
        }
        
        function showDirt() {
            const randomSpot = spots[Math.floor(Math.random() * spots.length)];
            if (randomSpot.textContent === '') {
                randomSpot.textContent = '•';
                randomSpot.style.background = 'radial-gradient(circle, rgba(139,69,19,0.9), rgba(139,69,19,0.4))';
                setTimeout(() => {
                    if (randomSpot.textContent === '•') {
                        randomSpot.textContent = '';
                        randomSpot.style.background = 'rgba(255,255,255,0.3)';
                    }
                }, 1000);
            }
        }
        
        scoreDiv.textContent = 'Score: 0';
        const gameInterval = setInterval(showDirt, 600);
        
        const timerInterval = setInterval(() => {
            timeLeft--;
            timerDiv.textContent = `Time: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                clearInterval(timerInterval);
                title.textContent = `🏆 Final Score: ${score}`;
                if (score >= 25) createConfetti();
                setTimeout(() => gameContainer.remove(), 3000);
            }
        }, 1000);
        
        timerDiv.textContent = `Time: ${timeLeft}s`;
    }
    
    // WINDOW-WASHING.HTML - Water Droplets → Window Cleaning Game
    function windowEasterEgg(clickCount) {
        if (clickCount <= 5) {
            createWaterDroplets();
        } else {
            startWindowCleaningGame();
        }
    }
    
    function createWaterDroplets() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const drop = document.createElement('div');
                drop.textContent = '💧';
                drop.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -20px;
                    font-size: ${Math.random() * 20 + 15}px;
                    animation: drop-fall ${Math.random() + 1.5}s linear forwards;
                `;
                effectContainer.appendChild(drop);
                setTimeout(() => drop.remove(), 2500);
            }, i * 100);
        }
    }
    
    // REVIEWS.HTML - Falling Stars → Star Collection Game
    function reviewsEasterEgg(clickCount) {
        if (clickCount <= 5) {
            createFallingStars(clickCount * 3);
        } else {
            startStarCollectionGame();
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
    
    function startStarCollectionGame() {
        const gameContainer = document.createElement('div');
        gameContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            height: 600px;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            border-radius: 20px;
            padding: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            overflow: hidden;
        `;
        
        const title = document.createElement('div');
        title.textContent = '⭐ Collect the Stars!';
        title.style.cssText = 'color: white; font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 10px;';
        
        const gameArea = document.createElement('div');
        gameArea.style.cssText = 'width: 100%; height: 450px; position: relative; background: rgba(0,0,0,0.2); border-radius: 10px; overflow: hidden;';
        
        const collector = document.createElement('div');
        collector.textContent = '🙌';
        collector.style.cssText = 'position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font-size: 60px;';
        
        const scoreDiv = document.createElement('div');
        scoreDiv.style.cssText = 'color: white; font-size: 22px; font-weight: bold; text-align: center; margin-top: 10px;';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '❌';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 50%; cursor: pointer; z-index: 10;';
        closeBtn.addEventListener('click', () => {
            document.removeEventListener('mousemove', moveCollector);
            gameContainer.remove();
        });
        
        gameContainer.appendChild(closeBtn);
        gameContainer.appendChild(title);
        gameContainer.appendChild(gameArea);
        gameArea.appendChild(collector);
        gameContainer.appendChild(scoreDiv);
        document.body.appendChild(gameContainer);
        
        let score = 0;
        
        function moveCollector(e) {
            const rect = gameArea.getBoundingClientRect();
            const x = e.clientX - rect.left;
            collector.style.left = Math.max(30, Math.min(rect.width - 30, x)) + 'px';
        }
        
        document.addEventListener('mousemove', moveCollector);
        
        function dropStar() {
            const star = document.createElement('div');
            star.textContent = '⭐';
            star.style.cssText = `
                position: absolute;
                left: ${Math.random() * 90}%;
                top: -50px;
                font-size: 35px;
                animation: drop-fall 3s linear forwards;
            `;
            gameArea.appendChild(star);
            
            const checkInterval = setInterval(() => {
                const starRect = star.getBoundingClientRect();
                const collectorRect = collector.getBoundingClientRect();
                
                if (starRect.bottom >= collectorRect.top &&
                    starRect.left < collectorRect.right &&
                    starRect.right > collectorRect.left) {
                    score++;
                    scoreDiv.textContent = `⭐ Stars: ${score}`;
                    star.remove();
                    clearInterval(checkInterval);
                    createSparkles(collectorRect.left + collectorRect.width/2, collectorRect.top);
                    
                    if (score >= 30) {
                        title.textContent = '🏆 5-Star Champion!';
                        document.removeEventListener('mousemove', moveCollector);
                        createConfetti();
                        setTimeout(() => gameContainer.remove(), 3000);
                    }
                } else if (starRect.top > window.innerHeight) {
                    star.remove();
                    clearInterval(checkInterval);
                }
            }, 50);
            
            setTimeout(() => {
                clearInterval(checkInterval);
                star.remove();
            }, 3000);
        }
        
        scoreDiv.textContent = '⭐ Stars: 0/30';
        const dropInterval = setInterval(() => {
            if (score >= 30) {
                clearInterval(dropInterval);
            } else {
                dropStar();
            }
        }, 700);
    }
    
    // QUOTE.HTML - Sparkles → Interactive Window Cleaning Game (existing)
    function quoteEasterEgg(clickCount) {
        if (clickCount <= 5) {
            createSparkles(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        } else {
            startWindowCleaningGame();
        }
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
    
    // Window Cleaning Game (Quote page)
    function startWindowCleaningGame() {
        const gameContainer = document.createElement('div');
        gameContainer.id = 'window-game-container';
        gameContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 500px;
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
        closeBtn.textContent = '❌';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
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
                        gameTitle.textContent = '🎉 PERFECTLY CLEAN! 🎉';
                        createConfetti();
                        
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

            height: 500px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 20px;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        `;
        
        const gameTitle = document.createElement('div');
        gameTitle.textContent = '🪟 Clean the Dirty Window! 🧼';
        gameTitle.style.cssText = `
            color: white;
            font-size: 22px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
        `;
        
        const gameInfo = document.createElement('div');
        gameInfo.textContent = 'Click the dirty spots to clean them!';
        gameInfo.style.cssText = `
            color: rgba(255,255,255,0.9);
            font-size: 14px;
            text-align: center;
            margin-bottom: 15px;
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
        closeBtn.textContent = '❌ Close';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        `;
        closeBtn.addEventListener('click', () => gameContainer.remove());
        
        gameContainer.appendChild(closeBtn);
        gameContainer.appendChild(gameTitle);
        gameContainer.appendChild(gameInfo);
        gameContainer.appendChild(windowPane);
        gameContainer.appendChild(scoreBoard);
        document.body.appendChild(gameContainer);
        
        // Game logic
        let score = 0;
        let dirtySpots = [];
        const totalSpots = 15;
        
        // Create dirty spots
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
                // Clean effect
                this.style.transform = 'scale(1.3)';
                this.style.opacity = '0';
                
                score++;
                scoreBoard.textContent = `Cleaned: ${score}/${totalSpots} spots! 🧼`;
                
                // Sparkle effect
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
                
                // Check if game complete
                if (score === totalSpots) {
                    setTimeout(() => {
                        windowPane.style.background = 'linear-gradient(135deg, rgba(135,206,250,0.8), rgba(255,255,255,0.9))';
                        gameTitle.textContent = '🎉 PERFECTLY CLEAN! 🎉';
                        gameInfo.textContent = 'You\'re a natural window cleaner!';
                        createConfetti();
                        
                        setTimeout(() => {
                            gameContainer.style.opacity = '0';
                            gameContainer.style.transition = 'opacity 0.5s ease';
                            setTimeout(() => gameContainer.remove(), 500);
                        }, 3000);
                    }, 500);
                }
            });
            
            spot.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            spot.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            windowPane.appendChild(spot);
            dirtySpots.push(spot);
        }
        
        scoreBoard.textContent = `Cleaned: 0/${totalSpots} spots! 🧼`;
    }
    
    // Effect functions
    function createSparkle() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    font-size: ${Math.random() * 30 + 20}px;
                    animation: sparkle-float 2s ease-out forwards;
                `;
                effectContainer.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 2000);
            }, i * 100);
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
    
    function createBouncingEmoji(emoji) {
        const bouncer = document.createElement('div');
        bouncer.textContent = emoji;
        bouncer.style.cssText = `
            position: fixed;
            left: ${Math.random() * 80 + 10}%;
            top: -50px;
            font-size: 50px;
            animation: bounce-fall 2s ease-out forwards;
        `;
        effectContainer.appendChild(bouncer);
        setTimeout(() => bouncer.remove(), 2000);
    }
    
    function createScrollingTip() {
        const tip = document.createElement('div');
        tip.textContent = '💡';
        tip.style.cssText = `
            position: fixed;
            right: -50px;
            top: ${Math.random() * 80 + 10}%;
            font-size: 40px;
            animation: scroll-left 3s linear forwards;
        `;
        effectContainer.appendChild(tip);
        setTimeout(() => tip.remove(), 3000);
    }
    
    function createDirtParticles() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const dirt = document.createElement('div');
                dirt.textContent = ['•', '◦', '∙'][Math.floor(Math.random() * 3)];
                dirt.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    font-size: ${Math.random() * 15 + 10}px;
                    color: #8b4513;
                    animation: vacuum-away 1.5s ease-in forwards;
                `;
                effectContainer.appendChild(dirt);
                setTimeout(() => dirt.remove(), 1500);
            }, i * 50);
        }
    }
    
    function createVacuumEffect() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.textContent = '•';
                particle.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    font-size: 20px;
                    color: #8b4513;
                    animation: spiral-in 2s ease-in forwards;
                `;
                effectContainer.appendChild(particle);
                setTimeout(() => particle.remove(), 2000);
            }, i * 20);
        }
    }
    
    function createWaterDroplets() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const drop = document.createElement('div');
                drop.textContent = '💧';
                drop.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -20px;
                    font-size: ${Math.random() * 20 + 15}px;
                    animation: drop-fall ${Math.random() + 1.5}s linear forwards;
                `;
                effectContainer.appendChild(drop);
                setTimeout(() => drop.remove(), 2500);
            }, i * 100);
        }
    }
    
    function createSqueegeEffect() {
        const squeegee = document.createElement('div');
        squeegee.style.cssText = `
            position: fixed;
            left: -100px;
            top: 0;
            width: 100px;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(100,200,255,0.6), transparent);
            animation: squeegee-wipe 2s ease-in-out forwards;
        `;
        effectContainer.appendChild(squeegee);
        setTimeout(() => squeegee.remove(), 2000);
    }
    
    function createFallingStars(count) {
        for (let i = 0; i < count * 3; i++) {
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
    
    function createStarExplosion() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.textContent = '⭐';
                const angle = (Math.PI * 2 * i) / 40;
                const distance = 300;
                const endX = centerX + Math.cos(angle) * distance;
                const endY = centerY + Math.sin(angle) * distance;
                
                star.style.cssText = `
                    position: fixed;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    font-size: 30px;
                    transition: all 1.5s ease-out;
                `;
                effectContainer.appendChild(star);
                
                setTimeout(() => {
                    star.style.left = endX + 'px';
                    star.style.top = endY + 'px';
                    star.style.opacity = '0';
                    star.style.transform = 'scale(1.5) rotate(360deg)';
                }, 50);
                
                setTimeout(() => star.remove(), 2000);
            }, i * 25);
        }
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
    
    .easter-egg-trigger:hover {
        opacity: 0.8;
        transition: opacity 0.2s ease;
    }
`;
document.head.appendChild(style);
