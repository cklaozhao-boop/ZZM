import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, Layers, Settings2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import GlassCard from '@/src/components/GlassCard';
import { agents, localize } from '@/src/data/showcase';
import { useLanguage } from '../context/LanguageContext';

export default function Agents() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto space-y-14">
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">
          {language === 'zh' ? '技能' : 'Skills'}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          {language === 'zh' ? '技能页就是智能体 Agent 的展示页' : 'Skills are presented through detailed agent pages'}
        </h1>
        <p className="text-xl text-gray-500">
          {language === 'zh'
            ? '这里的“技能”不是抽象概念，而是一个个可配置、可下载、可复用的智能体。'
            : 'The “skills” here are not abstract labels. They are configurable, downloadable, reusable agents.'}
        </p>
        <Link
          to="/agents/downloads"
          className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-6 py-3 font-semibold text-brand"
        >
          <Download size={18} />
          {language === 'zh' ? '查看全部下载文件' : 'Browse all downloads'}
        </Link>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            whileHover={{ y: -6 }}
            className="cursor-pointer"
            onClick={() => navigate(`/agents/${agent.id}`)}
          >
            <GlassCard delay={index * 0.08} className="h-full border-brand/5 transition-all hover:border-brand/20">
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-brand font-semibold">
                    {language === 'zh' ? agent.name : agent.englishName}
                  </p>
                  <div>
                    <h2 className="text-2xl font-bold">{localize(agent.role, language)}</h2>
                    <p className="mt-3 text-gray-500 leading-relaxed">{localize(agent.summary, language)}</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-brand/5 px-4 py-2 text-right">
                  <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">
                    {language === 'zh' ? 'Scale' : 'Scale'}
                  </div>
                  <div className="text-xl font-bold">{agent.scale.tier}</div>
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <InfoStrip
                  icon={<Settings2 size={16} className="text-brand" />}
                  label={language === 'zh' ? '配置模型' : 'Model'}
                  value={agent.configuration.model}
                />
                <InfoStrip
                  icon={<Layers size={16} className="text-brand" />}
                  label={language === 'zh' ? '并发能力' : 'Concurrency'}
                  value={agent.scale.concurrency}
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {agent.skills.slice(0, 4).map((skill) => (
                  <span key={skill} className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-100">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                <div className="text-sm text-gray-500">
                  {language === 'zh'
                    ? `${agent.downloads.length} 个文件可下载`
                    : `${agent.downloads.length} downloadable files`}
                </div>
                <div className="inline-flex items-center gap-1 font-semibold text-brand">
                  {language === 'zh' ? '进入详情页' : 'Open details'} <ArrowRight size={16} />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function InfoStrip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
        {icon}
        {label}
      </div>
      <div className="text-sm font-medium text-gray-700">{value}</div>
    </div>
  );
}
