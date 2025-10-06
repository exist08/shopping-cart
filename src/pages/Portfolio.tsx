import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  ExternalLink, 
  Code, 
  Briefcase, 
  Award,
  ChevronDown,
  Star,
  Users,
  Zap
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Portfolio: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [activeSection] = useState('hero');
  
  // Smooth spring animation for scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Navigation items
  const navItems = [
    { id: 'hero', label: 'Home', icon: Star },
    { id: 'about', label: 'About', icon: Users },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Zap },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Floating Navigation */}
      <motion.nav
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-purple-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          style={{ y: y2 }}
        />
      </div>
    </div>
  );
};

// Hero Section Component
const HeroSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  return (
    <section id="hero" ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {portfolioData.personalInfo.name}
            </span>
          </motion.h1>
          
          <motion.p
            className="text-2xl md:text-3xl text-white/80 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {portfolioData.personalInfo.title}
          </motion.p>

          <motion.p
            className="text-lg text-white/60 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {portfolioData.summary}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <ContactButton icon={Mail} href={`mailto:${portfolioData.personalInfo.email}`} label="Email" />
            <ContactButton icon={Linkedin} href={portfolioData.personalInfo.linkedin} label="LinkedIn" />
            <ContactButton icon={Github} href={portfolioData.personalInfo.github || '#'} label="GitHub" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 cursor-pointer"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Button Component
const ContactButton: React.FC<{ icon: any; href: string; label: string }> = ({ icon: Icon, href, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full text-white hover:bg-white/20 transition-all duration-300"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon size={20} />
    <span>{label}</span>
  </motion.a>
);

// About Section Component
const AboutSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  return (
    <section id="about" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              {portfolioData.summary}
            </p>
            <p className="text-white/70 leading-relaxed">
              I'm passionate about creating digital experiences that not only look great but also solve real problems. 
              When I'm not coding, you can find me exploring new technologies, contributing to open source projects, 
              or sharing knowledge with the developer community.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <StatCard icon={Code} value="50+" label="Projects" />
            <StatCard icon={Briefcase} value="5+" label="Years Experience" />
            <StatCard icon={Users} value="100K+" label="Users Impacted" />
            <StatCard icon={Award} value="10+" label="Achievements" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Stat Card Component
const StatCard: React.FC<{ icon: any; value: string; label: string }> = ({ icon: Icon, value, label }) => (
  <motion.div
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <Icon className="mx-auto mb-3 text-purple-400" size={32} />
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-white/60 text-sm">{label}</div>
  </motion.div>
);

// Experience Section Component
const ExperienceSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  return (
    <section id="experience" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"></div>

          {portfolioData.experience.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Card Component
const ExperienceCard: React.FC<{ experience: any; index: number; inView: boolean }> = ({ experience, index, inView }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`relative flex items-center mb-12 ${isEven ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -100 : 100 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Timeline Dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full z-10"></div>

      <motion.div
        className={`w-5/12 bg-white/10 backdrop-blur-lg rounded-xl p-6 ${isEven ? 'mr-auto' : 'ml-auto'}`}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-3">
          <Briefcase className="text-purple-400 mr-3" size={20} />
          <span className="text-purple-400 text-sm font-medium">{experience.duration}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{experience.position}</h3>
        <p className="text-purple-300 mb-3">{experience.company} • {experience.location}</p>
        <ul className="text-white/70 text-sm space-y-1 mb-4">
          {experience.description.map((desc: string, i: number) => (
            <li key={i} className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              {desc}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech: string) => (
            <span key={tech} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Skills Section Component
const SkillsSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  return (
    <section id="skills" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {portfolioData.skills.map((skillCategory, index) => (
            <SkillCategory key={skillCategory.category} category={skillCategory} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Skill Category Component
const SkillCategory: React.FC<{ category: any; index: number; inView: boolean }> = ({ category, index, inView }) => (
  <motion.div
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
    initial={{ opacity: 0, y: 50 }}
    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    whileHover={{ scale: 1.05, y: -5 }}
  >
    <h3 className="text-xl font-bold text-white mb-4">{category.category}</h3>
    <div className="space-y-3">
      {category.items.map((skill: string, skillIndex: number) => (
        <motion.div
          key={skill}
          className="flex items-center justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: (index * 0.1) + (skillIndex * 0.05) }}
        >
          <span className="text-white/80 text-sm">{skill}</span>
          <motion.div
            className="w-16 h-2 bg-white/20 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 1, delay: (index * 0.1) + (skillIndex * 0.05) }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: '0%' }}
              animate={inView ? { width: `${85 + Math.random() * 15}%` } : { width: '0%' }}
              transition={{ duration: 1.5, delay: (index * 0.1) + (skillIndex * 0.05) }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// Projects Section Component
const ProjectsSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  return (
    <section id="projects" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Project Card Component
const ProjectCard: React.FC<{ project: any; index: number; inView: boolean }> = ({ project, index, inView }) => (
  <motion.div
    className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden group"
    initial={{ opacity: 0, y: 50 }}
    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    whileHover={{ scale: 1.05, y: -10 }}
  >
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        <div className="flex space-x-2">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
        </div>
      </div>
      
      <p className="text-white/70 text-sm mb-4">{project.description}</p>
      
      <div className="mb-4">
        <h4 className="text-white font-medium mb-2">Key Features:</h4>
        <ul className="text-white/60 text-sm space-y-1">
          {project.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech: string) => (
          <span key={tech} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// Contact Section Component
const ContactSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  return (
    <section id="contact" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Connect</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ContactInfo icon={Mail} label="Email" value={portfolioData.personalInfo.email} href={`mailto:${portfolioData.personalInfo.email}`} />
          <ContactInfo icon={Phone} label="Phone" value={portfolioData.personalInfo.phone} href={`tel:${portfolioData.personalInfo.phone}`} />
          <ContactInfo icon={MapPin} label="Location" value={portfolioData.personalInfo.location} />
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-medium text-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(`mailto:${portfolioData.personalInfo.email}`, '_blank')}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Info Component
const ContactInfo: React.FC<{ icon: any; label: string; value: string; href?: string }> = ({ icon: Icon, label, value, href }) => (
  <motion.div
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <Icon className="mx-auto mb-4 text-purple-400" size={32} />
    <h3 className="text-white font-medium mb-2">{label}</h3>
    {href ? (
      <a href={href} className="text-white/70 hover:text-white transition-colors">
        {value}
      </a>
    ) : (
      <p className="text-white/70">{value}</p>
    )}
  </motion.div>
);

export default Portfolio;
