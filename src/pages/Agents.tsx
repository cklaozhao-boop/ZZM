import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Boxes, Download, ScrollText } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import GlassCard from '@/src/components/GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { allAgents, localize } from '../lib/content';

export default function Agents() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto space-y-20">
      <header className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 rounded-full text-sm font-medium text-brand border border-brand/10"
        >
          <Boxes size={16} />
          {t('agents.meet')}
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black">{t('agents.title')}</h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">{t('agents.desc')}</p>
        <div className="pt-4">
          <Link
            to="/agents/downloads"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-full font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
          >
            <Download size={18} />
            {language === 'en' ? 'Open download center' : '打开下载中心'}
          </Link>
        </div>
      </header>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {allAgents.map((agent, index) => (
          <motion.div
            key={agent.id}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/agents/${agent.id}`)}
            className="cursor-pointer group"
          >
            <GlassCard delay={index * 0.05} className="flex h-full flex-col border-brand/5 transition-all group-hover:border-brand/30">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-brand/10 bg-brand/5 text-2xl font-bold text-brand">
                  {agent.avatar}
                </div>
                <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-500">
                  <ScrollText size={14} />
                  {agent.stack.length} {language === 'en' ? 'tools' : '个模块'}
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="text-2xl font-bold text-black">{localize(agent.name, language)}</h3>
                <p className="text-sm font-medium text-brand uppercase tracking-widest">{localize(agent.role, language)}</p>
              </div>

              <p className="mt-4 flex-1 text-gray-600 leading-relaxed">
                {localize(agent.description, language)}
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {agent.skills.slice(0, 3).map((skill) => (
                    <span key={skill.zh} className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[11px] font-medium text-gray-600">
                      {localize(skill, language)}
                    </span>
                  ))}
                </div>

                <div className="rounded-2xl border border-brand/10 bg-brand/5 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand">
                    {language === 'en' ? 'Scale summary' : 'Scale 摘要'}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-brand-dark">
                    {localize(agent.scaleSummary, language)}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="text-xs text-gray-400">{localize(agent.owner, language)}</div>
                  <div className="text-brand flex items-center gap-1 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {language === 'en' ? 'Details' : '详情'} <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
