export type Language = 'en' | 'zh';

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface SiteFeature {
  title: LocalizedText;
  description: LocalizedText;
}

export interface SiteMetric {
  label: LocalizedText;
  value: string;
}

export interface SiteContent {
  brandName: string;
  brandSubtitle: LocalizedText;
  heroBadge: LocalizedText;
  heroTitle: LocalizedText;
  heroHighlight: LocalizedText;
  heroDescription: LocalizedText;
  overviewTitle: LocalizedText;
  overviewDescription: LocalizedText;
  features: SiteFeature[];
  metricsTitle: LocalizedText;
  metricsDescription: LocalizedText;
  metrics: SiteMetric[];
  newsletterTitle: LocalizedText;
  newsletterDescription: LocalizedText;
  footerDescription: LocalizedText;
  socialLinks: {
    github: string;
    website: string;
    rss: string;
  };
}

export interface Agent {
  id: string;
  name: LocalizedText;
  role: LocalizedText;
  description: LocalizedText;
  longDescription: LocalizedText;
  owner: LocalizedText;
  skills: LocalizedText[];
  achievements: LocalizedText[];
  configSummary: LocalizedText;
  scaleSummary: LocalizedText;
  downloadPath: string;
  scalePath: string;
  githubPath: string;
  avatar: string;
  stack: string[];
  tags: string[];
}

export interface WorkflowStep {
  title: LocalizedText;
  agentId: string;
  description: LocalizedText;
  output: LocalizedText;
}

export interface WorkflowExample {
  title: LocalizedText;
  content: string;
}

export interface Workflow {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  objective: LocalizedText;
  implementationNotes: LocalizedText;
  steps: WorkflowStep[];
  inputDemo: WorkflowExample;
  outputDemo: WorkflowExample;
  results: LocalizedText[];
  relatedProductIds: string[];
}

export interface DailyLog {
  id: string;
  date: string;
  title: LocalizedText;
  summary: LocalizedText;
  whatWeDid: LocalizedText[];
  difficulties: LocalizedText[];
  solutions: LocalizedText[];
  outputs: LocalizedText[];
  revenueGenerated: number;
  tokenCost: number;
  tags: string[];
}

export interface ProductMetric {
  label: LocalizedText;
  value: string;
}

export interface Product {
  id: string;
  name: LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
  longDescription: LocalizedText;
  challenge: LocalizedText;
  solution: LocalizedText;
  deliverables: LocalizedText[];
  outcomes: LocalizedText[];
  agentsInvolved: string[];
  link: string;
  repoUrl?: string;
  image: string;
  metrics: ProductMetric[];
}

export interface Comment {
  id: string;
  logId: string;
  authorName: string;
  authorUid: string;
  content: string;
  timestamp: string;
}

export interface Subscription {
  id: string;
  email: string;
  timestamp: string;
}
