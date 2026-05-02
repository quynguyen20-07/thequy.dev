export interface Project {
  id: string;
  title: string;
  role: string;
  company: string;
  period: string;
  shortDescription: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  tech: string[];
  category: string;
  featured: boolean;
  color: string;
  icon: string;
  link: string | null;
}

export interface Skills {
  languages: string[];
  backend: string[];
  frontend: string[];
  databases: string[];
  devops: string[];
  tools: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  current: boolean;
  description: string;
  tech: string[];
}

export const projects: Project[] = [
  {
    id: 'tripc-ai-platform',
    title: 'TripC AI Platform',
    role: 'Full-Stack Developer',
    company: 'ALLY AI JSC',
    period: '3/2025 – Present',
    shortDescription:
      'AI-powered e-commerce and travel booking platform with personalized recommendations, loyalty programs, and multi-vendor management.',
    description:
      'TripC is an AI-powered end-to-end travel service platform that enables users to plan, consult, and book tours, transportation, accommodations, and local products. The system delivers personalized recommendations based on user behavior through integrated AI agents, and provides comprehensive admin portals for vendors, content management, event handling, and loyalty programs.',
    responsibilities: [
      'Developed core service booking workflows (tours, ferries, entertainment, accommodations)',
      'Built vendor tools for event management, inventory, orders, and promotions',
      'Integrated the TCENT loyalty system and AI agents for service recommendations',
      'Developed content modules including blogs, videos, and design contests',
      'Managed order processing and multi-channel notification systems',
    ],
    achievements: [
      'Designed high-performance booking workflows processing hundreds of concurrent reservations',
      'Reduced API response time by 40% using Redis caching strategies',
      'Built scalable microservice architecture supporting rapid feature expansion',
      'Integrated AI-powered recommendations increasing user engagement',
    ],
    tech: ['NestJS', 'Go (Gin/Gorm)', 'PostgreSQL', 'Redis', 'React.js', 'Next.js', 'Docker', 'GitLab CI/CD', 'AWS', 'Firebase'],
    category: 'AI Platform',
    featured: true,
    color: 'from-violet-500 to-purple-700',
    icon: '🤖',
    link: null,
  },
  {
    id: 'roomsbooked',
    title: 'RoomsBooked',
    role: 'Full-Stack Developer',
    company: 'CODING MONSTERS',
    period: '6/2024 – 10/2025',
    shortDescription:
      'Hotel booking platform with real-time search, comparison, and comprehensive admin management for bookings, staff, and resources.',
    description:
      'A full-featured hotel booking website providing search and comparison functionality with an integrated admin system for managing bookings, staff, and hospitality resources. Built to handle real-time availability checking, rate comparison, and seamless booking flows across multiple properties.',
    responsibilities: [
      'Developed authentication mechanisms and RESTful APIs for the booking engine',
      'Built user interfaces for property search, filtering, and booking management',
      'Integrated third-party hotel APIs for inventory and rate synchronization',
      'Set up CI/CD pipelines and deployed the project to AWS EC2',
    ],
    achievements: [
      'Improved application response time by 35% through optimized code structure and query optimization',
      'Implemented real-time availability checking with WebSocket connections',
      'Built scalable deployment pipeline reducing release time from hours to minutes',
      'Achieved 99.9% uptime with robust AWS infrastructure setup',
    ],
    tech: ['TypeScript', 'NestJS', 'Next.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'AWS', 'Cloudinary'],
    category: 'Booking Platform',
    featured: true,
    color: 'from-blue-500 to-cyan-600',
    icon: '🏨',
    link: null,
  },
  {
    id: 'devplus-lms',
    title: 'DevPlus LMS',
    role: 'Full-Stack Developer',
    company: 'ST UNITED – DA NANG',
    period: '11/2022 – 05/2024',
    shortDescription:
      'Training center management system supporting courses, students, instructors, and learning progress tracking across web and mobile platforms.',
    description:
      'A comprehensive Learning Management System for a training center that supports managing courses, students, instructors, and tracking learning progress across both web and mobile platforms. Features include score statistics, individual and group rankings, real-time notifications, and multi-environment deployment.',
    responsibilities: [
      'Synchronized data and integrated third-party APIs for content delivery',
      'Built authentication and role-based user authorization systems',
      'Developed frontend CRUD features for all management modules',
      'Configured real-time notification delivery using Firebase FCM',
      'Managed environment variables across dev, staging, and production environments',
    ],
    achievements: [
      'Improved system scalability to support rapid user growth by 300%',
      'Built seamless cross-platform experience across web and mobile (Flutter)',
      'Implemented real-time progress tracking with WebSocket and Firebase',
      'Established solid environment management practices across three deployment stages',
    ],
    tech: ['TypeScript', 'NestJS', 'ReactJS', 'Flutter', 'PostgreSQL', 'Git/GitHub', 'Docker', 'AWS', 'Firebase'],
    category: 'EdTech',
    featured: false,
    color: 'from-emerald-500 to-teal-600',
    icon: '📚',
    link: null,
  },
  {
    id: 'ttxl-driving-test',
    title: 'TTXL – Driving Test Management System',
    role: 'Full-Stack Developer',
    company: 'ST UNITED – DA NANG',
    period: '11/2022 – 05/2024',
    shortDescription:
      'Driving training center management system with real-time map tracking, XML data imports, and government authority data synchronization.',
    description:
      'A driving training center management system that tracks courses, students, instructors, and practical training routes with synchronization to the transportation authority. Features include real-time map tracking of training vehicles, XML data processing for government compliance, and Socket.IO for live communication.',
    responsibilities: [
      'Built RESTful APIs to handle business logic, authentication, and authorization',
      'Developed frontend features for data visualization and real-time map tracking',
      'Processed XML data imports on both backend and frontend for government systems',
      'Implemented real-time communication using Socket.IO',
    ],
    achievements: [
      'Built real-time vehicle tracking system with sub-second update latency',
      'Successfully integrated with government transportation authority systems',
      'Implemented robust XML parsing pipeline for regulatory compliance',
      'Designed intuitive map-based UI for training route management',
    ],
    tech: ['NestJS', 'TypeScript', 'ReactJS', 'PostgreSQL', 'Socket.IO', 'Git/GitHub', 'Docker', 'AWS'],
    category: 'Government System',
    featured: false,
    color: 'from-orange-500 to-amber-600',
    icon: '🚗',
    link: null,
  },
  {
    id: 'digieye-ai-camera',
    title: 'DigiEye AI Camera System',
    role: 'Full-Stack Developer',
    company: 'ST UNITED – DA NANG',
    period: '11/2022 – 05/2024',
    shortDescription:
      'AI-powered retail management system with face recognition, shopping behavior analysis, and real-time staff notifications.',
    description:
      'An AI Camera system that recognizes customer faces, manages purchase history and consumer behavior, and sends real-time notifications to staff when customers visit the store. The system integrates with KiotViet POS, Digieye AI cameras, and VMS, providing chain store management with Redis-powered performance.',
    responsibilities: [
      'Integrated third-party systems including KiotViet, Digieye AI, and VMS',
      'Used Redis caching to improve system performance and scalability',
      'Built user, role, and permission management systems',
      'Developed real-time dashboards for customer behavior analytics',
      'Deployed the frontend on Cloudflare CDN for global performance',
      'Managed multi-stage environment configurations',
    ],
    achievements: [
      'Achieved real-time face recognition notifications with under 2-second latency',
      'Improved system performance by 50% using Redis caching architecture',
      'Built comprehensive RBAC system supporting multiple store locations',
      'Delivered intuitive analytics dashboard for store management insights',
    ],
    tech: ['ReactJS', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'Firebase', 'Docker', 'AWS', 'Cloudflare CDN'],
    category: 'AI / Retail Tech',
    featured: true,
    color: 'from-rose-500 to-pink-600',
    icon: '👁️',
    link: null,
  },
]

export const skills: Skills = {
  languages: ['JavaScript', 'TypeScript', 'HTML/CSS'],
  backend: ['Node.js', 'Express.js', 'NestJS', 'Go (Gin)'],
  frontend: ['React.js', 'Next.js', 'TailwindCSS', 'Material UI', 'Ant Design'],
  databases: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase'],
  devops: ['Docker', 'Nginx', 'AWS EC2/S3/ECR', 'GitLab CI/CD', 'GitHub Actions'],
  tools: ['Git', 'Jira', 'Agile/Scrum', 'Postman', 'Socket.IO', 'Firebase FCM'],
}

export const experiences: Experience[] = [
  {
    company: 'ALLY AI JSC',
    role: 'Full Stack Developer',
    period: '3/2025 – Present',
    current: true,
    description: 'Designing and optimizing backend services for booking workflows using NestJS and Go. Building AI-integrated platforms and content discovery systems.',
    tech: ['NestJS', 'Go', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
  },
  {
    company: 'CODING MONSTERS',
    role: 'Full Stack Developer',
    period: '6/2024 – 10/2025',
    current: false,
    description: 'Built scalable web and mobile applications. Managed production deployment pipelines and AWS infrastructure.',
    tech: ['NestJS', 'React.js', 'PostgreSQL', 'Docker', 'AWS', 'GitLab CI/CD'],
  },
  {
    company: 'ST UNITED – DA NANG',
    role: 'Full Stack Developer',
    period: '11/2022 – 05/2024',
    current: false,
    description: 'Designed backend APIs and frontend interfaces. Integrated third-party services and improved system scalability to support rapid user growth.',
    tech: ['NestJS', 'React.js', 'PostgreSQL', 'Docker', 'AWS'],
  },
]
