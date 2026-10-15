// ============================================================
// main.js — Shaneth V. Timbal Personal Portfolio
// Entry point that builds and wires up the entire website
// ============================================================

import './style.css';
import { portfolioData as d } from './data.js';

// ── Helper ────────────────────────────────────────────────────
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

// ── App Root ──────────────────────────────────────────────────
const app = document.getElementById('app');

// ── Build & Mount ─────────────────────────────────────────────
app.innerHTML = buildNavbar() + buildMobileNav() + buildHero() + buildAbout()
  + buildProjects() + buildSkills() + buildCertificates() + buildContact()
  + buildResume() + buildFooter() + buildModal() + buildBackTopFloat();

// ── After mount: wire interactions ───────────────────────────
setupNavbar();
setupMobileNav();
setupModal();
setupContactForm();
setupCopyEmail();
setupResume();
setupScrollReveal();
setupBackToTop();
setupActiveNav();

// =============================================================
// NAVBAR
// =============================================================
function buildNavbar() {
  return `
  <nav class="navbar" id="navbar" role="navigation" aria-label="Main Navigation">
    <div class="container navbar__inner">
      <button class="navbar__logo" id="logo-btn" aria-label="Go to top">
        <span class="navbar__logo-badge" aria-hidden="true">S</span>
        ${d.name}
      </button>
      <div class="navbar__links" role="list">
        ${['home','about','projects','skills','certificates','contact']
          .map(s => `<button class="navbar__link" role="listitem" data-section="${s}" aria-label="Go to ${s} section">${capitalize(s)}</button>`)
          .join('')}
      </div>
      <button class="navbar__mobile-btn" id="mobile-menu-btn" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-nav">
        ☰
      </button>
    </div>
  </nav>`;
}

function buildMobileNav() {
  return `
  <div class="mobile-nav" id="mobile-nav" role="dialog" aria-label="Mobile Navigation" aria-modal="false">
    ${['home','about','projects','skills','certificates','contact']
      .map(s => `<button class="mobile-nav__link" data-section="${s}" aria-label="Go to ${s} section">${capitalize(s)}</button>`)
      .join('')}
  </div>`;
}

function setupNavbar() {
  // Scroll shadow
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Logo → top
  document.getElementById('logo-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Nav links
  document.querySelectorAll('.navbar__link').forEach(btn => {
    btn.addEventListener('click', () => scrollToSection(btn.dataset.section));
  });
}

function setupMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.textContent = isOpen ? '✕' : '☰';
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  mobileNav.querySelectorAll('.mobile-nav__link').forEach(btn => {
    btn.addEventListener('click', () => {
      scrollToSection(btn.dataset.section);
      mobileNav.classList.remove('open');
      menuBtn.textContent = '☰';
      menuBtn.setAttribute('aria-expanded', false);
    });
  });
}

