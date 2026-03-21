export type Locale = 'en' | 'zh';

export type LocalizedText = Record<Locale, string>;

export interface AgentDownloadFile {
  label: LocalizedText;
  description: LocalizedText;
  path: string;
  githubUrl: string;
}

export interface AgentConfiguration {
  model: string;
  reasoningMode: LocalizedText;
  memoryPolicy: LocalizedText;
  toolchain: string[];
  outputs: LocalizedText[];
}

export interface AgentScale {
  tier: string;
  concurrency: string;
  contextWindow: string;
  budget: LocalizedText;
  bestFor: LocalizedText[];
}

export interface Agent {
  id: string;
  name: string;
  englishName: string;
  role: LocalizedText;
  summary: LocalizedText;
  longDescription: LocalizedText;
  skills: string[];
  responsibilities: LocalizedText[];
  configuration: AgentConfiguration;
  scale: AgentScale;
  downloads: AgentDownloadFile[];
}

export interface WorkflowStage {
  title: LocalizedText;
  agentId: string;
  description: LocalizedText;
  input: string;
  output: string;
}

export interface Workflow {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  scenario: LocalizedText;
  highlights: LocalizedText[];
  stages: WorkflowStage[];
  implementationNotes: LocalizedText[];
  inputExample: string;
  outputExample: string;
  deliverables: LocalizedText[];
}

export interface DailyLog {
  id: string;
  date: string;
  title: LocalizedText;
  summary: LocalizedText;
  whatWeDid: LocalizedText[];
  challenges: LocalizedText[];
  solutions: LocalizedText[];
  outcomes: LocalizedText[];
  tokenCost: string;
  revenueImpact: string;
  agentsInvolved: string[];
}

export interface ProductMetric {
  label: LocalizedText;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: LocalizedText;
  summary: LocalizedText;
  longDescription: LocalizedText;
  challenge: LocalizedText;
  solution: LocalizedText;
  deliverables: LocalizedText[];
  results: ProductMetric[];
  agentsInvolved: string[];
  demoUrl: string;
  repoUrl: string;
  accent: string;
}
