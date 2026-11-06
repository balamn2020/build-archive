export interface JourneyEvent {
  year: string;
  period: string;
  title: string;
  category: 'Education' | 'Milestone' | 'Engineering' | 'Competition';
  description: string;
  highlights: string[];
  icon: string;
}

export const JOURNEY_DATA: JourneyEvent[] = [
  {
    year: "2026",
    period: "Early 2026",
    title: "The Build Archive & Systems Research",
    category: "Competition",
    description: "Designed and engineered 'The Build Archive' for One Who Codes 2026 by Acadable, pushing the boundaries of creative developer interfaces.",
    highlights: [
      "Engineered full in-browser OS File Allocation simulator",
      "Handcrafted zero-gravity dark mode design system",
      "Achieved 60fps physics-backed motion architecture"
    ],
    icon: "Sparkles"
  },
  {
    year: "2025",
    period: "Mid 2025",
    title: "Commenced B.Tech CSE at SRMIST Ramapuram",
    category: "Education",
    description: "Began undergraduate journey in Computer Science and Engineering, establishing deep foundation in Operating Systems, DSA, and secure software development.",
    highlights: [
      "Current Academic Record: 7.7 CGPA",
      "Built multi-heuristic Password Strength Predictor",
      "Explored low-level systems programming in C and memory architectures"
    ],
    icon: "GraduationCap"
  },
  {
    year: "2025",
    period: "March 2025",
    title: "Senior Secondary (Class XII CBSE) — 80.4%",
    category: "Education",
    description: "Completed higher secondary education at D.A.V. School, Adambakkam with distinction in Computer Science and Mathematics.",
    highlights: [
      "80.4% aggregate in CBSE Board Examinations",
      "Authored initial Python algorithms and relational database projects"
    ],
    icon: "BookOpen"
  },
  {
    year: "2023",
    period: "March 2023",
    title: "Secondary School (Class X CBSE) — 84.0%",
    category: "Milestone",
    description: "Completed high school with strong foundations in science and mathematical logic at D.A.V. School, Adambakkam.",
    highlights: [
      "84.0% academic score",
      "Wrote first computer programs and discovered passion for computing"
    ],
    icon: "Award"
  }
];

