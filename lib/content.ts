export const site = {
  name: "Zain Habib",
  role: "Mobile Application Developer",
  employer: "Mobil80",
  subtitle: "Cross-Platform Mobile · iOS & Android",
  headline:
    "Software developer designing, building, and implementing scalable mobile products end-to-end",
  tagline:
    "I develop responsive Flutter experiences backed by AWS, GraphQL, and offline-first storage — clean architecture, reliable performance, and features teams can depend on.",
  intro:
    "I develop and implement mobile products with Flutter, Dart, GetX, AWS Amplify, AppSync, Firebase, GraphQL, and Hive.",
  location: "Bengaluru, Karnataka, India",
  email: "yupzainhere@gmail.com",
  phone: "+91 9503150965",
  linkedin: "https://www.linkedin.com/in/zainhabib25",
  github: "https://github.com/ZainH25",
  instagram: "https://www.instagram.com/zain.h____/",
  /** Headshot: `public/images/portrait/myphoto.jpg` */
  portraitUrl: "/images/portrait/myphoto.jpg",
  /** Place your PDF at `public/resume.pdf` or change this URL */
  resumeUrl: "https://docs.google.com/presentation/d/1Tj1DiEW3PYvmfuw0csbPciOT5UE5i01RFT2PVghlL6w/edit?usp=sharing",
};

export type NavLink = {
  label: string;
  href: string;
  /** Section element ids that count as “on this page” for nav highlight */
  sectionIds: string[];
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about", sectionIds: ["about"] },
  { label: "Experience", href: "#experience", sectionIds: ["experience"] },
  { label: "Education", href: "#education", sectionIds: ["education"] },
  { label: "Projects", href: "#projects", sectionIds: ["projects"] },
  { label: "Contact", href: "#contact", sectionIds: ["contact"] },
];

export const atGlance = {
  title: "Quick snapshot",
  subtitle:
    "Education, internships, and the apps I develop and implement today at Mobil80.",
  stats: [
    { value: "8+", label: "Months full-time" },
    { value: "8+", label: "Apps built & featured" },
    { value: "25+", label: "Tools & tech" },
  ],
  currentRole:
    "Developing and implementing ServiceWRK and PharmaWRK — Flutter apps with AWS, offline sync, and field workflows for iOS and Android.",
  focus: "Cross-platform development · AWS-backed APIs",
};

export const careerMilestones = [
  {
    period: "2009–2019",
    title: "Saint Thomas School",
    detail: "Secondary education · Solapur",
  },
  {
    period: "2019–2021",
    title: "St. Claret PU",
    detail: "Pre-university · PCMC",
  },
  {
    period: "2021–2025",
    title: "Sapthagiri (VTU)",
    detail: "B.E. Computer Science",
  },
  {
    period: "2024–2025",
    title: "Internships",
    detail: "AI/ML · Quality analysis",
  },
  {
    period: "2026–now",
    title: site.employer,
    detail: site.role,
  },
];

export const aboutParagraphs = [
  site.intro,
  site.headline,
  site.tagline,
];

export const focusAreas = [
  {
    title: "Offline-First Architecture",
    body:
      "I implement caching and background sync with Hive so field teams keep working when the network drops.",
  },
  {
    title: "AWS & Infrastructure",
    body:
      "I integrate AWS Cognito auth, AppSync GraphQL APIs, and secure S3 storage for production backends.",
  },
  {
    title: "Native Device Capabilities",
    body:
      "I build real-time GPS tracking, map polylines, barcode scanning, and push notifications with FCM.",
  },
];

