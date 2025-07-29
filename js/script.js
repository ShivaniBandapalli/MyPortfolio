document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active'); // Optional: change hamburger icon
            }

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const headerOffset = document.querySelector('.header').offsetHeight; // Account for fixed header

            if (targetSection) {
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active'); // You can add a class to change the icon
        });
    }

    // Optional: Add intersection observer for section active states or animations on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Adjust as needed
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to the corresponding nav link
                const targetId = `#${entry.target.id}`;
                const correspondingLink = document.querySelector(`.nav-link[href="${targetId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Scroll Reveal Animations
const animatedElements = document.querySelectorAll('.animated-item-hidden');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated-item-visible');
            observer.unobserve(entry.target); // Only animates once
        }
    });
}, {
    threshold: 0.2 // Reveal when 20% visible
});

animatedElements.forEach(element => {
    revealObserver.observe(element);
});

    // Basic animation trigger for hero section elements and TYPED.JS INITIALIZATION
    const heroName = document.querySelector('.hero-name');
    const heroProfession = document.querySelector('.hero-profession');
    const heroBtn = document.querySelector('.hero-cta .btn');
    const typedElement = document.querySelector('.typed'); // Get the typed element

    if (heroName && heroProfession && heroBtn) {
        // Trigger animations by adding a class after a delay (CSS handles actual animation)
        setTimeout(() => {
            if (heroName) { // Add null check for safety
                heroName.style.opacity = '1';
                heroName.style.transform = 'translateY(0)';
            }
        }, 300); // Small delay for name

        setTimeout(() => {
            if (heroProfession) { // Add null check for safety
                heroProfession.style.opacity = '1';
                heroProfession.style.transform = 'translateY(0)';

                // Initialize Typed.js AFTER heroProfession is visible
                if (typedElement) {
                    let typedItems = typedElement.getAttribute('data-typed-items').split(',');
                    new Typed('.typed', {
                        strings: typedItems,
                        loop: true,
                        typeSpeed: 100,
                        backSpeed: 50,
                        backDelay: 2000,
                        showCursor: true,
                        cursorChar: '|',
                    });
                }
            }
        }, 800); // This delay makes heroProfession visible. Typed.js starts immediately after.

        setTimeout(() => {
            if (heroBtn) { // Add null check for safety
                heroBtn.style.opacity = '1';
            }
        }, 1300); // Even more delay for button
    }


    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // Show/hide button on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // Show button after scrolling 300px down
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Smooth scroll to top when button is clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});