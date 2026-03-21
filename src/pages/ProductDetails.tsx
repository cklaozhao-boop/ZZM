import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ExternalLink, FolderGit2, Users } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { getAgentById, getProductById, localize } from '../lib/content';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="pt-32 pb-32 text-center">
        <h2 className="text-2xl font-bold">{language === 'en' ? 'Product not found' : '未找到产品'}</h2>
        <button onClick={() => navigate('/products')} className="mt-4 text-brand flex items-center gap-2 mx-auto">
          <ArrowLeft size={20} />
          {language === 'en' ? 'Back to Products' : '返回产品列表'}
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 max-w-6xl mx-auto space-y-12">
      <button onClick={() => navigate('/products')} className="text-gray-500 hover:text-brand flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} />
        {language === 'en' ? 'Back to Products' : '返回产品列表'}
      </button>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
        <div className="space-y-8">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-brand/10">
            <img src={product.image} alt={localize(product.name, language)} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <div className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand backdrop-blur-sm">
                {localize(product.category, language)}
              </div>
              <h1 className="text-4xl font-bold text-white">{localize(product.name, language)}</h1>
              <p className="text-white/80">{localize(product.description, language)}</p>
            </div>
          </div>

          <GlassCard className="space-y-5 border-brand/5">
            <h2 className="text-2xl font-bold text-black">{language === 'en' ? 'Overview' : '项目概览'}</h2>
            <p className="text-lg leading-relaxed text-gray-600">{localize(product.longDescription, language)}</p>
          </GlassCard>

          <div className="grid gap-8 md:grid-cols-2">
            <GlassCard className="space-y-4 border-brand/5">
              <h2 className="text-xl font-bold text-black">{language === 'en' ? 'Challenge' : '挑战'}</h2>
              <p className="text-sm leading-relaxed text-gray-600">{localize(product.challenge, language)}</p>
            </GlassCard>

            <GlassCard className="space-y-4 border-brand/5">
              <h2 className="text-xl font-bold text-black">{language === 'en' ? 'Solution' : '方案'}</h2>
              <p className="text-sm leading-relaxed text-gray-600">{localize(product.solution, language)}</p>
            </GlassCard>
          </div>

          <GlassCard className="space-y-4 border-brand/5">
            <h2 className="text-xl font-bold text-black">{language === 'en' ? 'Deliverables' : '交付物'}</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {product.deliverables.map((item) => (
                <div key={item.zh} className="flex gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="shrink-0 text-brand" />
                  <span>{localize(item, language)}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-4 border-brand/5">
            <h2 className="text-xl font-bold text-black">{language === 'en' ? 'Outcomes' : '结果'}</h2>
            <div className="space-y-3">
              {product.outcomes.map((item) => (
                <div key={item.zh} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm leading-relaxed text-gray-600">
                  {localize(item, language)}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-8 lg:sticky lg:top-32">
          <GlassCard className="p-8 space-y-8 border-brand/10">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-black">{language === 'en' ? 'Product links' : '产品链接'}</h3>
              <p className="text-gray-500 text-sm">
                {language === 'en'
                  ? 'Open the live surface or inspect the supporting source repository.'
                  : '打开线上页面，或者查看配套源码仓库。'}
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-brand text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
              >
                <ExternalLink size={20} />
                {language === 'en' ? 'Open live page' : '打开线上页面'}
              </a>
              {product.repoUrl && (
                <a
                  href={product.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-white border border-brand/20 text-brand rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand/5 transition-all"
                >
                  <FolderGit2 size={20} />
                  {language === 'en' ? 'Open repository' : '打开仓库'}
                </a>
              )}
            </div>
          </GlassCard>

          <GlassCard className="space-y-5 border-brand/5">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Users size={14} />
              {language === 'en' ? 'Built by agents' : '参与智能体'}
            </h4>
            <div className="space-y-3">
              {product.agentsInvolved.map((agentId) => {
                const agent = getAgentById(agentId);
                return (
                  <div key={agentId} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <div className="text-sm font-semibold text-black">{agent ? localize(agent.name, language) : agentId}</div>
                    {agent && <div className="mt-1 text-xs text-gray-500">{localize(agent.role, language)}</div>}
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard className="space-y-4 border-brand/5">
            <h4 className="text-xl font-bold text-black">{language === 'en' ? 'Key metrics' : '关键指标'}</h4>
            <div className="space-y-3">
              {product.metrics.map((metric) => (
                <div key={metric.label.zh} className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <div className="text-sm text-gray-500">{localize(metric.label, language)}</div>
                  <div className="text-sm font-bold text-black">{metric.value}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
