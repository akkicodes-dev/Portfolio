export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  attribution?: string;
  tags: string[];
  link?: string;
  badge?: string;
  medium?: string;
  role?: string;
  flow?: string;
  highlights?: string[];
}

export interface OpenSourcePR {
  repo: string;
  repoUrl: string;
  prNumber: number;
  title: string;
  mergedDate: string;
  url: string;
}

export interface Experience {
  role: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  type: 'internship' | 'leadership';
}

export interface Achievement {
  value: number;
  suffix: string;
  title: string;
  subtitle: string;
}

export interface Certification {
  title: string;
  issuer: string;
}

export interface TerminalCommand {
  command: string;
  description: string;
  output: string | string[];
}

export interface SiteContent {
  personal: {
    name: string;
    alias: string;
    role: string;
    headline: string;
    subline: string;
    location: string;
    email: string;
    about: string;
    avatarOriginal: string;
    avatarPng: string;
    avatarWebp: string;
    heroMicrocopy: string;
    heroCtaProjects: string;
    heroCtaContact: string;
    showAvailability: boolean;
  };
  navigation: {
    label: string;
    href: string;
    roomNumber: string;
  }[];
  socials: SocialLink[];
  skills: SkillCategory[];
  projects: Project[];
  openSource: {
    summary: string;
    prs: OpenSourcePR[];
  };
  experience: Experience[];
  achievements: Achievement[];
  certifications: Certification[];
  terminal: {
    prompt: string;
    welcome: string[];
    commands: Record<string, string | string[]>;
  };
}

