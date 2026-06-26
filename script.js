// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Dynamic Title Animation
const titles = [
    'MERN STACK DEVELOPER',
    'WEB DEVELOPER',
    'APP DEVELOPER',
    'PROBLEM SOLVER',
    'GENERATIVE AI ENTHUSIAST'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let titleElement;

function typeTitle() {
    titleElement = document.querySelector('.title-dynamic');
    if (!titleElement) return;

    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        titleElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        titleElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }

    setTimeout(typeTitle, typeSpeed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeTitle, 500);
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Skill Bar Animation on Scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
};

// Initialize skill bar animation
animateSkillBars();

// Form Submission Handler
const contactForm = document.querySelector('#contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link with pre-filled data
        const mailtoLink = `mailto:ankitmatade20@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\n' + 'Email: ' + email + '\n\n' + 'Message:\n' + message)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
    });
}

// Add fade-in animation to sections on scroll
const fadeInSections = () => {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
};

fadeInSections();

// Project Cards Hover Effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project Preview Modal
const projectModal = document.getElementById('projectModal');
const projectModalImage = document.getElementById('projectModalImage');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalText = document.getElementById('projectModalText');
const modalCloseTargets = document.querySelectorAll('[data-close-modal]');

const openProjectModal = (card) => {
    const image = card.querySelector('.project-image img');
    const title = card.querySelector('.project-content h3');
    const details = card.querySelector('.project-details p');

    if (!projectModal || !projectModalImage || !projectModalTitle || !projectModalText || !image || !title || !details) {
        return;
    }

    projectModalImage.src = image.src;
    projectModalImage.alt = image.alt || title.textContent;
    projectModalTitle.textContent = title.textContent;
    projectModalText.textContent = details.textContent.trim();
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
};

const closeProjectModal = () => {
    if (!projectModal) {
        return;
    }

    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
};

document.querySelectorAll('.view-all-btn').forEach(button => {
    button.addEventListener('click', function() {
        const projectCard = this.closest('.project-card');
        if (projectCard) {
            openProjectModal(projectCard);
        }
    });
});

modalCloseTargets.forEach(target => {
    target.addEventListener('click', closeProjectModal);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
});

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

const updateActiveNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveNav);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    const scrolled = window.pageYOffset;
    
    if (heroContent && heroImage && scrolled < 800) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add cursor effect
const createCursorEffect = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
};

// Initialize cursor effect (optional - uncomment to enable)
// createCursorEffect();

console.log('Portfolio Website Loaded Successfully! 🚀');
