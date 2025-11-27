// Chevron button toggles dropdown on mobile
document.querySelectorAll('.drop-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); // important: stop other click listeners
    const dropdown = btn.closest('.dropdown');

    // close other dropdowns
    document.querySelectorAll('.dropdown').forEach(d => {
      if (d !== dropdown) d.classList.remove('active');
    });

    dropdown.classList.toggle('active');
  });
});

// Optional: clicking outside will close any open dropdowns (mobile)
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    // ignore clicks inside nav-links
    if (!e.target.closest('.nav-links')) {
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    }
  }
});
        // Mobile Menu Toggle with Off-canvas
      const menuToggle = document.getElementById("menuToggle");
        const navLinks = document.getElementById("navLinks");
        const overlay = document.getElementById("offcanvasOverlay");

        // Toggle mobile menu
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
            overlay.classList.toggle("active");
        });

        // Close menu when clicking overlay
        overlay.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            overlay.classList.remove("active");
        });

        // Fix dropdown behaviour in mobile
        document.querySelectorAll(".dropdown > a").forEach(link => {
            link.addEventListener("click", (e) => {
                // Prevent auto close
                e.preventDefault();

                let dropdown = link.parentElement;
                dropdown.classList.toggle("active");
            });
        });
        // Campus Link Navigation from Dropdown
        const campusLinks = document.querySelectorAll('.campus-link');
        campusLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = link.getAttribute('data-tab');
                
                // Activate the corresponding tab
                const tabButtons = document.querySelectorAll('.tab-btn');
                const tabContents = document.querySelectorAll('.tab-content');
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
                if (targetButton) {
                    targetButton.classList.add('active');
                }
                document.getElementById(targetTab).classList.add('active');
                
                // Close mobile menu
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                offcanvasOverlay.classList.remove('active');
                
                // Scroll to campus section
                document.getElementById('campuses').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                if (!this.classList.contains('campus-link')) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        navLinks.classList.remove('active');
                        menuToggle.classList.remove('active');
                        offcanvasOverlay.classList.remove('active');
                    }
                }
            });
        });

        // Campus Tabs
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });

        // Animated Counter
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        let hasAnimated = false;

        const animateCounters = () => {
            if (hasAnimated) return;
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const increment = target / speed;
                
                const updateCount = () => {
                    const count = +counter.innerText;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target.toLocaleString() + (target === 95 ? '' : '+');
                    }
                };
                
                updateCount();
            });
            
            hasAnimated = true;
        };

        // Intersection Observer for Counter Animation
        const statsSection = document.querySelector('.stats-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        if (statsSection) {
            observer.observe(statsSection);
        }

        // Scroll Animation for Cards
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.college-card, .culture-card, .leader-card').forEach(el => {
            cardObserver.observe(el);
        });

        
        // Floating Social Media Toggle
        const socialToggle = document.getElementById('socialToggle');
        const socialLinksContainer = document.getElementById('socialLinks');

        socialToggle.addEventListener('click', () => {
            socialToggle.classList.toggle('active');
            socialLinksContainer.classList.toggle('active');
        });

        // Close social links when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.floating-social-btn')) {
                socialToggle.classList.remove('active');
                socialLinksContainer.classList.remove('active');
            }
        });

         // Smooth Scrolling
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

        // Gym Image Change on Card Click
        const gymFeatureBoxes = document.querySelectorAll('.infra-gym-feature-box');
        const gymMainImage = document.getElementById('gymMainImage');

        gymFeatureBoxes.forEach((box, index) => {
            box.addEventListener('click', function() {
                // Remove active class from all boxes
                gymFeatureBoxes.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked box
                this.classList.add('active');
                
                // Change the main image
                const newImageSrc = this.getAttribute('data-image');
                gymMainImage.src = newImageSrc;
            });
        });

        // Set first card as active by default
        if (gymFeatureBoxes.length > 0) {
            gymFeatureBoxes[0].classList.add('active');
        }

       

        document.querySelectorAll('.infra-hostel-feature-card, .infra-sports-card, .infra-transport-card, .infra-dining-card, .infra-lab-card').forEach(el => {
            observer.observe(el);
        });