// 1Percent Training - Interactive Soccer Website
// Created for Nathan Tau & Luca Winterton

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initFloatingSoccerBalls();
    initContactForm();
    initTestimonialSlider();
    initPackageHighlight();
    initSmoothScrolling();
    initSkillMeter();
    initTrainingLocationMap();

    // Add a welcome animation
    setTimeout(function() {
        showWelcomeMessage();
    }, 1000);
});

// ===== INTERACTIVE SOCCER BACKGROUND =====
function initFloatingSoccerBalls() {
    const container = document.createElement('div');
    container.className = 'background-balls';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';
    document.body.appendChild(container);

    // Create multiple soccer balls
    const numberOfBalls = 8;
    
    for (let i = 0; i < numberOfBalls; i++) {
        createSoccerBall(container, i);
    }
    
    // Add mouse interaction
    document.addEventListener('mousemove', function(e) {
        const balls = document.querySelectorAll('.soccer-ball');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        balls.forEach(ball => {
            // Calculate distance from mouse
            const ballX = parseInt(ball.style.left);
            const ballY = parseInt(ball.style.top);
            const distance = Math.sqrt(Math.pow(mouseX - ballX, 2) + Math.pow(mouseY - ballY, 2));
            
            // If mouse is close, slightly push the ball away
            if (distance < 150) {
                const angle = Math.atan2(ballY - mouseY, ballX - mouseX);
                const newX = ballX + Math.cos(angle) * 15;
                const newY = ballY + Math.sin(angle) * 15;
                
                ball.style.left = `${newX}px`;
                ball.style.top = `${newY}px`;
            }
        });
    });
}

function createSoccerBall(container, index) {
    const ball = document.createElement('div');
    ball.className = 'soccer-ball';
    
    // Set ball style
    ball.style.position = 'absolute';
    ball.style.width = `${20 + Math.random() * 30}px`;
    ball.style.height = ball.style.width;
    ball.style.borderRadius = '50%';
    ball.style.backgroundImage = 'radial-gradient(circle, white 30%, #222 30%)';
    ball.style.backgroundSize = '12px 12px';
    ball.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    ball.style.opacity = '0.5';
    ball.style.transition = 'transform 0.3s ease';

    // Random initial position
    ball.style.left = `${Math.random() * window.innerWidth}px`;
    ball.style.top = `${Math.random() * window.innerHeight}px`;
    
    // Random animation properties
    const duration = 10 + Math.random() * 50;
    const delay = Math.random() * 5;
    
    // Animation
    ball.style.animation = `floatBall${index} ${duration}s infinite linear ${delay}s`;
    
    // Add floating animation
    const keyframes = `
    @keyframes floatBall${index} {
        0% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
        }
        50% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(180deg);
        }
        75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
        }
        100% {
            transform: translate(0, 0) rotate(360deg);
        }
    }`;
    
    const style = document.createElement('style');
    style.innerHTML = keyframes;
    document.head.appendChild(style);
    
    container.appendChild(ball);
}

