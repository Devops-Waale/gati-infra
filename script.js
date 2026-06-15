// Navbar scroll effect — offset for topbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Contact form submission — sends data via WhatsApp
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const inputs = this.querySelectorAll('input, select, textarea');
  const name     = inputs[0].value.trim();
  const phone    = inputs[1].value.trim();
  const email    = inputs[2].value.trim();
  const service  = inputs[3].value;
  const city     = inputs[4].value;
  const message  = inputs[5].value.trim();

  const text = `Hello Gati Infra Project Buildcon Pvt Ltd! 🏗️

*New Enquiry from Website*

👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
🔧 *Service:* ${service}
📍 *City:* ${city}
💬 *Message:* ${message}`;

  const waURL = `https://wa.me/918860911709?text=${encodeURIComponent(text)}`;
  window.open(waURL, '_blank');

  const btn = this.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-check"></i> Redirecting to WhatsApp...';
  btn.style.background = '#25D366';
  setTimeout(() => {
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    btn.style.background = '';
    this.reset();
  }, 3000);
});

// Scroll reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.service-card, .project-card, .why-card, .contact-item, .testimonial-card, .cert-item, .career-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Career form submission — sends data via WhatsApp
document.getElementById('careerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const inputs = this.querySelectorAll('input, select, textarea');
  const name       = inputs[0].value.trim();
  const phone      = inputs[1].value.trim();
  const position   = inputs[2].value;
  const experience = inputs[3].value.trim();
  const skills     = inputs[4].value.trim();

  const text = `Hello Gati Infra Project Buildcon Pvt Ltd! 🏗️

*New Job Application from Website*

👤 *Name:* ${name}
📞 *Phone:* ${phone}
💼 *Position:* ${position}
📅 *Experience:* ${experience || 'Not specified'}
🔧 *Skills:* ${skills}`;

  const waURL = `https://wa.me/918860911709?text=${encodeURIComponent(text)}`;
  window.open(waURL, '_blank');

  const btn = this.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-check"></i> Redirecting to WhatsApp...';
  btn.style.background = '#25D366';
  setTimeout(() => {
    btn.innerHTML = '<i class="fab fa-whatsapp"></i> Submit Application via WhatsApp';
    btn.style.background = '';
    this.reset();
  }, 3000);
});

// WhatsApp Chat Widget toggle
const waToggle = document.getElementById('waToggle');
const waPopup = document.getElementById('waPopup');
const waClose = document.getElementById('waClose');
const waIconOpen = document.getElementById('waIconOpen');
const waIconClose = document.getElementById('waIconClose');

function openWaPopup() {
  waPopup.classList.add('active');
  waIconOpen.style.display = 'none';
  waIconClose.style.display = '';
}

function closeWaPopup() {
  waPopup.classList.remove('active');
  waIconOpen.style.display = '';
  waIconClose.style.display = 'none';
}

waToggle.addEventListener('click', () => {
  waPopup.classList.contains('active') ? closeWaPopup() : openWaPopup();
});

waClose.addEventListener('click', closeWaPopup);

// Auto-popup after 3 seconds
setTimeout(openWaPopup, 3000);

// Site Gallery Slider
const slider = document.getElementById('siteSlider');
const slides = slider.querySelectorAll('.site-slide');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
const dotsContainer = document.getElementById('sliderDots');
let currentSlide = 0;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.classList.add('slider-dot');
  if (i === 0) dot.classList.add('active');
  dot.setAttribute('aria-label', `Slide ${i + 1}`);
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(index) {
  currentSlide = index;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  dotsContainer.querySelectorAll('.slider-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

prevBtn.addEventListener('click', () => {
  goToSlide(currentSlide > 0 ? currentSlide - 1 : slides.length - 1);
});

nextBtn.addEventListener('click', () => {
  goToSlide(currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
});

// Auto-slide every 4 seconds
setInterval(() => {
  goToSlide(currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
}, 4000);

// Counter animation for stat numbers
const statNums = document.querySelectorAll('.stat-num[data-target]');
let statsCounted = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsCounted) {
      statsCounted = true;
      statNums.forEach(num => {
        const target = parseInt(num.dataset.target);
        const suffix = num.dataset.suffix || '';
        const duration = 2000;
        const step = Math.ceil(target / (duration / 30));
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          num.textContent = current + suffix;
        }, 30);
      });
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
