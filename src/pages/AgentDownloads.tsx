import React from 'react';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/src/components/GlassCard';
import { agents, localize } from '@/src/data/showcase';
import { withBase } from '@/src/lib/site';
import { useLanguage } from '../context/LanguageContext';

export default function AgentDownloads() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="pt-32 pb-32 px-6 max-w-6xl mx-auto space-y-10">
      <button onClick={() => navigate('/agents')} className="inline-flex items-center gap-2 text-gray-500 hover:text-brand transition-colors">
        <ArrowLeft size={18} />
        {language === 'zh' ? '返回 Agent 列表' : 'Back to agents'}
      </button>

      <header className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">
          {language === 'zh' ? 'Downloads' : 'Downloads'}
        </p>
        <h1 className="text-5xl font-bold tracking-tight">
          {language === 'zh' ? '所有 Agent 的配置与 Scale 文件' : 'All agent config and scale files'}
        </h1>
        <p className="text-lg text-gray-500">
          {language === 'zh'
            ? '这些文件同时可以从站点和 GitHub 仓库拿到，适合直接演示“这个 Agent 可以怎么封装和复用”。'
            : 'These files are downloadable both from the site and from GitHub, making it easy to demo how an agent can be packaged and reused.'}
        </p>
      </header>

      <div className="grid gap-6">
        {agents.map((agent) => (
          <GlassCard key={agent.id} className="border-brand/5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.22em] text-brand font-semibold">
                  {language === 'zh' ? agent.name : agent.englishName}
                </p>
                <h2 className="text-2xl font-bold">{localize(agent.role, language)}</h2>
                <p className="text-gray-500 max-w-2xl">{localize(agent.summary, language)}</p>
              </div>

              <div className="rounded-2xl bg-brand/5 px-4 py-3 text-sm">
                <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">
                  {language === 'zh' ? 'Scale' : 'Scale'}
                </div>
                <div className="mt-1 font-bold">{agent.scale.tier}</div>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {agent.downloads.map((file) => (
                <div key={file.path} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-semibold">{localize(file.label, language)}</h3>
                      <p className="mt-1 text-sm text-gray-500">{localize(file.description, language)}</p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={withBase(file.path)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
                      >
                        <Download size={14} />
                        {language === 'zh' ? '下载' : 'Download'}
                      </a>
                      <a
                        href={file.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
                      >
                        <ExternalLink size={14} />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
