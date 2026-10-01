import { Project, SkillCategory, ExperienceItem, EducationItem } from './types';

export const PERSONAL_INFO = {
  name: 'Abdul Mueez',
  title: 'Junior Software Engineer | Full-Stack Developer',
  tagline: 'Crafting robust end-to-end web applications with clean architecture, real-time interactivity, and data-driven intelligence.',
  location: 'Beruwala, Sri Lanka',
  phone: '+94 76 172 2165',
  email: 'abmueez593@gmail.com',
  github: 'https://github.com/AbdulMueezMunassir',
  linkedin: 'https://www.linkedin.com/in/abdul-mueez-527ba7222/',
  whatsapp: 'https://wa.me/94761722165',
  avatarUrl: '/avatar.png',
  profileSummary:
    'Computer Science undergraduate (BSc Hons, Sabaragamuwa University of Sri Lanka) with hands-on full-stack development experience from an internship at Hameedia and independent projects across Next.js, the MERN/MENN/PENN stacks, and applied machine learning. Comfortable owning a feature end-to-end, from database schema and REST APIs to responsive, real-time frontends, using TypeScript, PHP, MySQL, PostgreSQL, Prisma, Node.js, Express, MongoDB, React and Angular. Recently extended this into authentication, error monitoring, and data-driven applications with Supabase, Sentry, Python and Scikit-learn, plus cloud/DevOps tooling with AWS and Docker. Looking for a junior software engineering role to keep building practical, scalable products.',
  status: 'Open to Junior Software Engineer & Full-Stack Developer opportunities',
  availability: 'Available Immediately / Full-time & Hybrid (Beruwala)',
};

