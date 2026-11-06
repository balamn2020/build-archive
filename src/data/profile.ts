export interface ProfileData {
  name: string;
  tagline: string;
  subtagline: string;
  role: string;
  bio: string;
  location: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
  avatarSeed: string;
  education: {
    institution: string;
    degree: string;
    period: string;
    grade: string;
    details: string;
  };
  metrics: {
    label: string;
    value: string;
    helper: string;
  }[];
}

export const PROFILE_DATA: ProfileData = {
  name: "M B Vishal",
  tagline: "Engineering ideas into experiences.",
  subtagline: "An interactive digital universe exploring the architecture of creative code, systems, and intelligence.",
  role: "Creative Frontend & Systems Developer",
  bio: "I turn complex engineering logic into polished, purposeful digital experiences. Currently pursuing B.Tech in Computer Science and Engineering, focusing on Operating Systems simulations, machine learning heuristics, and high-performance interactive interfaces.",
  location: "Chennai, India",
  status: "Open for Opportunities & Collaborations",
  email: "mbvishal07@gmail.com",
  github: "https://github.com/balamn2020",
  linkedin: "https://linkedin.com/in/vishal-mb-a4b50a380",
  avatarSeed: "vishal-archive",
  education: {
    institution: "SRM Institute of Science and Technology, Ramapuram",
    degree: "B.Tech in Computer Science and Engineering",
    period: "2025 — 2029",
    grade: "CGPA: 7.7",
    details: "Focusing on Data Structures & Algorithms, Operating Systems, Database Management Systems, and Software Architecture."
  },
  metrics: [
    {
      label: "Code Architecture",
      value: "100%",
      helper: "Strict TypeScript & modular design"
    },
    {
      label: "Systems Exploration",
      value: "3+",
      helper: "OS & security simulation engines"
    },
    {
      label: "Competition Target",
      value: "2026",
      helper: "One Who Codes by Acadable"
    },
    {
      label: "Design Velocity",
      value: "60 FPS",
      helper: "Hardware-accelerated motion"
    }
  ]
};

