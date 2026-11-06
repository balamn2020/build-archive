export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Systems' | 'Frontend & AI' | 'Security';
  shortDescription: string;
  problemStatement: string;
  solution: string;
  technologies: string[];
  keyFeatures: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  hasInteractiveSimulator?: boolean;
  year: string;
  metrics?: { label: string; value: string }[];
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "file-allocation-simulator",
    title: "File Allocation System Simulator",
    tagline: "Interactive OS disk storage and block allocation visualizer",
    category: "Systems",
    shortDescription: "An interactive Operating Systems simulation laboratory that visualizes contiguous, linked, and indexed file allocation schemes in real-time.",
    problemStatement: "Operating systems textbook concepts like disk fragmentation, pointer overhead, and block allocation tables are abstract and difficult to internalize without visual feedback.",
    solution: "Engineered an in-browser graphical disk visualizer with live memory block allocation, fragmentation meters, directory table updates, and step-by-step block inspection.",
    technologies: ["TypeScript", "React", "Operating Systems Algorithms", "Canvas/SVG", "Tailwind CSS"],
    keyFeatures: [
      "Contiguous, Linked, and Indexed allocation simulation modes",
      "Dynamic 64-block virtual disk visualizer with instant occupancy feedback",
      "Real-time external and internal fragmentation telemetry",
      "Interactive file allocation, deallocation, and directory mapping inspection",
      "Step-by-step sequential block tracing"
    ],
    githubUrl: "https://github.com/balamn2020/file-allocation-system-simulator",
    liveUrl: "#simulator-interactive",
    featured: true,
    hasInteractiveSimulator: true,
    year: "2026",
    metrics: [
      { label: "Allocation Modes", value: "3 Types" },
      { label: "Block Resolution", value: "64 Sectors" },
      { label: "Execution Time", value: "<1ms" }
    ]
  },
  {
    id: "nexora-ai-platform",
    title: "Nexora Intelligence Suite",
    tagline: "High-performance AI/SaaS workflow engine & creative interface",
    category: "Frontend & AI",
    shortDescription: "A modern developer-centric workspace combining generative model orchestration, prompt laboratory, and real-time inference telemetry.",
    problemStatement: "Modern AI web interfaces often suffer from sluggish rendering, repetitive generic templates, and poor response streaming feedback.",
    solution: "Designed an editorial-grade SaaS architecture utilizing optimistic UI updates, low-latency streaming state, and customized dark-mode aesthetic.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "REST API"],
    keyFeatures: [
      "Modular canvas layout with split-pane prompt engineering",
      "Hardware-accelerated reactive data visualizations",
      "Keyboard shortcut navigation system for power developers",
      "Real-time token cost and latency instrumentation"
    ],
    githubUrl: "https://github.com/balamn2020/nexora",
    liveUrl: "https://github.com/balamn2020/nexora",
    featured: true,
    year: "2025",
    metrics: [
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Render Overhead", value: "Minimal" }
    ]
  },
  {
    id: "password-strength-predictor",
    title: "Neural Entropy Shield",
    tagline: "Machine learning assisted password entropy & security auditor",
    category: "Security",
    shortDescription: "An intelligent security assessment tool evaluating password vulnerability patterns using character n-grams and Shannon entropy.",
    problemStatement: "Standard regex password validators give users a false sense of security with simple character-length checks that fail against rainbow table and dictionary attacks.",
    solution: "Built a multi-heuristic entropy analyzer that assesses structural dictionary permutations, sequential keyboard walks, and Shannon entropy scores.",
    technologies: ["Python", "JavaScript", "Information Theory", "Security Heuristics", "Tailwind CSS"],
    keyFeatures: [
      "Shannon entropy calculation in real time",
      "Pattern matching for dictionary and leetspeak substitutions",
      "Estimated brute-force crack time across multiple compute tiers (GPU clusters)",
      "Zero telemetry leakage — 100% client-side security analysis"
    ],
    githubUrl: "https://github.com/balamn2020/password-strength-predictor",
    liveUrl: "https://github.com/balamn2020/password-strength-predictor",
    featured: true,
    year: "2025",
    metrics: [
      { label: "Crack Scenarios", value: "5 Tiers" },
      { label: "Client Leakage", value: "0 bytes" }
    ]
  },
  {
    id: "cipherguard-engine",
    title: "CipherGuard Cryptographic Sandbox",
    tagline: "Visual cryptographic algorithm testbed and hashing laboratory",
    category: "Security",
    shortDescription: "A web-based cryptographic inspection platform visualizing symmetric and asymmetric encryption pipelines.",
    problemStatement: "Security students struggle to visualize the internal math of block ciphers, key exchanges, and message digest rounds.",
    solution: "Created an interactive sandbox illustrating step-by-step substitution-permutation networks, SHA-256 compression rounds, and RSA key generation.",
    technologies: ["TypeScript", "Web Crypto API", "React", "Tailwind CSS"],
    keyFeatures: [
      "Step-by-step AES block transformation diagramming",
      "Hash avalanche effect demonstration with single-bit mutations",
      "Interactive key-pair generation and ciphertext verification"
    ],
    githubUrl: "https://github.com/balamn2020",
    featured: false,
    year: "2025"
  }
];