function setupActiveNav() {
  const sections = ['home','about','projects','skills','certificates','contact'];
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.navbar__link, .mobile-nav__link').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    const offset = 70;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// =============================================================
// HERO SECTION
// =============================================================
function buildHero() {
  return `
  <section class="hero" id="home" aria-label="Hero Section">
    <div class="container">
      <div class="hero__grid">
        <div class="hero__content reveal">
          <p class="hero__greeting">
            <span class="hero__greeting-wave" aria-hidden="true">👋</span>
            ${d.greeting}
          </p>
          <h1 class="hero__name">
            <span>${d.firstName}</span>&nbsp;V. Timbal
          </h1>
          <p class="hero__title">
            <span class="hero__title-badge">${d.title}</span>
            <span>${d.subtitle}</span>
          </p>
          <p class="hero__intro">${d.intro}</p>
          <div class="hero__buttons">
            <button class="btn btn-primary" id="btn-view-work" aria-label="View My Work">
              🗂️ View My Work
            </button>
            <button class="btn btn-lavender" id="btn-contact-hero" aria-label="Contact Me">
              💌 Contact Me
            </button>
            <button class="btn btn-secondary" id="btn-view-resume" aria-label="View Resume">
              📄 View Resume
            </button>
          </div>
        </div>
        <div class="hero__visual reveal">
          <div class="hero__photo-wrapper">
            <div class="hero__photo-ring" aria-hidden="true"></div>
            <div class="hero__photo-bg" aria-hidden="true"></div>
            <div class="hero__photo">
              <img src="/profile.jpg" alt="Profile photo of Shaneth V. Timbal" width="340" height="340" loading="eager" />
            </div>
            <div class="hero__blob hero__blob--1" aria-hidden="true"></div>
            <div class="hero__blob hero__blob--2" aria-hidden="true"></div>
            <div class="hero__blob hero__blob--3" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

// =============================================================
// ABOUT SECTION
// =============================================================
function buildAbout() {
  const eduCards = d.education.map(edu => `
    <div class="about__edu-card">
      <div class="about__edu-degree">${edu.degree}</div>
      <div class="about__edu-school">📍 ${edu.school}</div>
      <div class="about__edu-period">
        🗓️ ${edu.period}
        ${edu.badge ? `<span class="about__edu-badge">${edu.badge}</span>` : ''}
      </div>
    </div>`).join('');

  const statCards = d.stats.map(s => `
    <div class="about__stat-card">
      <div class="about__stat-value">${s.value}</div>
      <div class="about__stat-label">${s.label}</div>
    </div>`).join('');

  return `
  <section class="about" id="about" aria-label="About Me Section">
    <div class="container">
      <div class="about__grid">
        <div class="about__visual reveal">
          <div class="about__photo-card">
            <img class="about__photo-img" src="/profile.jpg" alt="Shaneth V. Timbal" width="400" height="533" loading="lazy" />
          </div>
          <div class="about__stat-cards">
            ${statCards}
          </div>
        </div>
        <div class="about__content reveal">
          <span class="section-label">About Me</span>
          <h2 class="section-title">Hi, I'm Shaneth! 👩‍💻</h2>
          <p class="about__bio">${d.bio}</p>
          <div class="about__education-title">
            🎓 Educational Background
          </div>
          ${eduCards}
        </div>
      </div>
    </div>
  </section>`;
}

// =============================================================
// PROJECTS SECTION
// =============================================================
function buildProjects() {
  const cards = d.projects.map(p => `
    <article class="project-card reveal" data-project-id="${p.id}" role="article" tabindex="0" aria-label="${p.title}">
      <div class="project-card__img" style="${p.image ? '' : 'background:' + p.bgGradient}" aria-hidden="true">
        ${p.image
          ? `<img src="${p.image}" alt="${p.title} screenshot" style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy" />`
          : `<span style="font-size:3.5rem;">${p.emoji}</span>`
        }
      </div>
      <div class="project-card__body">
        <div class="project-card__tags">
          ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.description}</p>
        <div class="project-card__footer">
          <button class="btn btn-primary btn-sm view-details-btn" data-project-id="${p.id}" aria-label="View details for ${p.title}">
            🔍 View Details
          </button>
        </div>
      </div>
    </article>`).join('');

  return `
  <section class="projects" id="projects" aria-label="Projects Section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">My Projects</span>
        <h2 class="section-title">What I've Built 🚀</h2>
        <p class="section-subtitle">A collection of academic and personal projects that demonstrate my skills and learning journey.</p>
      </div>
      <div class="projects__grid">
        ${cards}
      </div>
    </div>
  </section>`;
}

// =============================================================
// PROJECT MODAL
// =============================================================
function buildModal() {
  return `
  <div class="modal-overlay" id="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-hidden="true">
    <div class="modal" id="modal-box">
      <div class="modal__header">
        <h2 class="modal__title" id="modal-title">Project Details</h2>
        <button class="modal__close" id="modal-close" aria-label="Close project details">✕</button>
      </div>
      <div class="modal__body" id="modal-body"></div>
    </div>
  </div>`;
}

function setupModal() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  const titleEl = document.getElementById('modal-title');
  const bodyEl  = document.getElementById('modal-body');

  function openModal(projectId) {
    const p = d.projects.find(x => x.id === projectId);
    if (!p) return;

    titleEl.textContent = p.title;
    bodyEl.innerHTML = `
      <div class="modal__img" style="${p.image ? 'padding:0;overflow:hidden;' : 'background:' + p.bgGradient}" aria-hidden="true">
        ${p.image
          ? `<img src="${p.image}" alt="${p.title} screenshot" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:var(--radius-md);" loading="lazy" />`
          : `<span style="font-size:4rem;">${p.emoji}</span>`
        }
      </div>
      <p class="modal__section-label">Description</p>
      <p class="modal__desc">${p.fullDescription}</p>
      <p class="modal__section-label">Technologies Used</p>
      <div class="modal__tags">
        ${p.technologies.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      <p class="modal__section-label">Details</p>
      <div class="modal__detail-grid">
        <div class="modal__detail-item">
          <div class="modal__detail-item-label">Role</div>
          <div class="modal__detail-item-value">${p.role}</div>
        </div>
        <div class="modal__detail-item">
          <div class="modal__detail-item-label">Category</div>
          <div class="modal__detail-item-value">${p.tags[0]}</div>
        </div>
      </div>
      ${p.screenshots.length > 0 ? `
        <p class="modal__section-label">Screenshots</p>
        <div style="display:flex;flex-direction:column;gap:12px;margin-top:8px;">
          ${p.screenshots.map(s => `<img src="${s}" alt="Project screenshot" style="width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(58,45,80,0.12);" loading="lazy">`).join('')}
        </div>` : ''}
    `;

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open via View Details button
  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(Number(btn.dataset.projectId));
    });
  });

  // Open via card click/keypress
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(Number(card.dataset.projectId)));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openModal(Number(card.dataset.projectId));
    });
  });

  closeBtn.addEventListener('click', closeModal);

  // Close on overlay backdrop click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

  // Hero buttons
  document.getElementById('btn-view-work').addEventListener('click', () => scrollToSection('projects'));
  document.getElementById('btn-contact-hero').addEventListener('click', () => scrollToSection('contact'));
  document.getElementById('btn-view-resume').addEventListener('click', () => scrollToSection('resume'));
}

// =============================================================
// SKILLS SECTION
// =============================================================
function buildSkills() {
  function skillCards(skills) {
    return skills.map(s => `
      <div class="skill-card reveal">
        <div class="skill-card__icon" style="background:${s.bg}" aria-hidden="true">${s.icon}</div>
        <span class="skill-card__name">${s.name}</span>
      </div>`).join('');
  }

  return `
  <section class="skills" id="skills" aria-label="Skills Section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">My Skills</span>
        <h2 class="section-title">What I Can Do 🛠️</h2>
        <p class="section-subtitle">A mix of technical knowledge and professional competencies developed through my academic journey.</p>
      </div>
      <div class="skills__grid">
        <div class="skills__group">
          <h3 class="skills__group-title">
            <span class="icon" style="background:#E8C0FC;" aria-hidden="true">💻</span>
            Technical Skills
          </h3>
          <div class="skills__cards">${skillCards(d.technicalSkills)}</div>
        </div>
        <div class="skills__group">
          <h3 class="skills__group-title">
            <span class="icon" style="background:#D0F4E0;" aria-hidden="true">🌟</span>
            Professional Skills
          </h3>
          <div class="skills__cards">${skillCards(d.professionalSkills)}</div>
        </div>
      </div>
    </div>
  </section>`;
}

// =============================================================
// CERTIFICATES SECTION
// =============================================================
function buildCertificates() {
  const cards = d.certificates.map(c => `
    <div class="cert-card reveal">
      <div class="cert-card__icon" aria-hidden="true">${c.icon}</div>
      <div>
        <h3 class="cert-card__title">${c.title}</h3>
        <p class="cert-card__issuer">🏢 ${c.issuer}</p>
      </div>
      ${c.credentialUrl
        ? `<a class="btn btn-pink btn-sm" href="${c.credentialUrl}" target="_blank" rel="noopener noreferrer" aria-label="View certificate: ${c.title}">🔗 View Certificate</a>`
        : `<p class="cert-card__note">📌 Credential link not yet configured</p>`
      }
    </div>`).join('');

  return `
  <section class="certificates" id="certificates" aria-label="Certificates Section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">Certificates</span>
        <h2 class="section-title">My Achievements 🏅</h2>
        <p class="section-subtitle">Professional certifications and learning accomplishments from recognized programs.</p>
      </div>
      <div class="cert-grid">${cards}</div>
    </div>
  </section>`;
}

// =============================================================
// CONTACT SECTION
// =============================================================
function buildContact() {
  const socialLinks = [];
  if (d.linkedin) socialLinks.push(`<a class="btn btn-lavender btn-sm" href="${d.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">🔗 LinkedIn</a>`);
  if (d.github)   socialLinks.push(`<a class="btn btn-secondary btn-sm" href="${d.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">💻 GitHub</a>`);

  const phoneItem = d.phone ? `
    <div class="contact-item">
      <div class="contact-item__icon" style="background:#D0F4E0" aria-hidden="true">📞</div>
      <div>
        <div class="contact-item__label">Phone</div>
        <div class="contact-item__value">${d.phone}</div>
      </div>
    </div>` : '';

  return `
  <section class="contact" id="contact" aria-label="Contact Section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">Contact Me</span>
        <h2 class="section-title">Let's Connect! 💌</h2>
        <p class="section-subtitle">I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.</p>
      </div>
      <div class="contact__grid">
        <div class="contact__info">
          <p class="contact__info-desc">
            Whether you have a question, collaboration idea, or just want to say hello — feel free to reach out. I'm always open to new opportunities and conversations!
          </p>
          <div class="contact__items">
            <div class="contact-item">
              <div class="contact-item__icon" style="background:#FF99C8" aria-hidden="true">📧</div>
              <div>
                <div class="contact-item__label">Email Address</div>
                <div class="contact-item__value" id="email-display">${d.email}</div>
              </div>
              <button class="contact__copy-btn" id="copy-email-btn" aria-label="Copy email address">
                📋 Copy
              </button>
            </div>
            ${phoneItem}
          </div>
          ${socialLinks.length > 0 ? `<div style="display:flex;gap:10px;flex-wrap:wrap;">${socialLinks.join('')}</div>` : ''}
        </div>
        <div class="contact__form-card">
          <div class="form-note" role="note">
            ℹ️ Submitting this form will open your default email application with a pre-filled message addressed to <strong>${d.email}</strong>.
          </div>
          <form id="contact-form" novalidate aria-label="Contact Form">
            <div class="form-group">
              <label class="form-label" for="contact-name">Full Name <span aria-hidden="true">*</span></label>
              <input class="form-input" type="text" id="contact-name" name="name" placeholder="Your full name" required autocomplete="name" aria-required="true" />
              <div class="form-error" id="name-error" role="alert" aria-live="polite">⚠️ Please enter your full name.</div>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-email">Email Address <span aria-hidden="true">*</span></label>
              <input class="form-input" type="email" id="contact-email" name="email" placeholder="your@email.com" required autocomplete="email" aria-required="true" />
              <div class="form-error" id="email-error" role="alert" aria-live="polite">⚠️ Please enter a valid email address.</div>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-subject">Subject <span aria-hidden="true">*</span></label>
              <input class="form-input" type="text" id="contact-subject" name="subject" placeholder="What's this about?" required aria-required="true" />
              <div class="form-error" id="subject-error" role="alert" aria-live="polite">⚠️ Please enter a subject.</div>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-message">Message <span aria-hidden="true">*</span></label>
              <textarea class="form-textarea" id="contact-message" name="message" placeholder="Write your message here..." required aria-required="true"></textarea>
              <div class="form-error" id="message-error" role="alert" aria-live="polite">⚠️ Please enter a message.</div>
            </div>
            <button class="btn btn-primary" type="submit" id="contact-submit" style="width:100%;justify-content:center;" aria-label="Send message">
              📨 Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>`;
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  function validateField(inputId, errorId, validatorFn) {
    const input = document.getElementById(inputId);
    const err = document.getElementById(errorId);
    const isValid = validatorFn(input.value.trim());
    input.classList.toggle('error', !isValid);
    err.classList.toggle('visible', !isValid);
    return isValid;
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  // Live validation on blur
  ['contact-name', 'contact-email', 'contact-subject', 'contact-message'].forEach(id => {
    document.getElementById(id).addEventListener('blur', () => {
      const errorMap = {
        'contact-name': { errId: 'name-error', fn: v => v.length > 0 },
        'contact-email': { errId: 'email-error', fn: isValidEmail },
        'contact-subject': { errId: 'subject-error', fn: v => v.length > 0 },
        'contact-message': { errId: 'message-error', fn: v => v.length > 0 },
      };
      const { errId, fn } = errorMap[id];
      validateField(id, errId, fn);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nameOk    = validateField('contact-name', 'name-error', v => v.length > 0);
    const emailOk   = validateField('contact-email', 'email-error', isValidEmail);
    const subjectOk = validateField('contact-subject', 'subject-error', v => v.length > 0);
    const messageOk = validateField('contact-message', 'message-error', v => v.length > 0);

    if (!nameOk || !emailOk || !subjectOk || !messageOk) return;

    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    const body = encodeURIComponent(
      `Hello Shaneth,\n\nMy name is ${name} and my email address is ${email}.\n\n${message}\n\n---\nSent via portfolio contact form`
    );

    window.location.href = `mailto:${d.email}?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Clear form after opening mailto
    setTimeout(() => form.reset(), 500);
  });
}

