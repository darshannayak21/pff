// 1. AOS Animation
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});
// GSAP + ScrollTrigger for floating, parallax, and fade-in effects
if (window.gsap && window.ScrollTrigger) {
  gsap.utils.toArray('.floating-card').forEach((card, i) => {
    gsap.fromTo(card, 
      { y: 60, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1,
        ease: "power3.out",
        duration: 1.2,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Parallax effect for hero background (if you have one)
  if (document.querySelector('.hero-bg')) {
    gsap.to('.hero-bg', {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }
}


// 2. Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  // Use whatever was saved
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
} else {
  // Default to light mode if nothing saved
  body.setAttribute('data-theme', 'light');
  updateThemeIcon('light');
}
themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});
function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// 3. Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// 4. Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// 5. Projects Dropdown Toggle
window.toggleProjects = function() {
  const dropdown = document.getElementById('projects-dropdown');
  const button = document.querySelector('.view-all-btn');
  dropdown.classList.toggle('active');
  button.textContent = dropdown.classList.contains('active') ? 'Hide Projects' : 'View All';
};
const style = document.createElement('style');
style.textContent = `
@keyframes float {
  0%, 100% { transform: translateY(0px);}
  50% { transform: translateY(-10px);}
}
`;
document.head.appendChild(style);


// 9. Animate on Scroll (Intersection Observer as fallback for AOS)
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
// Custom cursor


// Ripple effect on click
document.addEventListener('click', e => {
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    width: 20px; height: 20px; background: var(--primary-color);
    border-radius: 50%; position: fixed; pointer-events: none; z-index: 9998;
    opacity: 0.5; left: ${e.clientX - 10}px; top: ${e.clientY - 10}px;
    animation: rippleEffect 0.6s cubic-bezier(.22,1,.36,1);
  `;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
@keyframes rippleEffect {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(4); opacity: 0; }
}`;
document.head.appendChild(rippleStyle);
// ... your other scripts above (AOS, GSAP, theme toggle, navbar, dropdowns, etc.)


// Tilt effect for about photo
const aboutPhoto = document.getElementById('about-photo');
if (aboutPhoto) {
  aboutPhoto.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / 20).toFixed(2);
    const rotateY = (x / 20).toFixed(2);
    this.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  aboutPhoto.addEventListener('mouseleave', function() {
    this.style.transform = 'none';
  });
}
// Dropdown logic for Contact and Meeting forms
document.getElementById('toggle-contact-form').onclick = function() {
  const contactDropdown = document.getElementById('contact-dropdown');
  const meetingDropdown = document.getElementById('meeting-dropdown');
  contactDropdown.classList.toggle('active');
  meetingDropdown.classList.remove('active');
};
document.getElementById('toggle-meeting-form').onclick = function() {
  const meetingDropdown = document.getElementById('meeting-dropdown');
  const contactDropdown = document.getElementById('contact-dropdown');
  meetingDropdown.classList.toggle('active');
  contactDropdown.classList.remove('active');
};
// Optional: Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const contactDropdown = document.getElementById('contact-dropdown');
  const meetingDropdown = document.getElementById('meeting-dropdown');
  if (!e.target.closest('#toggle-contact-form') && !e.target.closest('#contact-dropdown')) {
    contactDropdown.classList.remove('active');
  }
  if (!e.target.closest('#toggle-meeting-form') && !e.target.closest('#meeting-dropdown')) {
    meetingDropdown.classList.remove('active');
  }
});
// Vanta.js interactive mesh background
if (window.VANTA) {
  VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x6366f1,           // primary color
    backgroundColor: 0x1a2233, // match your dark theme
    points: 20.00,
    maxDistance: 30.00,
    spacing: 18.00
  });
}
const photo = document.getElementById('about-photo');
const wrapper = photo.parentElement;

let isHovering = false;
let targetRotateX = 0, targetRotateY = 0, targetScale = 1;
let currentRotateX = 0, currentRotateY = 0, currentScale = 1;

wrapper.addEventListener('mousemove', function(e) {
  const rect = wrapper.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  // Max tilt: 18deg, Max push: 18px
  targetRotateY = ((x - centerX) / centerX) * 18;
  targetRotateX = -((y - centerY) / centerY) * 18;
  targetScale = 1.10;
  isHovering = true;
});

wrapper.addEventListener('mouseleave', function() {
  targetRotateX = 0;
  targetRotateY = 0;
  targetScale = 1;
  isHovering = false;
});

