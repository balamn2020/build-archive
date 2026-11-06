export interface SkillItem {
  name: string;
  level: 'Core' | 'Advanced' | 'Proficient';
  context: string;
  tags: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: SkillItem[];
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: "programming",
    title: "Core Programming",
    description: "Foundational languages for systems logic, data structures, and algorithmic modeling.",
    icon: "Code2",
    skills: [
      {
        name: "C & C++",
        level: "Core",
        context: "Low-level memory management, pointers, system simulations, and algorithmic efficiency.",
        tags: ["Systems", "Pointers", "Memory", "DSA"]
      },
      {
        name: "Python",
        level: "Proficient",
        context: "Rapid scripting, data processing, security automation, and machine learning heuristics.",
        tags: ["Scripting", "Security", "ML", "Automation"]
      },
      {
        name: "TypeScript",
        level: "Advanced",
        context: "Type-safe systems, modern frontend architectures, and component state modeling.",
        tags: ["Type Safety", "Generics", "Frontend", "API"]
      },
      {
        name: "Java",
        level: "Proficient",
        context: "Object-oriented software design, class hierarchies, and robust backend foundations.",
        tags: ["OOP", "Design Patterns", "Enterprise"]
      }
    ]
  },
  {
    id: "frontend",
    title: "Creative Frontend & UI",
    description: "Modern web engineering crafting high-performance, responsive, and visually memorable digital interfaces.",
    icon: "Layout",
    skills: [
      {
        name: "React & Next.js",
        level: "Advanced",
        context: "Component composition, hooks architecture, server & client rendering, state pipelines.",
        tags: ["Architecture", "Hooks", "Virtual DOM", "SPA"]
      },
      {
        name: "Tailwind CSS",
        level: "Advanced",
        context: "Utility-first design systems, custom theme tokens, responsive layouts, and dark mode.",
        tags: ["Design Systems", "CSS Grid", "Flexbox", "Responsive"]
      },
      {
        name: "Framer Motion",
        level: "Advanced",
        context: "Hardware-accelerated layout transitions, spring physics, gestures, and scroll choreography.",
        tags: ["Motion", "Springs", "Keyframes", "Micro-interactions"]
      },
      {
        name: "HTML5 & Modern CSS",
        level: "Core",
        context: "Semantic accessibility (WCAG), CSS variables, container queries, and canvas graphics.",
        tags: ["Semantic HTML", "A11y", "Canvas", "Performance"]
      }
    ]
  },
  {
    id: "systems",
    title: "Systems & Computer Science",
    description: "Underlying principles of computation, memory architecture, networks, and databases.",
    icon: "Cpu",
    skills: [
      {
        name: "Operating Systems",
        level: "Core",
        context: "Process scheduling, thread concurrency, virtual memory paging, and disk file allocation.",
        tags: ["File Systems", "Memory Management", "Concurrency"]
      },
      {
        name: "Data Structures & Algorithms",
        level: "Core",
        context: "Trees, graphs, dynamic programming, sorting complexity analysis, and spatial indexation.",
        tags: ["Time Complexity", "Optimization", "Graphs"]
      },
      {
        name: "Database Systems (SQL)",
        level: "Proficient",
        context: "Relational schema design, normalization, ACID transactions, and query optimization in MySQL.",
        tags: ["MySQL", "Schema Design", "Queries", "Indexing"]
      },
      {
        name: "Computer Networks & Security",
        level: "Proficient",
        context: "OSI / TCP/IP stack, TLS handshakes, packet inspection, and cryptographic primitives.",
        tags: ["Protocols", "Cryptography", "Security"]
      }
    ]
  },
  {
    id: "tools",
    title: "Engineering Workflow",
    description: "Tooling and version control ensuring reproducible builds, team collaboration, and speed.",
    icon: "Wrench",
    skills: [
      {
        name: "Git & GitHub",
        level: "Core",
        context: "Branching workflows, semantic commits, PR reviews, and automated CI pipelines.",
        tags: ["VCS", "Collaboration", "CI/CD"]
      },
      {
        name: "VS Code & Terminal",
        level: "Advanced",
        context: "Custom power workflow, keyboard navigation, debugging configs, and shell scripting.",
        tags: ["Productivity", "Shell", "CLI"]
      },
      {
        name: "Vite & Modern Bundlers",
        level: "Advanced",
        context: "Hot module replacement, ESM build optimization, bundle splitting, and tree-shaking.",
        tags: ["Build Tools", "ESM", "Optimization"]
      }
    ]
  }
];