function setupCopyEmail() {
  const btn = document.getElementById('copy-email-btn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(d.email);
      } else {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = d.email;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      btn.textContent = '✅ Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '📋 Copy';
        btn.classList.remove('copied');
      }, 2000);
    } catch {
      btn.textContent = '❌ Failed';
      setTimeout(() => { btn.textContent = '📋 Copy'; }, 2000);
    }
  });
}

// =============================================================
// RESUME SECTION
// =============================================================
function buildResume() {
  const techSkillBadges = d.technicalSkills.map(s => `<span class="resume__skill-badge">${s.name}</span>`).join('');
  const proSkillBadges  = d.professionalSkills.map(s => `<span class="resume__skill-badge">${s.name}</span>`).join('');
  const certList = d.certificates.map(c => `<div class="resume__cert-item">${c.title} — ${c.issuer}</div>`).join('');

  const downloadBtn = d.cvFile
    ? `<a class="btn btn-mint" href="${d.cvFile}" download aria-label="Download CV as PDF">⬇️ Download CV</a>`
    : '';

  return `
  <section class="resume" id="resume" aria-label="Resume Section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">Resume</span>
        <h2 class="section-title">My Resume 📄</h2>
        <p class="section-subtitle">A snapshot of my academic background, skills, and achievements.</p>
      </div>
      <div class="resume__actions">
        <button class="btn btn-primary" id="print-resume-btn" aria-label="Print resume or save as PDF">
          🖨️ Print / Save as PDF
        </button>
        ${downloadBtn}
      </div>
      <div class="resume__card" id="resume-content">
        <div class="resume__header">
          <div class="resume__name">${d.name}</div>
          <div class="resume__role">${d.title} | ${d.subtitle}</div>
          <div class="resume__contacts">
            <span>📧 ${d.email}</span>
            ${d.linkedin ? `<span>🔗 LinkedIn</span>` : ''}
            ${d.github ? `<span>💻 GitHub</span>` : ''}
          </div>
        </div>

        <div class="resume__section">
          <h3 class="resume__section-title">Professional Summary</h3>
          <div class="resume__entry">
            <p class="resume__entry-sub" style="line-height:1.8;">${d.intro}</p>
          </div>
        </div>

        <div class="resume__section">
          <h3 class="resume__section-title">Education</h3>
          ${d.education.map(edu => `
          <div class="resume__entry">
            <div class="resume__entry-title">${edu.degree}</div>
            <div class="resume__entry-sub">${edu.school}</div>
            <div class="resume__entry-period">${edu.period}</div>
          </div>`).join('')}
        </div>

        <div class="resume__section">
          <h3 class="resume__section-title">Technical Skills</h3>
          <div class="resume__skills-list">${techSkillBadges}</div>
        </div>

        <div class="resume__section">
          <h3 class="resume__section-title">Professional Skills</h3>
          <div class="resume__skills-list mint">${proSkillBadges}</div>
        </div>

        <div class="resume__section">
          <h3 class="resume__section-title">Projects</h3>
          ${d.projects.map(p => `
          <div class="resume__entry">
            <div class="resume__entry-title">${p.title}</div>
            <div class="resume__entry-sub">${p.role} | ${p.tags[0]}</div>
            <div class="resume__entry-sub" style="margin-top:4px;">${p.description}</div>
          </div>`).join('')}
        </div>

        <div class="resume__section">
          <h3 class="resume__section-title">Certificates</h3>
          <div class="resume__certs-list">${certList}</div>
        </div>
      </div>
    </div>
  </section>`;
}