// Smooth animation loop
function animatePhoto() {
  // Ease toward target values for buttery smoothness
  currentRotateX += (targetRotateX - currentRotateX) * 0.18;
  currentRotateY += (targetRotateY - currentRotateY) * 0.18;
  currentScale  += (targetScale  - currentScale)  * 0.18;
  photo.style.transform =
    `scale(${currentScale}) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
  requestAnimationFrame(animatePhoto);
}
animatePhoto();
// Scroll-triggered pop-up and expand animation
const popElements = document.querySelectorAll('.scroll-pop');

const popObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('pop-in');
      observer.unobserve(entry.target); // Animate only once
    }
  });
}, { threshold: 0.12 });

popElements.forEach(el => popObserver.observe(el));
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / 18).toFixed(2); // adjust divisor for more/less tilt
    const rotateY = (x / 18).toFixed(2);
    this.style.transform = `perspective(900px) scale(1.09) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    this.style.boxShadow = "0 16px 48px 0 rgba(0,0,0,0.65), 0 2px 24px 0 #232a3d";
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'none';
    this.style.boxShadow = "0 4px 18px rgba(0,0,0,0.35)";
  });
});
// Initialize EmailJS with your public API key
emailjs.init("0ctyXh-muDn1uCs6o"); // Your public key

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const form = this;
  // Optionally, show a loading spinner or disable the button here

  emailjs.sendForm(
    "service_wgel2bw",    // Your Service ID
    "template_7hcqe99",   // Your Template ID
    form
  ).then(
    function(response) {
      alert("Thank you! Your message was sent successfully.");
      form.reset();
      // Optionally, hide spinner or enable button here
    },
    function(error) {
      alert("Sorry, there was an error sending your message. Please try again later.");
      // Optionally, hide spinner or enable button here
    }
  );
});
// Dropdown logic for Contact form
document.getElementById('toggle-contact-form').onclick = function() {
  const contactDropdown = document.getElementById('contact-dropdown');
  contactDropdown.classList.toggle('active');
};
// Optional: Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const contactDropdown = document.getElementById('contact-dropdown');
  if (!e.target.closest('#toggle-contact-form') && !e.target.closest('#contact-dropdown')) {
    contactDropdown.classList.remove('active');
  }
});
// Dropdown logic for Contact and Meeting forms
document.getElementById('toggle-contact-form').onclick = function() {
  const contactDropdown = document.getElementById('contact-dropdown');
  const meetingDropdown = document.getElementById('meeting-dropdown');
  contactDropdown.classList.toggle('active');
  meetingDropdown.classList.remove('active');
};
document.getElementById('toggle-meeting-form').onclick = function() {
  const meetingDropdown = document.getElementById('meeting-dropdown');
  const contactDropdown = document.getElementById('contact-dropdown');
  meetingDropdown.classList.toggle('active');
  contactDropdown.classList.remove('active');
};
// Optional: Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const contactDropdown = document.getElementById('contact-dropdown');
  const meetingDropdown = document.getElementById('meeting-dropdown');
  if (!e.target.closest('#toggle-contact-form') && !e.target.closest('#contact-dropdown')) {
    contactDropdown.classList.remove('active');
  }
  if (!e.target.closest('#toggle-meeting-form') && !e.target.closest('#meeting-dropdown')) {
    meetingDropdown.classList.remove('active');
  }
});
function typeEffect(element, speed) {
  const text = element.innerText;
  element.innerText = '';
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerText += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else {
      element.style.borderRight = 'none'; // Remove cursor after typing
    }
  }
  typing();
}

window.addEventListener('DOMContentLoaded', function() {
  const title = document.getElementById('hero-typed');
  typeEffect(title, 75); // Adjust speed as needed
});
function typeEffect(element, speed) {
  const text = element.textContent;
  element.textContent = '';
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else {
      element.style.borderRight = 'none'; // Remove cursor after typing
    }
  }
  typing();
}

window.addEventListener('DOMContentLoaded', function() {
  const title = document.getElementById('hero-typed');
  typeEffect(title, 28); // Adjust speed as needed
});
// Place after GSAP is loaded
document.querySelectorAll('.magnet-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    gsap.to(btn, {
      x: x * 0.20, y: y * 0.20,
      rotationX: (y / height) * 20,
      rotationY: (x / width) * -20,
      duration: 0.35, ease: "power2.out"
    });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 0.35, ease: "power2.out" });
  });
});
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / height) * 100;
  scrollProgress.style.width = scrolled + "%";
});
// --- Fully Production-Ready Fanned Card Interaction & Popup Logic ---
// --- Projects fanned card hover interaction ---
const fannedCards = document.querySelectorAll('.project-card-fanned');
const fanContainer = document.querySelector('.projects-fanned-cards');
let lastZ = 10;
let activeIdx = null;

