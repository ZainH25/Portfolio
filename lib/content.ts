export const site = {
  name: "Zain Habib",
  role: "Mobile Application Developer",
  employer: "Mobil80",
  subtitle: "Cross-Platform Mobile · iOS & Android",
  headline: "Software Developer building scalable, secure mobile products end-to-end",
  tagline:
    "Responsive Flutter interfaces backed by AWS services, GraphQL, and offline-first storage — clean architecture, fast performance, and features people rely on every day.",
  intro:
    "I build production-grade mobile products with Flutter, Dart, GetX, AWS Amplify, AppSync, Firebase, GraphQL, and Hive.",
  location: "Bengaluru, Karnataka, India",
  email: "yupzainhere@gmail.com",
  phone: "+91 9503150965",
  linkedin: "https://www.linkedin.com/in/zainhabib25",
  github: "https://github.com/ZainH25",
  instagram: "https://www.instagram.com/zain.h____/",
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
  subtitle: "School and engineering, internships, and what I build today at Mobil80.",
  stats: [
    { value: "8+", label: "Months full-time" },
    { value: "8+", label: "Live & featured projects" },
    { value: "25+", label: "Tools & tech" },
  ],
  currentRole:
    "Shipping ServiceWRK and PharmaWRK — Flutter apps with AWS, offline sync, and field workflows for iOS and Android.",
  focus: "Cross-platform mobile · AWS-backed APIs",
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
      "Caching and data sync using Hive so field teams keep working without dropped network connections.",
  },
  {
    title: "AWS & Infrastructure",
    body:
      "Authentication with AWS Cognito, GraphQL APIs via AppSync, and secure media storage on S3.",
  },
  {
    title: "Native Device Capabilities",
    body:
      "Real-time GPS tracking, OpenStreetMap polyline rendering, barcode scanning, and Firebase Cloud Messaging.",
  },
];

export const storyBeats = [
  {
    id: "school",
    label: "Chapter 01",
    headline: "Education foundations",
    body: "Secondary school through pre-university (PCMC), then B.E. Computer Science.",
  },
  {
    id: "ml",
    label: "Chapter 02",
    headline: "NASSCOM AI/ML certification",
    body:
      "480-hour Rooman Technologies internship — supervised & unsupervised ML with scikit-learn, Pandas, and NumPy (NSQF Level 5, Grade A).",
  },
  {
    id: "qa",
    label: "Chapter 03",
    headline: "Quality & operations lens",
    body: "InCruiter internship — SLAs, KPIs, RCA, and Power BI reporting for service delivery.",
  },
  {
    id: "mobile",
    label: "Chapter 04",
    headline: "Mobil80 — production mobile",
    body:
      "Shipping ServiceWRK and PharmaWRK for field technicians, agents, and pharma sales on iOS & Android.",
  },
  {
    id: "builder",
    label: "Chapter 05",
    headline: "Independent experiments",
    body:
      "Fetch, live GPS, semantic book recommendations, mock interviews, crop ML, and ScheduleBOT — always building.",
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
      "A ticket-management platform for field technicians with live tracking and fleet management.",
    highlights: [
      "Complete ticket workflow (create, assign, WIP, close, history) with phone-OTP and role-based access via AWS Cognito.",
      "Real-time GPS technician tracking using Google Maps and Geolocator.",
      "Barcode scanning with S3 media uploads (images, audio, video, PDFs) for product fleet tracking.",
      "Material Request Form (MRF), Sales Form, and Attendance modules with offline caching via Hive and FCM notifications.",
    ],
  },
  {
    id: "pharmawrk",
    title: "PharmaWRK",
    subtitle: "Pharma Field Sales Platform (Android & iOS)",
    category: "enterprise",
    index: "02",
    stack: "Flutter | Dart | AWS AppSync (GraphQL) | FCM | Hive | Speech-to-Text",
    summary: "An offline-first field sales app for medical representatives.",
    highlights: [
      "Offline-first architecture using Hive to log doctor, hospital, pharmacist, and stockist visits without connectivity, with background sync.",
      "Point-of-Visit (POV) logging, e-detailing, tour planning, and expense management across rep → manager → admin hierarchy.",
      "Speech-to-text for fast visit notes and POV capture when reps are on the move.",
      "Tour planning, daily call reporting, and expense workflows aligned to rep → manager → admin roles.",
    ],
  },
  {
    id: "servicewrk-agent",
    title: "ServiceWRK Agent",
    subtitle: "Partner & Agent Operations (Android & iOS)",
    category: "enterprise",
    index: "03",
    stack: "Flutter | Dart | GetX | AWS Amplify | AWS Cognito | Firebase | GraphQL | REST",
    summary: "A mobile app for agent workflows, ticket routing, and partner operations.",
    highlights: [
      "Dynamic validation and role-based access control integrated with cloud backends.",
      "Ticket routing and assignment between partners, agents, and operations teams.",
      "Partner onboarding with configurable forms, validation rules, and secure document flows.",
      "Push updates via Firebase and FCM so agents see status changes without polling.",
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
      "A voice utility that searches and fetches cross-device files using on-device speech recognition.",
    highlights: [
      "Hands-free query parsing using an on-device Whisper model.",
      "Cross-device file transfer powered by AWS Amplify, GraphQL, and AWS S3 storage.",
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
      "A tracking app built to run continuously across foreground, background, and screen-locked states.",
    highlights: [
      "Persistent foreground tracking with OpenStreetMap polyline path drawing and distance metrics.",
      "Remote reactivation via FCM data-only triggers to resume tracking even after force-kill.",
      "Offline persistence with Firebase Firestore and anonymous session handling.",
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
      "An AI recommender hosted on HuggingFace Spaces using embeddings and sentiment analysis.",
    highlights: [
      "Vector similarity search using ChromaDB and FastEmbed (BAAI/bge-small-en-v1.5).",
      "Emotion intensity scoring (DistilRoBERTa) and zero-shot category classification (BART-large-MNLI).",
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
      "A web app that generates domain-specific technical questions and evaluates answer semantics.",
    highlights: [
      "Fine-tuned Sentence-BERT (SBERT) model for answer semantic scoring.",
      "Automated resume generation, timed mock tests, and MySQL performance history tracking.",
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
      "A classification tool predicting optimal crop choices based on soil composition and weather metrics.",
    highlights: [
      "Preprocessed pipeline using scikit-learn, MinMaxScaler, and StandardScaler deployed with Flask.",
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
      "A Telegram bot that automates student access to study notes, timetables, and resource centers.",
    highlights: ["Automated delivery of academic materials and resource links."],
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
      "Develop and maintain production Flutter applications across field-service management, partner management, and pharma field-sales domains.",
      "Integrate AWS Amplify GraphQL APIs (AWS AppSync), AWS Cognito authentication, and AWS S3 for secure backend connectivity.",
      "Implement offline-first architecture using Hive, Google Maps geolocation, real-time barcode scanning, and Firebase Cloud Messaging.",
      "Own performance optimization, state management with GetX, and scalability across the full development lifecycle from design to release.",
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
  line2: "From learning and internships to shipping production mobile apps.",
};

export const contactSection = {
  eyebrow: "Contact",
  title: "Reach out directly",
  body:
    "Recruiters, founders, and teams — email is fastest. I usually reply within a couple of days.",
  note: "Based in Bengaluru · open to remote-friendly roles and contract work",
};
