import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Package, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/src/components/GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { allProducts, getAgentById, localize } from '../lib/content';

export default function Products() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto space-y-20">
      <header className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 rounded-full text-sm font-medium text-brand border border-brand/10"
        >
          <Package size={16} />
          {t('products.portfolio')}
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black">{t('products.title')}</h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">{t('products.desc')}</p>
      </header>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {allProducts.map((product, index) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/products/${product.id}`)}
            className="cursor-pointer group"
          >
            <GlassCard delay={index * 0.05} className="p-0 flex flex-col h-full overflow-hidden border-brand/5 group-hover:border-brand/30 transition-all">
              <div className="aspect-video w-full bg-gray-100 overflow-hidden relative">
                <img src={product.image} alt={localize(product.name, language)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand backdrop-blur-sm">
                  {localize(product.category, language)}
                </div>
              </div>

              <div className="p-8 space-y-6 flex-1 flex flex-col">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-black group-hover:text-brand transition-colors">{localize(product.name, language)}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{localize(product.description, language)}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {product.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label.zh} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      <div className="text-lg font-bold text-black">{metric.value}</div>
                      <div className="mt-1 text-xs text-gray-500">{localize(metric.label, language)}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {product.agentsInvolved.slice(0, 2).map((agentId) => {
                      const agent = getAgentById(agentId);
                      return (
                        <span key={agentId} className="inline-flex items-center gap-1 rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                          <Users size={12} />
                          {agent ? localize(agent.name, language) : agentId}
                        </span>
                      );
                    })}
                  </div>
                  <div className="text-brand flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {language === 'en' ? 'View case' : '查看案例'} <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}

        {allProducts.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-6">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <Package size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-black">{t('products.noProducts')}</h3>
              <p className="text-gray-500">{t('products.working')}</p>
            </div>
          </div>
        )}
      </div>

      <section className="pt-20">
        <GlassCard className="bg-brand border-none text-white p-12 overflow-visible relative rounded-[2.5rem]">
          <div className="relative z-10 grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold">{allProducts.length}</div>
              <div className="text-white/70 text-sm font-medium uppercase tracking-widest">{t('products.stat.total')}</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">Script-first</div>
              <div className="text-white/70 text-sm font-medium uppercase tracking-widest">{t('products.stat.success')}</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">A-grade</div>
              <div className="text-white/70 text-sm font-medium uppercase tracking-widest">{t('products.stat.rating')}</div>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