const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

// --- Desktop: move cursor anywhere in fan, and the closest card pops up ---
if (!isTouchDevice) {
  function getCardIndexFromMouse(x) {
    const rect = fanContainer.getBoundingClientRect();
    const segmentWidth = rect.width / fannedCards.length;
    // Clamp safely:
    let idx = Math.floor((x - rect.left) / segmentWidth);
    idx = Math.max(0, Math.min(fannedCards.length - 1, idx));
    return idx;
  }

  // Mouse move anywhere over the fan area
  fanContainer.addEventListener('mousemove', (e) => {
    const idx = getCardIndexFromMouse(e.clientX);
    if (activeIdx === idx) return;

    // Reset previous card
    if (activeIdx !== null) {
      const prev = fannedCards[activeIdx];
      prev.classList.remove('active');
      prev.style.transition = "transform 0.4s cubic-bezier(.25,.82,.48,1), box-shadow 0.4s cubic-bezier(.25,.82,.48,1)";
      prev.style.transform = '';
      prev.style.boxShadow = '';
      setTimeout(() => { prev.style.zIndex = prev.style.getPropertyValue('--order'); }, 400);
    }

    // Pop new card up
    const card = fannedCards[idx];
    lastZ += 10;
    card.classList.add('active');
    card.style.zIndex = lastZ;
    card.style.transition = "transform 0.7s cubic-bezier(.25,.82,.48,1), box-shadow 0.67s cubic-bezier(.22,1,.36,1)";
    card.style.transform = 'translateX(-50%) translateY(-54px) scale(1.15) rotate(0deg)';
    card.style.boxShadow = '0 28px 88px 0 rgba(0,0,0,0.37), 0 2px 24px 0 #232a3d';
    activeIdx = idx;
  });

  fanContainer.addEventListener('mouseleave', () => {
    if (activeIdx !== null) {
      const card = fannedCards[activeIdx];
      card.classList.remove('active');
      card.style.transition = "transform 0.6s cubic-bezier(.25,.82,.48,1), box-shadow 0.4s cubic-bezier(.25,.82,.48,1)";
      card.style.transform = '';
      card.style.boxShadow = '';
      setTimeout(() => { card.style.zIndex = card.style.getPropertyValue('--order'); }, 500);
      activeIdx = null;
    }
  });
}

if (isTouchDevice) {
  fannedCards.forEach((card, idx) => {
    card.addEventListener('touchend', e => {
      e.preventDefault();
      // Remove 'active' from all cards
      fannedCards.forEach(c => {
        c.classList.remove('active');
        c.style.transform = '';
        c.style.boxShadow = '';
        c.style.zIndex = c.style.getPropertyValue('--order');
      });

      // Pop up the tapped card
      lastZ += 10;
      card.classList.add('active');
      card.style.zIndex = lastZ;
      card.style.transition = "transform 0.67s cubic-bezier(.22,1,.36,1), box-shadow 0.67s cubic-bezier(.22,1,.36,1), z-index 0.19s";
      card.style.transform = 'translateX(-50%) translateY(-32px) scale(1.10) rotate(0deg)';
      card.style.boxShadow = '0 13px 52px 0 rgba(0,0,0,0.18), 0 2px 12px 0 #232a3d';

      // --- 🔥 NEW: Open the popup/modal for this card ---
      const key = card.dataset.popup;
      if (key) {
        // Hide all popups first
        document.querySelectorAll('.projects-popup').forEach(p => p.classList.remove('active'));
        // Show target popup
        const popup = document.getElementById('popup-' + key);
        if (popup) {
          popup.classList.add('active');
          const popupContent = popup.querySelector('.popup-content');
          if (popupContent) {
            popupContent.style.opacity = '0.7';
            popupContent.style.transform = 'scale(0.98)';
            setTimeout(() => {
              popupContent.style.transition = 'opacity 0.53s cubic-bezier(.22,1,.36,1), transform 0.53s cubic-bezier(.22,1,.36,1)';
              popupContent.style.opacity = '1';
              popupContent.style.transform = 'scale(1)';
            }, 12);
          }
          document.body.style.overflow = 'hidden';
        }
      }
    });
  });
  // Outside tap closes fanned popups as before
  document.addEventListener('touchstart', e => {
    if (![...fannedCards].some(card => card.contains(e.target))) {
      fannedCards.forEach(card => {
        if (card.classList.contains('active')) {
          card.classList.remove('active');
          card.style.transform = '';
          card.style.boxShadow = '';
          card.style.zIndex = card.style.getPropertyValue('--order');
        }
      });
    }
  });
}

