import type { Agent, DailyLog, LocalizedText, Locale, Product, Workflow } from '../types';

const githubBase = 'https://github.com/cklaozhao-boop/ZZM/blob/main/public/downloads/agents';

function text(zh: string, en: string): LocalizedText {
  return { zh, en };
}

export const agents: Agent[] = [
  {
    id: 'silijian',
    name: '司礼监',
    englishName: 'Orchestrator',
    role: text('总调度 Agent', 'Chief Orchestration Agent'),
    summary: text(
      '负责拆任务、分发给不同 Agent，并决定什么时候需要升级、复核或回滚。',
      'Routes tasks across agents and decides when work needs escalation, review, or rollback.',
    ),
    longDescription: text(
      '司礼监是 OpenClaw 的总调度层。它不直接写代码，而是把用户目标拆成可执行单元，交给兵部、礼部、翰林院等角色处理，并负责盯住每一步的状态、交付物和下一跳。',
      'The Orchestrator is the routing layer of OpenClaw. It does not write code directly; instead it decomposes user goals into executable units, hands them to specialist agents, and tracks status, deliverables, and next actions.',
    ),
    skills: ['Task Routing', 'Priority Control', 'Handoff QA', 'Failure Recovery'],
    responsibilities: [
      text('把一个复杂目标拆成若干可交付子任务', 'Break a complex goal into shippable subtasks'),
      text('决定哪些任务需要并行，哪些必须串行', 'Decide what can run in parallel and what must stay serial'),
      text('管理升级路径、返工路径和最终收口', 'Manage escalation, rework, and final closure'),
    ],
    configuration: {
      model: 'MiniMax M2.7 / GPT-5 class orchestration profile',
      reasoningMode: text('偏结构化，优先稳定分工而不是长篇输出', 'Structured reasoning tuned for reliable handoffs over long prose'),
      memoryPolicy: text('记录任务状态、owner、阻塞项和输出路径', 'Stores task status, owners, blockers, and output paths'),
      toolchain: ['Git', 'Shell', 'Plan Tracking', 'Workspace Discovery'],
      outputs: [
        text('任务分派单', 'Task assignment brief'),
        text('执行顺序与回收条件', 'Execution order and completion gates'),
        text('风险提示与复核建议', 'Risk flags and review suggestions'),
      ],
    },
    scale: {
      tier: 'S',
      concurrency: '1 -> N routing',
      contextWindow: '128k',
      budget: text('低 token 消耗，但高频调用', 'Low token cost but high call frequency'),
      bestFor: [
        text('多 Agent 排班', 'Multi-agent scheduling'),
        text('日常运营调度', 'Daily operations orchestration'),
        text('复杂产品交付链路', 'Complex product delivery chains'),
      ],
    },
    downloads: [
      {
        label: text('下载配置 JSON', 'Download config JSON'),
        description: text('包含系统提示词、职责边界和交接规则。', 'Includes system prompt, scope, and handoff rules.'),
        path: '/downloads/agents/silijian-config.json',
        githubUrl: `${githubBase}/silijian-config.json`,
      },
      {
        label: text('下载 Scale 说明', 'Download scale note'),
        description: text('说明它适合跑在哪种模型和预算档位。', 'Explains the model tier and budget envelope it fits.'),
        path: '/downloads/agents/silijian-scale.md',
        githubUrl: `${githubBase}/silijian-scale.md`,
      },
    ],
  },
  {
    id: 'bingbu',
    name: '兵部',
    englishName: 'Builder',
    role: text('工程实现 Agent', 'Engineering Delivery Agent'),
    summary: text(
      '负责落代码、修构建、搭页面和把想法变成能运行的产品。',
      'Turns plans into code, fixes builds, ships pages, and converts ideas into running products.',
    ),
    longDescription: text(
      '兵部是执行层里最偏工程的角色。它擅长前后端接线、脚本编写、部署调试和修构建问题，是把抽象方案落到仓库里的主力。',
      'Builder is the most engineering-heavy execution role. It specializes in front-end and back-end wiring, scripts, deployment debugging, and build repair.',
    ),
    skills: ['React', 'TypeScript', 'Vite', 'Firebase', 'Automation'],
    responsibilities: [
      text('实现页面与交互', 'Implement pages and interactions'),
      text('修复构建与部署问题', 'Fix build and deployment issues'),
      text('把配置、脚本和下载文件整理进仓库', 'Package configs, scripts, and downloadable assets into the repo'),
    ],
    configuration: {
      model: 'Codex / GPT-5 coding profile',
      reasoningMode: text('偏工程执行，遇到问题优先动手验证', 'Execution-focused, verifies by running the code'),
      memoryPolicy: text('追踪文件改动、测试结果和未解决风险', 'Tracks file changes, test results, and unresolved risks'),
      toolchain: ['Git', 'Node.js', 'Vite', 'Firebase SDK', 'GitHub Actions'],
      outputs: [
        text('代码补丁', 'Code patches'),
        text('部署工作流', 'Deployment workflows'),
        text('可运行页面与示例数据', 'Working pages with sample data'),
      ],
    },
    scale: {
      tier: 'M',
      concurrency: '1 -> 2 implementation threads',
      contextWindow: '200k',
      budget: text('中等 token 消耗，适合集中式实施', 'Moderate token usage, best for concentrated implementation'),
      bestFor: [
        text('前端搭建', 'Front-end implementation'),
        text('后端接线', 'Back-end wiring'),
        text('部署上线', 'Deployment and release'),
      ],
    },
    downloads: [
      {
        label: text('下载配置 JSON', 'Download config JSON'),
        description: text('工程 Agent 的提示词与工具权限模板。', 'Prompt and tool-permission template for the engineering agent.'),
        path: '/downloads/agents/bingbu-config.json',
        githubUrl: `${githubBase}/bingbu-config.json`,
      },
      {
        label: text('下载 Scale 说明', 'Download scale note'),
        description: text('说明什么时候应该用便宜模型，什么时候切换高推理模型。', 'Notes when to use a cheap model and when to switch to a higher-reasoning model.'),
        path: '/downloads/agents/bingbu-scale.md',
        githubUrl: `${githubBase}/bingbu-scale.md`,
      },
    ],
  },
  {
    id: 'libu',
    name: '礼部',
    englishName: 'Content Ops',
    role: text('内容与品牌 Agent', 'Content and Brand Agent'),
    summary: text(
      '负责把 OpenClaw 的能力写清楚、讲清楚、运营出去。',
      'Makes OpenClaw legible, presentable, and consistently published in public.',
    ),
    longDescription: text(
      '礼部不只是写文章，它会决定栏目、风格、发布节奏和对外叙事。博客、产品页、案例页这些“能卖”的内容，都需要礼部来整理。',
      'Libu does more than write copy. It defines content structure, editorial style, publishing cadence, and public narrative for the blog, product pages, and case studies.',
    ),
    skills: ['Editorial Design', 'Narrative Strategy', 'SEO Writing', 'Content Operations'],
    responsibilities: [
      text('规划博客栏目与发布节奏', 'Plan blog sections and publishing cadence'),
      text('把 Agent 能力写成可销售的介绍', 'Turn agent capability into sellable narratives'),
      text('维护案例库与产品说明', 'Maintain case studies and product descriptions'),
    ],
    configuration: {
      model: 'MiniMax M2.7 content profile',
      reasoningMode: text('偏编辑和结构整理，少废话、强信息密度', 'Editorial and structure-focused, concise with high information density'),
      memoryPolicy: text('记录栏目规范、标题风格和受众反馈', 'Stores editorial rules, title patterns, and audience feedback'),
      toolchain: ['Markdown', 'Blog CMS', 'SEO Checklist', 'Calendar'],
      outputs: [
        text('文章大纲', 'Article outlines'),
        text('专题页文案', 'Series page copy'),
        text('产品案例说明', 'Product case study copy'),
      ],
    },
    scale: {
      tier: 'S',
      concurrency: 'steady daily cadence',
      contextWindow: '64k',
      budget: text('极低 token 成本，适合高频运营', 'Very low token cost, optimized for frequent operations'),
      bestFor: [
        text('博客维护', 'Blog maintenance'),
        text('产品讲解', 'Product explainers'),
        text('销售页润色', 'Sales-page polish'),
      ],
    },
    downloads: [
      {
        label: text('下载配置 JSON', 'Download config JSON'),
        description: text('内容运营提示词、栏目模板与发布规则。', 'Content-ops prompt, section templates, and publishing rules.'),
        path: '/downloads/agents/libu-config.json',
        githubUrl: `${githubBase}/libu-config.json`,
      },
      {
        label: text('下载 Scale 说明', 'Download scale note'),
        description: text('便宜模型如何稳定写博客和整理案例。', 'How a low-cost model can reliably run a blog and maintain case studies.'),
        path: '/downloads/agents/libu-scale.md',
        githubUrl: `${githubBase}/libu-scale.md`,
      },
    ],
  },
  {
    id: 'hanlinyuan',
    name: '翰林院',
    englishName: 'Longform Writer',
    role: text('长文与表达 Agent', 'Longform and Messaging Agent'),
    summary: text(
      '负责把复杂工作流、案例和产品故事写成能读懂、能转发、能成交的长文。',
      'Turns complex workflows, case studies, and product stories into readable, shareable, persuasive longform.',
    ),
    longDescription: text(
      '翰林院是礼部的深度写作搭档。它会接住工程信息、运营信息和业务信息，输出成更完整、更像正式文档与文章的内容。',
      'Hanlinyuan is Libu’s deep-writing partner. It absorbs engineering, ops, and business information and turns it into cohesive longform documentation and articles.',
    ),
    skills: ['Longform Writing', 'Positioning', 'Documentation', 'Persuasive Framing'],
    responsibilities: [
      text('撰写深度案例与专题', 'Write in-depth cases and themed series'),
      text('把工作流写成可理解的方法论', 'Translate workflows into understandable methodology'),
      text('统一整体语言风格', 'Unify voice and language quality across pages'),
    ],
    configuration: {
      model: 'High-reasoning writing profile',
      reasoningMode: text('重视逻辑与段落组织，适合长文和案例拆解', 'Prioritizes logic and paragraph structure for longform and case breakdowns'),
      memoryPolicy: text('保留论证链路、案例素材和表达规范', 'Keeps argument chains, case material, and writing guidelines'),
      toolchain: ['Markdown', 'Research Notes', 'Case Templates'],
      outputs: [
        text('专题长文', 'Themed longform pieces'),
        text('产品说明书', 'Product explainers'),
        text('案例复盘', 'Case retrospectives'),
      ],
    },
    scale: {
      tier: 'M',
      concurrency: 'deep work blocks',
      contextWindow: '128k',
      budget: text('比日常运营高，但明显提升说服力', 'Higher than day-to-day ops, but meaningfully boosts persuasiveness'),
      bestFor: [
        text('长文案例', 'Longform case studies'),
        text('复杂说明页', 'Complex explanation pages'),
        text('方法论沉淀', 'Methodology documentation'),
      ],
    },
    downloads: [
      {
        label: text('下载配置 JSON', 'Download config JSON'),
        description: text('长文写作提示词、结构模板与改写规则。', 'Longform writing prompt, structure templates, and rewriting rules.'),
        path: '/downloads/agents/hanlinyuan-config.json',
        githubUrl: `${githubBase}/hanlinyuan-config.json`,
      },
      {
        label: text('下载 Scale 说明', 'Download scale note'),
        description: text('说明长文写作什么时候值得用更强模型。', 'Explains when longform writing warrants a stronger model.'),
        path: '/downloads/agents/hanlinyuan-scale.md',
        githubUrl: `${githubBase}/hanlinyuan-scale.md`,
      },
    ],
  },
];