export const storyBeats = [
  {
    id: "school",
    label: "Chapter 01",
    headline: "Education foundations",
    body:
      "Built strong foundations from secondary school through pre-university (PCMC) into B.E. Computer Science.",
  },
  {
    id: "ml",
    label: "Chapter 02",
    headline: "NASSCOM AI/ML certification",
    body:
      "480-hour Rooman Technologies internship — built supervised and unsupervised ML pipelines with scikit-learn, Pandas, and NumPy (NSQF Level 5, Grade A).",
  },
  {
    id: "qa",
    label: "Chapter 03",
    headline: "Quality & operations lens",
    body:
      "InCruiter internship — analyzed SLAs, KPIs, and RCA, and built Power BI reporting for operational quality.",
  },
  {
    id: "mobile",
    label: "Chapter 04",
    headline: "Mobil80 — building production mobile",
    body:
      "Developing and implementing ServiceWRK and PharmaWRK for field technicians, agents, and pharma sales on iOS and Android.",
  },
  {
    id: "builder",
    label: "Chapter 05",
    headline: "Independent experiments",
    body:
      "Fetch, live GPS, semantic book recommendations, mock interviews, crop ML, and ScheduleBOT — side projects where I experiment, build, and implement new ideas.",
  },
];

export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  category: "enterprise" | "independent";
  index: string;
  stack: string;
  summary: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    id: "servicewrk-tech",
    title: "ServiceWRK Technician",
    subtitle: "Enterprise Field Management (Android & iOS)",
    category: "enterprise",
    index: "01",
    stack:
      "Flutter | Dart | GetX | AWS Amplify | AWS Cognito | AWS S3 | FCM | Hive | Google Maps | Geolocator | Barcode Scanner",
    summary:
      "Enterprise ticket management for field technicians with live tracking and fleet visibility.",
    highlights: [
      "Implemented end-to-end ticket workflows (create, assign, WIP, close, history) with phone OTP and role-based access via AWS Cognito.",
      "Built real-time GPS technician tracking with Google Maps and Geolocator.",
      "Developed barcode capture with S3 media uploads (images, audio, video, PDFs) for fleet and asset tracking.",
      "Implemented MRF, Sales Form, and Attendance modules with offline caching in Hive and FCM notifications.",
    ],
  },
  {
    id: "pharmawrk",
    title: "PharmaWRK",
    subtitle: "Pharma Field Sales Platform (Android & iOS)",
    category: "enterprise",
    index: "02",
    stack: "Flutter | Dart | AWS AppSync (GraphQL) | FCM | Hive | Speech-to-Text",
    summary:
      "Offline-first field sales platform for medical representatives and their managers.",
    highlights: [
      "Architected offline-first visit logging with Hive for doctors, hospitals, pharmacists, and stockists, with background sync when online.",
      "Implemented POV logging, e-detailing, tour planning, and expense flows across rep → manager → admin roles.",
      "Integrated speech-to-text for fast visit notes and POV capture on the move.",
      "Built tour planning, daily call reporting, and expense workflows aligned to the field hierarchy.",
    ],
  },
  {
    id: "servicewrk-agent",
    title: "ServiceWRK Agent",
    subtitle: "Partner & Agent Operations (Android & iOS)",
    category: "enterprise",
    index: "03",
    stack: "Flutter | Dart | GetX | AWS Amplify | AWS Cognito | Firebase | GraphQL | REST",
    summary:
      "Mobile operations hub for agents — ticket routing, partner workflows, and secure onboarding.",
    highlights: [
      "Implemented dynamic validation and role-based access control against cloud backends.",
      "Built ticket routing and assignment between partners, agents, and operations teams.",
      "Developed partner onboarding with configurable forms, validation rules, and secure document flows.",
      "Integrated Firebase and FCM push updates so agents see status changes without polling.",
    ],
  },
  {
    id: "fetch",
    title: "Fetch",
    subtitle: "Voice-Activated Cross-Device File Retrieval",
    category: "independent",
    index: "04",
    stack: "Flutter | Dart | On-Device Whisper | AWS Amplify | AWS AppSync | AWS S3",
    summary:
      "Voice-driven utility to search and retrieve files across devices using on-device speech recognition.",
    highlights: [
      "Implemented hands-free query parsing with an on-device Whisper model.",
      "Built cross-device file transfer on AWS Amplify, GraphQL, and S3 storage.",
    ],
  },
  {
    id: "live-gps",
    title: "Live Location Tracking & Remote Activation App",
    subtitle: "Continuous GPS Tracking Application",
    category: "independent",
    index: "05",
    stack:
      "Flutter | GetX | Firebase Firestore | FCM | OpenStreetMap | Geolocator | Foreground Service",
    summary:
      "Location tracking app engineered to run across foreground, background, and locked-screen states.",
    highlights: [
      "Implemented persistent foreground tracking with OpenStreetMap polylines and distance metrics.",
      "Developed remote reactivation via FCM data-only triggers to resume tracking after force-kill.",
      "Built offline persistence with Firebase Firestore and anonymous session handling.",
    ],
  },
  {
    id: "books",
    title: "Semantic Book Recommendation System",
    subtitle: "AI Book Recommender Engine",
    category: "independent",
    index: "06",
    stack: "Python | Flask | ChromaDB | HuggingFace Transformers | Gradio",
    summary:
      "AI book recommender on HuggingFace Spaces using embeddings and sentiment analysis.",
    highlights: [
      "Implemented vector similarity search with ChromaDB and FastEmbed (BAAI/bge-small-en-v1.5).",
      "Built emotion scoring (DistilRoBERTa) and zero-shot category classification (BART-large-MNLI).",
    ],
  },
  {
    id: "mock-interview",
    title: "AI Mock Interview Platform",
    subtitle: "Interactive Technical Interview Simulator",
    category: "independent",
    index: "07",
    stack: "Python | Flask | MySQL | Sentence Transformers (SBERT) | Bootstrap",
    summary:
      "Web platform that generates domain-specific technical questions and scores answer semantics.",
    highlights: [
      "Developed semantic answer scoring with a fine-tuned Sentence-BERT (SBERT) model.",
      "Implemented resume generation, timed mock tests, and MySQL performance history tracking.",
    ],
  },
  {
    id: "crop",
    title: "Crop Recommendation System",
    subtitle: "Machine Learning Agricultural Model",
    category: "independent",
    index: "08",
    stack: "Python | Jupyter Notebook | scikit-learn | Flask | HTML",
    summary:
      "ML classification tool that recommends crops from soil composition and weather inputs.",
    highlights: [
      "Built preprocessing and inference pipelines with scikit-learn, MinMaxScaler, and StandardScaler, served via Flask.",
    ],
  },
  {
    id: "schedulebot",
    title: "ScheduleBOT",
    subtitle: "Telegram Academic Automation Bot",
    category: "independent",
    index: "09",
    stack: "Java | Telegram Bot API | Maven",
    summary:
      "Telegram bot that gives students on-demand access to notes, timetables, and resource links.",
    highlights: [
      "Implemented automated distribution of academic materials and resource links via the Telegram Bot API.",
    ],
  },
];