// Popups unchanged (as above)
const btns = document.querySelectorAll('.view-projects-btn');
const popups = document.querySelectorAll('.projects-popup');
btns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    popups.forEach(p => p.classList.remove('active'));
    const key = btn.dataset.popup;
    const popup = document.getElementById('popup-' + key);
    if (popup) {
      popup.classList.add('active');
      const popupContent = popup.querySelector('.popup-content');
      popupContent.style.opacity = '0.7';
      popupContent.style.transform = 'scale(0.98)';
      setTimeout(() => {
        popupContent.style.transition = 'opacity 0.53s cubic-bezier(.22,1,.36,1), transform 0.53s cubic-bezier(.22,1,.36,1)';
        popupContent.style.opacity = '1';
        popupContent.style.transform = 'scale(1)';
      }, 12);
    }
    document.body.style.overflow = 'hidden';
  });
});
document.querySelectorAll('.close-popup').forEach(btn => {
  btn.addEventListener('click', () => {
    const popup = btn.closest('.projects-popup');
    if (popup) {
      popup.classList.remove('active');
      document.body.style.overflow = '';
      const popupContent = popup.querySelector('.popup-content');
      popupContent.style.transition = '';
      popupContent.style.opacity = '';
      popupContent.style.transform = '';
    }
  });
});
popups.forEach(popup => {
  popup.addEventListener('mousedown', e => {
    if (e.target === popup) {
      popup.classList.remove('active');
      document.body.style.overflow = '';
      const popupContent = popup.querySelector('.popup-content');
      if (popupContent) {
        popupContent.style.transition = '';
        popupContent.style.opacity = '';
        popupContent.style.transform = '';
      }
    }
  });
});
fannedCards.forEach(card => {
  // Prevent double-activation for nested clicks (e.g., on the button)
  card.addEventListener('click', function(e) {
    // Don't do anything if the view-projects-btn was clicked (let the existing logic handle it)
    if (e.target.closest('.view-projects-btn')) return;

    const key = card.dataset.popup;
    // Only open if a corresponding popup exists
    if (key) {
      popups.forEach(p => p.classList.remove('active'));
      const popup = document.getElementById('popup-' + key);
      if (popup) {
        popup.classList.add('active');
        const popupContent = popup.querySelector('.popup-content');
        if (popupContent) {
          popupContent.style.opacity = '0.7';
          popupContent.style.transform = 'scale(0.98)';
          setTimeout(() => {
            popupContent.style.transition = 'opacity 0.53s cubic-bezier(.22,1,.36,1), transform 0.53s cubic-bezier(.22,1,.36,1)';
            popupContent.style.opacity = '1';
            popupContent.style.transform = 'scale(1)';
          }, 12);
        }
        document.body.style.overflow = 'hidden';
      }
    }
  });
});

setInterval(() => {
  const btn = document.querySelector('.hero-cta.shine');
  if (!btn) return;
  const shine = btn;
  shine.classList.remove('shine-anim-active');
  // Force reflow to restart animation
  void shine.offsetWidth;
  shine.classList.add('shine-anim-active');
  shine.style.setProperty('--shine-play', 'running');
  // Play shine for 1.2s, then pause until next interval
  setTimeout(() => shine.style.setProperty('--shine-play', 'paused'), 1200);
}, 5000);
const navLinks = document.querySelectorAll('.glass-nav-link');
const sectionIds = [...navLinks].map(link => link.getAttribute('href')).filter(id => id.startsWith("#"));
const sections = sectionIds.map(id => document.querySelector(id)).filter(Boolean);

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 90; // adjust offset for nav height
  let currentSection = null;

  sections.forEach(section => {
    if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      currentSection = section;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (currentSection && link.getAttribute('href').replace('#', '') === currentSection.id) {
      link.classList.add('active');
    }
  });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetID = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetID);
    if (!targetElement) return;

    // Calculate offset for fixed header height (adjust 'offset' as needed)
    const offset = 100; // Example: 90px header height, increase/decrease accordingly

    // Calculate element distance from top of document minus the offset
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  });
});
// Timeline Popup Functionality
class TimelinePopup {
    constructor() {
        this.popup = document.getElementById('timelinePopup');
        this.openBtn = document.getElementById('viewMoreBtn');
        this.closeBtn = document.getElementById('closePopupBtn');
        this.popupContent = document.getElementById('popupContent');
        this.timelineLine = document.getElementById('timelineLine');
        this.timelinePoints = document.querySelectorAll('.timeline-point');
        this.timelineSections = document.querySelectorAll('.timeline-section');

        this.init();
    }

