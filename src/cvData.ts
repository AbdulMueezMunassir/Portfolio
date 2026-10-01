import { REFERENCES } from './data';

/** The real PDF lives in /public so Vercel serves it as a static file. */
export const CV_FILE_URL = '/Abdul_Mueez_CV.pdf';
export const CV_FILE_NAME = 'Abdul_Mueez_CV.pdf';

export const CV_HEADER = {
  name: 'ABDUL MUEEZ',
  headline: 'Junior Software Engineer | Full-Stack Developer',
  location: 'Beruwala, Sri Lanka',
  phone: '+94 76 172 2165',
  email: 'abmueez593@gmail.com',
  linkedin: 'https://www.linkedin.com/in/abdul-mueez-527ba7222/',
  github: 'https://github.com/AbdulMueezMunassir',
  portfolio: 'https://portfolio-orcin-psi-4rww4qoanj.vercel.app/',
};

export const CV_SUMMARY =
  'Computer Science undergraduate (BSc Hons, Sabaragamuwa University of Sri Lanka) with hands-on full-stack development experience from an internship at Hameedia and independent projects across Next.js, the MERN/MENN/PENN stacks, and applied machine learning. Comfortable owning a feature end-to-end, from database schema and REST APIs to responsive, real-time frontends, using TypeScript, PHP, MySQL, PostgreSQL, Prisma, Node.js, Express, MongoDB, React and Angular. Recently extended this into authentication, error monitoring, and data-driven applications with Supabase, Sentry, Python and Scikit-learn, plus cloud/DevOps tooling with AWS and Docker. Looking for a junior software engineering role to keep building practical, scalable products.';

export const CV_SKILLS: { label: string; items: string }[] = [
  { label: 'Languages', items: 'TypeScript, JavaScript, Python, Java, PHP, C, C#' },
  { label: 'Frontend', items: 'Next.js, React.js, Angular, HTML5, CSS3, Tailwind CSS, Zustand' },
  { label: 'Backend', items: 'Node.js, Express.js, Django, Laravel, REST APIs, JWT, Socket.io, Zod' },
  { label: 'Database & ORM', items: 'MySQL, PostgreSQL, MongoDB, Prisma, Supabase' },
  { label: 'ML / Data', items: 'Python, Pandas, NumPy, Scikit-learn, Streamlit' },
  { label: 'DevOps & Monitoring', items: 'AWS, Docker, Sentry' },
  {
    label: 'Tools & Concepts',
    items: 'VS Code, Jupyter Notebook, Git, GitHub, OOP, Data Structures & Algorithms, Agile',
  },
];

export interface CvEntry {
  title: string;
  period?: string;
  bullets: string[];
  technologies: string;
  githubUrl?: string;
  liveUrl?: string;
}

export const CV_EXPERIENCE: CvEntry[] = [
  {
    title: 'Full-Stack Developer Intern – Hameedia (Private) Limited',
    period: 'April 2026',
    bullets: [
      'Developed a PHP & MySQL Order Management System connecting the Head Office and branches to streamline order creation, tracking, and fulfillment across retail operations.',
      'Designed relational database schemas and RESTful endpoints in PHP to support real-time order status updates across multiple branch locations.',
      'Built an Hourly Production Reporting System using PHP & MySQL to record production output and give management real-time visibility into hourly production performance.',
      'Created dashboard views and automated reports so supervisors could track production targets against actual output.',
      'Developed a MERN Stack Project Progress Monitoring System to track and visualize project milestones, tasks, progress status, and overall project performance.',
      'Implemented RESTful APIs with Node.js and Express.js, and built dynamic React components to visualize project data in real time.',
    ],
    technologies: 'React, Node.js, Express.js, MongoDB, PHP, MySQL, JavaScript, HTML, CSS',
  },
];

