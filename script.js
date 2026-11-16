/**
 * Saurabh Kumar - Portfolio Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Header shadow on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Active Nav Link on Scroll (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-list a[href*="${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (targetNavLink) {
          targetNavLink.classList.add('active');
        }
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll);

  // 4. Skills Category Filtering
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillBoxes = document.querySelectorAll('.skill-box');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active tab style
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-target');

      skillBoxes.forEach(box => {
        const category = box.getAttribute('data-category');
        if (target === 'all' || category === target) {
          box.classList.remove('hidden');
          box.style.opacity = '0';
          box.style.transform = 'translateY(12px)';
          setTimeout(() => {
            box.style.transition = 'all 0.3s ease';
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
          }, 30);
        } else {
          box.classList.add('hidden');
        }
      });
    });
  });

  // 5. Toast Notification Utility
  const toast = document.getElementById('toast');
  let toastTimeout;

  function showToast(message, duration = 3000) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // 6. Copy to Clipboard for Contact Cards
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyPhoneBtn = document.getElementById('copy-phone-btn');

  function copyTextToClipboard(text, label) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${label} to clipboard: ${text}`);
    }).catch(err => {
      console.error('Copy failed', err);
      showToast(`${label}: ${text}`);
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      copyTextToClipboard('saurabh.568k@gmail.com', 'Email');
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', (e) => {
      e.preventDefault();
      copyTextToClipboard('+919915846055', 'Phone');
    });
  }

  // 7. Interactive Contact Form
  const contactForm = document.getElementById('portfolio-contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Please fill out all required fields.';
        }
        return;
      }

      // Simulate sending with nice button loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-check"></i>';
        }

        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your message has been received. You can also reach Saurabh directly at <a href="mailto:saurabh.568k@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}" style="color: #991B1B; text-decoration: underline; font-weight: 600;">saurabh.568k@gmail.com</a>.`;
        }

        showToast(`Thank you, ${name}! Message received.`);
        contactForm.reset();

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
          }
        }, 4000);
      }, 1000);
    });
  }

  // 8. Dynamic Copyright Year
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});

