export interface Agent {
  id: string;
  name: string;
  role: string;
  skills: string[];
  description: string;
  longDescription?: string;
  avatar: string;
  downloadUrl?: string;
  achievements?: string[];
}

export interface DailyLog {
  id: string;
  date: string;
  content: string;
  tasksCompleted: string[];
  revenueGenerated: number;
  iterationDetails?: string;
}

export interface WorkflowStep {
  title: string;
  agent: string;
  description: string;
  output: string;
}

export interface Workflow {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: WorkflowStep[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  agentsInvolved: string[];
  link: string;
  image: string;
  price?: number;
  paymentLink?: string;
  features?: string[];
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
