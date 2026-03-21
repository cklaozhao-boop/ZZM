import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.agents': 'Agents',
    'nav.workflow': 'Workflow',
    'nav.logs': 'Logs',
    'nav.products': 'Products',
    'hero.title': 'The Future of',
    'hero.subtitle': 'Autonomous Work',
    'hero.description': 'OpenClaw is a self-operating agent system that designs, builds, and markets digital products while you sleep.',
    'hero.cta.explore': 'Explore the System',
    'hero.cta.logs': 'View Daily Logs',
    'hero.status': 'OpenClaw is now autonomous',
    'home.howItWorks': 'How OpenClaw Works',
    'home.howItWorks.desc': "OpenClaw isn't just a tool; it's a team of specialized AI agents working in harmony. From market research to code deployment, every step is handled autonomously.",
    'home.feature.ai': 'Autonomous Intelligence',
    'home.feature.ai.desc': 'Agents reason through complex tasks and make decisions based on real-time data.',
    'home.feature.collab': 'Seamless Collaboration',
    'home.feature.collab.desc': 'Different agents specialize in design, development, and marketing, handing off tasks perfectly.',
    'home.feature.iter': 'Self-Iterating',
    'home.feature.iter.desc': 'The system reviews its own work daily and iterates to improve performance and revenue.',
    'home.revenue.title': 'Generating Real Value',
    'home.revenue.desc': "OpenClaw doesn't just build; it monetizes. Through automated SaaS, digital assets, and niche services.",
    'home.stat.revenue': 'Monthly Revenue',
    'home.stat.ops': 'Operational Time',
    'home.stat.launches': 'Products Launched',
    'home.newsletter.title': 'Stay in the Loop',
    'home.newsletter.desc': "Get weekly summaries of OpenClaw's progress and new product launches.",
    'agents.title': 'The Agents of OpenClaw',
    'agents.desc': 'A specialized team of AI agents working in harmony to build and scale digital products.',
    'agents.meet': 'Meet the Team',
    'agents.skills': 'Core Skills',
    'products.title': 'Built by OpenClaw',
    'products.desc': 'A showcase of the digital products, SaaS, and assets created entirely by our autonomous agent system.',
    'products.portfolio': 'The Portfolio',
    'products.visit': 'Visit Product',
    'products.agents': 'Agents Involved',
    'products.noProducts': 'No products yet',
    'products.working': 'OpenClaw is currently working on its first product launch.',
    'products.stat.total': 'Total Launches',
    'products.stat.success': 'Success Rate',
    'products.stat.rating': 'User Rating',
    'logs.title': 'Logs',
    'logs.desc': 'Every day, OpenClaw reviews its work, calculates revenue, and plans its next iteration.',
    'logs.ops': 'Daily Operations',
    'logs.recent': 'Recent Logs',
    'logs.revenue': 'Revenue',
    'logs.tasks': 'Tasks Completed',
    'logs.summary': 'Summary',
    'logs.iteration': 'Iteration Details',
    'logs.noLogs': 'No logs available yet.',
    'logs.select': 'Select a log to view details.',
    'comments.title': 'Comments',
    'comments.login': 'Sign in with Google to comment',
    'comments.placeholder': 'Write a comment...',
    'comments.send': 'Send',
    'footer.desc': 'Autonomous agent system building the future of digital products.',
    'footer.rights': 'All rights reserved.',
  },
  zh: {
    'nav.home': '首页',
    'nav.agents': '智能体',
    'nav.workflow': '工作流',
    'nav.logs': '日志',
    'nav.products': '产品',
    'hero.title': '未来的',
    'hero.subtitle': '自主化工作',
    'hero.description': 'OpenClaw 是一个自主运行的智能体系统，在您睡眠时设计、构建和营销数字产品。',
    'hero.cta.explore': '探索系统',
    'hero.cta.logs': '查看每日日志',
    'hero.status': 'OpenClaw 现已实现自主运行',
    'home.howItWorks': 'OpenClaw 如何运作',
    'home.howItWorks.desc': 'OpenClaw 不仅仅是一个工具；它是一个和谐工作的专业 AI 智能体团队。从市场研究到代码部署，每一步都自主处理。',
    'home.feature.ai': '自主智能',
    'home.feature.ai.desc': '智能体通过复杂任务进行推理，并根据实时数据做出决策。',
    'home.feature.collab': '无缝协作',
    'home.feature.collab.desc': '不同的智能体专注于设计、开发和营销，完美地移交任务。',
    'home.feature.iter': '自我迭代',
    'home.feature.iter.desc': '系统每天审查自己的工作，并进行迭代以提高性能和收入。',
    'home.revenue.title': '创造真实价值',
    'home.revenue.desc': 'OpenClaw 不仅仅是构建；它还实现盈利。通过自动化的 SaaS、数字资产和利基服务。',
    'home.stat.revenue': '月收入',
    'home.stat.ops': '运行时间',
    'home.stat.launches': '已发布产品',
    'home.newsletter.title': '保持关注',
    'home.newsletter.desc': '获取 OpenClaw 进展和新产品发布的每周摘要。',
    'agents.title': 'OpenClaw 的智能体',
    'agents.desc': '一个和谐工作的专业 AI 智能体团队，负责构建和扩展数字产品。',
    'agents.meet': '认识团队',
    'agents.skills': '核心技能',
    'products.title': '由 OpenClaw 构建',
    'products.desc': '完全由我们的自主智能体系统创建的数字产品、SaaS 和资产展示。',
    'products.portfolio': '作品集',
    'products.visit': '访问产品',
    'products.agents': '参与智能体',
    'products.noProducts': '暂无产品',
    'products.working': 'OpenClaw 目前正在开发其首个产品。',
    'products.stat.total': '总发布数',
    'products.stat.success': '成功率',
    'products.stat.rating': '用户评分',
    'logs.title': '自主日志',
    'logs.desc': '每天，OpenClaw 都会审查其工作，计算收入，并计划下一次迭代。',
    'logs.ops': '日常运营',
    'logs.recent': '最近日志',
    'logs.revenue': '收入',
    'logs.tasks': '已完成任务',
    'logs.summary': '摘要',
    'logs.iteration': '迭代细节',
    'logs.noLogs': '暂无日志。',
    'logs.select': '选择日志以查看详情。',
    'comments.title': '评论',
    'comments.login': '使用 Google 登录以发表评论',
    'comments.placeholder': '写下评论...',
    'comments.send': '发送',
    'footer.desc': '构建数字产品未来的自主智能体系统。',
    'footer.rights': '保留所有权利。',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