export const CV_PROJECTS: CvEntry[] = [
  {
    title: 'Task Tracker – Kanban Task Management – Next.js',
    bullets: [
      'Built a responsive task manager with a three-column Kanban board, task CRUD, priority levels, and due dates.',
      'Added Supabase authentication, protected routes, dashboard analytics, and overdue-task detection.',
      'Designed a user-linked Prisma schema backed by PostgreSQL and added Sentry error monitoring.',
    ],
    technologies: 'Next.js 16, TypeScript, Tailwind CSS v4, Supabase, PostgreSQL, Prisma 5, Zod, Sentry',
    githubUrl: 'https://github.com/AbdulMueezMunassir/task-tracker',
    liveUrl: 'https://task-tracker-tau-ruby.vercel.app/',
  },
  {
    title: 'Food Delivery LK – Sri Lankan Food Delivery – Next.js',
    bullets: [
      'Built a Sri Lankan food-delivery app with restaurant discovery, cuisine browsing, and delivery-address search.',
      'Implemented customer and restaurant accounts with signed JWT authentication and protected routes.',
      'Modeled users, restaurants, and orders in PostgreSQL with Prisma.',
    ],
    technologies: 'Next.js 14, TypeScript, PostgreSQL, Prisma, JWT, bcryptjs, Tailwind CSS',
    githubUrl: 'https://github.com/AbdulMueezMunassir/FoodDelivery-LK',
  },
  {
    title: 'Aqua Market – Premium Aquarium Marketplace – Next.js',
    bullets: [
      'Developed a responsive e-commerce platform for aquarium products with product browsing, categories, shopping cart, wishlist, and order management.',
      'Implemented role-based access for Admin, Staff, and Customers, with an analytics dashboard for managing products and orders.',
      'Integrated JWT authentication, Zustand state management, and Socket.io for secure access, client-side state, and realtime updates.',
    ],
    technologies: 'Next.js, TypeScript, MongoDB, Mongoose, JWT, Tailwind CSS, Zustand, Socket.io, Stripe',
    githubUrl: 'https://github.com/AbdulMueezMunassir/aqua_market',
  },
  {
    title: 'MHK Travels – Hajj & Umrah Tour Management Platform – PENN Stack',
    bullets: [
      'Developed a full-stack pilgrimage booking platform for managing Hajj & Umrah packages, customer bookings, and tour information.',
      'Integrated PayHere payment gateway with advance payment support, enabling customers to securely make online bookings.',
      'Implemented an admin management system for managing packages, bookings, customers, and payment records.',
    ],
    technologies: 'Next.js, React, Node.js, Express.js, PostgreSQL, Tailwind CSS, PayHere',
    githubUrl: 'https://github.com/AbdulMueezMunassir/Hajj-Umrah-Tour-Operator-Platform-PENN-Stack-',
  },
  {
    title: 'Pharmacy POS & Inventory System – MERN Stack',
    bullets: [
      'Built billing, stock-management and reporting workflows with dashboard metrics, stock-value tracking and expiry alerts.',
      'Added intelligent product search and authentication-based access control.',
      'Designed a normalized MongoDB schema and RESTful APIs with Node.js and Express.js to support real-time stock updates.',
    ],
    technologies: 'React, Node.js, Express.js, MongoDB, JWT',
    githubUrl: 'https://github.com/AbdulMueezMunassir/No1-Pharmacy-POS-System',
  },
  {
    title: 'House Price Prediction – Machine Learning',
    bullets: [
      'Trained a regression model on Sri Lankan property and location data, then wrapped it in an interactive Streamlit app for live predictions and data insights.',
      'Performed data cleaning, feature engineering, and exploratory analysis using Pandas and NumPy to improve model accuracy.',
      'Evaluated multiple regression algorithms with Scikit-learn and tuned hyperparameters to select the best-performing model.',
    ],
    technologies: 'Python, Pandas, NumPy, Scikit-learn, Streamlit',
    githubUrl: 'https://github.com/AbdulMueezMunassir/Sri-Lanka-House-Price-Predictor',
  },
];

export const CV_EDUCATION = [
  {
    title: 'BSc (Hons) in Computer Science and Technology',
    period: '2022 – 2026',
    detail: 'Sabaragamuwa University of Sri Lanka',
  },
  {
    title: 'G.C.E. Advanced Level – Physical Science Stream',
    period: '2020',
    detail: 'Combined Maths: B, Chemistry: C, Physics: S',
  },
];

export const CV_REFERENCE = REFERENCES[0];

/** Plain-text version used by the "Copy Text" button. */
export function buildCvText(): string {
  const h = CV_HEADER;
  const entry = (e: CvEntry) =>
    [
      e.period ? `${e.title} | ${e.period}` : e.title,
      ...e.bullets.map((b) => `- ${b}`),
      `Technologies: ${e.technologies}`,
    ].join('\n');

  return [
    h.name,
    h.headline,
    `${h.location} | ${h.phone} | ${h.email} | LinkedIn: ${h.linkedin} | GitHub: ${h.github} | Portfolio: ${h.portfolio}`,
    '',
    'PROFESSIONAL SUMMARY',
    CV_SUMMARY,
    '',
    'TECHNICAL SKILLS',
    ...CV_SKILLS.map((s) => `${s.label}: ${s.items}`),
    '',
    'WORK EXPERIENCE',
    ...CV_EXPERIENCE.map(entry),
    '',
    'PROJECTS',
    CV_PROJECTS.map(entry).join('\n\n'),
    '',
    'EDUCATION',
    ...CV_EDUCATION.map((e) => `${e.title} | ${e.period}\n${e.detail}`),
    '',
    'REFERENCES',
    CV_REFERENCE.name,
    `${CV_REFERENCE.title}, ${CV_REFERENCE.institution}`,
    CV_REFERENCE.qualifications,
    `Mobile: ${CV_REFERENCE.phone} | Email: ${CV_REFERENCE.emails.join(', ')}`,
  ].join('\n');
}