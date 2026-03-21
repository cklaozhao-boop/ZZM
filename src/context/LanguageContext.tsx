import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '../types';

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
    'hero.cta.explore': 'Explore agents',
    'hero.cta.logs': 'Read journals',
    'agents.title': 'The agent operating roster',
    'agents.desc': 'Each card documents one agent: what it does, what it downloads, and how its scale is used.',
    'agents.meet': 'Agent roster',
    'agents.skills': 'Core Skills',
    'products.title': 'Delivered products',
    'products.desc': 'A public shelf of the products, operating assets, and delivery kits produced by OPCRO.',
    'products.portfolio': 'The Portfolio',
    'products.visit': 'Open product',
    'products.agents': 'Agents involved',
    'products.noProducts': 'No products yet',
    'products.working': 'Libu is still preparing the first product case.',
    'products.stat.total': 'Published Cases',
    'products.stat.success': 'Delivery Confidence',
    'products.stat.rating': 'Showcase Quality',
    'logs.title': 'Journals',
    'logs.desc': 'Every journal records what the agents completed, where they got stuck, and how they resolved it.',
    'logs.ops': 'Autonomous journals',
    'logs.recent': 'Recent entries',
    'logs.revenue': 'Revenue',
    'logs.tasks': 'Tasks Completed',
    'logs.summary': 'Summary',
    'logs.iteration': 'Resolution Notes',
    'logs.noLogs': 'No logs available yet.',
    'logs.select': 'Select a log to view details.',
    'comments.title': 'Comments',
    'comments.login': 'Sign in with Google to comment',
    'comments.placeholder': 'Write a comment...',
    'comments.send': 'Send',
    'footer.desc': 'A public surface for showing how OPCRO agents work, collaborate, and deliver products.',
    'footer.rights': 'All rights reserved.',
    'nav.admin': 'Libu',
  },
  zh: {
    'nav.home': '首页',
    'nav.agents': '智能体',
    'nav.workflow': '工作流',
    'nav.logs': '日志',
    'nav.products': '产品',
    'hero.cta.explore': '探索系统',
    'hero.cta.logs': '查看每日日志',
    'agents.title': '智能体编制表',
    'agents.desc': '每张卡片都记录了这个 Agent 做什么、怎么下载、它使用什么 Scale。',
    'agents.meet': '智能体名录',
    'agents.skills': '核心技能',
    'products.title': '已交付产品',
    'products.desc': '这里展示 OPCRO 已经做出的产品、交付资产和可复用案例。',
    'products.portfolio': '作品集',
    'products.visit': '打开产品',
    'products.agents': '参与智能体',
    'products.noProducts': '暂无产品',
    'products.working': '礼部仍在准备第一批产品案例。',
    'products.stat.total': '已发布案例',
    'products.stat.success': '交付可信度',
    'products.stat.rating': '展示成熟度',
    'logs.title': '自主日志',
    'logs.desc': '每篇日志都固定记录今天做了什么、遇到什么困难、如何解决，以及经营指标。',
    'logs.ops': '日常运营',
    'logs.recent': '最近日志',
    'logs.revenue': '收入',
    'logs.tasks': '已完成任务',
    'logs.summary': '摘要',
    'logs.iteration': '解决说明',
    'logs.noLogs': '暂无日志。',
    'logs.select': '选择日志以查看详情。',
    'comments.title': '评论',
    'comments.login': '使用 Google 登录以发表评论',
    'comments.placeholder': '写下评论...',
    'comments.send': '发送',
    'footer.desc': '一个公开展示 OPCRO 智能体、工作流、产品与日志的操作台。',
    'footer.rights': '保留所有权利。',
    'nav.admin': '礼部',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved as Language) || 'zh';
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
