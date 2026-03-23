/**
 * Portfolio Main JavaScript
 * Gère l'interactivité et les animations du portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ========== SMOOTH SCROLLING ==========
  setupSmoothScrolling();

  // ========== BACK TO TOP BUTTON ==========
  setupBackToTop();

  // ========== ACTIVE NAV LINK ON SCROLL ==========
  setupActiveNavLink();

  // ========== PROGRESS BAR ANIMATION ==========
  setupProgressBars();
});

/**
 * Active nav link when scrolling to sections
 */
function setupActiveNavLink() {
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        const offsetTop = target.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Back to top button functionality
 */
function setupBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Animate progress bars when scrolling to skills section
 */
function setupProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.getAttribute('role') === 'progressbar' 
          ? progressBar.getAttribute('aria-valuenow') 
          : '0';
        
        setTimeout(() => {
          progressBar.style.width = width + '%';
        }, 100);
        
        observer.unobserve(progressBar);
      }
    });
  }, observerOptions);

  progressBars.forEach(bar => {
    observer.observe(bar);
  });
}

/**
 * Utility: Scroll to section
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 100;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Export for use if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    scrollToSection,
    setupActiveNavLink,
    setupSmoothScrolling,
    setupBackToTop,
    setupProgressBars
  };
}
