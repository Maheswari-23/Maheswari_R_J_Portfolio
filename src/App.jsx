import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import yrcPhoto from './assets/yrcc.jpg';
import gdsc from './assets/gdscc.jpg';
import cyber from './assets/cyber.jpg';
import sn from './assets/snplastics.jpg';
import noti from './assets/noti.jpg';
import lurn from './assets/lurnn.jpg';

// Icons import
import { 
  FaFigma, FaMobile, FaJs, FaJava, FaDatabase, 
  FaMicrosoft, FaGitAlt, FaGithub, FaAward, FaCrown, 
  FaPalette, FaCode, FaLinkedin, FaEnvelope, FaChevronLeft, FaChevronRight,
  FaLaptopCode, FaPaintBrush, FaVideo, FaCodeBranch, FaCloud, FaRocket
} from 'react-icons/fa';
import { 
  SiMysql, SiAdobephotoshop, SiAdobe, SiCanva,  
} from 'react-icons/si';
import { VscAzure } from "react-icons/vsc";

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

// Skills Carousel Component
const SkillsCarousel = ({ skills }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === skills.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? skills.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 2500); // Faster auto-play

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  return (
    <div 
      className="skills-carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      ref={carouselRef}
    >
      <div className="carousel-container">
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {skills.map((skill, index) => (
            <div key={index} className="carousel-slide">
              <div className="skill-card-carousel">
                <div className="skill-icon-carousel">{skill.icon}</div>
                <h4>{skill.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>
        <FaChevronRight />
      </button>
      
      <div className="carousel-indicators">
        {skills.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
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
      icon: <FaLaptopCode />,
      color: "#3C153B",
      tech: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      title: "UI/UX Intern",
      company: "ALTRUISTY",
      description: "Designed intuitive and user-friendly UI for 'Reconnect,' an alumni network platform, using Figma for wireframing and prototyping.",
      icon: <FaPaintBrush />,
      color: "#8B1E3F",
      tech: ["Figma", "Wireframing", "Prototyping", "User Research"]
    },
    {
      title: "Graphic Design Intern",
      company: "INAMINGOS FOUNDATION",
      description: "Created visually appealing posters and videos for events, ensuring alignment with branding guidelines and audience preferences.",
      icon: <FaVideo />,
      color: "#DB3069",
      tech: ["Canva", "Photoshop", "Video Editing", "Branding"]
    }
  ];

  const designExperience = [
    {
      title: "Design Head",
      company: "YOUTH RED CROSS REC",
      description: "Led a creative team to produce branding materials for major club events and mentored junior designers in design principles and tool usage.",
      image: yrcPhoto,
    },
    {
      title: "Core Design Team Member",
      company: "CYBERSENTINELS REC",
      description: "Collaborated to create posters, digital banners, and social media visuals using Figma and Photoshop, boosting event visibility.",
      image: cyber,
    },
    {
      title: "Designer",
      company: "GOOGLE DEVELOPERS STUDENT CLUB REC",
      description: "Developed engaging design materials and consistent branding for club workshops, tech talks, and community initiatives.",
      image: gdsc,
    }
  ];

  const projects = [
      {
        title: "Sri Narayanar Plastics",
        type: "Freelance Project",
        description: "Delivered an end-to-end web solution, including brand identity, UI/UX, and a responsive website. Led to a 40% increase in client engagement.",
        tech: ["UI/UX Design", "Figma", "Branding", "Netlify"],
        image: sn,
      },
      {
        title: "Notify",
        type: "Campus News App",
        description: "Developed a cloud-based announcement platform with Azure AI for content moderation and personalized notifications, improving engagement by 60%.",
        tech: ["Azure", "AI", "SQL", "Mobile UI"],
        image: noti,
      },
       {
        title: "MedSure",
        type: "Counterfeit Medicine Detection",
        description: "Built a web app for counterfeit medicine detection using QR verification. Achieved 94.8% accuracy in a 24-hour hackathon.",
        tech: ["Firebase", "QR Tech", "Flask", "JavaScript"],
        image: "/api/placeholder/400/250",
      },
      {
        title: "Apex",
        type: "E-Learning Platform",
        description: "A machine learning web app to identify learning styles. Achieved 95% classification accuracy using HistGradientBoostingClassifier.",
        tech: ["Python", "ML", "CSS", "Full-Stack"],
        image: lurn,
      }
    ];

  const skills = [
    { name: "Figma", icon: <FaFigma /> },
    { name: "Photoshop", icon: <SiAdobephotoshop /> },
    { name: "Canva", icon: <SiCanva /> },
    { name: "Prototyping", icon: <FaMobile /> },
    { name: "JavaScript", icon: <FaJs /> },
    { name: "Java", icon: <FaJava /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "Azure", icon: <VscAzure/> },
    { name: "Git", icon: <FaGitAlt /> },
    { name: "GitHub", icon: <FaGithub /> },
  ];

  const accomplishments = [
    { 
      title: "UI/UX Competition Winner", 
      detail: "1st Place at Cryptrix'25, St. Joseph's College of Engineering",
      icon: <FaAward />,
      gradient: "gradient-1"
    },
    { 
      title: "Paper Presentation Winner", 
      detail: "Recognized at Zenith'25, Jeppiaar Engineering College",
      icon: <FaCode />,
      gradient: "gradient-2"
    },
    { 
      title: "Academic Excellence", 
      detail: "Achieved Centum in Computer Science, Higher Secondary Board Exam",
      icon: <FaCrown />,
      gradient: "gradient-3"
    },
    { 
      title: "State-Level Honor", 
      detail: "Awarded Rajyapuraskar (2020) for exceptional contributions in scouting",
      icon: <FaRocket />,
      gradient: "gradient-4"
    },
  ];

  const leadershipBadges = [
    { name: "WOW'25 Core Member", icon: <FaPalette /> },
    { name: "BOOTUP'25 Core Member", icon: <FaCode /> }
  ];

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
              <FaEnvelope style={{ marginRight: '8px' }} />
              <span>Get in Touch</span>
            </a>
            <a href="https://www.linkedin.com/in/maheswari-rj" target="_blank" rel="noopener noreferrer" className="contact-btn secondary">
              <FaLinkedin style={{ marginRight: '8px' }} />
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
          <div className="internship-cards">
            {internships.map((intern, i) => (
              <div key={i} className="internship-card animate-on-scroll">
                <div className="internship-icon" style={{ backgroundColor: intern.color }}>
                  {intern.icon}
                </div>
                <div className="internship-content">
                  <h3>{intern.title}</h3>
                  <h4>{intern.company}</h4>
                  <p>{intern.description}</p>
                  <div className="internship-tech">
                    {intern.tech.map((tech, j) => (
                      <span key={j} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="internship-decoration"></div>
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
                <div className="exp-image-placeholder">
                  <img src={exp.image} alt={exp.title} />
                </div>
                <div className="exp-content">
                  <h3>{exp.title}</h3>
                  <h4>{exp.company}</h4>
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="leadership-section">
            <h3 className="leadership-title">Leadership & Core Memberships</h3>
            <div className="leadership-badges">
              {leadershipBadges.map((badge, i) => (
                <div key={i} className="badge animate-on-scroll">
                  <span className="badge-icon">{badge.icon}</span>
                  <span>{badge.name}</span>
                </div>
              ))}
            </div>
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
                <div className="project-image-placeholder">
                  <img src={project.image} alt={project.title} />
                </div>
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
          <div className="skills-carousel-container">
            <SkillsCarousel skills={skills} />
          </div>
        </div>
      </section>

      <section id="accomplishments" className="section accomplishments-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Accomplishments</h2>
            <div className="section-line"></div>
          </div>
          <div className="accomplishments-grid">
            {accomplishments.map((item, i) => (
              <div key={i} className={`accomplishment-card ${item.gradient} animate-on-scroll`}>
                <div className="accomplishment-icon">
                  {item.icon}
                </div>
                <div className="accomplishment-content">
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                </div>
                <div className="accomplishment-decoration"></div>
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
              <a href="mailto:220701155@rajalakshmi.edu.in">
                <FaEnvelope style={{ marginRight: '8px' }} />
                Email
              </a>
              <a href="https://www.linkedin.com/in/maheswari-rj" target="_blank" rel="noopener noreferrer">
                <FaLinkedin style={{ marginRight: '8px' }} />
                LinkedIn
              </a>
              <a href="https://github.com/Maheswari-05" target="_blank" rel="noopener noreferrer">
                <FaGithub style={{ marginRight: '8px' }} />
                GitHub
              </a>
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