export const siteContent: SiteContent = {
  personal: {
    name: "Akash Satao",
    alias: "Akkicodes-dev",
    role: "Software Development Engineer (Android + Backend)",
    headline: "I build fast Android apps and the backends behind them.",
    subline: "Software Development Engineer • Pune, India",
    location: "Pune, India",
    email: "akashsatao2303@gmail.com",
    about:
      "Computer Engineering student at PDEA College of Engineering, Pune (CGPA 8.34/10, 2024-2027), with a diploma in Computer Software Engineering from Government Polytechnic Malvan. I build Android apps with Kotlin and Jetpack Compose and event-driven backends with Java, Spring Boot and Kafka. I contribute to open source and organise large developer communities.",
    avatarOriginal: "/images/akash-original.png",
    avatarPng: "/images/akash.png",
    avatarWebp: "/images/akash.webp",
    heroMicrocopy: "scroll down — I fall apart / scroll up — I put myself back together",
    heroCtaProjects: "View Works",
    heroCtaContact: "Get in Touch",
    showAvailability: false,
  },
  navigation: [
    { label: "Entrance", href: "#hero", roomNumber: "00" },
    { label: "Statement", href: "#about", roomNumber: "01" },
    { label: "Instruments", href: "#skills", roomNumber: "02" },
    { label: "Works", href: "#projects", roomNumber: "03" },
    { label: "Commons", href: "#opensource", roomNumber: "04" },
    { label: "Timeline", href: "#experience", roomNumber: "05" },
    { label: "Exit", href: "#contact", roomNumber: "06" },
  ],
  socials: [
    {
      label: "GitHub",
      url: "https://github.com/akkicodes-dev",
      icon: "github",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/akash-satao-a56011250/",
      icon: "linkedin",
    },
    {
      label: "LeetCode",
      url: "https://leetcode.com/u/Akkicodes-dev/",
      icon: "code",
    },
    {
      label: "Codolio",
      url: "https://codolio.com/profile/AkkiCodes",
      icon: "terminal",
    },
    {
      label: "Code360",
      url: "https://www.naukri.com/code360/profile/Akkicodes",
      icon: "award",
    },
    {
      label: "GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/profile/akashsatj815",
      icon: "external-link",
    },
  ],
  skills: [
    {
      title: "Backend Engineering",
      skills: [
        "Java 21",
        "Spring Boot",
        "REST API design",
        "Apache Kafka",
        "Kafka Streams",
        "Event-driven architecture",
        "Idempotent ingestion",
        "PostgreSQL",
        "Flyway migrations",
        "Docker & Docker Compose",
        "OpenAPI / Swagger",
        "Spring Boot Actuator + Micrometer",
        "Maven",
      ],
    },
    {
      title: "Android Development",
      skills: [
        "Kotlin",
        "Jetpack Compose",
        "MVVM",
        "Clean Architecture",
        "Room Database",
        "Retrofit",
        "Kotlin Coroutines",
        "Firebase",
      ],
    },
    {
      title: "Testing & Performance",
      skills: [
        "JUnit 5",
        "Mockito",
        "Testcontainers",
        "Apache JMeter",
      ],
    },
    {
      title: "Languages",
      skills: ["Java", "Kotlin", "Python", "C++", "JavaScript", "Solidity", "SQL"],
    },
    {
      title: "Core Computer Science",
      skills: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming (OOP)",
        "Database Management Systems (DBMS)",
        "Operating Systems",
      ],
    },
    {
      title: "Tools & Cloud",
      skills: [
        "Git",
        "Bazel",
        "CI/CD Pipelines",
        "Linux",
        "AWS (EC2)",
        "Google Cloud Platform (GCP)",
        "Agile / Scrum",
        "Test-Driven Development (TDD)",
      ],
    },
  ],
  projects: [
    {
      title: "PulseStream",
      subtitle: "Real-time user activity ingestion and analytics platform.",
      description:
        "High-throughput user activity event streaming platform engineered with Java 21, Spring Boot 4, Apache Kafka (KRaft), Kafka Streams, and PostgreSQL 16. Features decoupled asynchronous ingestion, per-user ordering, stream session windowing, idempotent Flyway-managed persistence, and a time-series analytics REST API.",
      medium: "Java 21, Spring Boot, Kafka, PostgreSQL",
      role: "Backend Engineer",
      badge: "Flagship Backend",
      flow: "Client -> Ingestion API -> Kafka -> Streams (sessions) + Consumer -> PostgreSQL -> Analytics API",
      highlights: [
        "Ingests validated user activity events via POST /api/v1/events with immediate 202 Accepted response; ingestion decoupled through Kafka to prevent blocking.",
        "Events keyed by userId to enforce per-user sequential ordering; failed records safely routed to a dead-letter topic.",
        "Kafka Streams stateful topology aggregates real-time event streams into user sessions with configurable inactivity timeouts.",
        "Idempotent persistence with event UUID deduplication in PostgreSQL 16, schema managed via Flyway migrations with analytics indexes.",
        "REST analytics API delivering platform overviews, zero-filled time-series (minute/hour/day), per-user summaries, and paginated sessions.",
        "Load-tested with Apache JMeter; automated end-to-end verification script with documented Architecture Decision Records (ADRs).",
      ],
      tags: [
        "Java 21",
        "Spring Boot 4",
        "Apache Kafka",
        "Kafka Streams",
        "PostgreSQL 16",
        "Flyway",
        "Docker Compose",
        "Testcontainers",
        "JMeter",
        "OpenAPI",
      ],
      link: "https://github.com/akkicodes-dev/PulseStream",
    },
    {
      title: "NoteFlow",
      subtitle: "Android note-taking application designed with Clean Architecture.",
      description:
        "Modern Android note-taking application designed with Clean Architecture principles. Features instant search, pin notes, custom trash lifecycle, dynamic theme personalization, privacy protections, and seamless backup workflows.",
      attribution:
        "Built on top of open-source EasyNotes (GPL-3.0), extended with custom modular architecture, theme customization, and privacy controls.",
      medium: "Kotlin, Jetpack Compose, Room, MVVM",
      role: "Android Developer",
      badge: "Android App",
      highlights: [
        "Clean Architecture separation into domain, data, and presentation layers.",
        "Jetpack Compose reactive declarative UI with fluid theme adaptations.",
        "Local Room database persistence with reactive Kotlin Coroutines & Flow.",
        "Custom note trash lifecycle, pinning, and instant local search indexing.",
      ],
      tags: ["Kotlin", "Jetpack Compose", "MVVM", "Clean Architecture", "Room", "Coroutines"],
      link: "https://github.com/akkicodes-dev/NoteFlow",
    },
    {
      title: "Career Guru",
      subtitle: "Android career-guidance platform with 100+ organized pathways.",
      description:
        "Comprehensive career navigation and guidance app featuring over 100+ organized career pathways across diverse categories, integrated Firebase authentication, and responsive Material 3 UI design.",
      medium: "Java, XML, Firebase Auth, Material 3",
      role: "Android Developer",
      badge: "Android App",
      highlights: [
        "Catalog of 100+ structured career roadmaps with prerequisites and skill trees.",
        "Firebase Authentication and cloud state synchronization.",
        "Accessible, high-contrast Material 3 interface components.",
      ],
      tags: ["Java", "XML", "Firebase Auth", "Material 3", "Architecture"],
      link: "https://github.com/akkicodes-dev/Career_Explorer-",
    },
    {
      title: "Crowd3",
      subtitle: "Trustless crowdfunding DApp on Ethereum.",
      description:
        "Trustless crowdfunding DApp on Ethereum, gas-optimized smart contracts, transparent on-chain fund tracking, Top 10 nationwide at the VIT Web3 Hackathon.",
      medium: "Solidity, Web3.js, Ethereum",
      role: "Smart Contract Developer",
      badge: "Top 10 Hackathon",
      highlights: [
        "Trustless crowdfunding DApp on Ethereum.",
        "Gas-optimized smart contracts.",
        "Transparent on-chain fund tracking.",
        "Top 10 nationwide at the VIT Web3 Hackathon.",
      ],
      tags: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts"],
    },
  ],
  openSource: {
    summary:
      "Active open source contributor to mobile ecosystems, focusing on architectural refactoring, clean code quality, and internationalization standards.",
    prs: [
      {
        repo: "scribe-org/Scribe-Android",
        repoUrl: "https://github.com/scribe-org/Scribe-Android",
        prNumber: 690,
        title: "refactor: standardize conjugate label language checks using ScribeLanguage",
        mergedDate: "Aug 31",
        url: "https://github.com/scribe-org/Scribe-Android/pull/690",
      },
      {
        repo: "scribe-org/Scribe-Android",
        repoUrl: "https://github.com/scribe-org/Scribe-Android",
        prNumber: 684,
        title: "refactor: clean up invalid log tags (#426)",
        mergedDate: "Sep 7",
        url: "https://github.com/scribe-org/Scribe-Android/pull/684",
      },
    ],
  },
  experience: [
    {
      role: "Android Developer Intern",
      organization: "MountReach Solutions Pvt. Ltd.",
      location: "Pune, India",
      period: "Apr 2024 - Aug 2024",
      description:
        "Engineered production Android application modules in Kotlin and Jetpack Compose on a Firebase-backed platform.",
      highlights: [
        "Architected clean UI screens using modern Jetpack Compose and state management",
        "Practised Test-Driven Development (TDD) using JUnit and Espresso",
        "Implemented high-performance Retrofit network response caching to reduce latency",
      ],
      type: "internship",
    },
    {
      role: "Lead Organizer",
      organization: "CodeLite 2.0 National Hackathon",
      location: "Pune, India",
      period: "Aug 2025 - Feb 2026",
      description:
        "Founded and spearheaded a prestigious 24-hour national multi-track hackathon spanning Web3, AI, and Sustainability domains.",
      highlights: [
        "Mobilized 2400+ registrations and 200+ active participants nationwide",
        "Secured 7 high-value sponsorships and led a 50-member cross-functional execution team",
        "Organized judging panels, mentor tracks, and smooth hackathon operations",
      ],
      type: "leadership",
    },
    {
      role: "Lead, Unstop Igniters Club / Campus Ambassador",
      organization: "Unstop",
      location: "Pune, India",
      period: "May 2025 - Present",
      description:
        "Directing campus technical initiatives to foster open source culture, competitive programming, and engineering skill development.",
      highlights: [
        "Scaled developer community from inception to 300+ engaged student members",
        "Organized 6+ hands-on technical workshops and competitive coding challenges",
        "Personally mentored 50+ junior students on Data Structures, Algorithms, and Git workflows",
      ],
      type: "leadership",
    },
  ],
  achievements: [
    {
      value: 300,
      suffix: "+",
      title: "Problems Solved",
      subtitle: "LeetCode & Codolio algorithmic practice",
    },
    {
      value: 10,
      suffix: "th Rank",
      title: "Top 10 Nationwide",
      subtitle: "VIT National Web3 Hackathon (Crowd3)",
    },
    {
      value: 2400,
      suffix: "+",
      title: "Registrations Organised",
      subtitle: "CodeLite 2.0 National Hackathon",
    },
    {
      value: 300,
      suffix: "+",
      title: "Community Members",
      subtitle: "Built & mentored through Unstop Igniters Club",
    },
  ],
  certifications: [
    {
      title: "Google Solutions Challenge 2025",
      issuer: "Google Developer Groups",
    },
    {
      title: "Data Structures & Algorithms",
      issuer: "GeeksforGeeks",
    },
    {
      title: "Build on Aptos",
      issuer: "Aptos Ecosystem",
    },
  ],
  terminal: {
    prompt: "akash@satao:~$",
    welcome: [
      "Akash Satao Gallery Index v3.0.0 [Digital Gallery Edition]",
      "Exhibition: 'Fall apart. Build again.'",
      "Type 'help' to inspect catalog commands. Press '`' to dismiss.",
    ],
    commands: {
      help: "Exhibition commands: about, skills, projects, pulsestream, links, contact, clear",
      about:
        "Computer Engineering student at PDEA COE Pune (CGPA 8.34). Android SDE (Kotlin/Compose) + event-driven backend engineer (Java/Kafka/Spring Boot).",
      skills:
        "Backend: Java 21, Spring Boot, Kafka, Streams, PostgreSQL, Docker | Android: Kotlin, Compose, MVVM, Room | Testing: JUnit 5, Mockito, Testcontainers, JMeter",
      projects:
        "1. PulseStream (Flagship Real-Time Ingestion & Analytics) | 2. NoteFlow (Android Note-Taking) | 3. Career Guru (Career Guidance) | 4. Crowd3 (Decentralized Crowdfunding DApp)",
      pulsestream:
        "PulseStream: Real-time user activity ingestion & analytics platform. Stack: Java 21, Spring Boot 4, Kafka, Kafka Streams, PostgreSQL 16, Flyway, Docker Compose. Repo: github.com/akkicodes-dev/PulseStream",
      links:
        "GitHub: github.com/akkicodes-dev | LinkedIn: linkedin.com/in/akash-satao-a56011250 | LeetCode: leetcode.com/u/Akkicodes-dev",
      contact: "Email: akashsatao2303@gmail.com | Location: Pune, India",
    },
  },
};
