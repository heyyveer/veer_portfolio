export type SkillGroup = "AI / ML" | "Programming" | "Frameworks" | "Tools";

export type Skill = {
  name: string;
  group: SkillGroup;
  proficiency: number | null;
};

export type Experience = {
  role: string;
  org: string;
  start: string;
  end: string;
  note: string;
  current?: boolean;
};

export type Project = {
  code: string;
  title: string;
  slug: string;
  summary: string;
  stack: string[];
  liveUrl: string;
  status: "live" | "shipped";
  featured?: boolean;
  allowIframe?: boolean;
};

export type SocialChannel = {
  label: string;
  handle: string;
  href: string;
};

export const identity = {
  name: "Veer Tiwari",
  initials: "VT",
  handle: "@veertiwari",
  signature: "AI / ML Engineer",
  role: "AI / ML Engineer",
  roleLong: "AI / ML Engineer — Machine Learning, Deep Learning, Generative AI",
  location: "India",
  timezone: "UTC+05:30",
  status: "Open to opportunities",
  tagline:
    "Building intelligent systems that turn real-world problems into practical AI-powered products.",
  bioShort:
    "B.Tech CSE student specializing in Data Science, focused on Machine Learning, Deep Learning, and Generative AI.",
  bioLong:
    "I build practical AI systems across machine learning, deep learning, NLP, computer vision, and Generative AI. My work focuses on turning ideas into usable products through clean engineering, experimentation, and problem-solving.",
  yearsExperience: 0,
} as const;

export const contact = {
  email: "veertiwari.personal@gmail.com",
  phone: "7017680500",
} as const;

export const socials: SocialChannel[] = [
  {
    label: "GitHub",
    handle: "veertiwari",
    href: "https://github.com/heyyveer",
  },
  {
    label: "LinkedIn",
    handle: "Veer Tiwari",
    href: "https://www.linkedin.com/in/heyveer/",
  },
  {
    label: "Portfolio",
    handle: "veertiwari.lovable.app",
    href: "https://veertiwari.lovable.app/",
  },
];

export const skills: Skill[] = [
  // AI / ML
  { name: "Machine Learning", group: "AI / ML", proficiency: 85 },
  { name: "Deep Learning", group: "AI / ML", proficiency: 80 },
  { name: "Generative AI", group: "AI / ML", proficiency: 80 },
  { name: "NLP", group: "AI / ML", proficiency: 78 },
  { name: "Computer Vision", group: "AI / ML", proficiency: 75 },
  { name: "RAG", group: "AI / ML", proficiency: 80 },

  // Programming
  { name: "Python", group: "Programming", proficiency: 90 },
  { name: "C++", group: "Programming", proficiency: 75 },
  { name: "SQL", group: "Programming", proficiency: 80 },

  // Frameworks
  { name: "TensorFlow", group: "Frameworks", proficiency: 78 },
  { name: "Keras", group: "Frameworks", proficiency: 80 },
  { name: "Scikit-learn", group: "Frameworks", proficiency: 85 },
  { name: "FastAPI", group: "Frameworks", proficiency: 72 },
  { name: "LangChain", group: "Frameworks", proficiency: 78 },

  // Tools
  { name: "Git", group: "Tools", proficiency: 85 },
  { name: "GitHub", group: "Tools", proficiency: 85 },
  { name: "Streamlit", group: "Tools", proficiency: 80 },
  { name: "Jupyter", group: "Tools", proficiency: 90 },
];

export const advancedTopics = [
  "Generative AI",
  "RAG Systems",
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "Computer Vision",
] as const;

export const experience: Experience[] = [
  {
    role: "Junior Technical Assistant",
    org: "Blue Heart Robotics",
    start: "Jan 2024",
    end: "Feb 2025",
    note:
      "Worked on technical and engineering tasks involving robotics, computer vision, and practical implementation of AI-driven systems.",
  },
];

export const projects: Project[] = [
  {
    code: "P/001",
    title: "AI-Powered Research Paper Assistant",
    slug: "ai-research-paper-assistant",
    summary:
      "RAG-based research assistant that retrieves relevant information from research papers and uses an LLM to generate contextual answers with document-aware retrieval.",
    stack: [
      "Python",
      "LangChain",
      "Gemini",
      "FAISS",
      "Sentence Transformers",
      "Streamlit",
    ],
    liveUrl: "YOUR_PROJECT_URL",
    status: "shipped",
    featured: true,
  },

  {
    code: "P/002",
    title: "AI Webinar Moderation System",
    slug: "ai-webinar-moderation",
    summary:
      "AI-powered system for analyzing live webinar messages, detecting issues, grouping similar queries, assigning priority, and generating actionable moderation insights.",
    stack: [
      "Python",
      "Scikit-learn",
      "NLP",
      "Sentence Transformers",
      "FastAPI",
      "Streamlit",
    ],
    liveUrl: "https://ai-webinar-moderation-system.streamlit.app/",
    status: "live",
    featured: true,
  },

  {
    code: "P/003",
    title: "Chat to YouTube Video",
    slug: "chat-to-youtube-video",
    summary:
      "Generative AI application that allows users to interact with YouTube video content through conversational queries using transcript processing and retrieval.",
    stack: [
      "Python",
      "Generative AI",
      "RAG",
      "LangChain",
      "YouTube",
    ],
    liveUrl: "YOUR_PROJECT_URL",
    status: "shipped",
    featured: true,
  },

  {
    code: "P/004",
    title: "MNIST Deep Learning Comparison",
    slug: "mnist-deep-learning-comparison",
    summary:
      "Compared Perceptron, Artificial Neural Network, and Convolutional Neural Network models on the MNIST handwritten digit classification dataset.",
    stack: [
      "Python",
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "CNN",
      "ANN",
    ],
    liveUrl: "YOUR_GITHUB_REPO_URL",
    status: "shipped",
    featured: true,
  },

  {
    code: "P/005",
    title: "AI Instagram Comment Assistant",
    slug: "instagram-comment-assistant",
    summary:
      "RAG-based AI assistant designed to understand Instagram content and generate relevant responses to user comments using contextual retrieval.",
    stack: [
      "Python",
      "RAG",
      "LangChain",
      "Embeddings",
      "Vector Database",
    ],
    liveUrl: "YOUR_PROJECT_URL",
    status: "shipped",
  },

  {
    code: "P/006",
    title: "Third Eye for Blind",
    slug: "third-eye-for-blind",
    summary:
      "Computer vision system designed to assist visually impaired users by detecting surrounding objects using an optimized object detection model.",
    stack: [
      "Python",
      "YOLOv5",
      "Computer Vision",
      "Raspberry Pi",
      "TensorFlow",
    ],
    liveUrl: "YOUR_PROJECT_URL",
    status: "shipped",
  },
];

export const metrics = [
  { label: "AI/ML projects", value: "06+" },
  { label: "GenAI systems", value: "03+" },
  { label: "ML / DL models", value: "05+" },
  { label: "Graduation", value: "2027" },
] as const;