export const enterpriseProjects = projects.filter((p) => p.category === "enterprise");
export const independentProjects = projects.filter((p) => p.category === "independent");

export const experience = [
  {
    company: "Mobil80 Solutions and Services",
    role: "Mobile Application Developer",
    period: "March 2026 — Present",
    type: "Full-time",
    location: "Bengaluru, India",
    techStack:
      "Flutter | Dart | GetX | AWS Amplify | AWS Cognito | AWS AppSync | AWS S3 | GraphQL | REST | Hive | Firebase | FCM",
    highlights: [
      "Develop and maintain Flutter applications for field-service management, partner operations, and pharma field sales.",
      "Implement AWS AppSync GraphQL APIs, Cognito authentication, and S3 storage for secure backend connectivity.",
      "Build offline-first data layers with Hive, Google Maps geolocation, barcode scanning, and Firebase Cloud Messaging.",
      "Lead performance tuning, GetX state management, and scalable architecture from design through implementation and release.",
    ],
  },
  {
    company: "InCruiter",
    role: "Quality Analyst Intern",
    period: "February 2025 — May 2025",
    type: "Internship",
    location: "Bengaluru, India",
    techStack: "Quality Analysis | SLAs | KPIs | RCA | Power BI | Excel",
    highlights: [
      "Evaluated service delivery quality through SLAs, KPIs, and Root Cause Analysis (RCA).",
      "Handled operations support, talent tracking, and process documentation.",
      "Prepared weekly and monthly business review reports through data analysis using Excel and Power BI.",
    ],
  },
  {
    company: "Rooman Technologies Pvt. Ltd.",
    role: "AI/ML Intern",
    period: "November 2024 — January 2025",
    type: "Internship",
    location: "Bengaluru, India",
    techStack: "Python | scikit-learn | Pandas | NumPy | Machine Learning",
    highlights: [
      "Completed 480-hour NASSCOM-certified internship (NSQF Level 5, A grade) building and deploying ML models in Python.",
      "Worked with supervised/unsupervised learning pipelines using scikit-learn, Pandas, and NumPy.",
      "Completed 93-hour Life Skills program (Jeevan Kaushal 2.0) focused on communication and teamwork.",
    ],
  },
];

