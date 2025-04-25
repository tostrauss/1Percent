// 1Percent Training - Modern Interactive Website with Dark Mode Default
// Apple-inspired styling for young soccer players

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initThemeToggle(); // Initialize with dark mode as default
    initFloatingSoccerBalls();
    initContactForm();
    initTestimonialSlider();
    initPackageHighlight();
    initSmoothScrolling();
    initParallaxEffect();
    
    // Add subtle movement to bio cards
    const bioCards = document.querySelectorAll('.bio-card');
    if (bioCards.length) {
        bioCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top; // y position within the element
                
                // Calculate rotation based on mouse position
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                // Apply the transform
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', function() {
                // Reset transform
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
    
    // Initialize booking system if on schedule page
    if (document.getElementById('bookingCalendar')) {
        initBookingSystem();
    }

    // Add a welcome animation
    setTimeout(function() {
        showWelcomeMessage();
    }, 1000);
});

// ===== THEME TOGGLE (DARK MODE DEFAULT) =====
function initThemeToggle() {
    const toggleSwitch = document.querySelector('#checkbox');
    if (!toggleSwitch) return;
    
    // Set dark theme as default if no preference is stored
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the appropriate theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Set toggle based on theme
    toggleSwitch.checked = currentTheme === 'dark';
    
    // Event listener for theme switch
    toggleSwitch.addEventListener('change', switchTheme);
    
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Only apply parallax if section is in viewport
            if (scrollPosition + window.innerHeight > sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                
                // Different parallax speed based on position
                const parallaxSpeed = 0.2 + (index * 0.05);
                const yOffset = (scrollPosition - sectionTop) * parallaxSpeed;
                
                // Apply subtle parallax effect
                section.style.transform = `translateY(${yOffset * 0.1}px)`;
                
                // Fade in effect as section enters viewport
                const opacity = 0.5 + Math.min(
                    (scrollPosition + window.innerHeight - sectionTop) / (window.innerHeight * 0.5),
                    1
                );
                section.style.opacity = Math.min(opacity, 1);
            }
        });
    });
}

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

    // Create multiple soccer balls with modern design
    const numberOfBalls = 6;
    
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
    ball.style.width = `${15 + Math.random() * 25}px`;
    ball.style.height = ball.style.width;
    ball.style.borderRadius = '50%';
    ball.style.backgroundImage = 'radial-gradient(circle, white 30%, #222 30%)';
    ball.style.backgroundSize = '12px 12px';
    ball.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    ball.style.opacity = '0.3';
    ball.style.transition = 'transform 0.3s ease';
    ball.style.filter = 'blur(1px)';
    
    // Inner glow effect for modern look
    const innerGlow = document.createElement('div');
    innerGlow.style.position = 'absolute';
    innerGlow.style.top = '0';
    innerGlow.style.left = '0';
    innerGlow.style.width = '100%';
    innerGlow.style.height = '100%';
    innerGlow.style.borderRadius = '50%';
    innerGlow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)';
    ball.appendChild(innerGlow);

    // Random initial position
    ball.style.left = `${Math.random() * window.innerWidth}px`;
    ball.style.top = `${Math.random() * window.innerHeight}px`;
    
    // Random animation properties
    const duration = 20 + Math.random() * 40;
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
        <p>Ready to elevate your game? We're Nathan & Luca, recent college soccer players passionate about helping athletes like you improve every day.</p>
        <button class="welcome-close">Let's Go!</button>
    `;
    
    // Style the welcome box
    welcomeBox.style.position = 'fixed';
    welcomeBox.style.left = '50%';
    welcomeBox.style.top = '0';
    welcomeBox.style.transform = 'translateX(-50%)';
    welcomeBox.style.backgroundColor = 'var(--glass-bg)';
    welcomeBox.style.backdropFilter = 'blur(10px)';
    welcomeBox.style.webkitBackdropFilter = 'blur(10px)';
    welcomeBox.style.color = 'var(--light-text)';
    welcomeBox.style.padding = '20px 30px';
    welcomeBox.style.borderRadius = '0 0 16px 16px';
    welcomeBox.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
    welcomeBox.style.zIndex = '1000';
    welcomeBox.style.textAlign = 'center';
    welcomeBox.style.maxWidth = '90%';
    welcomeBox.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    welcomeBox.style.transform = 'translate(-50%, -100%)';
    welcomeBox.style.border = '1px solid var(--glass-border)';
    
    document.body.appendChild(welcomeBox);
    
    // Style the heading
    const heading = welcomeBox.querySelector('h3');
    heading.style.color = 'var(--primary-green)';
    heading.style.fontSize = '1.6rem';
    heading.style.marginBottom = '10px';
    heading.style.fontFamily = "'SF Pro Display', 'Poppins', sans-serif";
    heading.style.fontWeight = '600';
    
    // Add styles for button
    const button = welcomeBox.querySelector('.welcome-close');
    button.style.background = 'linear-gradient(135deg, var(--primary-green), var(--secondary-blue))';
    button.style.border = 'none';
    button.style.padding = '10px 20px';
    button.style.borderRadius = '20px';
    button.style.cursor = 'pointer';
    button.style.marginTop = '15px';
    button.style.fontWeight = 'bold';
    button.style.color = 'white';
    button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    button.style.transition = 'all 0.3s ease';
    
    // Button hover effect
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });
    
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
    
    // Auto close after 8 seconds
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
    
    // Add modern floating label effect
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.marginBottom = '1.5rem';
        
        // Get the corresponding label
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (label) {
            // Remove original label
            label.remove();
            
            // Create new floating label
            const floatingLabel = document.createElement('label');
            floatingLabel.setAttribute('for', input.id);
            floatingLabel.textContent = label.textContent;
            floatingLabel.style.position = 'absolute';
            floatingLabel.style.left = '12px';
            floatingLabel.style.top = '15px';
            floatingLabel.style.fontSize = '1rem';
            floatingLabel.style.color = 'var(--medium-text)';
            floatingLabel.style.transition = 'all 0.3s ease';
            floatingLabel.style.pointerEvents = 'none';
            floatingLabel.style.padding = '0 5px';
            
            // Insert wrapped input
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(floatingLabel);
            wrapper.appendChild(input);
            
            // Check for value on load
            if (input.value !== '') {
                floatingLabel.style.top = '-10px';
                floatingLabel.style.fontSize = '0.8rem';
                floatingLabel.style.color = 'var(--primary-green)';
                floatingLabel.style.backgroundColor = 'var(--card-bg)';
            }
            
            // Add event listeners for focus/blur
            input.addEventListener('focus', function() {
                floatingLabel.style.top = '-10px';
                floatingLabel.style.fontSize = '0.8rem';
                floatingLabel.style.color = 'var(--primary-green)';
                floatingLabel.style.backgroundColor = 'var(--card-bg)';
                this.style.borderColor = 'var(--primary-green)';
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    floatingLabel.style.top = '15px';
                    floatingLabel.style.fontSize = '1rem';
                    floatingLabel.style.color = 'var(--medium-text)';
                    floatingLabel.style.backgroundColor = 'transparent';
                    this.style.borderColor = 'var(--border-color)';
                }
            });
        }
    });
    
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
        
        // Add success animation
        feedbackEl.style.animation = 'fadeInUp 0.5s ease forwards';
        
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
            
            // Reset floating labels
            formInputs.forEach(input => {
                const label = input.previousElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.style.top = '15px';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--medium-text)';
                    label.style.backgroundColor = 'transparent';
                }
            });
        }, 2000);
    });
    
    function showFormError(message) {
        const feedbackEl = document.getElementById('formFeedback');
        feedbackEl.textContent = message;
        feedbackEl.className = 'form-feedback error';
        feedbackEl.style.display = 'block';
        
        // Add shake animation
        feedbackEl.style.animation = 'shake 0.5s ease forwards';
        
        // Add shake animation keyframes if not already added
        if (!document.querySelector('#shake-animation')) {
            const style = document.createElement('style');
            style.id = 'shake-animation';
            style.innerHTML = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
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
    
    // Create slider container with modern design
    const testimonialSection = testimonials[0].parentElement;
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'testimonial-slider';
    sliderContainer.style.position = 'relative';
    sliderContainer.style.overflow = 'hidden';
    sliderContainer.style.borderRadius = '16px';
    sliderContainer.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    
    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    dotsContainer.style.textAlign = 'center';
    dotsContainer.style.marginTop = '20px';
    
    // Move testimonials into slider
    testimonials.forEach((testimonial, index) => {
        testimonial.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        testimonial.style.position = 'absolute';
        testimonial.style.width = '100%';
        testimonial.style.left = `${index * 100}%`;
        testimonial.style.margin = '0';
        testimonial.style.boxShadow = 'none';
        testimonial.style.borderRadius = '0';
        
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
        dot.style.transition = 'all 0.3s ease';
        dot.style.opacity = index === 0 ? '1' : '0.5';
        dot.style.transform = index === 0 ? 'scale(1.2)' : 'scale(1)';
        
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
    sliderContainer.style.height = `${maxHeight}px`;
    
    // Create and add slider controls
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&lsaquo;';
    prevButton.className = 'slider-control prev';
    prevButton.style.position = 'absolute';
    prevButton.style.top = '50%';
    prevButton.style.left = '10px';
    prevButton.style.transform = 'translateY(-50%)';
    prevButton.style.background = 'var(--glass-bg)';
    prevButton.style.color = 'var(--light-text)';
    prevButton.style.border = 'none';
    prevButton.style.borderRadius = '50%';
    prevButton.style.width = '40px';
    prevButton.style.height = '40px';
    prevButton.style.fontSize = '24px';
    prevButton.style.cursor = 'pointer';
    prevButton.style.zIndex = '2';
    prevButton.style.opacity = '0.7';
    prevButton.style.transition = 'all 0.3s ease';
    prevButton.style.backdropFilter = 'blur(10px)';
    prevButton.style.webkitBackdropFilter = 'blur(10px)';
    prevButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&rsaquo;';
    nextButton.className = 'slider-control next';
    nextButton.style.position = 'absolute';
    nextButton.style.top = '50%';
    nextButton.style.right = '10px';
    nextButton.style.transform = 'translateY(-50%)';
    nextButton.style.background = 'var(--glass-bg)';
    nextButton.style.color = 'var(--light-text)';
    nextButton.style.border = 'none';
    nextButton.style.borderRadius = '50%';
    nextButton.style.width = '40px';
    nextButton.style.height = '40px';
    nextButton.style.fontSize = '24px';
    nextButton.style.cursor = 'pointer';
    nextButton.style.zIndex = '2';
    nextButton.style.opacity = '0.7';
    nextButton.style.transition = 'all 0.3s ease';
    nextButton.style.backdropFilter = 'blur(10px)';
    nextButton.style.webkitBackdropFilter = 'blur(10px)';
    nextButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    
    prevButton.addEventListener('mouseenter', () => {
        prevButton.style.opacity = '1';
        prevButton.style.transform = 'translateY(-50%) scale(1.1)';
    });
    prevButton.addEventListener('mouseleave', () => {
        prevButton.style.opacity = '0.7';
        prevButton.style.transform = 'translateY(-50%) scale(1)';
    });
    nextButton.addEventListener('mouseenter', () => {
        nextButton.style.opacity = '1';
        nextButton.style.transform = 'translateY(-50%) scale(1.1)';
    });
    nextButton.addEventListener('mouseleave', () => {
        nextButton.style.opacity = '0.7';
        nextButton.style.transform = 'translateY(-50%) scale(1)';
    });
    
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
            testimonial.style.opacity = i === currentSlide ? '1' : '0.7';
            testimonial.style.transform = i === currentSlide ? 'scale(1)' : 'scale(0.9)';
        });
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.style.background = i === currentSlide ? 'var(--primary-green)' : 'var(--border-color)';
            dot.style.opacity = i === currentSlide ? '1' : '0.5';
            dot.style.transform = i === currentSlide ? 'scale(1.2)' : 'scale(1)';
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
            // Apply 3D hover effect
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '12px 12px 20px rgba(0, 0, 0, 0.3), -12px -12px 20px rgba(255, 255, 255, 0.07)';
            
            // Highlight the title with gradient text
            const title = this.querySelector('h3');
            if (title) {
                title.style.backgroundImage = 'linear-gradient(135deg, var(--primary-green), var(--accent-color))';
                title.style.backgroundClip = 'text';
                title.style.webkitBackgroundClip = 'text';
                title.style.color = 'transparent';
                title.style.transform = 'scale(1.05)';
                title.style.transition = 'all 0.3s ease';
            }
            
            // Add a pulsing glow to the price
            const price = this.querySelector('.price');
            if (price) {
                price.style.textShadow = '0 0 10px rgba(79, 186, 126, 0.5)';
                price.style.animation = 'pulsate 1.5s infinite alternate';
                
                // Add the keyframes if they don't exist
                if (!document.querySelector('#package-keyframes')) {
                    const style = document.createElement('style');
                    style.id = 'package-keyframes';
                    style.innerHTML = `
                        @keyframes pulsate {
                            0% {
                                transform: scale(1);
                                opacity: 1;
                            }
                            100% {
                                transform: scale(1.05);
                                opacity: 0.9;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
            
            // Highlight details
            const details = this.querySelector('.package-details');
            if (details) {
                details.style.borderTop = '1px solid var(--primary-green)';
            }
            
            // Highlight list items
            const listItems = this.querySelectorAll('li');
            listItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.color = 'var(--light-text)';
                    item.style.transform = 'translateX(5px)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset styles
            this.style.transform = '';
            this.style.boxShadow = '8px 8px 16px rgba(0, 0, 0, 0.25), -8px -8px 16px rgba(255, 255, 255, 0.05)';
            
            const title = this.querySelector('h3');
            if (title) {
                title.style.backgroundImage = '';
                title.style.backgroundClip = '';
                title.style.webkitBackgroundClip = '';
                title.style.color = 'var(--primary-green)';
                title.style.transform = '';
            }
            
            const price = this.querySelector('.price');
            if (price) {
                price.style.textShadow = '';
                price.style.animation = '';
            }
            
            const details = this.querySelector('.package-details');
            if (details) {
                details.style.borderTop = '1px solid var(--border-color)';
            }
            
            const listItems = this.querySelectorAll('li');
            listItems.forEach(item => {
                item.style.color = 'var(--medium-text)';
                item.style.transform = '';
            });
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
    
    // Add a modern "Back to Top" button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>`;
    backToTopBtn.id = 'backToTop';
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '20px';
    backToTopBtn.style.right = '20px';
    backToTopBtn.style.width = '50px';
    backToTopBtn.style.height = '50px';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.background = 'var(--glass-bg)';
    backToTopBtn.style.backdropFilter = 'blur(10px)';
    backToTopBtn.style.webkitBackdropFilter = 'blur(10px)';
    backToTopBtn.style.color = 'var(--light-text)';
    backToTopBtn.style.border = '1px solid var(--glass-border)';
    backToTopBtn.style.fontSize = '20px';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.display = 'flex';
    backToTopBtn.style.alignItems = 'center';
    backToTopBtn.style.justifyContent = 'center';
    backToTopBtn.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.transform = 'translateY(20px) scale(0.9)';
    backToTopBtn.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    backToTopBtn.style.zIndex = '99';
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(0) scale(1.1)';
        this.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.3)';
        this.style.color = 'var(--primary-green)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        this.style.color = 'var(--light-text)';
    });
    
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
            backToTopBtn.style.transform = 'translateY(0) scale(1)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(20px) scale(0.9)';
        }
    });
}