document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    const buttons = document.querySelectorAll('.button');
    const cards = document.querySelectorAll('.card');
    const featuresScroll = document.querySelector('.features-scroll');
    const featuresContainer = document.querySelector('.features-container');
    const detailsContainer = document.querySelector('.details-container');
    const searchTerms = document.querySelectorAll('.search-term');
    const disclaimerContainer = document.querySelector('.disclaimer-container');
    const footerContent = document.querySelector('.footer-content');
    const footerSections = footerContent?.children;
    const faqItems = document.querySelectorAll('.faq-item');
    const faqSection = document.querySelector('.faq-section');

    const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
    });


    // Initial animations
    tl.fromTo(heroSection,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
    )
    .fromTo(heroContent.children,
        { 
            x: -100,
            opacity: 0,
            rotateZ: -5
        },
        {
            x: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 0.8,
            stagger: 0.2
        },
        "-=0.5"
    )
    .fromTo(buttons,
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15
        },
        "-=0.3"
    );

    // Smooth floating animation for buttons - line by line with random timing
    buttons.forEach((button, index) => {
        gsap.to(button, {
            y: "8px",
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: Math.random() * 2, // Random start time
            onComplete: () => {
                // Ensure smooth transition between cycles
                gsap.to(button, {
                    y: "0px",
                    duration: 2,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut"
                });
            }
        });
    });

    // Parallax effect
    gsap.to(heroSection, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Card section animations
    gsap.fromTo(cards,
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".cards-container",
                start: "top center+=200",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Key Features horizontal scroll animation
    if (featuresScroll && featuresContainer) {
        const setupFeaturesAnimation = () => {
            gsap.to(featuresScroll, {
                x: () => -(featuresScroll.scrollWidth - featuresContainer.offsetWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: featuresContainer,
                    start: "-50%",
                    end: () => `+=${featuresScroll.scrollWidth - featuresContainer.offsetWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    markers: false
                }
            });
        };

        // Small delay to ensure DOM is ready
        setTimeout(setupFeaturesAnimation, 100);
    }

    // App Details animations
    if (detailsContainer) {
        const details = detailsContainer.children;
        
        gsap.set(details, { 
            opacity: 0,
            y: 100 
        });
        
        gsap.to(details, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: detailsContainer,
                start: "top center+=100",
                toggleActions: "play none none reverse",
                markers: false
            }
        });
    }

    // Top Search animations
    if (searchTerms.length > 0) {
        gsap.fromTo(searchTerms,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".search-terms",
                    start: "top center+=200",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    if (disclaimerContainer) {
        gsap.fromTo(disclaimerContainer,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: disclaimerContainer,
                    start: "top center+=100",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    // Footer animations
    if (footerSections) {
        gsap.fromTo(footerSections,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".detail-footer",
                    start: "top center+=200",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    // FAQ Accordion functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // FAQ Section animations
    if (faqSection) {
        const faqTitle = faqSection.querySelector('.section-title');
        const faqContainer = faqSection.querySelector('.faq-container');

        // Animate title
        gsap.fromTo(faqTitle,
            {
                y: -50,
                opacity: 0,
                rotateX: -45
            },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1.2,
                scrollTrigger: {
                    trigger: faqTitle,
                    start: "top center+=100",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Animate FAQ items
        gsap.fromTo(faqItems,
            {
                x: -100,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: faqContainer,
                    start: "top center+=200",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }
    const sidebar = document.querySelector('.sidebar');

});


function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.opacity = 1
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-250px'; // Hide sidebar
    } else {
        sidebar.style.left = '0'; // Show sidebar
    }
}

document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.querySelector('.hamburger');
    
    // Check if the click was outside the sidebar and hamburger button
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.style.left = '-250px'; // Close the sidebar if clicked outside
    }
});