export const skillCategories = [
  {
    title: "Mobile & Frontend",
    items: ["Flutter", "Dart", "GetX", "HTML5", "CSS3"],
  },
  {
    title: "Backend & APIs",
    items: [
      "AWS Amplify",
      "AWS Cognito",
      "AWS AppSync",
      "AWS S3",
      "Firebase",
      "Firebase Cloud Messaging (FCM)",
      "GraphQL",
      "REST APIs",
      "Node.js",
      "Express",
      "Flask",
    ],
  },
  {
    title: "Data & Local Storage",
    items: [
      "Hive",
      "SQLite",
      "sqflite",
      "Isar",
      "MySQL",
      "ChromaDB",
      "Shared Preferences",
    ],
  },
  {
    title: "AI, ML & NLP",
    items: [
      "Python",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Sentence Transformers (SBERT)",
      "FastEmbed",
      "HuggingFace Transformers",
      "On-Device Whisper Models",
    ],
  },
  {
    title: "Native, Hardware & Tools",
    items: [
      "Android Studio",
      "Xcode",
      "CocoaPods",
      "Gradle",
      "Google Maps API",
      "Geolocator",
      "OpenStreetMap",
      "Barcode / QR Scanning",
      "Git",
      "GitHub",
      "Postman",
      "Power BI",
      "Excel",
      "Figma",
    ],
  },
];

export const education = [
  {
    period: "2021 — 2025",
    school: "Sapthagiri College of Engineering (VTU)",
    degree: "Bachelor of Engineering — Computer Science and Engineering",
    detail: "CGPA: 8.0 / 10",
  },
  {
    period: "2019 — 2021",
    school: "St. Claret Pre-University College",
    degree: "Pre-University — PCMC",
    detail: "Overall Percentage: 87%",
  },
  {
    period: "2009 — 2019",
    school: "Saint Thomas English Medium School, Solapur",
    degree: "Secondary Education",
    detail: "",
  },
];

export const certifications = [
  "NASSCOM AI/ML Certification (NSQF Level 5, Grade A) — Rooman Technologies",
  "Introduction to Generative AI — Google Cloud Skills Boost",
  "Data Science Professional — Oracle",
  "Generative AI Professional — Oracle",
];

export const storyPinHeadline = {
  line1: "How I got here",
  accent: "chapter by chapter",
  line2: "From learning and internships to building and implementing production mobile apps.",
};

export const contactSection = {
  eyebrow: "Contact",
  title: "Reach out directly",
  body:
    "Recruiters, founders, and engineering teams — email is the fastest way to reach me. I typically reply within a couple of days.",
  note: "Based in Bengaluru · open to remote-friendly roles and contract development work",
};
