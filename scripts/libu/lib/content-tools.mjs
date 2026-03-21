import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const repoRoot = path.resolve(__dirname, '../../..');
export const contentRoot = path.join(repoRoot, 'content');
export const generatedFile = path.join(repoRoot, 'src/generated/content.generated.ts');

const collectionDirs = {
  agents: path.join(contentRoot, 'agents'),
  workflows: path.join(contentRoot, 'workflows'),
  logs: path.join(contentRoot, 'logs'),
  products: path.join(contentRoot, 'products'),
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readCollection(dirPath) {
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith('.json'))
    .map((file) => readJson(path.join(dirPath, file)));
}

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function ensureLocalized(value, label) {
  assert(isObject(value), `${label} must be an object`);
  assert(typeof value.zh === 'string' && value.zh.trim(), `${label}.zh must be a non-empty string`);
  assert(typeof value.en === 'string' && value.en.trim(), `${label}.en must be a non-empty string`);
}

function ensureLocalizedArray(values, label) {
  assert(Array.isArray(values) && values.length > 0, `${label} must be a non-empty array`);
  values.forEach((value, index) => ensureLocalized(value, `${label}[${index}]`));
}

function ensureStringArray(values, label) {
  assert(Array.isArray(values) && values.length > 0, `${label} must be a non-empty array`);
  values.forEach((value, index) => {
    assert(typeof value === 'string' && value.trim(), `${label}[${index}] must be a non-empty string`);
  });
}