// ===== WELCOME MESSAGE =====
function showWelcomeMessage() {
    const welcomeBox = document.createElement('div');
    welcomeBox.className = 'welcome-message';
    welcomeBox.innerHTML = `
        <h3>Welcome to 1Percent Training!</h3>
        <p>Ready to elevate your soccer skills? We're Nathan & Luca, recent college soccer players helping athletes like you improve every day.</p>
        <button class="welcome-close">Let's Go!</button>
    `;
    
    // Style the welcome box
    welcomeBox.style.position = 'fixed';
    welcomeBox.style.left = '50%';
    welcomeBox.style.top = '0';
    welcomeBox.style.transform = 'translateX(-50%)';
    welcomeBox.style.backgroundColor = 'var(--primary-green)';
    welcomeBox.style.color = 'white';
    welcomeBox.style.padding = '20px';
    welcomeBox.style.borderRadius = '0 0 10px 10px';
    welcomeBox.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    welcomeBox.style.zIndex = '1000';
    welcomeBox.style.textAlign = 'center';
    welcomeBox.style.maxWidth = '90%';
    welcomeBox.style.transition = 'all 0.5s ease';
    welcomeBox.style.transform = 'translate(-50%, -100%)';
    
    document.body.appendChild(welcomeBox);
    
    // Add styles for button
    const button = welcomeBox.querySelector('.welcome-close');
    button.style.backgroundColor = 'var(--accent-color)';
    button.style.border = 'none';
    button.style.padding = '8px 16px';
    button.style.borderRadius = '20px';
    button.style.cursor = 'pointer';
    button.style.marginTop = '10px';
    button.style.fontWeight = 'bold';
    
    // Animate in
    setTimeout(() => {
        welcomeBox.style.transform = 'translate(-50%, 0)';
    }, 100);
    
    // Close button functionality
    button.addEventListener('click', function() {
        welcomeBox.style.transform = 'translate(-50%, -100%)';
        setTimeout(() => {
            welcomeBox.remove();
        }, 500);
    });
    
    // Auto close after 5 seconds
    setTimeout(function() {
        welcomeBox.style.transform = 'translate(-50%, -100%)';
        setTimeout(() => {
            welcomeBox.remove();
        }, 500);
    }, 8000);
}

// ===== CONTACT FORM HANDLING =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const feedbackEl = document.getElementById('formFeedback');
        
        // Reset feedback
        feedbackEl.textContent = '';
        feedbackEl.className = 'form-feedback';
        
        // Validate inputs
        if (!name.value.trim()) {
            showFormError('Please enter your name');
            name.focus();
            return;
        }
        
        if (!email.value.trim()) {
            showFormError('Please enter your email');
            email.focus();
            return;
        }
        
        if (!validateEmail(email.value)) {
            showFormError('Please enter a valid email address');
            email.focus();
            return;
        }
        
        if (!message.value.trim()) {
            showFormError('Please enter a message');
            message.focus();
            return;
        }
        
        // Show success message
        feedbackEl.textContent = 'Thanks for your message! Well be in touch soon.';
        feedbackEl.className = 'form-feedback success';
        feedbackEl.style.display = 'block';
        
        // In a real site, you would submit the form data to a server here
        console.log('Form would be submitted with:', {
            name: name.value,
            email: email.value,
            phone: document.getElementById('phone')?.value || '',
            trainingType: document.getElementById('training-type')?.value || '',
            message: message.value
        });
        
        // Reset form after success
        setTimeout(() => {
            contactForm.reset();
        }, 1000);
    });
    
    function showFormError(message) {
        const feedbackEl = document.getElementById('formFeedback');
        feedbackEl.textContent = message;
        feedbackEl.className = 'form-feedback error';
        feedbackEl.style.display = 'block';
    }
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