export const workflows: Workflow[] = [
  {
    id: 'blog-ops',
    title: text('博客运营工作流', 'Blog Operations Workflow'),
    description: text(
      '让 OpenClaw 每天自动产出、自检并发布博客内容。',
      'Lets OpenClaw draft, review, and publish blog content every day.',
    ),
    scenario: text(
      '适合持续经营博客、输出案例、维护内容资产。',
      'Best for maintaining a public blog, case studies, and durable content assets.',
    ),
    highlights: [
      text('每天自动整理日志并抽出可发布内容', 'Transforms daily logs into publishable material'),
      text('把便宜模型用于草稿，把强模型用于精修', 'Uses cheap models for drafts and stronger models for final polish'),
      text('最后输出文章、摘要和专题归档', 'Outputs articles, summaries, and series classification'),
    ],
    stages: [
      {
        title: text('收集当天完成内容', 'Collect the day’s completed work'),
        agentId: 'silijian',
        description: text('把不同 Agent 的完成项、阻塞项和产物回收到一张运营清单。', 'Pull completed tasks, blockers, and deliverables into one operating list.'),
        input: 'task logs + agent notes',
        output: 'daily editorial queue',
      },
      {
        title: text('生成博客草稿', 'Generate the blog draft'),
        agentId: 'libu',
        description: text('根据当天内容，决定是写成产品进展、案例还是方法论短文。', 'Decide whether the material should become a progress post, a case study, or a methodology note.'),
        input: 'daily editorial queue',
        output: 'first draft + title options',
      },
      {
        title: text('长文精修与案例化', 'Refine into longform and case-study shape'),
        agentId: 'hanlinyuan',
        description: text('把草稿整理成更完整的结构，增强表达、逻辑和销售感。', 'Refine the draft into a stronger structure with clearer logic and better persuasion.'),
        input: 'first draft + title options',
        output: 'publish-ready article',
      },
      {
        title: text('发布与归档', 'Publish and archive'),
        agentId: 'bingbu',
        description: text('写入站点内容目录，更新专题、索引和部署流水线。', 'Commit the content, update series/index pages, and ship through deployment.'),
        input: 'publish-ready article',
        output: 'live blog page',
      },
    ],
    implementationNotes: [
      text('把“今天做了什么”拆成结构化字段，是这个工作流稳定的关键。', 'The key to stability is structuring “what we did today” into machine-friendly fields.'),
      text('草稿和精修分层，可以显著降低 token 成本。', 'Separating draft and polish meaningfully reduces token cost.'),
      text('部署端只需要接收最终文章，不必参与全文生成。', 'The deployment layer only needs the final article and should not participate in generation.'),
    ],
    inputExample: `{
  "date": "2026-03-21",
  "completed": ["部署博客", "修复 Pages 路由", "新增 Agent 下载页"],
  "blockers": ["工作流详情页展示太浅"],
  "artifacts": ["deploy.yml", "agent config files", "workflow cards"]
}`,
    outputExample: `# 今日博客更新

- 完成 GitHub Pages 自动部署
- 补上 Agent 配置下载与 scale 说明
- 正在重做工作流详情页的流程展示
`,
    deliverables: [
      text('每天一篇日志或进展文', 'One daily progress or operations post'),
      text('可积累的专题与案例页', 'Accumulating series and case pages'),
      text('统一的内容归档与索引', 'Unified archives and indexes'),
    ],
  },
  {
    id: 'product-delivery',
    title: text('产品交付工作流', 'Product Delivery Workflow'),
    description: text(
      '把一个模糊想法推进到可公开展示的产品卡片和详情页。',
      'Takes a vague idea all the way to a shippable product card and detailed showcase page.',
    ),
    scenario: text(
      '适合做“OpenClaw 帮我做出了什么”的产品案例展示。',
      'Best for showing what OpenClaw has actually built for you.',
    ),
    highlights: [
      text('从需求拆解开始，不直接跳实现', 'Starts with decomposition instead of jumping straight to implementation'),
      text('中途保留输入与输出样例，方便做演示', 'Preserves input/output samples for demos'),
      text('交付结果会沉淀成产品页和销售材料', 'The result becomes both a product page and sales collateral'),
    ],
    stages: [
      {
        title: text('定义交付目标', 'Define the delivery target'),
        agentId: 'silijian',
        description: text('明确本次交付要完成的页面、脚本或服务边界。', 'Clarify the scope of pages, scripts, or services to be delivered.'),
        input: 'user request',
        output: 'delivery brief',
      },
      {
        title: text('实现产品主体', 'Build the core product'),
        agentId: 'bingbu',
        description: text('完成页面、接口、自动化或部署改动，并保留关键成果截图。', 'Ship the page, integration, automation, or deployment changes and preserve the important results.'),
        input: 'delivery brief',
        output: 'product build + screenshots',
      },
      {
        title: text('形成对外讲法', 'Form the outward-facing narrative'),
        agentId: 'libu',
        description: text('把技术实现翻译成用户能看懂的价值说明。', 'Translate technical execution into language a customer can understand.'),
        input: 'product build + screenshots',
        output: 'product copy + value proposition',
      },
      {
        title: text('打包成可展示案例', 'Package it as a showcase case'),
        agentId: 'hanlinyuan',
        description: text('补齐背景、挑战、方案和结果，让它能直接挂到产品页。', 'Add background, challenge, solution, and results so it can go straight onto the product page.'),
        input: 'product copy + value proposition',
        output: 'complete case study',
      },
    ],
    implementationNotes: [
      text('每个产品都要保留挑战、方案、交付物和结果，不然无法复用到销售页。', 'Every product needs challenge, solution, deliverables, and results or it cannot be reused for sales.'),
      text('不要让工程 Agent 直接负责商业叙事，交给礼部和翰林院会更稳。', 'Do not make the engineering agent own the business narrative; Libu and Hanlinyuan handle that better.'),
      text('详情页的输入输出示例，是客户理解工作流价值的关键。', 'Input/output examples are critical for customers to understand the workflow’s value.'),
    ],
    inputExample: `{
  "goal": "上线一个可展示 OpenClaw 能力的博客前端",
  "constraints": ["先用免费部署", "后续可接博客后端"],
  "artifacts": ["GitHub repo", "existing Vite frontend"]
}`,
    outputExample: `{
  "liveUrl": "https://cklaozhao-boop.github.io/ZZM/",
  "pages": ["Agents", "Workflow", "Logs", "Products"],
  "deliverables": ["deploy.yml", "pages setup", "detail page cases"]
}`,
    deliverables: [
      text('产品卡片', 'Product cards'),
      text('产品详情页', 'Detailed product pages'),
      text('可对外演示的案例结构', 'A reusable showcase-case structure'),
    ],
  },
  {
    id: 'ops-review',
    title: text('自主复盘工作流', 'Autonomous Review Workflow'),
    description: text(
      '每天工作结束后，自动生成“做了什么、卡在哪里、怎么解”的运营日志。',
      'At the end of each day, automatically produces an ops log of what got done, what got blocked, and how issues were solved.',
    ),
    scenario: text(
      '适合沉淀 OpenClaw 的真实工作轨迹，形成连续公开日志。',
      'Best for preserving OpenClaw’s real working trail as a continuous public journal.',
    ),
    highlights: [
      text('统一收集完成项、困难和解决路径', 'Collects completions, challenges, and solutions in one place'),
      text('自动转成一篇可以公开阅读的日志', 'Turns the day into a readable public log'),
      text('同时沉淀给后续产品页和案例页复用', 'Also creates material for later product and case-study reuse'),
    ],
    stages: [
      {
        title: text('汇总执行结果', 'Summarize execution results'),
        agentId: 'silijian',
        description: text('收集当天每个 Agent 的主要完成项和阻塞项。', 'Collect each agent’s main completed work and blockers from the day.'),
        input: 'agent activity',
        output: 'review snapshot',
      },
      {
        title: text('梳理困难与解决方案', 'Structure the challenges and fixes'),
        agentId: 'libu',
        description: text('把技术问题、协作问题和发布时间问题分类整理。', 'Classify technical, coordination, and release-timing problems.'),
        input: 'review snapshot',
        output: 'issue-resolution narrative',
      },
      {
        title: text('整理成对外日志', 'Shape it into a public log'),
        agentId: 'hanlinyuan',
        description: text('把内部记录写成读者可看懂的日志格式，并补关键背景。', 'Turn internal notes into a log format that external readers can follow.'),
        input: 'issue-resolution narrative',
        output: 'published daily review',
      },
    ],
    implementationNotes: [
      text('日志不是简单流水账，而是下一次优化的训练数据。', 'The log is not mere bookkeeping; it becomes training data for the next optimization cycle.'),
      text('困难和解决方式必须成对出现，不然日志价值会很低。', 'Challenges and solutions must appear in pairs or the log loses much of its value.'),
      text('日志越结构化，越容易后续自动生成周报和案例集。', 'The more structured the log, the easier it is to generate weekly reports and case packs later.'),
    ],
    inputExample: `{
  "completed": ["修通部署", "改 Agent 页面结构"],
  "difficulties": ["Pages 首次发布失败", "现有演示数据与新页面不匹配"],
  "fixes": ["启用 Pages workflow", "切到本地案例数据"]
}`,
    outputExample: `今日我们完成了部署链路打通，并开始把四类核心页面改造成可演示的案例结构。
遇到的主要困难是 GitHub Pages 尚未启用，以及旧演示数据不适合新的展示方式。
我们通过补 Pages 配置和改用仓库内案例数据解决了这两个问题。`,
    deliverables: [
      text('日更日志', 'Daily journal entries'),
      text('困难与解决归档', 'Challenge/solution archives'),
      text('周报和案例素材池', 'A source pool for weekly reports and case studies'),
    ],
  },
];

