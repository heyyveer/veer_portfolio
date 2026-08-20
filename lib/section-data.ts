/**
 * Section content for the V3 sections.
 *
 * Messaging is focused on AI / ML engineering, Generative AI,
 * RAG systems, deep learning, NLP, and practical AI applications.
 */

import type { ExpertiseArea, OpenSourceRepo } from "@/types";
import { socials } from "@/lib/content";

/** 03 - Expertise. */
export const expertiseAreas: ExpertiseArea[] = [
  {
    id: "machine-learning",
    title: "Machine Learning",
    keyMessage:
      "I build ML systems that solve practical prediction and classification problems.",
    support:
      "From data preprocessing and feature engineering to model training, evaluation, and comparison.",
    proof: [
      "Python",
      "Scikit-learn",
      "Classification",
      "Regression",
    ],
    featured: true,
  },

  {
    id: "deep-learning",
    title: "Deep Learning",
    keyMessage:
      "I use neural networks to solve image and pattern recognition problems.",
    support:
      "Hands-on work with ANN and CNN models, training workflows, evaluation, and experimentation.",
    proof: [
      "TensorFlow",
      "Keras",
      "ANN",
      "CNN",
      "Computer Vision",
    ],
    featured: true,
  },

  {
    id: "generative-ai",
    title: "Generative AI",
    keyMessage:
      "I build AI applications around LLMs, retrieval, and contextual generation.",
    support:
      "Focused on turning foundation models into useful applications rather than standalone demos.",
    proof: [
      "LLMs",
      "Gemini",
      "LangChain",
      "RAG",
    ],
    featured: true,
  },

  {
    id: "rag-systems",
    title: "RAG Systems",
    keyMessage:
      "I turn unstructured information into searchable, context-aware AI systems.",
    support:
      "Building document ingestion, chunking, embeddings, vector retrieval, and grounded generation pipelines.",
    proof: [
      "FAISS",
      "Embeddings",
      "Semantic Search",
      "Vector Retrieval",
    ],
    featured: true,
  },

  {
    id: "nlp",
    title: "Natural Language Processing",
    keyMessage:
      "I build systems that classify, compare, and organize human language.",
    support:
      "Applied NLP to moderation, semantic similarity, sentiment analysis, and conversational AI workflows.",
    proof: [
      "NLP",
      "Text Classification",
      "Semantic Similarity",
      "Sentiment Analysis",
    ],
  },

  {
    id: "ai-engineering",
    title: "AI Engineering",
    keyMessage:
      "I turn models and pipelines into usable end-to-end applications.",
    support:
      "Combining AI models with APIs, vector stores, application logic, and interfaces.",
    proof: [
      "Python",
      "FastAPI",
      "Streamlit",
      "APIs",
      "Git",
    ],
  },
];

/** 08 - Tech Stack. */
export type TechGroup = {
  label: string;
  rationale: string;
  items: string[];
};

export const techGroups: TechGroup[] = [
  {
    label: "AI / ML",
    rationale:
      "Tools for building, training, evaluating, and deploying intelligent systems.",
    items: [
      "Scikit-learn",
      "TensorFlow",
      "Keras",
      "PyTorch",
    ],
  },

  {
    label: "Generative AI",
    rationale:
      "LLM and retrieval tooling for practical AI applications.",
    items: [
      "LangChain",
      "Gemini",
      "RAG",
      "Embeddings",
      "FAISS",
    ],
  },

  {
    label: "Programming",
    rationale:
      "Python-first engineering with strong problem-solving foundations.",
    items: [
      "Python",
      "C++",
      "SQL",
    ],
  },

  {
    label: "Backend",
    rationale:
      "Lightweight APIs and services that connect AI systems to products.",
    items: [
      "FastAPI",
      "REST APIs",
    ],
  },

  {
    label: "Data",
    rationale:
      "Practical data handling, analysis, and storage for ML workflows.",
    items: [
      "Pandas",
      "NumPy",
      "MySQL",
      "PostgreSQL",
    ],
  },

  {
    label: "Tools",
    rationale:
      "Tools that support experimentation, deployment, and collaboration.",
    items: [
      "Jupyter",
      "Git",
      "GitHub",
      "Streamlit",
      "VS Code",
    ],
  },
];

/**
 * 07 - Open Source.
 *
 * Keep this data limited to repositories that are actually yours.
 * Replace the placeholders below with verified public repositories.
 */
export const openSourceRepos: OpenSourceRepo[] = [
  {
    name: "MNIST Deep Learning Comparison",
    tagline:
      "Comparing Perceptron, ANN, and CNN approaches for handwritten digit classification",
    purpose:
      "A practical deep learning project comparing Perceptron, Artificial Neural Network, and Convolutional Neural Network models on the MNIST dataset.",
    category: "Machine Learning",
    tech: [
      "Python",
      "Scikit-learn",
      "TensorFlow",
      "Keras",
    ],
    features: [
      "Perceptron",
      "ANN",
      "CNN",
      "Model training",
      "Accuracy comparison",
      "MNIST classification",
    ],
    repoUrl: "YOUR_MNIST_GITHUB_REPO_URL",
    featured: true,
  },
];

export const githubProfile =
  socials.find((s) => s.label === "GitHub")?.href ??
  "";

/**
 * 05 - One-line impact framing per project.
 */
export const projectImpact: Record<string, string> = {
  "ai-research-paper-assistant":
    "A RAG-powered research assistant for querying and understanding research papers.",

  "ai-webinar-moderation":
    "An AI moderation system that classifies webinar messages, groups similar issues, and prioritizes important queries.",

  "chat-to-youtube-video":
    "A conversational AI application for asking questions about YouTube video content.",

  "mnist-deep-learning-comparison":
    "A practical comparison of Perceptron, ANN, and CNN models on handwritten digit classification.",

  "instagram-comment-assistant":
    "A RAG-based assistant for generating context-aware responses to Instagram comments.",

  "third-eye-for-blind":
    "A computer vision system using object detection to assist visually impaired users.",
};