// ===== TESTIMONIAL SLIDER =====
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length <= 1) return;
    
    // Create slider container
    const testimonialSection = testimonials[0].parentElement;
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'testimonial-slider';
    sliderContainer.style.position = 'relative';
    sliderContainer.style.overflow = 'hidden';
    
    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    dotsContainer.style.textAlign = 'center';
    dotsContainer.style.marginTop = '20px';
    
    // Move testimonials into slider
    testimonials.forEach((testimonial, index) => {
        testimonial.style.transition = 'all 0.5s ease';
        testimonial.style.position = 'absolute';
        testimonial.style.width = '100%';
        testimonial.style.left = `${index * 100}%`;
        
        // Create a dot for each testimonial
        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        dot.setAttribute('data-index', index);
        dot.style.display = 'inline-block';
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.background = index === 0 ? 'var(--primary-green)' : 'var(--border-color)';
        dot.style.borderRadius = '50%';
        dot.style.margin = '0 5px';
        dot.style.cursor = 'pointer';
        dot.style.transition = 'background 0.3s ease';
        
        dot.addEventListener('click', function() {
            goToSlide(this.getAttribute('data-index'));
        });
        
        dotsContainer.appendChild(dot);
    });
    
    // Set container height based on tallest testimonial
    let maxHeight = 0;
    testimonials.forEach(testimonial => {
        const height = testimonial.offsetHeight;
        if (height > maxHeight) maxHeight = height;
    });
    sliderContainer.style.height = `${maxHeight + 40}px`;
    
    // Create and add slider controls
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&lsaquo;';
    prevButton.className = 'slider-control prev';
    prevButton.style.position = 'absolute';
    prevButton.style.top = '50%';
    prevButton.style.left = '10px';
    prevButton.style.transform = 'translateY(-50%)';
    prevButton.style.background = 'var(--primary-green)';
    prevButton.style.color = 'white';
    prevButton.style.border = 'none';
    prevButton.style.borderRadius = '50%';
    prevButton.style.width = '40px';
    prevButton.style.height = '40px';
    prevButton.style.fontSize = '24px';
    prevButton.style.cursor = 'pointer';
    prevButton.style.zIndex = '2';
    prevButton.style.opacity = '0.7';
    prevButton.style.transition = 'opacity 0.3s ease';
    
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&rsaquo;';
    nextButton.className = 'slider-control next';
    nextButton.style.position = 'absolute';
    nextButton.style.top = '50%';
    nextButton.style.right = '10px';
    nextButton.style.transform = 'translateY(-50%)';
    nextButton.style.background = 'var(--primary-green)';
    nextButton.style.color = 'white';
    nextButton.style.border = 'none';
    nextButton.style.borderRadius = '50%';
    nextButton.style.width = '40px';
    nextButton.style.height = '40px';
    nextButton.style.fontSize = '24px';
    nextButton.style.cursor = 'pointer';
    nextButton.style.zIndex = '2';
    nextButton.style.opacity = '0.7';
    nextButton.style.transition = 'opacity 0.3s ease';
    
    prevButton.addEventListener('mouseenter', () => prevButton.style.opacity = '1');
    prevButton.addEventListener('mouseleave', () => prevButton.style.opacity = '0.7');
    nextButton.addEventListener('mouseenter', () => nextButton.style.opacity = '1');
    nextButton.addEventListener('mouseleave', () => nextButton.style.opacity = '0.7');
    
    // Add slider functionality
    let currentSlide = 0;
    
    prevButton.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        goToSlide(currentSlide);
    });
    
    nextButton.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        goToSlide(currentSlide);
    });
    
    function goToSlide(index) {
        currentSlide = parseInt(index);
        
        // Update testimonial positions
        testimonials.forEach((testimonial, i) => {
            testimonial.style.left = `${(i - currentSlide) * 100}%`;
        });
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.style.background = i === currentSlide ? 'var(--primary-green)' : 'var(--border-color)';
        });
    }
    
    // Auto-advance slides
    let sliderInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        goToSlide(currentSlide);
    }, 5000);
    
    // Pause auto-advance on hover
    sliderContainer.addEventListener('mouseenter', function() {
        clearInterval(sliderInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', function() {
        sliderInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % testimonials.length;
            goToSlide(currentSlide);
        }, 5000);
    });
    
    // Replace original testimonials with slider
    while (testimonialSection.firstChild) {
        sliderContainer.appendChild(testimonialSection.firstChild);
    }
    
    testimonialSection.appendChild(sliderContainer);
    sliderContainer.appendChild(prevButton);
    sliderContainer.appendChild(nextButton);
    testimonialSection.appendChild(dotsContainer);
}