export const dailyLogs: DailyLog[] = [
  {
    id: '2026-03-21',
    date: '2026-03-21',
    title: text('部署博客并重构四类核心页面', 'Deploy the blog and restructure the four core page types'),
    summary: text(
      '今天最重要的工作，是先把博客部署出来，再开始按产品演示的标准重做 Agent、工作流、日志与产品页面。',
      'The main goal today was to get the blog deployed first and then start rebuilding the Agent, Workflow, Logs, and Products pages as a product showcase.',
    ),
    whatWeDid: [
      text('打通了 GitHub Pages 自动部署链路，并确认线上地址可访问。', 'Set up GitHub Pages auto-deployment and confirmed the public URL is reachable.'),
      text('把 Agent、工作流、日志、产品四类页面的目标结构重新梳理清楚。', 'Restructured the target shape of the Agents, Workflow, Logs, and Products pages.'),
      text('决定先切到本地案例数据，让前端展示先完整可看。', 'Switched to local case-study data first so the front-end can be reviewed as a whole.'),
    ],
    challenges: [
      text('第一次发布失败，因为仓库还没启用 GitHub Pages。', 'The first deployment failed because GitHub Pages was not enabled on the repo yet.'),
      text('原来的示例数据更像通用 AI Studio 模板，不像 OpenClaw 自己的产品页。', 'The original sample data looked like a generic AI Studio demo instead of OpenClaw’s own product story.'),
    ],
    solutions: [
      text('通过 GitHub API 启用了 Pages，并重新触发部署流水线。', 'Enabled Pages through the GitHub API and retriggered the deployment pipeline.'),
      text('重设了四类页面的内容模型，改成更贴近 OpenClaw 的案例结构。', 'Redesigned the content model of the four page families to better match OpenClaw’s real showcase needs.'),
    ],
    outcomes: [
      text('博客已经上线，有了一个可持续修改和复核的公开前台。', 'The blog is live and now has a public front-end that can be reviewed and iterated on.'),
      text('后续前端问题可以直接在真站上看，不用再靠脑补。', 'Future front-end feedback can now happen against the live site rather than imagination.'),
    ],
    tokenCost: '18.4k',
    revenueImpact: '$0 today, but unlocks the public sales surface',
    agentsInvolved: ['silijian', 'bingbu', 'libu'],
  },
  {
    id: '2026-03-20',
    date: '2026-03-20',
    title: text('梳理 Agent 展示策略与下载结构', 'Define agent showcase strategy and download structure'),
    summary: text(
      '我们明确了 Agent 页面不能只写能力描述，还要能下载配置和 scale，方便用户理解如何复用。',
      'We clarified that agent pages must not only describe capability, but also expose downloadable config and scale notes so users understand reuse.',
    ),
    whatWeDid: [
      text('整理了 Agent 详情页需要覆盖的配置项和 scale 项。', 'Defined the configuration and scale fields each agent detail page should include.'),
      text('决定每个 Agent 都提供仓库内可下载的示例文件。', 'Decided each agent should expose downloadable example files stored in the repo.'),
      text('规划了卡片页到详情页的跳转逻辑。', 'Planned the interaction flow from cards to detailed pages.'),
    ],
    challenges: [
      text('如果只展示技能列表，用户很难理解 Agent 实际怎么被使用。', 'If we only show skill lists, users struggle to understand how the agents are actually used.'),
    ],
    solutions: [
      text('在详情页里加入配置、scale、下载文件和适用场景四块核心内容。', 'Added configuration, scale, download files, and best-fit usage scenarios as the four key blocks in the detail page.'),
    ],
    outcomes: [
      text('Agent 页面开始从“介绍页”变成“可复用配置页”。', 'The agent page started turning from a brochure into a reusable configuration page.'),
    ],
    tokenCost: '9.6k',
    revenueImpact: 'Makes agent packaging easier to sell',
    agentsInvolved: ['libu', 'hanlinyuan'],
  },
];