    init() {
        // Event listeners
        this.openBtn.addEventListener('click', () => this.openPopup());
        this.closeBtn.addEventListener('click', () => this.closePopup());
        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) this.closePopup();
        });

        // Escape key to close popup
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('active')) {
                this.closePopup();
            }
        });

        // Scroll event to update timeline line height and active points
        this.popupContent.addEventListener('scroll', () => this.updateTimeline());

        // Resize event to realign points & line
        window.addEventListener('resize', () => {
            this.alignTimelinePoints();
            this.extendTimelineLineToLastPoint();
        });
    }

    openPopup() {
        this.popup.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Wait for popup animation/layout to settle, then align and update timeline
        setTimeout(() => {
            this.alignTimelinePoints();
            this.extendTimelineLineToLastPoint();
            this.updateTimeline();
        }, 300);
    }

    closePopup() {
        this.popup.classList.remove('active');
        document.body.style.overflow = '';

        // Reset timeline states
        this.timelineLine.style.height = '0';
        this.timelinePoints.forEach(point => {
            point.classList.remove('active', 'passed');
        });
        this.timelineSections.forEach(section => {
            section.classList.remove('in-view');
        });
    }

    updateTimeline() {
        const scrollTop = this.popupContent.scrollTop;
        const scrollHeight = this.popupContent.scrollHeight - this.popupContent.clientHeight;
        const scrollProgress = scrollTop / scrollHeight;

        // Max height is dynamic based on line container height, fallback to 1100
        const timelineLineContainer = document.getElementById('timelineLineContainer');
        const maxLineHeight = timelineLineContainer ? timelineLineContainer.clientHeight : 1100;

        this.timelineLine.style.height = `${scrollProgress * maxLineHeight}px`;

        this.timelineSections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 200; // Adjust offset as needed
            const point = this.timelinePoints[index];

            if (scrollTop >= sectionTop - 100) {
                section.classList.add('in-view');
                point.classList.add('passed');

                // Remove active from all points first
                this.timelinePoints.forEach(p => p.classList.remove('active'));
                // Add active to current point
                point.classList.add('active');
            } else {
                section.classList.remove('in-view');
                point.classList.remove('active', 'passed');
            }
        });
    }

    alignTimelinePoints() {
        const popupContent = this.popupContent;
        const timelineContainer = popupContent.querySelector('.timeline-container');
        const timelineLineContainer = document.getElementById('timelineLineContainer');
        const contentText = timelineContainer.querySelector('.content-text');
        const timelinePoints = timelineLineContainer.querySelectorAll('.timeline-point');
        const titles = contentText.querySelectorAll('.timeline-section .section-title');

        if (!timelineLineContainer) return;

        // Set relative position for absolute children positioning
        timelineLineContainer.style.position = 'relative';

        titles.forEach((title, idx) => {
            const point = timelinePoints[idx];
            if (!point) return;

            // Calculate vertical center offset of each title relative to timeline container
            const parentRect = timelineLineContainer.getBoundingClientRect();
            const titleRect = title.getBoundingClientRect();

            const offsetTop = (titleRect.top + titleRect.height / 2) - parentRect.top;
            point.style.position = 'absolute';
            point.style.top = `${offsetTop}px`;
            point.style.left = '50%';
            point.style.transform = 'translateX(-50%)';
            point.style.margin = '0';
        });

        // Adjust timeline line to span from first to last point center
        if (titles.length) {
            const first = titles[0].getBoundingClientRect();
            const last = titles[titles.length - 1].getBoundingClientRect();
            const containerTop = timelineLineContainer.getBoundingClientRect().top;
            const line = this.timelineLine;

            line.style.position = 'absolute';
            line.style.left = '50%';
            line.style.transform = 'translateX(-50%)';
            line.style.width = '6px';
            line.style.borderRadius = '6px';
            line.style.top = `${(first.top + first.height / 2) - containerTop}px`;
            line.style.height = `${(last.top + last.height / 2) - (first.top + first.height / 2)}px`;
        }
    }

    extendTimelineLineToLastPoint() {
        const timelineLine = this.timelineLine;
        const timelinePoints = this.timelinePoints;
        const timelineLineContainer = document.getElementById('timelineLineContainer');

        if (!timelineLine || !timelinePoints.length || !timelineLineContainer) return;

        const containerRect = timelineLineContainer.getBoundingClientRect();
        const firstPointRect = timelinePoints[0].getBoundingClientRect();
        const lastPointRect = timelinePoints[timelinePoints.length - 1].getBoundingClientRect();

        const lineStart = (firstPointRect.top + firstPointRect.height / 2) - containerRect.top;
        const lineEnd = (lastPointRect.top + lastPointRect.height / 2) - containerRect.top;

        timelineLine.style.top = `${lineStart}px`;
        timelineLine.style.height = `${lineEnd - lineStart}px`;
    }
}

