import type { Agent, DailyLog, Language, LocalizedText, Product, SiteContent, Workflow } from '../types';
import { agents, dailyLogs, products, siteContent, workflows } from '../generated/content.generated';

export function localize(value: LocalizedText, language: Language) {
  return value[language] || value.zh;
}

export function assetUrl(relativePath: string) {
  if (relativePath.startsWith('http')) {
    return relativePath;
  }

  const normalized = relativePath.replace(/^\/+/, '');
  return `${import.meta.env.BASE_URL}${normalized}`;
}

export function repoBlobUrl(relativePath: string) {
  return `https://github.com/cklaozhao-boop/ZZM/blob/main/${relativePath}`;
}

export const site = siteContent as SiteContent;
export const allAgents = agents as Agent[];
export const allWorkflows = workflows as Workflow[];
export const allDailyLogs = dailyLogs as DailyLog[];
export const allProducts = products as Product[];

export function getAgentById(id?: string) {
  return allAgents.find((agent) => agent.id === id);
}

export function getWorkflowById(id?: string) {
  return allWorkflows.find((workflow) => workflow.id === id);
}

export function getProductById(id?: string) {
  return allProducts.find((product) => product.id === id);
}

export function getLogById(id?: string) {
  return allDailyLogs.find((log) => log.id === id);
}