export const products: Product[] = [
  {
    id: 'opcro-blog',
    name: 'OPCRO Blog Frontend',
    category: text('博客与展示站', 'Blog and Showcase Site'),
    summary: text(
      '一个可以同时讲清 Agent、工作流、日志和产品案例的公开前台。',
      'A public front-end that explains agents, workflows, daily logs, and product cases in one place.',
    ),
    longDescription: text(
      '这个产品的目的不是只做一个博客，而是做一个可展示 OpenClaw 能力、可被客户理解、未来还能继续接后端和自动运营的公开前台。',
      'This product is not just “a blog”. It is a public front-end that explains OpenClaw’s capability, is understandable to customers, and can later be connected to a fuller back-end and autonomous operations.',
    ),
    challenge: text(
      '原始模板更像通用 AI 工具站，无法清楚表达 OpenClaw 的 Agent 协作与工作流价值。',
      'The original template looked like a generic AI tool site and could not clearly express OpenClaw’s agent collaboration or workflow value.',
    ),
    solution: text(
      '重做四类核心页面，让每一页都成为产品演示的一部分，而不是只有一堆占位内容。',
      'Rebuild the four core page families so that each page becomes part of the product demo rather than a pile of placeholders.',
    ),
    deliverables: [
      text('Agent 卡片与详情页', 'Agent cards and detailed pages'),
      text('工作流长卡片与流程详情页', 'Workflow long cards and process detail pages'),
      text('自主日志结构', 'Structured autonomous daily logs'),
      text('产品案例卡片与详情页', 'Product showcase cards and detailed pages'),
    ],
    results: [
      { label: text('上线状态', 'Deployment status'), value: 'Live' },
      { label: text('可展示页面', 'Showcase-ready pages'), value: '4 core families' },
      { label: text('可扩展性', 'Extensibility'), value: 'Front-end ready for CMS/backend' },
    ],
    agentsInvolved: ['silijian', 'bingbu', 'libu', 'hanlinyuan'],
    demoUrl: 'https://cklaozhao-boop.github.io/ZZM/',
    repoUrl: 'https://github.com/cklaozhao-boop/ZZM',
    accent: 'from-slate-900 via-slate-700 to-slate-500',
  },
  {
    id: 'blog-operator-skill',
    name: 'Blog Operator Skill Pack',
    category: text('Agent 封装', 'Agent Packaging'),
    summary: text(
      '一套把“起草、精修、发布、归档”串起来的博客运营技能包。',
      'A skill pack that connects drafting, polishing, publishing, and archiving into one blog-ops workflow.',
    ),
    longDescription: text(
      '这个产品把内容运营拆成低歧义、低成本、可交付的步骤，让便宜模型也能稳定跑博客日常工作。',
      'This product breaks content operations into low-ambiguity, low-cost, deliverable steps so that even cheaper models can run daily blog operations reliably.',
    ),
    challenge: text(
      '单一大模型直接运营博客，成本高且容易输出不稳定。', 
      'A single large model running a blog end-to-end is costly and unstable.'
    ),
    solution: text(
      '通过礼部、翰林院、司礼监的分工，把博客运营流程拆成更便宜、更稳的模块。', 
      'Split blog ops across Libu, Hanlinyuan, and the Orchestrator to create cheaper, steadier modules.'
    ),
    deliverables: [
      text('工作流说明', 'Workflow documentation'),
      text('角色职责定义', 'Role responsibility definitions'),
      text('发布与归档模板', 'Publishing and archiving templates'),
    ],
    results: [
      { label: text('模型成本', 'Model cost'), value: 'Low-cost friendly' },
      { label: text('输出稳定性', 'Output stability'), value: 'High' },
      { label: text('复用性', 'Reusability'), value: 'Packaged' },
    ],
    agentsInvolved: ['libu', 'hanlinyuan', 'silijian'],
    demoUrl: 'https://github.com/cklaozhao-boop/ZZM',
    repoUrl: 'https://github.com/cklaozhao-boop/ZZM',
    accent: 'from-rose-600 via-orange-500 to-amber-300',
  },
  {
    id: 'ops-review-console',
    name: 'Autonomous Ops Review Console',
    category: text('经营看板', 'Operations Review Console'),
    summary: text(
      '把每天的完成项、困难、解决方式和经营影响统一挂到一张公开日志页里。',
      'A public log format that unifies what got done each day, the difficulties, how they were solved, and their business impact.',
    ),
    longDescription: text(
      '这个产品的重点，是让 OpenClaw 的“做事轨迹”被看见。日志不仅服务自己复盘，也服务客户理解系统到底在做什么。',
      'The product makes OpenClaw’s operational trail visible. The log serves internal retrospectives and helps customers understand what the system actually does.',
    ),
    challenge: text(
      '如果没有连续的自主日志，用户很难判断 OpenClaw 不是一个只会讲概念的系统。', 
      'Without a continuous autonomous log, users struggle to trust that OpenClaw is more than a concept.'
    ),
    solution: text(
      '把每日工作结果转成标准结构：做了什么、遇到什么、怎么解、有什么产出。', 
      'Convert daily work into a standard structure: what got done, what went wrong, how it was solved, and what came out of it.'
    ),
    deliverables: [
      text('每日复盘日志', 'Daily review logs'),
      text('挑战与解决归档', 'Challenge and solution archives'),
      text('后续周报素材', 'Material for future weekly reports'),
    ],
    results: [
      { label: text('可审计性', 'Auditability'), value: 'Clear daily trail' },
      { label: text('复盘效率', 'Review efficiency'), value: 'Structured' },
      { label: text('销售辅助', 'Sales support'), value: 'Demonstrable ops proof' },
    ],
    agentsInvolved: ['silijian', 'libu', 'hanlinyuan'],
    demoUrl: 'https://cklaozhao-boop.github.io/ZZM/',
    repoUrl: 'https://github.com/cklaozhao-boop/ZZM',
    accent: 'from-emerald-700 via-teal-600 to-cyan-400',
  },
];

export function localize(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export function findAgent(id?: string) {
  return agents.find((agent) => agent.id === id);
}

export function findWorkflow(id?: string) {
  return workflows.find((workflow) => workflow.id === id);
}

export function findProduct(id?: string) {
  return products.find((product) => product.id === id);
}

export function getAgentLabel(id: string, locale: Locale) {
  const agent = findAgent(id);
  if (!agent) return id;
  return locale === 'zh' ? agent.name : agent.englishName;
}