// ===== PACKAGE HIGHLIGHT EFFECT =====
function initPackageHighlight() {
    const packageCards = document.querySelectorAll('.package-card');
    if (!packageCards.length) return;
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Scale up the card slightly
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
            this.style.zIndex = '2';
            
            // Highlight the title
            const title = this.querySelector('h3');
            if (title) {
                title.style.transform = 'scale(1.05)';
                title.style.transition = 'transform 0.3s ease';
            }
            
            // Add a subtle pulse animation to the price
            const price = this.querySelector('.price');
            if (price) {
                price.style.animation = 'pulsate 1.5s infinite alternate';
                
                // Add the keyframes if they don't exist
                if (!document.querySelector('#package-keyframes')) {
                    const style = document.createElement('style');
                    style.id = 'package-keyframes';
                    style.innerHTML = `
                        @keyframes pulsate {
                            0% {
                                transform: scale(1);
                            }
                            100% {
                                transform: scale(1.05);
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset styles
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.zIndex = '';
            
            const title = this.querySelector('h3');
            if (title) {
                title.style.transform = '';
            }
            
            const price = this.querySelector('.price');
            if (price) {
                price.style.animation = '';
            }
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Select all links with hashes
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        // Only handle links that are on the same page
        if (link.pathname === window.location.pathname && 
            link.hostname === window.location.hostname) {
            
            link.addEventListener('click', function(e) {
                // Get the target element
                const targetId = this.hash.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calculate scroll position
                    const headerOffset = 100; // Offset for fixed header
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    // Smooth scroll
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
    // Add a "Back to Top" button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '&uarr;';
    backToTopBtn.id = 'backToTop';
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '20px';
    backToTopBtn.style.right = '20px';
    backToTopBtn.style.width = '45px';
    backToTopBtn.style.height = '45px';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.backgroundColor = 'var(--primary-green)';
    backToTopBtn.style.color = 'white';
    backToTopBtn.style.border = 'none';
    backToTopBtn.style.fontSize = '20px';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.transform = 'translateY(20px)';
    backToTopBtn.style.transition = 'opacity 0.3s, transform 0.3s';
    backToTopBtn.style.zIndex = '99';
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    });
}

// ===== SKILL METER ANIMATION =====
function initSkillMeter() {
    // Create HTML elements (can be added to About Us page or elsewhere)
    if (document.querySelector('.bio-container')) {
        const skillSection = document.createElement('div');
        skillSection.className = 'skills-section';
        skillSection.innerHTML = `
            <h3>Our Coaching Expertise</h3>
            <div class="skill-meters">
                <div class="skill-meter">
                    <div class="skill-name">Technical Training</div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-percentage="95"></div>
                    </div>
                </div>
                <div class="skill-meter">
                    <div class="skill-name">Tactical Analysis</div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-percentage="90"></div>
                    </div>
                </div>
                <div class="skill-meter">
                    <div class="skill-name">Physical Conditioning</div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-percentage="92"></div>
                    </div>
                </div>
                <div class="skill-meter">
                    <div class="skill-name">Mental Coaching</div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-percentage="87"></div>
                    </div>
                </div>
                <div class="skill-meter">
                    <div class="skill-name">Match Preparation</div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-percentage="93"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Style the skill meters
        const style = document.createElement('style');
        style.innerHTML = `
            .skills-section {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid var(--border-color);
            }
            .skill-meters {
                margin-top: 20px;
            }
            .skill-meter {
                margin-bottom: 15px;
            }
            .skill-name {
                font-weight: 600;
                margin-bottom: 5px;
                color: var(--dark-text);
            }
            .skill-bar {
                height: 10px;
                background-color: var(--border-color);
                border-radius: 5px;
                overflow: hidden;
            }
            .skill-progress {
                height: 100%;
                background-color: var(--primary-green);
                width: 0; /* Will be animated with JS */
                border-radius: 5px;
                transition: width 1.5s ease;
            }
        `;
        document.head.appendChild(style);
        
        // Insert after bio-container
        const bioContainer = document.querySelector('.bio-container');
        bioContainer.parentNode.insertBefore(skillSection, bioContainer.nextSibling);
        
        // Animate skill bars when in viewport
        const skillBars = document.querySelectorAll('.skill-progress');
        
        // Initial check in case elements are already in viewport
        animateSkillBars();
        
        // Check on scroll
        window.addEventListener('scroll', animateSkillBars);
        
        function animateSkillBars() {
            skillBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                
                // Check if element is in viewport
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    const percentage = bar.getAttribute('data-percentage');
                    // Only animate once
                    if (bar.style.width === '0px' || bar.style.width === '') {
                        bar.style.width = `${percentage}%`;
                    }
                }
            });
        }
    }
}

