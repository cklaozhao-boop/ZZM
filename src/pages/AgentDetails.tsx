import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink, Layers, Settings2, Sparkles } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import { findAgent, localize } from '@/src/data/showcase';
import { withBase } from '@/src/lib/site';
import { useLanguage } from '../context/LanguageContext';

export default function AgentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const agent = findAgent(id);

  if (!agent) {
    return (
      <div className="pt-32 pb-32 px-6 text-center">
        <h2 className="text-3xl font-bold">{language === 'zh' ? '未找到这个 Agent' : 'Agent not found'}</h2>
        <button onClick={() => navigate('/agents')} className="mt-6 inline-flex items-center gap-2 text-brand font-semibold">
          <ArrowLeft size={18} />
          {language === 'zh' ? '返回 Agent 列表' : 'Back to agents'}
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 max-w-6xl mx-auto space-y-10">
      <button onClick={() => navigate('/agents')} className="inline-flex items-center gap-2 text-gray-500 hover:text-brand transition-colors">
        <ArrowLeft size={18} />
        {language === 'zh' ? '返回 Agent 列表' : 'Back to agents'}
      </button>

      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
        <GlassCard className="border-brand/10 bg-gradient-to-br from-brand/5 to-white">
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-brand font-semibold">
                {language === 'zh' ? agent.name : agent.englishName}
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight">{localize(agent.role, language)}</h1>
              <p className="mt-4 text-gray-500 leading-relaxed">{localize(agent.longDescription, language)}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <Metric label={language === 'zh' ? 'Scale' : 'Scale'} value={agent.scale.tier} />
              <Metric label={language === 'zh' ? '上下文' : 'Context'} value={agent.scale.contextWindow} />
              <Metric label={language === 'zh' ? '并发' : 'Concurrency'} value={agent.scale.concurrency} />
            </div>

            <div className="rounded-3xl border border-brand/10 bg-white p-5">
              <div className="mb-3 text-xs uppercase tracking-[0.22em] text-brand font-semibold">
                {language === 'zh' ? '核心技能' : 'Core skills'}
              </div>
              <div className="flex flex-wrap gap-2">
                {agent.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="border-brand/5">
            <SectionTitle icon={<Settings2 size={18} className="text-brand" />} title={language === 'zh' ? '配置详情' : 'Configuration'} />
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <InfoCard label={language === 'zh' ? '模型' : 'Model'} value={agent.configuration.model} />
              <InfoCard label={language === 'zh' ? '推理模式' : 'Reasoning'} value={localize(agent.configuration.reasoningMode, language)} />
              <InfoCard label={language === 'zh' ? '记忆策略' : 'Memory'} value={localize(agent.configuration.memoryPolicy, language)} />
              <InfoCard label={language === 'zh' ? '主要输出' : 'Primary outputs'} value={localize(agent.configuration.outputs[0], language)} />
            </div>
            <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <div className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
                {language === 'zh' ? '工具链' : 'Toolchain'}
              </div>
              <div className="flex flex-wrap gap-2">
                {agent.configuration.toolchain.map((tool) => (
                  <span key={tool} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-100">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard className="border-brand/5">
            <SectionTitle icon={<Layers size={18} className="text-brand" />} title={language === 'zh' ? 'Scale 与使用档位' : 'Scale and usage band'} />
            <div className="mt-5 grid gap-4">
              <InfoCard label={language === 'zh' ? '预算建议' : 'Budget profile'} value={localize(agent.scale.budget, language)} />
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
                  {language === 'zh' ? '最适合的任务' : 'Best-fit use cases'}
                </div>
                <ul className="grid gap-2 text-sm text-gray-600">
                  {agent.scale.bestFor.map((item) => (
                    <li key={localize(item, language)} className="flex gap-2">
                      <Sparkles size={16} className="mt-0.5 text-brand shrink-0" />
                      {localize(item, language)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
        <GlassCard className="border-brand/5">
          <SectionTitle icon={<Sparkles size={18} className="text-brand" />} title={language === 'zh' ? '这个 Agent 主要负责什么' : 'What this agent is responsible for'} />
          <ul className="mt-5 grid gap-3">
            {agent.responsibilities.map((item) => (
              <li key={localize(item, language)} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
                {localize(item, language)}
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="border-brand/5">
          <SectionTitle icon={<Download size={18} className="text-brand" />} title={language === 'zh' ? '配置与 Scale 下载' : 'Config and scale downloads'} />
          <div className="mt-5 grid gap-4">
            {agent.downloads.map((file) => (
              <div key={file.path} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold">{localize(file.label, language)}</h3>
                    <p className="mt-2 text-sm text-gray-500">{localize(file.description, language)}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={withBase(file.path)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
                    >
                      <Download size={15} />
                      {language === 'zh' ? '站内下载' : 'Site download'}
                    </a>
                    <a
                      href={file.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
                    >
                      <ExternalLink size={15} />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">{label}</div>
      <div className="mt-2 text-lg font-bold">{value}</div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">{label}</div>
      <div className="mt-2 text-sm leading-relaxed text-gray-700">{value}</div>
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
}