// Magnetic button effect (enhanced from your existing code)
function addMagneticEffect() {
    const btn = document.getElementById('viewMoreBtn');

    if (!btn) return;

    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.08)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px) scale(1)';
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const timelinePopup = new TimelinePopup();

    // Also call these initially to align timeline correctly if popup is pre-opened or for quick interactions
    timelinePopup.alignTimelinePoints();
    timelinePopup.extendTimelineLineToLastPoint();

    addMagneticEffect();

    // Redraw on scroll inside popup content and window resize
    document.getElementById('popupContent').addEventListener('scroll', () => {
        timelinePopup.alignTimelinePoints();
        timelinePopup.extendTimelineLineToLastPoint();
        timelinePopup.updateTimeline();
    });

    window.addEventListener('resize', () => {
        timelinePopup.alignTimelinePoints();
        timelinePopup.extendTimelineLineToLastPoint();
    });
});
function extendTimelineLineToLastPoint() {
  const timelineLine = document.getElementById('timelineLine');
  const timelinePoints = document.querySelectorAll('.timeline-point');
  const timelineLineContainer = document.getElementById('timelineLineContainer');
  if (!timelineLine || timelinePoints.length === 0 || !timelineLineContainer) return;

  const containerRect = timelineLineContainer.getBoundingClientRect();
  const firstPointRect = timelinePoints[0].getBoundingClientRect();
  const lastPointRect = timelinePoints[timelinePoints.length - 1].getBoundingClientRect();

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    // On mobile, stretch line full container height (or custom min height)
    timelineLine.style.top = '0px';
    timelineLine.style.height = `${timelineLineContainer.clientHeight}px`;
  } else {
    // Desktop: line from first to last point centers
    const lineStart = (firstPointRect.top + firstPointRect.height / 2) - containerRect.top;
    const lineEnd = (lastPointRect.top + lastPointRect.height / 2) - containerRect.top;
    timelineLine.style.top = `${lineStart}px`;
    timelineLine.style.height = `${lineEnd - lineStart}px`;
  }
}
// --- Certificates dropdown toggle ---
const certBtn = document.getElementById('certificates-btn');
const certDropdown = document.getElementById('certificates-dropdown');
certBtn.addEventListener('click', function() {
  certDropdown.classList.toggle('active');
  const expanded = certDropdown.classList.contains('active');
  certBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  certDropdown.setAttribute('aria-hidden', expanded ? 'false' : 'true');
  // Animate scroll to bring dropdown into view
  if (expanded) {
    certDropdown.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

// --- Magnetic effect for the certificates button ---
certBtn.addEventListener('mousemove', (e) => {
  const rect = certBtn.getBoundingClientRect();
  const x = e.clientX - (rect.left + rect.width / 2);
  const y = e.clientY - (rect.top + rect.height / 2);
  gsap.to(certBtn, {
    x: x * 0.19, y: y * 0.19,
    rotationX: (y / rect.height) * 13,
    rotationY: (x / rect.width) * -13,
    duration: 0.32, ease: "power2.out"
  });
});
certBtn.addEventListener('mouseleave', () => {
  gsap.to(certBtn, { x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 0.39, ease: "power2.out" });
});

// --- Card click: subtle glow interaction (optional micro-interaction)---
document.querySelectorAll('.certificate-card').forEach(card => {
  card.addEventListener('mousedown', function() {
    card.style.boxShadow = '0 0 40px #6366f1ee, 0 8px 34px #232a3d74';
    setTimeout(() => {
      card.style.boxShadow = '';
    }, 250);
  });
  card.addEventListener('mouseleave', function() {
    card.style.boxShadow = '';
  });
});
const certBox = document.querySelector('.certificates-section');

if (certBox) {
  certBox.addEventListener('mousemove', (e) => {
    const rect = certBox.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    // Magnetic movement and scale-up
    gsap.to(certBox, {
      x: x * 0.04,
      y: y * 0.04,
      rotationX: (y / rect.height) * 5,
      rotationY: (x / rect.width) * -5,
      scale: 1.025, // Expand smoothly
      boxShadow: "0 0 72px 20px #a67cff66, 0 22px 82px 0 #7c49f899",
      duration: 0.15,
      ease: "power3.out"
    });
    certBox.classList.add('hovered');
  });

  certBox.addEventListener('mouseleave', () => {
    gsap.to(certBox, {
      x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1,
      boxShadow: "0 14px 60px rgba(107, 33, 168, 0.38)",
      duration: 0.30,
      ease: "power3.out"
    });
    certBox.classList.remove('hovered');
  });
}
// Smooth scroll and highlight
const navCert = document.getElementById('nav-certificates');
const certSection = document.getElementById('certificates');



// Optional: For classic dropdown nav, toggle menu on click
const navDropdown = document.querySelector('.glass-nav-link-container.dropdown');
if(navDropdown) {
  navDropdown.addEventListener('click', function(e){
    navDropdown.classList.toggle('open');
    const link = navDropdown.querySelector('.glass-nav-link');
    link.setAttribute('aria-expanded', navDropdown.classList.contains('open') ? 'true' : 'false');
    e.preventDefault();
  });
  // Close when clicking elsewhere
  document.addEventListener('click', function(e){
    if(!navDropdown.contains(e.target)){
      navDropdown.classList.remove('open');
      navDropdown.querySelector('.glass-nav-link').setAttribute('aria-expanded', 'false');
    }
  });
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    // If Home link (href="#" or "#home"), scroll to top
    if (href === "#" || href === "#home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // OPTIONAL: Update nav highlight here
      document.querySelectorAll('.glass-nav-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      return;
    }
    // Otherwise, regular smooth scroll logic
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
// Simple Toast Logic
window.addEventListener('DOMContentLoaded', function() {
  var toast = document.getElementById('desktop-toast');
  var closeBtn = document.getElementById('toast-close-btn');

  // Show toast on launch
  setTimeout(function() {
    if (toast) toast.classList.add('active');
  }, 250); // Fade in almost immediately

  // Auto-hide after 6 seconds
  var toastTimeout = setTimeout(function() {
    if (toast) toast.classList.remove('active');
  }, 6250);

  // Allow manual close
  closeBtn.addEventListener('click', function() {
    toast.classList.remove('active');
    clearTimeout(toastTimeout);
  });
});

// ===== NEW SECTIONS JAVASCRIPT =====

// Progress Bar Animation for Mastering Section
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  const masteringSection = document.querySelector('.mastering');
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.progress-fill');
        progressBars.forEach((bar, index) => {
          setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
          }, index * 200); // Stagger animation
        });
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  if (masteringSection) {
    progressObserver.observe(masteringSection);
  }
}

// Interactive tooltips for exploring boxes
function initExploringBoxes() {
  const exploringBoxes = document.querySelectorAll('.exploring-box');
  
  exploringBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    box.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add click interaction for future expansion
    box.addEventListener('click', function() {
      const topic = this.getAttribute('data-topic');
      console.log(`Clicked on: ${topic}`);
      // Future: Could open detailed modal or navigate to specific content
    });
  });
}

