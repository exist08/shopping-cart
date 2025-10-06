import type { PortfolioData } from "../types/portfolio";


export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Anurag",
    title: "Full Stack Developer",
    email: "anurag@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/anurag",
    github: "https://github.com/anurag",
    website: "https://anurag.dev"
  },
  summary: "Passionate Full Stack Developer with expertise in modern web technologies. I love creating beautiful, functional applications that solve real-world problems. With a strong foundation in both frontend and backend development, I bring ideas to life through clean, efficient code.",
  experience: [
    {
      id: "exp1",
      company: "Tech Innovators Inc.",
      position: "Senior Full Stack Developer",
      duration: "2022 - Present",
      location: "San Francisco, CA",
      description: [
        "Led development of scalable web applications serving 100K+ users",
        "Architected and implemented microservices using Node.js and React",
        "Mentored junior developers and conducted code reviews",
        "Improved application performance by 40% through optimization"
      ],
      technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"]
    },
    {
      id: "exp2",
      company: "Digital Solutions LLC",
      position: "Full Stack Developer",
      duration: "2020 - 2022",
      location: "Austin, TX",
      description: [
        "Developed responsive web applications using React and Express.js",
        "Integrated third-party APIs and payment gateways",
        "Collaborated with design team to implement pixel-perfect UIs",
        "Maintained 99.9% uptime for production applications"
      ],
      technologies: ["React", "Express.js", "MongoDB", "JavaScript", "Docker"]
    },
    {
      id: "exp3",
      company: "StartupXYZ",
      position: "Frontend Developer",
      duration: "2019 - 2020",
      location: "Remote",
      description: [
        "Built interactive user interfaces for SaaS platform",
        "Implemented responsive design principles across all devices",
        "Optimized bundle size and loading performance",
        "Worked closely with UX team to enhance user experience"
      ],
      technologies: ["React", "Redux", "Sass", "Webpack", "Jest"]
    }
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      duration: "2015 - 2019",
      location: "Berkeley, CA",
      gpa: "3.8/4.0",
      achievements: [
        "Dean's List for 6 semesters",
        "President of Computer Science Club",
        "Winner of Annual Hackathon 2018"
      ]
    }
  ],
  projects: [
    {
      id: "proj1",
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
      features: [
        "Real-time inventory tracking",
        "Secure payment processing",
        "Admin dashboard with analytics",
        "Mobile-responsive design",
        "Email notifications"
      ],
      github: "https://github.com/anurag/ecommerce-platform",
      demo: "https://ecommerce-demo.anurag.dev"
    },
    {
      id: "proj2",
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and advanced filtering.",
      technologies: ["React", "Firebase", "Material-UI", "WebSocket"],
      features: [
        "Real-time collaboration",
        "Drag-and-drop interface",
        "Advanced filtering and search",
        "Team management",
        "Progress tracking"
      ],
      github: "https://github.com/anurag/task-manager",
      demo: "https://tasks.anurag.dev"
    },
    {
      id: "proj3",
      title: "Weather Dashboard",
      description: "A beautiful weather dashboard with location-based forecasts, interactive maps, and weather alerts.",
      technologies: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
      features: [
        "Location-based weather",
        "7-day forecast",
        "Interactive weather maps",
        "Weather alerts",
        "Responsive design"
      ],
      github: "https://github.com/anurag/weather-dashboard",
      demo: "https://weather.anurag.dev"
    }
  ],
  skills: [
    {
      category: "Frontend",
      items: ["React", "TypeScript", "Next.js", "Vue.js", "HTML5", "CSS3", "Tailwind CSS", "Sass"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "Python", "Django", "PostgreSQL", "MongoDB", "Redis"]
    },
    {
      category: "Tools & Technologies",
      items: ["Git", "Docker", "AWS", "Vercel", "Webpack", "Jest", "Cypress", "Figma"]
    },
    {
      category: "Mobile",
      items: ["React Native", "Expo", "iOS", "Android"]
    }
  ],
  achievements: [
    {
      title: "Top Performer Award",
      description: "Recognized as top performer for exceptional contributions to product development",
      date: "2023"
    },
    {
      title: "Hackathon Winner",
      description: "Won first place in company-wide hackathon for innovative AI-powered solution",
      date: "2022"
    },
    {
      title: "Open Source Contributor",
      description: "Active contributor to popular open-source projects with 500+ GitHub stars",
      date: "2021-Present"
    }
  ]
};
