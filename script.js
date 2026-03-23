/* ============================================
   PORTFOLIO SITE V2 — JAVASCRIPT
   ============================================ */

/* --- Footer: Current Year --- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* --- Dark / Light Theme Toggle --- */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = themeToggle ? themeToggle.querySelector('.theme-icon') : null;

// Apply saved theme on page load
(function applyStoredTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    if (themeIcon) themeIcon.textContent = '☾';
  } else {
    if (themeIcon) themeIcon.textContent = '☀';
  }
})();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (themeIcon) themeIcon.textContent = isDark ? '☾' : '☀';
  });
}

/* --- Burger Menu (mobile) --- */
const burger   = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* --- Contact Form Validation --- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('name');
    const email   = document.getElementById('email');
    const message = document.getElementById('message');

    const nameError    = document.getElementById('nameError');
    const emailError   = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess  = document.getElementById('formSuccess');

    let valid = true;

    // Reset
    [name, email, message].forEach(f => f.classList.remove('invalid'));
    [nameError, emailError, messageError].forEach(e => e.textContent = '');

    // Validate Name
    if (!name.value.trim()) {
      name.classList.add('invalid');
      nameError.textContent = 'Пожалуйста, введите ваше имя.';
      valid = false;
    } else if (name.value.trim().length < 2) {
      name.classList.add('invalid');
      nameError.textContent = 'Имя должно содержать минимум 2 символа.';
      valid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      email.classList.add('invalid');
      emailError.textContent = 'Пожалуйста, введите ваш email.';
      valid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      email.classList.add('invalid');
      emailError.textContent = 'Введите корректный email-адрес.';
      valid = false;
    }

    // Validate Message
    if (!message.value.trim()) {
      message.classList.add('invalid');
      messageError.textContent = 'Пожалуйста, напишите сообщение.';
      valid = false;
    } else if (message.value.trim().length < 10) {
      message.classList.add('invalid');
      messageError.textContent = 'Сообщение слишком короткое (минимум 10 символов).';
      valid = false;
    }

    if (valid) {
      formSuccess.classList.add('visible');
      contactForm.reset();
      // Hide success message after 5 seconds
      setTimeout(() => formSuccess.classList.remove('visible'), 5000);
    }
  });
}

/* --- Highlight active nav link based on current page --- */
(function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();