// Dashboard cards counter animation
function animateDashboardCounters() {
  const dashboardCards = document.querySelectorAll('.dashboard-card');
  const dashboardSection = document.querySelector('.dashboard');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numbers = entry.target.querySelectorAll('.dashboard-number');
        numbers.forEach(number => {
          const finalValue = parseInt(number.textContent);
          animateCounter(number, 0, finalValue, 1500);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  if (dashboardSection) {
    counterObserver.observe(dashboardSection);
  }
}

// Counter animation helper function
function animateCounter(element, start, end, duration) {
  const startTime = performance.now();
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (end - start) * easeOutQuart);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = end; // Ensure final value is exact
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Enhanced tilt effect for new interactive elements
function initEnhancedTiltEffects() {
  const tiltElements = document.querySelectorAll('.exploring-box, .dashboard-card');
  
  tiltElements.forEach(element => {
    element.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotateX = (-y / 20).toFixed(2);
      const rotateY = (x / 20).toFixed(2);
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  });
}

// Staggered animation for exploring boxes
function initStaggeredAnimations() {
  const exploringBoxes = document.querySelectorAll('.exploring-box');
  const dashboardCards = document.querySelectorAll('.dashboard-card');
  
  // Animate exploring boxes with stagger
  const exploringObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const boxes = entry.target.querySelectorAll('.exploring-box');
        boxes.forEach((box, index) => {
          setTimeout(() => {
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
          }, index * 100);
        });
        exploringObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // Animate dashboard cards with stagger
  const dashboardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.dashboard-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, index * 150);
        });
        dashboardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  const exploringSection = document.querySelector('.currently-exploring');
  const dashboardSection = document.querySelector('.dashboard');
  
  if (exploringSection) {
    // Initially hide boxes for animation
    exploringBoxes.forEach(box => {
      box.style.opacity = '0';
      box.style.transform = 'translateY(30px)';
      box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    exploringObserver.observe(exploringSection);
  }
  
  if (dashboardSection) {
    // Initially hide cards for animation
    dashboardCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.9)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    dashboardObserver.observe(dashboardSection);
  }
}