function ensureFileExists(relativePath, label) {
  const absolute = path.join(repoRoot, 'public', relativePath.replace(/^downloads\//, 'downloads/'));
  assert(fs.existsSync(absolute), `${label} points to a missing file: ${relativePath}`);
}

function validateSite(site) {
  assert(typeof site.brandName === 'string' && site.brandName.trim(), 'site.brandName must be a string');
  [
    'brandSubtitle',
    'heroBadge',
    'heroTitle',
    'heroHighlight',
    'heroDescription',
    'overviewTitle',
    'overviewDescription',
    'metricsTitle',
    'metricsDescription',
    'newsletterTitle',
    'newsletterDescription',
    'footerDescription',
  ].forEach((key) => ensureLocalized(site[key], `site.${key}`));
  assert(Array.isArray(site.features) && site.features.length > 0, 'site.features must be a non-empty array');
  site.features.forEach((feature, index) => {
    ensureLocalized(feature.title, `site.features[${index}].title`);
    ensureLocalized(feature.description, `site.features[${index}].description`);
  });
  assert(Array.isArray(site.metrics) && site.metrics.length > 0, 'site.metrics must be a non-empty array');
  site.metrics.forEach((metric, index) => {
    ensureLocalized(metric.label, `site.metrics[${index}].label`);
    assert(typeof metric.value === 'string' && metric.value.trim(), `site.metrics[${index}].value must be a string`);
  });
}

function validateAgents(agents) {
  const ids = new Set();
  agents.forEach((agent, index) => {
    assert(typeof agent.id === 'string' && agent.id.trim(), `agents[${index}].id must be a string`);
    assert(!ids.has(agent.id), `agents.${agent.id} is duplicated`);
    ids.add(agent.id);
    ['name', 'role', 'description', 'longDescription', 'owner', 'configSummary', 'scaleSummary'].forEach((key) => {
      ensureLocalized(agent[key], `agents.${agent.id}.${key}`);
    });
    ensureLocalizedArray(agent.skills, `agents.${agent.id}.skills`);
    ensureLocalizedArray(agent.achievements, `agents.${agent.id}.achievements`);
    ensureStringArray(agent.stack, `agents.${agent.id}.stack`);
    ensureStringArray(agent.tags, `agents.${agent.id}.tags`);
    assert(typeof agent.downloadPath === 'string' && agent.downloadPath.trim(), `agents.${agent.id}.downloadPath must be a string`);
    assert(typeof agent.scalePath === 'string' && agent.scalePath.trim(), `agents.${agent.id}.scalePath must be a string`);
    assert(typeof agent.githubPath === 'string' && agent.githubPath.trim(), `agents.${agent.id}.githubPath must be a string`);
    ensureFileExists(agent.downloadPath, `agents.${agent.id}.downloadPath`);
    ensureFileExists(agent.scalePath, `agents.${agent.id}.scalePath`);
  });
}

function validateWorkflows(workflows, agents, products) {
  const agentIds = new Set(agents.map((agent) => agent.id));
  const productIds = new Set(products.map((product) => product.id));
  const ids = new Set();
  workflows.forEach((workflow, index) => {
    assert(typeof workflow.id === 'string' && workflow.id.trim(), `workflows[${index}].id must be a string`);
    assert(!ids.has(workflow.id), `workflows.${workflow.id} is duplicated`);
    ids.add(workflow.id);
    ['title', 'description', 'objective', 'implementationNotes'].forEach((key) => {
      ensureLocalized(workflow[key], `workflows.${workflow.id}.${key}`);
    });
    assert(Array.isArray(workflow.steps) && workflow.steps.length > 0, `workflows.${workflow.id}.steps must be a non-empty array`);
    workflow.steps.forEach((step, stepIndex) => {
      ensureLocalized(step.title, `workflows.${workflow.id}.steps[${stepIndex}].title`);
      ensureLocalized(step.description, `workflows.${workflow.id}.steps[${stepIndex}].description`);
      ensureLocalized(step.output, `workflows.${workflow.id}.steps[${stepIndex}].output`);
      assert(agentIds.has(step.agentId), `workflows.${workflow.id}.steps[${stepIndex}].agentId must reference an existing agent`);
    });
    ['inputDemo', 'outputDemo'].forEach((key) => {
      ensureLocalized(workflow[key].title, `workflows.${workflow.id}.${key}.title`);
      assert(typeof workflow[key].content === 'string' && workflow[key].content.trim(), `workflows.${workflow.id}.${key}.content must be a string`);
    });
    ensureLocalizedArray(workflow.results, `workflows.${workflow.id}.results`);
    ensureStringArray(workflow.relatedProductIds, `workflows.${workflow.id}.relatedProductIds`);
    workflow.relatedProductIds.forEach((productId) => {
      assert(productIds.has(productId), `workflows.${workflow.id}.relatedProductIds references missing product ${productId}`);
    });
  });
}

function validateLogs(logs) {
  const ids = new Set();
  logs.forEach((log, index) => {
    assert(typeof log.id === 'string' && log.id.trim(), `logs[${index}].id must be a string`);
    assert(!ids.has(log.id), `logs.${log.id} is duplicated`);
    ids.add(log.id);
    assert(typeof log.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(log.date), `logs.${log.id}.date must be YYYY-MM-DD`);
    ['title', 'summary'].forEach((key) => ensureLocalized(log[key], `logs.${log.id}.${key}`));
    ['whatWeDid', 'difficulties', 'solutions', 'outputs'].forEach((key) => {
      ensureLocalizedArray(log[key], `logs.${log.id}.${key}`);
    });
    assert(typeof log.revenueGenerated === 'number', `logs.${log.id}.revenueGenerated must be a number`);
    assert(typeof log.tokenCost === 'number', `logs.${log.id}.tokenCost must be a number`);
    ensureStringArray(log.tags, `logs.${log.id}.tags`);
  });
}

function validateProducts(products, agents) {
  const agentIds = new Set(agents.map((agent) => agent.id));
  const ids = new Set();
  products.forEach((product, index) => {
    assert(typeof product.id === 'string' && product.id.trim(), `products[${index}].id must be a string`);
    assert(!ids.has(product.id), `products.${product.id} is duplicated`);
    ids.add(product.id);
    ['name', 'category', 'description', 'longDescription', 'challenge', 'solution'].forEach((key) => {
      ensureLocalized(product[key], `products.${product.id}.${key}`);
    });
    ensureLocalizedArray(product.deliverables, `products.${product.id}.deliverables`);
    ensureLocalizedArray(product.outcomes, `products.${product.id}.outcomes`);
    ensureStringArray(product.agentsInvolved, `products.${product.id}.agentsInvolved`);
    product.agentsInvolved.forEach((agentId) => {
      assert(agentIds.has(agentId), `products.${product.id}.agentsInvolved references missing agent ${agentId}`);
    });
    assert(typeof product.link === 'string' && product.link.trim(), `products.${product.id}.link must be a string`);
    assert(typeof product.image === 'string' && product.image.trim(), `products.${product.id}.image must be a string`);
    assert(Array.isArray(product.metrics) && product.metrics.length > 0, `products.${product.id}.metrics must be a non-empty array`);
    product.metrics.forEach((metric, metricIndex) => {
      ensureLocalized(metric.label, `products.${product.id}.metrics[${metricIndex}].label`);
      assert(typeof metric.value === 'string' && metric.value.trim(), `products.${product.id}.metrics[${metricIndex}].value must be a string`);
    });
  });
}

export function loadContent() {
  const site = readJson(path.join(contentRoot, 'site.json'));
  const agents = readCollection(collectionDirs.agents).sort((a, b) => a.id.localeCompare(b.id));
  const products = readCollection(collectionDirs.products).sort((a, b) => a.id.localeCompare(b.id));
  const workflows = readCollection(collectionDirs.workflows).sort((a, b) => a.id.localeCompare(b.id));
  const dailyLogs = readCollection(collectionDirs.logs).sort((a, b) => b.date.localeCompare(a.date));

  validateSite(site);
  validateAgents(agents);
  validateProducts(products, agents);
  validateWorkflows(workflows, agents, products);
  validateLogs(dailyLogs);

  return { siteContent: site, agents, workflows, dailyLogs, products };
}

export function renderModule(data) {
  return `/* This file is auto-generated by scripts/libu/build-content.mjs */\nimport type { Agent, DailyLog, Product, SiteContent, Workflow } from '../types';\n\nexport const siteContent: SiteContent = ${JSON.stringify(data.siteContent, null, 2)};\n\nexport const agents: Agent[] = ${JSON.stringify(data.agents, null, 2)};\n\nexport const workflows: Workflow[] = ${JSON.stringify(data.workflows, null, 2)};\n\nexport const dailyLogs: DailyLog[] = ${JSON.stringify(data.dailyLogs, null, 2)};\n\nexport const products: Product[] = ${JSON.stringify(data.products, null, 2)};\n`;
}

export function writeGeneratedModule(data) {
  fs.mkdirSync(path.dirname(generatedFile), { recursive: true });
  fs.writeFileSync(generatedFile, renderModule(data));
}

export function createTemplate(kind, slug) {
  const templates = {
    agents: {
      id: slug,
      name: { zh: '新智能体', en: 'New agent' },
      role: { zh: '角色', en: 'Role' },
      description: { zh: '一句话说明这个智能体负责什么。', en: 'One sentence describing what this agent is responsible for.' },
      longDescription: { zh: '更详细地解释它如何工作。', en: 'Explain in more detail how it works.' },
      owner: { zh: '礼部工作台', en: 'Libu control room' },
      skills: [{ zh: '技能一', en: 'Skill one' }],
      achievements: [{ zh: '最近成就', en: 'Recent achievement' }],
      configSummary: { zh: '配置摘要', en: 'Config summary' },
      scaleSummary: { zh: 'Scale 摘要', en: 'Scale summary' },
      downloadPath: `downloads/agents/${slug}.config.json`,
      scalePath: `downloads/agents/${slug}.scale.md`,
      githubPath: `public/downloads/agents/${slug}.config.json`,
      avatar: '新',
      stack: ['TypeScript'],
      tags: ['new']
    },
    workflows: {
      id: slug,
      title: { zh: '新工作流', en: 'New workflow' },
      description: { zh: '一句话描述工作流。', en: 'Describe the workflow in one sentence.' },
      icon: 'Workflow',
      objective: { zh: '目标', en: 'Objective' },
      implementationNotes: { zh: '实现说明', en: 'Implementation notes' },
      steps: [
        {
          title: { zh: '步骤一', en: 'Step one' },
          agentId: 'libu-operator',
          description: { zh: '步骤描述', en: 'Step description' },
          output: { zh: '阶段产出', en: 'Stage output' }
        }
      ],
      inputDemo: {
        title: { zh: '输入示例', en: 'Input example' },
        content: 'Describe the input here.'
      },
      outputDemo: {
        title: { zh: '输出示例', en: 'Output example' },
        content: 'Describe the output here.'
      },
      results: [{ zh: '结果', en: 'Result' }],
      relatedProductIds: ['opcro-showcase-site']
    },
    logs: {
      id: slug,
      date: '2026-03-22',
      title: { zh: '新日志', en: 'New journal' },
      summary: { zh: '今日摘要', en: 'Daily summary' },
      whatWeDid: [{ zh: '今天做了什么', en: 'What we did today' }],
      difficulties: [{ zh: '遇到的困难', en: 'Blocker' }],
      solutions: [{ zh: '解决方法', en: 'Resolution' }],
      outputs: [{ zh: '最终产出', en: 'Output' }],
      revenueGenerated: 0,
      tokenCost: 0,
      tags: ['new']
    },
    products: {
      id: slug,
      name: { zh: '新产品', en: 'New product' },
      category: { zh: '产品分类', en: 'Product category' },
      description: { zh: '一句话描述产品。', en: 'One sentence describing the product.' },
      longDescription: { zh: '更详细的产品说明。', en: 'More detailed product description.' },
      challenge: { zh: '要解决的问题', en: 'Challenge' },
      solution: { zh: '解决方案', en: 'Solution' },
      deliverables: [{ zh: '交付物', en: 'Deliverable' }],
      outcomes: [{ zh: '结果', en: 'Outcome' }],
      agentsInvolved: ['libu-operator'],
      link: 'https://example.com',
      repoUrl: 'https://github.com/cklaozhao-boop/ZZM',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
      metrics: [
        {
          label: { zh: '指标', en: 'Metric' },
          value: '1'
        }
      ]
    }
  };

  const template = templates[kind];
  if (!template) {
    throw new Error(`Unknown content type: ${kind}`);
  }

  return `${JSON.stringify(template, null, 2)}\n`;
}
