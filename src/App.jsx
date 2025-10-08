import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Simple typewriter hook
const useTypewriter = (words, options = {}) => {
  const { loop = true, typeSpeed = 150, deleteSpeed = 100 } = options;
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (loop ? (prev + 1) % words.length : prev + 1));
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, words, wordIndex, loop, typeSpeed, deleteSpeed]);

  return text;
};

// Intersection Observer hook for animations
const useIntersectionObserver = (options) => {
    const [elements, setElements] = useState([]);
    const observer = useRef(null);

    useEffect(() => {
        if (elements.length > 0) {
            observer.current = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            }, options);

            elements.forEach(el => observer.current.observe(el));
        }
        return () => {
            if (observer.current) {
                elements.forEach(el => observer.current.unobserve(el));
            }
        };
    }, [elements, options]);

    return setElements;
};


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const typedText = useTypewriter(['Developer', 'Creator', 'Innovator']);
  const setObservedElements = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    const handleScroll = () => {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    setObservedElements(Array.from(elements));
  }, [setObservedElements]);


  const navigation = ['About', 'Internships', 'Experience', 'Projects', 'Skills', 'Accomplishments'];

  const internships = [
    {
      title: "Full Stack Intern",
      company: "EDUNET FOUNDATION",
      description: "Gained hands-on experience by building responsive, real-world web applications and contributing to the full development lifecycle.",
    },
    {
      title: "UI/UX Intern",
      company: "ALTRUISTY",
      description: "Designed intuitive and user-friendly UI for 'Reconnect,' an alumni network platform, using Figma for wireframing and prototyping.",
    },
    {
      title: "Graphic Design Intern",
      company: "INAMINGOS FOUNDATION",
      description: "Created visually appealing posters and videos for events, ensuring alignment with branding guidelines and audience preferences.",
    }
  ];

  const designExperience = [
    {
      title: "Design Head",
      company: "YOUTH RED CROSS REC",
      description: "Led a creative team to produce branding materials for major club events and mentored junior designers in design principles and tool usage.",
    },
    {
      title: "Core Design Team Member",
      company: "CYBERSENTINELS REC",
      description: "Collaborated to create posters, digital banners, and social media visuals using Figma and Photoshop, boosting event visibility.",
    },
    {
      title: "Designer",
      company: "GOOGLE DEVELOPERS STUDENT CLUB REC",
      description: "Developed engaging design materials and consistent branding for club workshops, tech talks, and community initiatives.",
    }
  ];

  const projects = [
      {
        title: "Sri Narayanar Plastics",
        type: "Freelance Project",
        description: "Delivered an end-to-end web solution, including brand identity, UI/UX, and a responsive website. Led to a 40% increase in client engagement.",
        tech: ["UI/UX Design", "Figma", "Branding", "Netlify"],
      },
      {
        title: "Notify",
        type: "Campus News App",
        description: "Developed a cloud-based announcement platform with Azure AI for content moderation and personalized notifications, improving engagement by 60%.",
        tech: ["Azure", "AI", "SQL", "Mobile UI"],
      },
       {
        title: "MedSure",
        type: "Counterfeit Medicine Detection",
        description: "Built a web app for counterfeit medicine detection using QR verification. Achieved 94.8% accuracy in a 24-hour hackathon.",
        tech: ["Firebase", "QR Tech", "Flask", "JavaScript"],
      },
      {
        title: "Apex",
        type: "E-Learning Platform",
        description: "A machine learning web app to identify learning styles. Achieved 95% classification accuracy using HistGradientBoostingClassifier.",
        tech: ["Python", "ML", "CSS", "Full-Stack"],
      }
    ];

  const skills = {
    design: [
      { name: "Figma", icon: <svg viewBox="0 0 24 24"><path fill="currentColor" d="M15 0H9C6.79 0 5 1.79 5 4v2.5c0 1.38 1.12 2.5 2.5 2.5S10 7.88 10 6.5V4c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v5c0 .55-.45 1-1 1s-1-.45-1-1V7.5c0-1.38-1.12-2.5-2.5-2.5S5 6.12 5 7.5v1.5C5 11.43 7.57 14 10.5 14H12c.55 0 1-.45 1-1v-2.5c0-1.38-1.12-2.5-2.5-2.5S8 9.12 8 10.5V13c0 .55.45 1 1 1h2c2.21 0 4-1.79 4-4V4c0-2.21-1.79-4-4-4zM8.5 16.5c-1.38 0-2.5 1.12-2.5 2.5v1.5c0 2.21 1.79 4 4 4h1c.55 0 1-.45 1-1v-2.5c0-1.38-1.12-2.5-2.5-2.5S8.5 17.88 8.5 19.5V22c0 .55-.45 1-1 1H5c-2.21 0-4-1.79-4-4v-1.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v.5z"/></svg> },
      { name: "Photoshop", icon: <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.29 13.71c-.39.39-1.02.39-1.41 0l-2.12-2.12-2.12 2.12c-.39.39-1.02.39-1.41 0a.996.996 0 0 1 0-1.41L9.05 12l-2.12-2.12c-.39-.39-.39-1.02 0-1.41s1.02-.39 1.41 0L10.46 10.59l2.12-2.12c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41L11.88 12l2.12 2.12c.39.4.39 1.03 0 1.42z"/></svg> },
      { name: "Canva", icon: <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z"/></svg> },
      { name: "Prototyping", icon: <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19.4 6.6C18.6 5.8 17.4 5 16 5c-1.8 0-3.4 1.2-4 2.8C11.4 6.2 9.8 5 8 5c-1.4 0-2.6.8-3.4 1.6C2.9 8.3 2 10.4 2 12.5V13c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5v-.5c0-2.1-.9-4.2-2.6-5.9zM17 16H7c-1.7 0-3-1.3-3-3v-.5c0-1.6.6-3.1 1.9-4.1.7-.6 1.5-1 2.1-1 .9 0 1.9.6 2.5 1.7l.5 1.3h5l.5-1.3c.6-1.1 1.6-1.7 2.5-1.7.6 0 1.4.4 2.1 1C20.4 8.9 21 10.4 21 12v.5c0 1.7-1.3 3-3 3z"/></svg> },
    ],
    development: [
      { name: "JavaScript", icon: <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,6H13V13H11V6M11,15H13V17H11V15Z" /></svg> },
      { name: "Java", icon: <svg viewBox="0 0 24 24"><path fill="currentColor" d="M4,3H20A1,1 0 0,1 21,4V20A1,1 0 0,1 20,21H4A1,1 0 0,1 3,20V4A1,1 0 0,1 4,3M6,5V19H18V5H6M8,7H16V9H8V7M8,11H16V13H8V11M8,15H14V17H8V15Z" /></svg> },
      { name: "MySQL", icon: <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V5h2v7zm4 4h-2v-2h2v2zm0-4h-2V5h2v7z" /></svg> },
      { name: "Azure", icon: <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" /></svg> },
      { name: "Git", icon: <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M18,10H14V6H18V10M12,12H8V16H12V12M6,10H10V6H6V10M12,18H8V14H12V18M18,16H14V12H18V16Z" /></svg> },
      { name: "GitHub", icon: <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21V19.21C7.03,19.64 6.36,18.33 6.36,18.33C5.92,17.22 5.29,16.92 5.29,16.92C4.4,16.32 5.35,16.33 5.35,16.33C6.3,16.4 6.83,17.31 6.83,17.31C7.68,18.73 9.1,18.29 9.58,18.09C9.66,17.47 9.91,17.05 10.21,16.81C7.91,16.54 5.47,15.68 5.47,12.21C5.47,11.09 5.85,10.19 6.45,9.48C6.35,9.22 6,8.12 6.55,6.75C6.55,6.75 7.38,6.48 9.5,7.89C10.27,7.68 11.15,7.58 12,7.58C12.85,7.58 13.73,7.68 14.5,7.89C16.62,6.48 17.45,6.75 17.45,6.75C18,8.12 17.65,9.22 17.55,9.48C18.15,10.19 18.53,11.09 18.53,12.21C18.53,15.7 16.08,16.54 13.78,16.81C14.16,17.14 14.5,17.84 14.5,18.81V21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" /></svg> },
    ]
  };

  const accomplishments = [
    { title: "UI/UX Competition Winner", detail: "1st Place at Cryptrix'25, St. Joseph’s College of Engineering" },
    { title: "Paper Presentation Winner", detail: "Recognized at Zenith’25, Jeppiaar Engineering College" },
    { title: "Academic Excellence", detail: "Achieved Centum in Computer Science, Higher Secondary Board Exam" },
    { title: "State-Level Honor", detail: "Awarded Rajyapuraskar (2020) for exceptional contributions in scouting" },
  ];

  const leadershipBadges = ["WOW'25 Core Member", "BOOTUP'25 Core Member"];

  return (
    <div className="portfolio">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">Maheswari R J</h1>
          <div className="nav-links">
            {navigation.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={activeSection === item.toLowerCase() ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="about" className="hero">
        <div className="hero-content">
          <div className="hero-badge animate-on-scroll">Available for Opportunities</div>
          <h2 className="hero-title animate-on-scroll">
            Designer & <span className="gradient-text">{typedText}</span>
          </h2>
          <p className="hero-subtitle animate-on-scroll">
            Final-year Computer Science student building clean, responsive, and user-first digital experiences.
          </p>
          <div className="contact-links animate-on-scroll">
            <a href="mailto:220701155@rajalakshmi.edu.in" className="contact-btn primary">
              <span>Get in Touch</span>
            </a>
            <a href="https://www.linkedin.com/in/maheswari-rj" target="_blank" rel="noopener noreferrer" className="contact-btn secondary">
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      <section id="internships" className="section dark">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Internships</h2>
            <div className="section-line"></div>
          </div>
          <div className="experience-grid">
            {internships.map((exp, i) => (
              <div key={i} className="exp-card animate-on-scroll">
                <div className="exp-content">
                  <h3>{exp.title}</h3>
                  <h4>{exp.company}</h4>
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Design Experience</h2>
            <div className="section-line"></div>
          </div>
          <div className="experience-grid">
            {designExperience.map((exp, i) => (
              <div key={i} className="exp-card animate-on-scroll">
                <div className="exp-content">
                  <h3>{exp.title}</h3>
                  <h4>{exp.company}</h4>
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
           <div className="leadership-badges">
            {leadershipBadges.map((badge, i) => (
              <div key={i} className="badge animate-on-scroll">{badge}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section dark">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-line"></div>
          </div>
          <div className="projects-grid">
            {projects.map((project, i) => (
              <div key={i} className="project-card animate-on-scroll">
                <div className="project-content">
                  <span className="project-type">{project.type}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-tags">
                    {project.tech.map((tech, j) => (
                      <span key={j} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        <section id="skills" className="section">
            <div className="container">
                <div className="section-header animate-on-scroll">
                    <h2 className="section-title">Skills & Tools</h2>
                    <div className="section-line"></div>
                </div>
                <div className="skills-container">
                    <div className="skills-column animate-on-scroll">
                        <h3 className="skills-category-title">Design</h3>
                        <div className="skills-grid">
                            {skills.design.map((tool, i) => (
                                <div key={i} className="skill-card">
                                    <div className="skill-icon">{tool.icon}</div>
                                    <h4>{tool.name}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="skills-column animate-on-scroll">
                        <h3 className="skills-category-title">Development</h3>
                        <div className="skills-grid">
                            {skills.development.map((tool, i) => (
                                <div key={i} className="skill-card">
                                    <div className="skill-icon">{tool.icon}</div>
                                    <h4>{tool.name}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="accomplishments" className="section dark">
            <div className="container">
                <div className="section-header animate-on-scroll">
                    <h2 className="section-title">Accomplishments</h2>
                    <div className="section-line"></div>
                </div>
                <div className="accomplishments-list">
                    {accomplishments.map((item, i) => (
                        <div key={i} className="accomplishment-item animate-on-scroll">
                            <div className="accomplishment-marker">
                                <span>🏆</span>
                            </div>
                            <div className="accomplishment-content">
                                <h4>{item.title}</h4>
                                <p>{item.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <h2>Let's Create Something Amazing</h2>
            <div className="footer-links">
              <a href="mailto:220701155@rajalakshmi.edu.in">Email</a>
              <a href="https://www.linkedin.com/in/maheswari-rj" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/Maheswari-05" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Maheswari R J. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}