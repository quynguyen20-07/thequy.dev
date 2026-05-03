/**
 * Default highlights data for About page
 * Used as fallback when API data is unavailable
 */
export const DEFAULT_HIGHLIGHTS = [
  {
    icon: "⚡",
    title: "REST API Design",
    description:
      "Expert in designing scalable RESTful APIs with proper authentication, authorization, and documentation.",
    color: "text-yellow-400",
  },
  {
    icon: "🗄️",
    title: "Redis Caching",
    description:
      "Implemented Redis caching strategies that reduced API response times by 40–50% across multiple production systems.",
    color: "text-red-400",
  },
  {
    icon: "🐳",
    title: "Docker + AWS",
    description:
      "Production deployments with Docker containers on AWS EC2/ECR, S3, and Route 53 with zero-downtime deploys.",
    color: "text-blue-400",
  },
  {
    icon: "🔄",
    title: "CI/CD Pipelines",
    description:
      "Built automated CI/CD pipelines with GitLab, cutting release cycles from hours to minutes.",
    color: "text-green-400",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    description:
      "Integrated AI agents for personalized travel recommendations and automated booking processing.",
    color: "text-purple-400",
  },
  {
    icon: "📡",
    title: "Real-time Systems",
    description:
      "Built real-time communication with Socket.IO and Firebase FCM for notifications and live tracking.",
    color: "text-cyan-400",
  },
];

/**
 * Default education data for About page
 * Used as fallback when API data is unavailable
 */
export const DEFAULT_EDUCATION = [
  {
    degree: "Bachelor of Science – Computer Science",
    institution: "University of Greenwich Da Nang",
    period: "2018 – 2023",
    note: "Third-Class Bachelor of Science (22/02/2023). Focus: SDLC, Agile/Scrum, software development, and AI.",
  },
  {
    degree: "Higher National Diploma – BTEC Computing",
    institution: "FPT Greenwich",
    period: "08/2021",
    note: "Completed an approved HND programme at FPT Greenwich.",
  },
];

/**
 * Skill categories configuration for the About page
 */
export const SKILL_CATEGORIES = [
  {
    label: "Languages",
    icon: "💻",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
  },
  {
    label: "Backend Frameworks",
    icon: "⚙️",
    color: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/20",
  },
  {
    label: "Frontend",
    icon: "🎨",
    color: "from-pink-500/20 to-pink-600/10",
    border: "border-pink-500/20",
  },
  {
    label: "Databases",
    icon: "🗄️",
    color: "from-yellow-500/20 to-yellow-600/10",
    border: "border-yellow-500/20",
  },
  {
    label: "DevOps & Cloud",
    icon: "☁️",
    color: "from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/20",
  },
  {
    label: "Tools & Methods",
    icon: "🔧",
    color: "from-green-500/20 to-green-600/10",
    border: "border-green-500/20",
  },
];

/**
 * About page SEO metadata
 */
export const ABOUT_SEO = {
  title: "About · Fullstack Developer Node.js NestJS Vietnam",
  description:
    "The Quy Nguyen is a Fullstack Developer with 3.5+ years experience in building booking systems, AI platforms, and scalable backend services using Node.js, NestJS, TypeScript, and React. Based in Da Nang, Vietnam.",
  keywords:
    "about The Quy Nguyen, NestJS developer Vietnam, Node.js fullstack engineer Da Nang, fullstack developer Vietnam biography, TypeScript backend developer, Redis caching expert, Docker AWS NestJS developer",
  path: "/about",
};

/**
 * Profile information for the About page
 */
export const PROFILE_INFO = [
  {
    label: "Location",
    value: "🇻🇳 Da Nang, Vietnam",
  },
  {
    label: "Experience",
    value: "3.5+ Years",
  },
  {
    label: "Status",
    value: "Open to Work",
    isStatus: true,
  },
];

/**
 * Bio text sections for the About page
 */
export const BIO_SECTIONS = [
  {
    title: "Full-Stack Developer (Node.js)",
    content:
      "with over 3.5 years of experience building real-world booking and service platforms. My core focus is developing stable, high-performance, and scalable backend systems.",
  },
  {
    title: "RESTful APIs",
    content:
      "complex booking workflows, payment-related logic, supplier management systems, and content platforms. I have hands-on experience with",
  },
  {
    title: "Unitech Dach",
    content:
      "building digital solutions for enterprise and supply‑chain management: tracking container volumes sold, analyzing regional performance, monitoring KPIs, generating automated statistical reports and alerts when targets are missed. I design real‑time data collection pipelines, analytical dashboards, AI forecasting modules and resource‑allocation tools, while ensuring security, scalability and seamless integration with existing business processes.",
  },
];

/**
 * Header section text
 */
export const ABOUT_HEADER = {
  tag: "About Me",
  title: "About",
  titleHighlight: "The Quy Nguyen",
  description: {
    prefix: "Fullstack Developer with",
    experience: "3.5+ years of experience",
    suffix:
      "in building booking systems, AI platforms, and scalable backend services using",
    techs: ["Node.js", "NestJS", "React"],
  },
};

/**
 * Section titles
 */
export const SECTION_TITLES = {
  WhoIAm: "Who I Am",
  WorkExperience: "Work Experience",
  TechnicalSkills: "Technical Skills",
  Education: "Education",
  KeySkillsAndHighlights: "Key skills and highlights",
  Biography: "Biography",
  TimelineLabel: "Timeline",
};