function setupResume() {
  const printBtn = document.getElementById('print-resume-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }
}

// =============================================================
// FOOTER
// =============================================================
function buildFooter() {
  const navLinks = ['Home','About','Projects','Skills','Certificates','Contact'].map(n => `
    <li>
      <button class="footer__link" data-section="${n.toLowerCase()}" aria-label="Go to ${n} section">
        ${n}
      </button>
    </li>`).join('');

  return `
  <footer class="footer" id="footer" role="contentinfo">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <div class="footer__brand-name">${d.name}</div>
          <div class="footer__brand-role">${d.title}</div>
          <p class="footer__brand-desc">
            Aspiring Web and Information Systems Professional passionate about building meaningful digital solutions.
          </p>
        </div>
        <div>
          <p class="footer__heading">Quick Links</p>
          <ul class="footer__links">${navLinks}</ul>
        </div>
        <div>
          <p class="footer__heading">Contact</p>
          <ul class="footer__links">
            <li><span class="footer__link" style="cursor:default;">📧 ${d.email}</span></li>
            ${d.linkedin ? `<li><a class="footer__link" href="${d.linkedin}" target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a></li>` : ''}
            ${d.github ? `<li><a class="footer__link" href="${d.github}" target="_blank" rel="noopener noreferrer">💻 GitHub</a></li>` : ''}
          </ul>
        </div>
      </div>
      <hr class="footer__divider" />
      <div class="footer__bottom">
        <p class="footer__copyright">
          &copy; <span id="copyright-year"></span> ${d.name}. All rights reserved.
        </p>
        <button class="footer__back-top" id="footer-back-top" aria-label="Back to top">
          ↑ Back to Top
        </button>
      </div>
    </div>
  </footer>`;
}

// =============================================================
// FLOATING BACK-TO-TOP BUTTON
// =============================================================
function buildBackTopFloat() {
  return `<button class="back-top-float" id="back-top-float" aria-label="Back to top">↑</button>`;
}

function setupBackToTop() {
  // Dynamic copyright year
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Footer quick links
  document.querySelectorAll('.footer__link[data-section]').forEach(btn => {
    btn.addEventListener('click', () => scrollToSection(btn.dataset.section));
  });

  // Footer back to top
  document.getElementById('footer-back-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Floating back to top
  const floatBtn = document.getElementById('back-top-float');
  floatBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    floatBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

// =============================================================
// SCROLL REVEAL
// =============================================================
function setupScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// =============================================================
// HELPERS
// =============================================================
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');
}
