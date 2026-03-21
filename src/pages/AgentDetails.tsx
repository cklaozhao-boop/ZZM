import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink, FolderGit2, ScrollText, Sparkles } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { assetUrl, getAgentById, localize, repoBlobUrl } from '../lib/content';

export default function AgentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const agent = getAgentById(id);

  if (!agent) {
    return (
      <div className="pt-32 pb-32 text-center">
        <h2 className="text-2xl font-bold">{language === 'en' ? 'Agent not found' : '未找到该智能体'}</h2>
        <button onClick={() => navigate('/agents')} className="mt-4 text-brand flex items-center gap-2 mx-auto">
          <ArrowLeft size={20} />
          {language === 'en' ? 'Back to Agents' : '返回智能体列表'}
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 max-w-6xl mx-auto space-y-12">
      <button onClick={() => navigate('/agents')} className="text-gray-500 hover:text-brand flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} />
        {language === 'en' ? 'Back to Agents' : '返回智能体列表'}
      </button>

      <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
        <div className="space-y-6 lg:sticky lg:top-32 h-fit">
          <GlassCard className="space-y-6 border-brand/10">
            <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] border border-brand/10 bg-brand/5 text-4xl font-bold text-brand">
              {agent.avatar}
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-black">{localize(agent.name, language)}</h1>
              <p className="text-sm font-medium uppercase tracking-widest text-brand">{localize(agent.role, language)}</p>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">{localize(agent.description, language)}</p>

            <div className="grid gap-3">
              <a
                href={assetUrl(agent.downloadPath)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-white transition-all hover:bg-brand-dark"
              >
                <Download size={18} />
                {language === 'en' ? 'Download config' : '下载配置'}
              </a>
              <a
                href={assetUrl(agent.scalePath)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand/20 bg-white px-5 py-3 text-sm font-bold text-brand transition-all hover:bg-brand/5"
              >
                <ScrollText size={18} />
                {language === 'en' ? 'Open scale' : '打开 Scale'}
              </a>
              <a
                href={repoBlobUrl(agent.githubPath)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50"
              >
                <FolderGit2 size={18} />
                {language === 'en' ? 'GitHub source' : 'GitHub 源文件'}
              </a>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4 border-brand/5">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
              {language === 'en' ? 'Tech stack' : '技术栈'}
            </div>
            <div className="flex flex-wrap gap-2">
              {agent.stack.map((item) => (
                <span key={item} className="rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                  {item}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-8">
          <GlassCard className="space-y-4 border-brand/5">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
              {language === 'en' ? 'Overview' : '总览'}
            </div>
            <p className="text-lg leading-relaxed text-gray-600">{localize(agent.longDescription, language)}</p>
          </GlassCard>

          <div className="grid gap-8 md:grid-cols-2">
            <GlassCard className="space-y-4 border-brand/5">
              <div className="flex items-center gap-2 text-brand">
                <Sparkles size={18} />
                <h2 className="text-xl font-bold text-black">{language === 'en' ? 'Config' : '配置'}</h2>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">{localize(agent.configSummary, language)}</p>
            </GlassCard>

            <GlassCard className="space-y-4 border-brand/5">
              <div className="flex items-center gap-2 text-brand">
                <ScrollText size={18} />
                <h2 className="text-xl font-bold text-black">{language === 'en' ? 'Scale' : 'Scale'}</h2>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">{localize(agent.scaleSummary, language)}</p>
            </GlassCard>
          </div>

          <GlassCard className="space-y-5 border-brand/5">
            <h2 className="text-xl font-bold text-black">{language === 'en' ? 'Core skills' : '核心技能'}</h2>
            <div className="flex flex-wrap gap-3">
              {agent.skills.map((skill) => (
                <span key={skill.zh} className="rounded-full border border-brand/10 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
                  {localize(skill, language)}
                </span>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-5 border-brand/5">
            <h2 className="text-xl font-bold text-black">{language === 'en' ? 'Recent achievements' : '最近成果'}</h2>
            <div className="space-y-4">
              {agent.achievements.map((achievement) => (
                <div key={achievement.zh} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm leading-relaxed text-gray-600">
                  {localize(achievement, language)}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-4 border-brand/5">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
              {language === 'en' ? 'Delivery notes' : '交付说明'}
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              {language === 'en'
                ? 'This agent page doubles as a delivery sheet: visitors can understand the role, download the config, inspect the scale, and trace the source asset in GitHub.'
                : '这个智能体详情页同时也是交付清单：用户可以理解角色、下载配置、查看 Scale，并追踪到 GitHub 里的源文件。'}
            </p>
            <a
              href={repoBlobUrl(agent.githubPath.replace('.config.json', '.scale.md'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark"
            >
              <ExternalLink size={16} />
              {language === 'en' ? 'View scale source on GitHub' : '在 GitHub 查看 Scale 源文件'}
            </a>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
