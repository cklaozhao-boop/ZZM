import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, FolderGit2, Package } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import { findProduct, getAgentLabel, localize } from '@/src/data/showcase';
import { useLanguage } from '../context/LanguageContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const product = findProduct(id);

  if (!product) {
    return (
      <div className="pt-32 pb-32 px-6 text-center">
        <h2 className="text-3xl font-bold">{language === 'zh' ? '未找到这个产品' : 'Product not found'}</h2>
        <button onClick={() => navigate('/products')} className="mt-6 inline-flex items-center gap-2 text-brand font-semibold">
          <ArrowLeft size={18} />
          {language === 'zh' ? '返回产品列表' : 'Back to products'}
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto space-y-10">
      <button onClick={() => navigate('/products')} className="inline-flex items-center gap-2 text-gray-500 hover:text-brand transition-colors">
        <ArrowLeft size={18} />
        {language === 'zh' ? '返回产品列表' : 'Back to products'}
      </button>

      <div className={`rounded-[2rem] bg-gradient-to-br ${product.accent} p-8 md:p-10 text-white`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em]">
              <Package size={16} />
              {localize(product.category, language)}
            </div>
            <h1 className="mt-5 text-5xl font-bold tracking-tight">{product.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-white/85">{localize(product.summary, language)}</p>
          </div>
          <div className="flex gap-3">
            <a
              href={product.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black"
            >
              <ExternalLink size={16} />
              {language === 'zh' ? '打开演示' : 'Open demo'}
            </a>
            <a
              href={product.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 font-semibold text-white"
            >
              <FolderGit2 size={16} />
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
        <div className="space-y-8">
          <GlassCard className="border-brand/5">
            <h2 className="text-2xl font-bold">{language === 'zh' ? '产品概览' : 'Overview'}</h2>
            <p className="mt-5 text-gray-600 leading-relaxed">{localize(product.longDescription, language)}</p>
          </GlassCard>

          <GlassCard className="border-brand/5">
            <h2 className="text-2xl font-bold">{language === 'zh' ? '解决了什么问题' : 'Challenge'}</h2>
            <p className="mt-5 text-gray-600 leading-relaxed">{localize(product.challenge, language)}</p>
          </GlassCard>

          <GlassCard className="border-brand/5">
            <h2 className="text-2xl font-bold">{language === 'zh' ? '具体怎么做的' : 'Solution'}</h2>
            <p className="mt-5 text-gray-600 leading-relaxed">{localize(product.solution, language)}</p>
            <div className="mt-6 rounded-2xl border border-brand/10 bg-brand/5 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                {language === 'zh' ? '主要交付物' : 'Deliverables'}
              </h3>
              <ul className="mt-3 grid gap-2 text-sm text-gray-700">
                {product.deliverables.map((item) => (
                  <li key={localize(item, language)}>{localize(item, language)}</li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-8">
          <GlassCard className="border-brand/10 bg-gradient-to-br from-brand/5 to-white">
            <h2 className="text-2xl font-bold">{language === 'zh' ? '结果与指标' : 'Results and metrics'}</h2>
            <div className="mt-6 grid gap-4">
              {product.results.map((metric) => (
                <div key={`${metric.label.zh}-${metric.value}`} className="rounded-2xl border border-gray-100 bg-white p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
                    {localize(metric.label, language)}
                  </div>
                  <div className="mt-2 text-xl font-bold">{metric.value}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="border-brand/5">
            <h2 className="text-2xl font-bold">{language === 'zh' ? '参与交付的 Agent' : 'Agents involved'}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {product.agentsInvolved.map((agentId) => (
                <span key={agentId} className="rounded-full border border-brand/10 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
                  {getAgentLabel(agentId, language)}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