// ===== TRAINING LOCATION MAP =====
function initTrainingLocationMap() {
    // Check if a suitable container exists
    const contactSection = document.querySelector('.contact-info');
    if (!contactSection) return;
    
    // Create map container
    const mapContainer = document.createElement('div');
    mapContainer.className = 'training-location-map';
    mapContainer.style.marginTop = '30px';
    mapContainer.innerHTML = `
        <h4>Training Location</h4>
        <div class="map-container">
            <div class="interactive-map">
                <div class="map-pin" data-location="Westside Sports Complex, Waterbury, CT">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Westside Sports Complex</span>
                </div>
            </div>
            <p>Our primary training location is at Westside Sports Complex in Waterbury, CT. Mobile training available in surrounding areas.</p>
        </div>
    `;
    
    // Style the map
    mapContainer.querySelector('.interactive-map').style.height = '180px';
    mapContainer.querySelector('.interactive-map').style.background = '#e9ecef url("https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+2a8a5c(74.0060,-19.9998)/74.0060,-19.9998,13,0/300x180?access_token=pk.example") center/cover no-repeat';
    mapContainer.querySelector('.interactive-map').style.borderRadius = '8px';
    mapContainer.querySelector('.interactive-map').style.position = 'relative';
    mapContainer.querySelector('.interactive-map').style.overflow = 'hidden';
    mapContainer.querySelector('.interactive-map').style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    
    // Style map pin
    const mapPin = mapContainer.querySelector('.map-pin');
    mapPin.style.position = 'absolute';
    mapPin.style.top = '50%';
    mapPin.style.left = '50%';
    mapPin.style.transform = 'translate(-50%, -50%)';
    mapPin.style.color = 'var(--primary-green)';
    mapPin.style.fontSize = '24px';
    mapPin.style.cursor = 'pointer';
    
    // Add tooltip style for map pin
    mapPin.querySelector('span').style.position = 'absolute';
    mapPin.querySelector('span').style.bottom = '100%';
    mapPin.querySelector('span').style.left = '50%';
    mapPin.querySelector('span').style.transform = 'translateX(-50%)';
    mapPin.querySelector('span').style.backgroundColor = 'white';
    mapPin.querySelector('span').style.padding = '5px 10px';
    mapPin.querySelector('span').style.borderRadius = '4px';
    mapPin.querySelector('span').style.fontSize = '12px';
    mapPin.querySelector('span').style.color = 'var(--dark-text)';
    mapPin.querySelector('span').style.whiteSpace = 'nowrap';
    mapPin.querySelector('span').style.opacity = '0';
    mapPin.querySelector('span').style.transition = 'opacity 0.3s';
    mapPin.querySelector('span').style.pointerEvents = 'none';
    mapPin.querySelector('span').style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    
    // Add hover interaction
    mapPin.addEventListener('mouseenter', function() {
        this.querySelector('span').style.opacity = '1';
    });
    
    mapPin.addEventListener('mouseleave', function() {
        this.querySelector('span').style.opacity = '0';
    });
    
    // Add click interaction (for opening in Google Maps for example)
    mapPin.addEventListener('click', function() {
        const location = this.getAttribute('data-location');
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
    });
    
    // Add to contact info
    contactSection.appendChild(mapContainer);
}