/**
 * ResumiQ - Sample Resume Data & Presets
 */

const RESUME_PRESETS = {
  swe: {
    personal: {
      fullName: "Alex Morgan",
      jobTitle: "Senior Full-Stack Software Engineer",
      email: "alex.morgan@techpulse.io",
      phone: "+1 (415) 890-2341",
      location: "San Francisco, CA",
      website: "https://alexmorgan.dev",
      linkedin: "linkedin.com/in/alexmorgan-dev",
      github: "github.com/alexm-codes",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      showPhoto: true,
      summary: "High-impact Senior Full Stack Engineer with 7+ years of experience architecting distributed cloud systems, real-time data pipelines, and scalable microservices. Proven track record of boosting system reliability to 99.99% and mentoring 12+ junior engineers. Passionate about TypeScript, Go, distributed caching, and clean event-driven architecture."
    },
    experience: [
      {
        id: "exp-1",
        position: "Lead Software Engineer",
        company: "StripeX Cloud Technologies",
        location: "San Francisco, CA",
        startDate: "Mar 2022",
        endDate: "Present",
        current: true,
        bullets: "• Architected high-throughput payment processing engine handling $45M+ in monthly transaction volume with 99.99% uptime.\n• Spearheaded migration from monolithic Rails backend to Go/gRPC microservices, reducing p99 API latency by 42%.\n• Mentored 8 junior and mid-level engineers, establishing team code standards and automated CI/CD pipelines."
      },
      {
        id: "exp-2",
        position: "Senior Frontend Engineer",
        company: "Veloce Analytics",
        location: "Austin, TX",
        startDate: "Jan 2019",
        endDate: "Feb 2022",
        current: false,
        bullets: "• Engineered real-time telemetry dashboard in React 18, TypeScript, and WebSockets serving 120,000+ active enterprise users.\n• Optimized Core Web Vitals (LCP, FID, CLS), improving dashboard load speeds by 65% across mobile and desktop clients.\n• Built an internal modular design system component library adopted across 6 cross-functional engineering teams."
      },
      {
        id: "exp-3",
        position: "Full-Stack Developer",
        company: "Nexis Digital Solutions",
        location: "Seattle, WA",
        startDate: "Jul 2017",
        endDate: "Dec 2018",
        current: false,
        bullets: "• Developed customer portal using Node.js, Express, PostgreSQL, and React, increasing self-service ticket resolution by 30%.\n• Integrated third-party OAuth2 authorization, AWS S3 file storage, and Stripe automated billing subscriptions."
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "Bachelor of Science in Computer Science",
        field: "Computer Science & Distributed Systems",
        institution: "University of California, Berkeley",
        location: "Berkeley, CA",
        startDate: "2013",
        endDate: "2017",
        gpa: "GPA: 3.85 / 4.0 (Dean's Honors List)"
      }
    ],
    skills: {
      technical: ["TypeScript", "Go (Golang)", "React.js", "Node.js", "Next.js", "GraphQL", "PostgreSQL", "Redis", "Kafka", "RESTful APIs"],
      tools: ["AWS (ECS, S3, RDS)", "Docker", "Kubernetes", "Git / GitHub", "Terraform", "GitHub Actions", "Datadog", "Jest / Playwright"],
      soft: ["System Design", "Agile / Scrum", "Technical Mentorship", "Cross-functional Leadership", "Code Reviews"],
      languages: ["English (Native)", "Spanish (Conversational)"]
    },
    projects: [
      {
        id: "proj-1",
        title: "OmniFlow - Open Source Distributed Task Queue",
        link: "https://github.com/alexm-codes/omniflow",
        techStack: "Go, Redis, gRPC, React",
        date: "2023",
        description: "High-performance distributed job scheduler capable of handling 50k+ jobs/sec with priority queues and visual web monitoring."
      },
      {
        id: "proj-2",
        title: "DevPulse - Real-time Engineering Metrics",
        link: "https://devpulse.live",
        techStack: "Next.js 14, TypeScript, Tailwind, Postgres",
        date: "2022",
        description: "SaaS analytics tool that analyzes GitHub pull request cycles and DORA metrics for 200+ engineering teams."
      }
    ],
    certifications: [
      {
        id: "cert-1",
        name: "AWS Certified Solutions Architect – Professional",
        issuer: "Amazon Web Services",
        date: "Nov 2023",
        url: "aws.amazon.com/verify/10294"
      },
      {
        id: "cert-2",
        name: "Certified Kubernetes Administrator (CKA)",
        issuer: "Linux Foundation / CNCF",
        date: "Aug 2022",
        url: "cncf.io/verify/cka-883"
      }
    ],
    customSection: {
      enabled: true,
      title: "Publications & Open Source",
      content: "• Author of popular NPM package 'ts-cache-decorator' with 500k+ downloads.\n• Speaker at ReactSummit 2023: 'Scaling Micro-Frontends Without Performance Degradation'."
    },
    settings: {
      template: "modern",
      color: "#2563eb",
      font: "Inter",
      density: "normal"
    }
  },

  pm: {
    personal: {
      fullName: "Sarah Jenkins",
      jobTitle: "Senior Technical Product Manager",
      email: "sarah.jenkins@productlead.co",
      phone: "+1 (212) 489-7710",
      location: "New York, NY",
      website: "https://sarahjenkins.pm",
      linkedin: "linkedin.com/in/sarahjenkins-pm",
      github: "",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      showPhoto: true,
      summary: "Data-driven Senior Product Manager with 6+ years of experience leading B2B SaaS and consumer fintech products from 0 to 1. Proven success managing $12M ARR product lines, scaling user retention by 28%, and driving agile delivery across international engineering and design squads."
    },
    experience: [
      {
        id: "exp-1",
        position: "Senior Product Manager",
        company: "FinFlow Capital",
        location: "New York, NY",
        startDate: "Jan 2022",
        endDate: "Present",
        current: true,
        bullets: "• Led product strategy for Automated Wealth Management platform, driving $8.2M ARR increase in FY23.\n• Spearheaded AI-driven financial insights feature, increasing monthly user engagement by 34% within 90 days.\n• Managed squad of 14 engineers, 2 designers, and 2 data scientists across rapid bi-weekly release cycles."
      },
      {
        id: "exp-2",
        position: "Product Manager - Growth & Retention",
        company: "SaaSify Cloud",
        location: "Boston, MA",
        startDate: "Aug 2019",
        endDate: "Dec 2021",
        current: false,
        bullets: "• Redesigned self-serve onboarding funnel, boosting visitor-to-paid conversion rate by 22%.\n• Ran 40+ multivariate A/B experiments on pricing page and feature discovery flows with Mixpanel and Optimizely."
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "Master of Business Administration (MBA)",
        field: "Product Strategy & Tech Innovation",
        institution: "NYU Stern School of Business",
        location: "New York, NY",
        startDate: "2017",
        endDate: "2019",
        gpa: "Dean's Scholar"
      }
    ],
    skills: {
      technical: ["Product Roadmap", "User Journey Mapping", "A/B Testing", "SQL / BigQuery", "Mixpanel / Amplitude", "Data Analytics"],
      tools: ["Jira / Confluence", "Figma", "Postman", "Notion", "Linear", "Tableau"],
      soft: ["Stakeholder Alignment", "Agile / Scrum Delivery", "Product Discovery", "Go-To-Market (GTM) Strategy", "Executive Presentations"],
      languages: ["English (Native)", "French (Professional)"]
    },
    projects: [
      {
        id: "proj-1",
        title: "FinFlow Smart Savings Engine",
        link: "https://finflow.com/smart-save",
        techStack: "Fintech, Machine Learning, iOS/Android",
        date: "2023",
        description: "Automated recurring savings algorithm that saved users over $25M collectively in its first 6 months."
      }
    ],
    certifications: [
      {
        id: "cert-1",
        name: "Certified Scrum Product Owner (CSPO)",
        issuer: "Scrum Alliance",
        date: "2021",
        url: ""
      }
    ],
    customSection: {
      enabled: false,
      title: "",
      content: ""
    },
    settings: {
      template: "executive",
      color: "#0f172a",
      font: "'Plus Jakarta Sans', sans-serif",
      density: "normal"
    }
  },

  designer: {
    personal: {
      fullName: "Elena Vance",
      jobTitle: "Lead Product & UI/UX Designer",
      email: "elena.vance@designstudio.io",
      phone: "+1 (206) 555-0199",
      location: "Seattle, WA",
      website: "https://elenavance.design",
      linkedin: "linkedin.com/in/elenavance-design",
      github: "dribbble.com/elenavance",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
      showPhoto: true,
      summary: "Senior UX/UI Product Designer with 6+ years crafting elegant, human-centered enterprise applications and mobile design systems. Expert in turning complex user workflows into intuitive experiences with high aesthetic polish and measurable business ROI."
    },
    experience: [
      {
        id: "exp-1",
        position: "Lead UX Designer",
        company: "Aura Cloud Platform",
        location: "Seattle, WA",
        startDate: "Feb 2021",
        endDate: "Present",
        current: true,
        bullets: "• Spearheaded end-to-end redesign of enterprise cloud orchestration tool, increasing Task Success Rate from 68% to 94%.\n• Created and scaled multi-brand design system with 200+ Figma components and token-based syncing with React codebases.\n• Conducted 50+ qualitative user research interviews and usability testing sessions with Fortune 500 customers."
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "Bachelor of Fine Arts (BFA) in Interaction Design",
        field: "Human-Computer Interaction",
        institution: "Rhode Island School of Design (RISD)",
        location: "Providence, RI",
        startDate: "2015",
        endDate: "2019",
        gpa: "Honors Graduate"
      }
    ],
    skills: {
      technical: ["Figma / FigJam", "Design Systems", "Prototyping & Micro-interactions", "User Research", "Wireframing", "Information Architecture", "HTML/CSS Basics"],
      tools: ["Figma", "Adobe CC", "Miro", "Lottie", "Principle", "UserTesting.com"],
      soft: ["Design Sprints", "Design Mentorship", "Stakeholder Collaboration", "Empathy-driven Problem Solving"],
      languages: ["English (Native)", "German (Conversational)"]
    },
    projects: [
      {
        id: "proj-1",
        title: "Aura Design System",
        link: "https://aura-design.system",
        techStack: "Figma, React, Storybook, Tokens",
        date: "2023",
        description: "Comprehensive tokenized design system reducing frontend development handoff time by 40%."
      }
    ],
    certifications: [
      {
        id: "cert-1",
        name: "Nielsen Norman Group UX Master Certified (NN/g)",
        issuer: "Nielsen Norman Group",
        date: "2022",
        url: ""
      }
    ],
    customSection: {
      enabled: false,
      title: "",
      content: ""
    },
    settings: {
      template: "split",
      color: "#7c3aed",
      font: "'Outfit', sans-serif",
      density: "normal"
    }
  },

  student: {
    personal: {
      fullName: "David Chen",
      jobTitle: "Computer Science Graduate / Junior Software Engineer",
      email: "david.chen@alumni.edu",
      phone: "+1 (617) 345-9821",
      location: "Boston, MA",
      website: "https://davidchen.dev",
      linkedin: "linkedin.com/in/davidchen-cs",
      github: "github.com/dchen-code",
      photo: "",
      showPhoto: false,
      summary: "Motivated Computer Science graduate with strong foundation in full-stack web development, data structures, and algorithms. Experienced in building responsive web applications using React, Node.js, and Python through university projects and high-impact internships."
    },
    experience: [
      {
        id: "exp-1",
        position: "Software Engineering Intern",
        company: "NextGen Software Labs",
        location: "Boston, MA",
        startDate: "Jun 2023",
        endDate: "Aug 2023",
        current: false,
        bullets: "• Built automated data extraction pipeline using Python and BeautifulSoup, parsing 10,000+ records daily.\n• Created interactive client-facing search filter UI in React and Tailwind CSS, reducing search time by 30%.\n• Participated in daily Agile standups, code reviews, and unit test coverage writing with Jest."
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "Bachelor of Science in Computer Science",
        field: "Software Engineering & Artificial Intelligence",
        institution: "Northeastern University",
        location: "Boston, MA",
        startDate: "2020",
        endDate: "2024",
        gpa: "GPA: 3.82 / 4.0 (Magna Cum Laude)"
      }
    ],
    skills: {
      technical: ["Python", "JavaScript / TypeScript", "React.js", "Java", "C++", "SQL / SQLite", "HTML5 & CSS3"],
      tools: ["Git & GitHub", "VS Code", "Postman", "Docker Basics", "Linux / Bash", "Vercel / Netlify"],
      soft: ["Fast Learner", "Problem Solving", "Team Collaboration", "Strong Communication", "Attention to Detail"],
      languages: ["English (Native)", "Mandarin (Fluent)"]
    },
    projects: [
      {
        id: "proj-1",
        title: "Campus Marketplace Platform",
        link: "https://github.com/dchen-code/campus-market",
        techStack: "React, Node.js, MongoDB, Tailwind",
        date: "2023",
        description: "Full-stack e-commerce marketplace for college students to buy and sell textbooks and electronics securely."
      },
      {
        id: "proj-2",
        title: "Algorithmic Pathfinding Visualizer",
        link: "https://github.com/dchen-code/pathfinder",
        techStack: "JavaScript, HTML5 Canvas, CSS Grid",
        date: "2023",
        description: "Interactive visualizer illustrating Dijkstra's, A*, and BFS maze-solving algorithms in real-time."
      }
    ],
    certifications: [
      {
        id: "cert-1",
        name: "Meta Front-End Developer Professional Certificate",
        issuer: "Coursera / Meta",
        date: "2023",
        url: ""
      }
    ],
    customSection: {
      enabled: true,
      title: "Academic Honors & Leadership",
      content: "• President, Northeastern ACM Student Chapter (Organized 24-hour hackathon for 300+ students).\n• 1st Place Winner, Boston Hackathon 2023 (Best EdTech Solution)."
    },
    settings: {
      template: "compact",
      color: "#0284c7",
      font: "Inter",
      density: "normal"
    }
  }
};