export const PROJECTS: Project[] = [
  {
    id: 'task-tracker',
    title: 'Task Tracker - Kanban Task Management',
    stackType: 'Next.js / Supabase',
    category: 'fullstack',
    categories: ['Web Development', 'Mobile', 'UI/UX'],
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    summary: 'Built a responsive task management app with a three-column Kanban board, task analytics, priority tracking, and overdue detection.',
    description: [
      'Implemented task creation, editing, deletion, status changes, priorities, and due dates across To Do, In Progress, and Done columns.',
      'Added Supabase email/password authentication with middleware-protected pages and user-scoped task API routes.',
      'Built dashboard statistics, status and priority analytics, overdue highlighting, and profile settings.',
    ],
    technologies: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Supabase', 'PostgreSQL', 'Prisma 5', 'Zod', 'Sentry'],
    features: [
      'Three-column Kanban board with task CRUD',
      'Priority and due-date tracking with overdue detection',
      'Supabase authentication and protected routes',
      'Dashboard statistics and task analytics',
      'Responsive navigation and profile settings',
      'Sentry error monitoring',
    ],
    architecture: 'Next.js App Router with authenticated API routes, Supabase Auth sessions, Zod validation, Prisma ORM, and PostgreSQL.',
    githubUrl: 'https://github.com/AbdulMueezMunassir/task-tracker',
    liveUrl: 'https://task-tracker-tau-ruby.vercel.app/',
    featured: true,
    status: 'Completed',
  },
  {
    id: 'food-delivery-lk',
    title: 'FoodDelivery LK - Sri Lankan Food Delivery',
    stackType: 'Next.js / PostgreSQL',
    category: 'fullstack',
    categories: ['Web Development', 'Mobile', 'UI/UX'],
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    summary: 'Built a Sri Lankan food-delivery app with restaurant discovery, cuisine categories, delivery-address search, and protected customer and restaurant workflows.',
    description: [
      'Created a food-ordering experience with restaurant discovery, Sri Lankan cuisine categories, and delivery-address search.',
      'Implemented customer and restaurant accounts with signed JWT authentication and protected routes.',
      'Modeled users, restaurants, and orders in PostgreSQL with Prisma, including delivery details, payment method, and order status.',
    ],
    technologies: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'JWT', 'bcryptjs', 'Tailwind CSS'],
    features: [
      'Restaurant discovery and cuisine-category browsing',
      'Search by food or restaurant and delivery-address entry',
      'Customer and restaurant accounts with role-aware access',
      'Signed JWT authentication and protected routes',
      'PostgreSQL order persistence with delivery and payment details',
    ],
    architecture: 'Next.js App Router and TypeScript with protected API routes, signed JWT authentication, Prisma ORM, and PostgreSQL.',
    githubUrl: 'https://github.com/AbdulMueezMunassir/FoodDelivery-LK',
    featured: true,
    status: 'In Progress',
  },
  {
    id: 'pharmacy-pos-inventory',
    title: 'Pharmacy POS & Inventory System',
    stackType: 'MERN Stack',
    category: 'enterprise',
    categories: ['Web Development', 'UI/UX'],
    coverImage: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    status: 'Completed',
    summary: 'Built billing, stock-management and reporting workflows with dashboard metrics, stock-value tracking and expiry alerts.',
    description: [
      'Built billing, stock-management and reporting workflows with dashboard metrics, stock-value tracking and expiry alerts.',
      'Added intelligent product search and authentication-based access control.',
      'Designed a normalized MongoDB schema and RESTful APIs with Node.js and Express.js to support real-time stock updates.'
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs', 'Tailwind CSS'],
    features: [
      'Billing, stock-management and reporting workflows with dashboard metrics',
      'Real-time stock-value tracking and automated expiry alerts',
      'Intelligent product search by generic chemical and brand name',
      'Authentication-based access control (Cashier & Pharmacy Manager roles)',
      'Rapid POS invoice generation and daily sales turnover calculations'
    ],
    architecture: 'React.js Client ➔ Express.js REST API with JWT Auth ➔ MongoDB Collections with Indexed Search Queries.',
    githubUrl: 'https://github.com/AbdulMueezMunassir/No1-Pharmacy-POS-System',
  },
  {
    id: 'aqua-market-nextjs',
    title: 'Aqua Market – Premium Aquarium Marketplace',
    stackType: 'Next.js',
    category: 'fullstack',
    categories: ['Web Development', 'UI/UX'],
    coverImage: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    status: 'Completed',
    summary: 'Developed a responsive e-commerce platform for aquarium products with product browsing, categories, shopping cart, wishlist, and order management.',
    description: [
      'Developed a responsive e-commerce platform for aquarium products with product browsing, categories, shopping cart, wishlist, and order management.',
      'Implemented role-based access for Admin, Staff, and Customers, with an analytics dashboard for managing products and orders.',
      'Integrated JWT authentication, Zustand state management, and Socket.io for secure access, client-side state, and real-time updates.'
    ],
    technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Mongoose', 'JWT', 'Tailwind CSS', 'Zustand', 'Socket.io', 'Stripe'],
    features: [
      'Product browsing, taxonomy categories, shopping cart, wishlist, and order management',
      'Role-based access control for Admin, Staff, and Customers',
      'Analytics dashboard for monitoring products, orders, and sales performance',
      'Real-time order state updates and stock alerts with Socket.io',
      'Client-side state management powered by Zustand and token-based JWT security',
      'Seamless online payments and order processing via Stripe'
    ],
    architecture: 'Next.js App Router (SSR & CSR) with Zustand ➔ REST & Socket.io WebSockets ➔ MongoDB Database via Mongoose ➔ Stripe Payment Gateway.',
    githubUrl: 'https://github.com/AbdulMueezMunassir/aqua_market',
  },
  {
    id: 'mhk-travels-penn',
    title: 'MHK Travels – Hajj & Umrah Tour Management Platform',
    stackType: 'PENN Stack',
    category: 'fullstack',
    categories: ['Web Development', 'Mobile', 'UI/UX'],
    coverImage: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    status: 'Completed',
    summary: 'Developed a full-stack pilgrimage booking platform for managing Hajj & Umrah packages, customer bookings, and tour information.',
    description: [
      'Developed a full-stack pilgrimage booking platform for managing Hajj & Umrah packages, customer bookings, and tour information.',
      'Integrated PayHere payment gateway with advance payment support, enabling customers to securely make online bookings.',
      'Implemented an admin management system for managing packages, bookings, customers, and payment records.'
    ],
    technologies: ['Next.js', 'React', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'PayHere', 'REST APIs'],
    features: [
      'Full-stack pilgrimage booking platform for Hajj & Umrah package discovery',
      'Customer reservation workflow with traveler detail registration',
      'PayHere payment gateway integration with advance payment support for online bookings',
      'Comprehensive admin management suite for packages, bookings, customers, and payment records',
      'Itinerary timelines, hotel accommodation breakdowns, and pilgrimage guidance'
    ],
    architecture: 'Next.js & React Frontend ➔ Node.js & Express.js REST API ➔ PostgreSQL Relational Database ➔ PayHere Payment Gateway.',
    githubUrl: 'https://github.com/AbdulMueezMunassir/Hajj-Umrah-Tour-Operator-Platform-PENN-Stack-',
  },
  {
    id: 'house-price-prediction',
    title: 'House Price Prediction',
    stackType: 'Machine Learning',
    category: 'ml',
    categories: ['Machine Learning', 'Web Development'],
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    status: 'Completed',
    summary: 'Trained a regression model on Sri Lankan property and location data, then wrapped it in an interactive Streamlit app for live predictions and data insights.',
    description: [
      'Trained a regression model on Sri Lankan property and location data, then wrapped it in an interactive Streamlit app for live predictions and data insights.',
      'Performed data cleaning, feature engineering, and exploratory analysis using Pandas and NumPy to improve model accuracy.',
      'Evaluated multiple regression algorithms with Scikit-learn and tuned hyperparameters to select the best-performing model.'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit', 'Data Modeling'],
    features: [
      'Live property valuation predictions based on regional and structural parameters',
      'Interactive Streamlit web interface with dynamic sliders and input controls',
      'Exploratory data insights and visualization of price trends across Sri Lanka',
      'Regression model benchmarking and feature importance analysis with Scikit-learn'
    ],
    architecture: 'Sri Lankan Property Dataset ➔ Pandas & NumPy Preprocessing Pipeline ➔ Scikit-learn Regression Model ➔ Interactive Streamlit Cloud App.',
    githubUrl: 'https://github.com/AbdulMueezMunassir/Sri-Lanka-House-Price-Predictor',
  },
  {
    id: 'pharmacy-pos-django',
    title: 'Pharmacy POS & Inventory Management System',
    stackType: 'Django / PostgreSQL',
    category: 'fullstack',
    categories: ['Web Development', 'UI/UX'],
    coverImage: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    status: 'Completed',
    summary: 'Developed a robust pharmacy point-of-sale and inventory system using Django + PostgreSQL over FastAPI + PostgreSQL, capitalizing on ACID transactions and relational data integrity.',
    description: [
      'Engineered a comprehensive pharmacy point-of-sale (POS) and inventory management platform using Django and PostgreSQL, strategically selecting Django over FastAPI for its robust ORM, built-in admin panel, and strict relational transaction safety.',
      'Designed high-speed cashier checkout and billing counters with instant medicine lookups, generic chemical substitutes, and automated receipt generation.',
      'Implemented automated batch expiry tracking, minimum-threshold stock alerts, and real-time stock valuation to prevent revenue losses.',
      'Secured role-based access control (RBAC) separating Pharmacists, Cashiers, and Admins with audit trails and transaction logging.'
    ],
    technologies: ['Django', 'Python', 'PostgreSQL', 'REST APIs', 'HTML5', 'Tailwind CSS', 'JWT'],
    features: [
      'Strategic architectural selection of Django + PostgreSQL over FastAPI for enterprise data integrity and ORM transactions',
      'Rapid POS billing counter with keyboard-first navigation and invoice calculations',
      'Intelligent pharmaceutical search across generic and commercial medicine brands',
      'Automated batch expiration tracking and low-stock replenishment alert triggers',
      'Role-based access control (RBAC) with detailed sales and cashier transaction logs',
      'Real-time turnover analytics, profit margin tracking, and inventory valuation reports'
    ],
    architecture: 'Django MVT & REST Layer ➔ Django ORM with Atomic Relational Transactions ➔ PostgreSQL Database with Schema Constraints & Indexing.',
    githubUrl: 'https://github.com/AbdulMueezMunassir/Crown_Pharmacy_POS_System',
  },
  {
    id: 'route-32-bus-ticketing',
    title: 'Route 32 Bus Ticketing System (Colombo – Tangalle)',
    stackType: 'Python / Tkinter / SQLite',
    category: 'fullstack',
    categories: ['Desktop & Systems', 'UI/UX'],
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    status: 'Completed',
    summary: 'A complete, production-ready bus ticketing application designed specifically for Route 32 (Colombo - Tangalle) bus service, providing real-time A6 ticket printing, NTC stage pricing, and secure income audit trails.',
    description: [
      'A complete, production-ready bus ticketing application designed specifically for Route 32 (Colombo - Tangalle) bus service, replacing traditional manual ticketing with a modern, digital solution that provides real-time ticket printing, income tracking, and secure transaction logging.',
      'Implements stage-based pricing based on the official National Transport Commission (NTC) standard fare matrix using stage-gap calculation (|Stage_Boarding - Stage_Alighting|), with fares ranging from LKR 34 (1 stage) to LKR 861 (100 stages - Colombo to Tangalle).',
      'Generates instant professional A6-sized tickets (105×148mm) for thermal printers using ReportLab, complete with sequential anti-theft numbering and Ctrl+P keyboard shortcuts.',
      'Includes a real-time daily income dashboard and statistics, full and half child ticket support, an SQLite database with complete audit trail, and Excel integration via OpenPyXL.'
    ],
    technologies: ['Python 3.8+', 'Tkinter', 'SQLite3', 'ReportLab', 'OpenPyXL', 'Cross-Platform'],
    features: [
      'Real-time Ticket Printing: Generate professional A6-sized tickets (105×148mm) instantly for thermal printers with Ctrl+P shortcut',
      'Stage-Based Pricing: Uses official NTC fare matrix (|Stage_Boarding - Stage_Alighting|) with fares ranging from LKR 34 to LKR 861',
      'Half Ticket Support: Full and half ticket options for children passengers',
      'Income Dashboard: Real-time daily income tracking, revenue turnover metrics, and trip statistics',
      'Anti-Theft Protection: Sequential ticket numbers, route validation, and immutable transaction logging',
      'Secure Database: SQLite3 database with complete audit trail and fault-tolerant local storage',
      'Excel Integration: Import and sync fare data from Excel spreadsheets using OpenPyXL',
      'Cross-Platform Architecture: Built for Windows, Linux, and macOS standalone operation'
    ],
    architecture: 'Tkinter GUI Event Loop ➔ Stage-Gap Calculation Engine & SQLite3 Transaction Store ➔ ReportLab PDF Ticket Rendering ➔ Thermal Printer Pipeline & OpenPyXL Sync.',
    githubUrl: 'https://github.com/AbdulMueezMunassir/bus-ticketing-system',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'AI Coding Tools & LLMs',
    iconName: 'Bot',
    skills: [
      { name: 'Claude (Anthropic)', level: 'Advanced', highlight: true },
      { name: 'DeepSeek (V3 & R1)', level: 'Advanced', highlight: true },
      { name: 'ChatGPT (OpenAI / GPT-4o)', level: 'Advanced', highlight: true },
      { name: 'Google Gemini', level: 'Advanced', highlight: true },
      { name: 'AI Code Generation & Scaffolding', level: 'Advanced', highlight: true },
      { name: 'AI-Assisted Architecture & Debugging', level: 'Advanced', highlight: true },
      { name: 'Prompt Engineering for Developers', level: 'Advanced', highlight: true },
    ],
  },
  {
    name: 'Frontend Engineering',
    iconName: 'Layout',
    skills: [
      { name: 'React.js', level: 'Advanced', highlight: true },
      { name: 'Next.js', level: 'Advanced', highlight: true },
      { name: 'Angular', level: 'Intermediate', highlight: true },
      { name: 'TypeScript', level: 'Advanced', highlight: true },
      { name: 'JavaScript (ES6+)', level: 'Advanced', highlight: true },
      { name: 'Tailwind CSS', level: 'Advanced', highlight: true },
      { name: 'HTML5 & CSS3', level: 'Advanced', highlight: true },
    ],
  },
  {
    name: 'Backend & APIs',
    iconName: 'Server',
    skills: [
      { name: 'Node.js', level: 'Advanced', highlight: true },
      { name: 'Express.js', level: 'Advanced', highlight: true },
      { name: 'Django', level: 'Advanced', highlight: true },
      { name: 'Laravel', level: 'Intermediate', highlight: true },
      { name: 'REST APIs', level: 'Advanced', highlight: true },
      { name: 'JWT Authentication', level: 'Advanced', highlight: true },
      { name: 'Socket.io', level: 'Intermediate', highlight: true },
      { name: 'PHP', level: 'Intermediate', highlight: false },
    ],
  },
  {
    name: 'Databases & Cloud',
    iconName: 'Database',
    skills: [
      { name: 'MySQL', level: 'Advanced', highlight: true },
      { name: 'PostgreSQL', level: 'Advanced', highlight: true },
      { name: 'MongoDB', level: 'Advanced', highlight: true },
      { name: 'SQLite3', level: 'Advanced', highlight: true },
      { name: 'AWS Cloud', level: 'Foundational', highlight: true },
      { name: 'Docker', level: 'Intermediate', highlight: true },
    ],
  },
  {
    name: 'Desktop & Systems Engineering',
    iconName: 'Cpu',
    skills: [
      { name: 'Python 3.8+', level: 'Advanced', highlight: true },
      { name: 'Tkinter Desktop GUI', level: 'Advanced', highlight: true },
      { name: 'ReportLab (PDF & Ticket Printing)', level: 'Advanced', highlight: true },
      { name: 'OpenPyXL (Excel Sync)', level: 'Advanced', highlight: true },
      { name: 'Thermal Printer Pipelines', level: 'Advanced', highlight: true },
      { name: 'Cross-Platform Windows/macOS/Linux', level: 'Advanced', highlight: true },
    ],
  },
  {
    name: 'Machine Learning & Data',
    iconName: 'Brain',
    skills: [
      { name: 'Python', level: 'Advanced', highlight: true },
      { name: 'Scikit-learn', level: 'Intermediate', highlight: true },
      { name: 'Pandas & NumPy', level: 'Advanced', highlight: true },
      { name: 'Regression Modeling', level: 'Intermediate', highlight: true },
      { name: 'Streamlit Cloud App', level: 'Intermediate', highlight: true },
      { name: 'Jupyter Notebook', level: 'Advanced', highlight: true },
    ],
  },
  {
    name: 'Languages & Core',
    iconName: 'Code2',
    skills: [
      { name: 'TypeScript', level: 'Advanced', highlight: true },
      { name: 'JavaScript', level: 'Advanced', highlight: true },
      { name: 'Python', level: 'Advanced', highlight: true },
      { name: 'SQL', level: 'Advanced', highlight: true },
      { name: 'Java', level: 'Intermediate', highlight: false },
      { name: 'PHP', level: 'Intermediate', highlight: false },
      { name: 'C', level: 'Intermediate', highlight: false },
      { name: 'C#', level: 'Intermediate', highlight: false },
    ],
  },
  {
    name: 'Tools, Concepts & DevOps',
    iconName: 'Cpu',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced', highlight: true },
      { name: 'VS Code', level: 'Advanced', highlight: false },
      { name: 'Cursor', level: 'Advanced', highlight: true },
      { name: 'Jupyter Notebook', level: 'Advanced', highlight: false },
      { name: 'Object-Oriented Programming (OOP)', level: 'Advanced', highlight: true },
      { name: 'Data Structures & Algorithms', level: 'Advanced', highlight: true },
      { name: 'Agile & Scrum Methodologies', level: 'Intermediate', highlight: false },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'hameedia-internship',
    role: 'Full-Stack Developer Intern',
    company: 'Hameedia (Private) Limited',
    period: 'April 2026',
    location: 'Sri Lanka',
    type: 'Industry Internship',
    highlights: [
      'Developed a PHP & MySQL Order Management System connecting the Head Office and branches to streamline order creation, tracking, and fulfillment across retail operations.',
      'Designed relational database schemas and RESTful endpoints in PHP to support real-time order status updates across multiple branch locations.',
      'Built an Hourly Production Reporting System using PHP & MySQL to record production output and give management real-time visibility into hourly production performance.',
      'Created dashboard views and automated reports so supervisors could track production targets against actual output.',
      'Developed a MERN Stack Project Progress Monitoring System to track and visualize project milestones, tasks, progress status, and overall project performance.',
      'Implemented RESTful APIs with Node.js and Express.js, and built dynamic React components to visualize project data in real time.'
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'bsc-hons-susl',
    degree: 'BSc (Hons) in Computer Science and Technology',
    institution: 'Sabaragamuwa University of Sri Lanka',
    period: '2022 — 2026',
    details: 'Rigorous coursework in Data Structures & Algorithms, Object-Oriented Software Design, Database Management Systems, Computer Networks, Operating Systems, Web Technologies, and Machine Learning.',
  },
  {
    id: 'gce-al',
    degree: 'G.C.E. Advanced Level (Physical Science Stream)',
    institution: 'Ministry of Education, Sri Lanka',
    period: '2020',
    details: 'Physical Science stream specialization.',
    results: [
      { subject: 'Combined Mathematics', grade: 'B' },
      { subject: 'Chemistry', grade: 'C' },
      { subject: 'Physics', grade: 'S' },
    ],
  },
];

export const REFERENCES = [
  {
    name: 'Prof. (Dr.) R.M. Kapila Tharanga Rathnayaka',
    title: 'Dean, Faculty of Applied Sciences',
    institution: 'Sabaragamuwa University of Sri Lanka',
    qualifications: 'B.Sc. Special (Math. & Stat.) (Ruhuna), M.Sc. (Industrial Mathematics) (USJ), M.Sc. (Statistics) (WHUT, China), Ph.D. (Applied Statistics) (WHUT, China)',
    phone: '+94 71 632 4516',
    emails: ['kapilar@appsc.sab.ac.lk', 'kapila.tr@gmail.com'],
  },
];

