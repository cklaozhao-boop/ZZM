import { loadContent } from './lib/content-tools.mjs';

const data = loadContent();
console.log(`Validation passed for ${data.agents.length} agents, ${data.workflows.length} workflows, ${data.dailyLogs.length} logs, and ${data.products.length} products.`);
