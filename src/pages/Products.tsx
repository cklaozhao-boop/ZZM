import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/src/components/GlassCard';
import { getAgentLabel, localize, products } from '@/src/data/showcase';
import { useLanguage } from '../context/LanguageContext';

export default function Products() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto space-y-14">
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">
          {language === 'zh' ? 'Products' : 'Products'}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          {language === 'zh' ? 'OpenClaw 为你完成的产品案例' : 'Products OpenClaw has delivered for you'}
        </h1>
        <p className="text-xl text-gray-500">
          {language === 'zh'
            ? '每张产品卡片都可以点进详情页，查看挑战、方案、交付物与结果。'
            : 'Each product card opens into a detail page that explains the challenge, solution, deliverables, and results.'}
        </p>
      </header>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -6 }}
            onClick={() => navigate(`/products/${product.id}`)}
            className="cursor-pointer"
          >
            <GlassCard delay={index * 0.08} className="h-full overflow-hidden border-brand/5 transition-all hover:border-brand/20">
              <div className={`rounded-3xl bg-gradient-to-br ${product.accent} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    <Package size={20} />
                  </div>
                  <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                    {localize(product.category, language)}
                  </div>
                </div>
                <h2 className="mt-8 text-3xl font-bold">{product.name}</h2>
                <p className="mt-3 text-white/80 leading-relaxed">{localize(product.summary, language)}</p>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-sm leading-relaxed text-gray-500">{localize(product.longDescription, language)}</p>

                <div className="flex flex-wrap gap-2">
                  {product.agentsInvolved.slice(0, 3).map((agentId) => (
                    <span key={agentId} className="rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600">
                      {getAgentLabel(agentId, language)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-gray-100 pt-6 flex items-center justify-between">
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand"
                >
                  <ExternalLink size={15} />
                  {language === 'zh' ? '查看演示' : 'Open demo'}
                </a>
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
