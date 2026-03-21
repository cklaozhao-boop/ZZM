import { loadContent, writeGeneratedModule } from './lib/content-tools.mjs';

const data = loadContent();
writeGeneratedModule(data);

console.log(`Generated content module with ${data.agents.length} agents, ${data.workflows.length} workflows, ${data.dailyLogs.length} logs, and ${data.products.length} products.`);
