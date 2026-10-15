// ============================================================
// Portfolio Data — Shaneth V. Timbal
// Edit this file to update portfolio content easily
// ============================================================

export const portfolioData = {
  // ── Personal Info ──────────────────────────────────────────
  name: 'Shaneth V. Timbal',
  firstName: 'Shaneth',
  title: 'BSIS 4th Year Student',
  subtitle: 'Aspiring Web and Information Systems Professional',
  greeting: "Hello, I'm",
  email: 'svtimbal.chmsu@gmail.com',

  // Leave empty string '' to hide social links
  linkedin: '', // e.g. 'https://www.linkedin.com/in/shaneth-timbal'
  github: '',   // e.g. 'https://github.com/shaneth-timbal'

  // Leave empty string '' to hide the phone
  phone: '',

  // Set to '' to hide Download CV button
  cvFile: '',  // e.g. '/shaneth-timbal-cv.pdf'

  intro: "I'm a fourth-year BSIS student who enjoys learning new technologies, solving problems, and creating meaningful digital solutions. I'm eager to apply my knowledge, work with others, and continue developing my skills in web development and information systems.",

  // ── About ──────────────────────────────────────────────────
  bio: "Hi! I'm Shaneth V. Timbal, a fourth-year Bachelor of Science in Information Systems student at Carlos Hilado Memorial State University. I am interested in web development, system analysis, technology, and creating useful digital solutions. I value teamwork, continuous learning, and improving my skills through academic projects and practical experience.",

  stats: [
    { value: '4th', label: 'Year Student' },
    { value: 'BSIS', label: 'Degree Program' },
    { value: '5+', label: 'Certificates' },
    { value: '2+', label: 'Projects' },
  ],

  // ── Education ──────────────────────────────────────────────
  education: [
    {
      degree: 'Bachelor of Science in Information Systems',
      school: 'Carlos Hilado Memorial State University',
      period: '2023 – Present',
      badge: 'Current',
      color: 'lavender',
    },
    {
      degree: 'Senior High School',
      school: 'Augurio Marañon Abeto National High School',
      period: '2021 – 2023',
      badge: null,
      color: 'blue',
    },
    {
      degree: 'Junior High School',
      school: 'Augurio Marañon Abeto National High School',
      period: '2017 – 2021',
      badge: null,
      color: 'pink',
    },
  ],

  // ── Projects ───────────────────────────────────────────────
  projects: [
    {
      id: 1,
      emoji: '🚚',
      image: '/project-logistics.png',
      bgGradient: 'linear-gradient(135deg, #A8DEFA, #D0F4E0)',
      title: 'Logistics Management System with Client Feedback Mechanism',
      tags: ['Capstone Project', 'Web System', 'Client Feedback'],
      description: 'A capstone project focused on developing a logistics management system with a client feedback mechanism to support logistics operations and collect client feedback.',
      role: 'Developer & Systems Analyst',
      technologies: ['HTML', 'CSS', 'JavaScript', 'MySQL', 'PHP'],
      fullDescription: 'This capstone project involved designing and developing a comprehensive logistics management system integrated with a client feedback mechanism. The system aims to streamline logistics operations and provide a structured channel for clients to provide feedback on services rendered.',
      screenshots: ['/project-logistics.png'],
    },
    {
      id: 2,
      emoji: '💼',
      image: '',
      bgGradient: 'linear-gradient(135deg, #FF99C8, #E8C0FC)',
      title: 'Personal Portfolio Website',
      tags: ['Personal Project', 'Web Design', 'Responsive UI'],
      description: 'A personal portfolio website designed to present my background, educational achievements, technical skills, certificates, and academic projects.',
      role: 'Designer & Developer',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Vite'],
      fullDescription: 'A fully responsive personal portfolio website built to showcase my academic journey, technical skills, certificates, and projects. The website features a pastel design aesthetic, smooth animations, accessible components, and mobile-first layout.',
      screenshots: [],
    },
    // ── Add future projects below ───────────────────────────
    // {
    //   id: 3,
    //   emoji: '📋',
    //   bgGradient: 'linear-gradient(135deg, #FFE8D8, #DDF4E7)',
    //   title: 'Future Project Title',
    //   tags: ['Category'],
    //   description: 'Short description.',
    //   role: 'Your role',
    //   technologies: ['Tech stack'],
    //   fullDescription: 'Detailed description.',
    //   screenshots: [],
    // },
  ],

  // ── Technical Skills ────────────────────────────────────────
  technicalSkills: [
    { name: 'HTML & CSS', icon: '🌐', bg: '#A8DEFA' },
    { name: 'JavaScript', icon: '⚡', bg: '#FCF5BF' },
    { name: 'UI/UX Design', icon: '🎨', bg: '#FF99C8' },
    { name: 'Database Fundamentals (MySQL)', icon: '🗄️', bg: '#D0F4E0' },
    { name: 'System Analysis', icon: '📊', bg: '#E8C0FC' },
    { name: 'Microsoft Office (Word, Excel, PowerPoint)', icon: '📄', bg: '#A8DEFA' },
  ],

  // ── Professional Skills ─────────────────────────────────────
  professionalSkills: [
    { name: 'Project Planning & Organization', icon: '📋', bg: '#D0F4E0' },
    { name: 'System Thinking', icon: '🧠', bg: '#E8C0FC' },
    { name: 'Communication', icon: '💬', bg: '#FF99C8' },
    { name: 'Teamwork', icon: '🤝', bg: '#A8DEFA' },
    { name: 'Adaptability', icon: '🔄', bg: '#FCF5BF' },
    { name: 'Problem-Solving', icon: '💡', bg: '#D0F4E0' },
  ],

  // ── Certificates ────────────────────────────────────────────
  // Set credentialUrl: '' to hide the View Certificate button
  certificates: [
    {
      id: 1,
      title: 'Google Prompting Essentials Specialization',
      issuer: 'Google',
      icon: '🤖',
      credentialUrl: '',
    },
    {
      id: 2,
      title: 'Cybersecurity Management and Compliance',
      issuer: 'Google / Coursera',
      icon: '🔒',
      credentialUrl: '',
    },
    {
      id: 3,
      title: 'Networking in Google Cloud: Network Security',
      issuer: 'Google Cloud',
      icon: '☁️',
      credentialUrl: '',
    },
    {
      id: 4,
      title: 'Essential Google Cloud Infrastructure: Foundation',
      issuer: 'Google Cloud',
      icon: '🏗️',
      credentialUrl: '',
    },
    {
      id: 5,
      title: 'Security Principles',
      issuer: 'ISC2 / Coursera',
      icon: '🛡️',
      credentialUrl: '',
    },
  ],
};