// Particle effect for exploring boxes (subtle)
function addParticleEffects() {
  const exploringBoxes = document.querySelectorAll('.exploring-box');
  
  exploringBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
      createParticles(this);
    });
  });
}

function createParticles(element) {
  const rect = element.getBoundingClientRect();
  const particleCount = 5;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: var(--primary-color);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      opacity: 0.7;
    `;
    
    const startX = rect.left + Math.random() * rect.width;
    const startY = rect.top + Math.random() * rect.height;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    document.body.appendChild(particle);
    
    // Animate particle
    const animation = particle.animate([
      {
        transform: 'translate(0, 0) scale(1)',
        opacity: 0.7
      },
      {
        transform: `translate(${(Math.random() - 0.5) * 100}px, ${-50 - Math.random() * 50}px) scale(0)`,
        opacity: 0
      }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => particle.remove();
  }
}

// Smooth reveal animation for section titles
function initSectionTitleAnimations() {
  const sectionTitles = document.querySelectorAll('.currently-exploring .section-title, .mastering .section-title, .dashboard .section-title');
  
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        titleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  sectionTitles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(-20px)';
    title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    titleObserver.observe(title);
  });
}

// Initialize all new section functionality
function initNewSections() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      animateProgressBars();
      initExploringBoxes();
      animateDashboardCounters();
      initEnhancedTiltEffects();
      initStaggeredAnimations();
      addParticleEffects();
      initSectionTitleAnimations();
    });
  } else {
    animateProgressBars();
    initExploringBoxes();
    animateDashboardCounters();
    initEnhancedTiltEffects();
    initStaggeredAnimations();
    addParticleEffects();
    initSectionTitleAnimations();
  }
}

// Call initialization
initNewSections();

// Add navigation links for new sections
document.addEventListener('DOMContentLoaded', function() {
  // Update navigation to include new sections
  const navLinks = document.querySelectorAll('.glass-nav-link');
  const newSections = ['currently-exploring', 'mastering', 'dashboard'];
  
  // Add scroll spy for new sections
  const allSections = [...document.querySelectorAll('section[id]')];
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;
    
    allSections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
});
// Mobile nav hamburger menu toggle
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const mobileNavDropdown = document.getElementById('mobile-nav-dropdown');

mobileNavToggle.addEventListener('click', function() {
  mobileNavDropdown.classList.toggle('active');
});

// Hide dropdown when a link is clicked
mobileNavDropdown.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function() {
    mobileNavDropdown.classList.remove('active');
  });
});

// Optionally: Hide dropdown when you click outside it
document.addEventListener('click', function(e) {
  if (
    !mobileNavDropdown.contains(e.target) &&
    !mobileNavToggle.contains(e.target)
  ) {
    mobileNavDropdown.classList.remove('active');
  }
});
