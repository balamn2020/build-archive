export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Certification' | 'Competition' | 'Academic' | 'Open Source';
  description: string;
  credentialId?: string;
  badge: string;
  skills: string[];
}

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "owc-2026",
    title: "One Who Codes 2026 — Portfolio Challenge",
    issuer: "Acadable & Unstop",
    date: "2026",
    category: "Competition",
    description: "Participating in the national creative developer portfolio challenge with 'The Build Archive', highlighting creative frontend, systems visualization, and accessible motion.",
    badge: "Official Entry",
    skills: ["Creative Frontend", "Motion Design", "TypeScript", "Performance"]
  },
  {
    id: "os-simulation-rnd",
    title: "Interactive Operating Systems Visualizer Project",
    issuer: "Academic & Systems Research",
    date: "2025 — 2026",
    category: "Academic",
    description: "Designed and built an educational simulation suite for disk storage management covering Contiguous, Linked, and Indexed block allocation schemes.",
    badge: "Featured Project",
    skills: ["Operating Systems", "Algorithms", "Visual Telemetry", "Simulation"]
  },
  {
    id: "python-fundamentals",
    title: "Python for Data Structures & Algorithms",
    issuer: "Technical Foundations",
    date: "2025",
    category: "Certification",
    description: "Certified completion of comprehensive data structure implementations, recursion, dynamic programming, and computational complexity.",
    credentialId: "PY-DSA-2025-VMB",
    badge: "Verified Credential",
    skills: ["Python", "DSA", "Complexity Analysis", "OOP"]
  },
  {
    id: "cybersecurity-foundations",
    title: "Foundations of Cybersecurity & Network Defense",
    issuer: "Industry Curriculum",
    date: "2025",
    category: "Certification",
    description: "In-depth coursework covering symmetric/asymmetric cryptography, threat vectors, authentication mechanisms, and network security hygiene.",
    credentialId: "SEC-FND-2025",
    badge: "Verified Credential",
    skills: ["Network Security", "Cryptography", "Entropy Analysis"]
  },
  {
    id: "academic-excellence",
    title: "CBSE Distinction in Computer Science & Math",
    issuer: "Central Board of Secondary Education",
    date: "2025",
    category: "Academic",
    description: "Awarded high distinction in Senior Secondary Computer Science with comprehensive marks in algorithmic problem solving and programming foundations.",
    badge: "Honor",
    skills: ["Mathematics", "Computer Science", "Relational Databases"]
  }
];

