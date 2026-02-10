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
    
    // Create message element
    const messageBox = document.createElement('div');
    messageBox.id = 'easter-egg-message';
    messageBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px 50px;
        border-radius: 20px;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        pointer-events: none;
        max-width: 80%;
    `;
    document.body.appendChild(messageBox);
    
    // Utility function to show message
    function showMessage(message, duration = 2000) {
        messageBox.innerHTML = message;
        messageBox.style.opacity = '1';
        setTimeout(() => {
            messageBox.style.opacity = '0';
        }, duration);
    }
    
    // INDEX.HTML - Rainbow Sparkle Confetti
    function indexEasterEgg(clickCount) {
        if (clickCount <= 5) {
            const messages = ["🧼 Click again...", "🪟 Keep going...", "✨ Almost...", "💧 One more...", "🎉 Final click!"];
            showMessage(messages[clickCount - 1], 1000);
            createSparkle();
        } else if (clickCount === 6) {
            showMessage("🌟 RAINBOW SPARKLE MODE! 🌟", 3000);
            createConfetti();
            copyrightText.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => { copyrightText.style.animation = ''; }, 8000);
        }
    }
    
    // ABOUT.HTML - Danzen Fun Facts
    function aboutEasterEgg(clickCount) {
        const facts = [
            "👋 Hi! I'm Danzen!",
            "🎓 I'm a student entrepreneur!",
            "🧼 I love making windows sparkle!",
            "🏔️ Proud Cache Valley local!",
            "⭐ Quality is my priority!",
            "🎉 Thanks for finding this!"
        ];
        if (clickCount <= facts.length) {
            showMessage(facts[clickCount - 1], 2000);
            createBouncingEmoji('👨‍💼');
        }
    }
    
    // BLOG.HTML - Cleaning Tips
    function blogEasterEgg(clickCount) {
        const tips = [
            "💡 TIP: Clean windows on cloudy days!",
            "💡 TIP: Vacuum carpets before deep cleaning!",
            "💡 TIP: Use microfiber for streak-free windows!",
            "💡 TIP: Hard water? We've got you covered!",
            "💡 TIP: Regular cleaning extends carpet life!",
            "🎓 You're now a cleaning expert!"
        ];
        if (clickCount <= tips.length) {
            showMessage(tips[clickCount - 1], 2500);
            createScrollingTip();
        }
    }
    
    // CARPET-CLEANING.HTML - Vacuum Effect
    function carpetEasterEgg(clickCount) {
        if (clickCount <= 5) {
            showMessage("🧹 Vacuuming dirt...", 1000);
            createDirtParticles();
        } else if (clickCount === 6) {
            showMessage("✨ CARPET PERFECTLY CLEAN! ✨", 3000);
            createVacuumEffect();
        }
    }
    
    // WINDOW-WASHING.HTML - Squeegee Effect
    function windowEasterEgg(clickCount) {
        if (clickCount <= 5) {
            showMessage("💧 Spraying window...", 1000);
            createWaterDroplets();
        } else if (clickCount === 6) {
            showMessage("🪟 CRYSTAL CLEAR! 🪟", 3000);
            createSqueegeEffect();
        }
    }
    
    // REVIEWS.HTML - Star Rating
    function reviewsEasterEgg(clickCount) {
        if (clickCount <= 5) {
            showMessage(`${'⭐'.repeat(clickCount)} ${clickCount}/5 stars!`, 1000);
            createFallingStars(clickCount);
        } else if (clickCount === 6) {
            showMessage("⭐⭐⭐⭐⭐ 5-STAR SERVICE! Thank you! ⭐⭐⭐⭐⭐", 3000);
            createStarExplosion();
        }
    }
    
    // QUOTE.HTML - Discount Code
    function quoteEasterEgg(clickCount) {
        if (clickCount <= 4) {
            showMessage("🎁 Finding your discount...", 1000);
            createSparkle();
        } else if (clickCount === 5) {
            showMessage("🎉 SECRET DISCOUNT: EASTEREGG10<br/>10% OFF YOUR FIRST SERVICE! 🎉", 5000);
            createConfetti();
            copyrightText.style.animation = 'pulse 0.5s ease infinite';
            setTimeout(() => { copyrightText.style.animation = ''; }, 5000);
        }
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
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            color: inherit;
        }
        50% {
            transform: scale(1.05);
            color: #ffd700;
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
    
    @keyframes spiral-in {
        0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(720deg) translate(50vw, 50vh);
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
    
    @keyframes squeegee-wipe {
        0% {
            left: -100px;
        }
        100% {
            left: 100%;
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