const SUMMARY_PRESETS = [
  {
    role: "Senior Software Engineer / Architect",
    text: "Results-oriented Senior Software Engineer with 7+ years of experience architecting high-throughput distributed systems, scalable microservices, and modern web applications. Proven track record of optimizing system performance by 40%+, driving technical roadmaps, and mentoring high-performing engineering teams."
  },
  {
    role: "Full Stack Developer",
    text: "Versatile Full Stack Developer with strong expertise in modern JavaScript/TypeScript frameworks (React, Next.js, Node.js) and relational database design. Dedicated to delivering responsive, accessible, and high-performance applications with robust CI/CD automated test pipelines."
  },
  {
    role: "Product Manager",
    text: "Strategic Product Manager with 6+ years driving product discovery, agile execution, and cross-functional leadership in high-growth tech environments. Skilled at translating complex user research and business analytics into high-impact roadmap features that drive retention and ARR growth."
  },
  {
    role: "UI/UX & Product Designer",
    text: "User-centric UI/UX Product Designer passionate about creating clean, accessible, and delightful digital products. Expert in design systems, interaction prototyping, user research, and collaborating closely with engineering teams to bridge design and code seamlessly."
  },
  {
    role: "Recent Graduate / Junior Developer",
    text: "Passionate Computer Science graduate with hands-on experience in full-stack web development, data structures, and cloud technologies. Proven ability to quickly learn new tech stacks, collaborate in agile teams, and build user-focused applications with clean, maintainable code."
  },
  {
    role: "Data Scientist / ML Engineer",
    text: "Analytical Data Scientist with expertise in machine learning, statistical modeling, Python, and SQL. Demonstrated success in transforming massive unstructured datasets into actionable business intelligence and deploying predictive ML models to production."
  }
];
