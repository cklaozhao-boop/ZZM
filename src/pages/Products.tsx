import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Package, ExternalLink, Users, TrendingUp, Globe, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/src/components/GlassCard';
import { db, collection, onSnapshot, query, orderBy } from '@/src/firebase';
import { Product } from '@/src/types';
import { useLanguage } from '../context/LanguageContext';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="pt-32 pb-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand/10 border-t-brand rounded-full animate-spin" />
      </div>
    );
  }

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
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          {t('products.desc')}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/products/${product.id}`)}
            className="cursor-pointer group"
          >
            <GlassCard delay={index * 0.1} className="p-0 flex flex-col h-full overflow-hidden border-brand/5 group-hover:border-brand/30 transition-all">
              <div className="aspect-video w-full bg-gray-100 overflow-hidden relative">
                <img 
                  src={product.image || `https://picsum.photos/seed/${product.name}/800/450`} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-brand shadow-sm">
                  {product.category}
                </div>
              </div>
              
              <div className="p-8 space-y-6 flex-1 flex flex-col">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-black group-hover:text-brand transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded-full text-xs font-bold">
                      <Star size={12} fill="currentColor" />
                      4.9
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-brand font-medium text-xs">
                    <Globe size={12} />
                    {product.link ? new URL(product.link).hostname : 'openclaw.ai'}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm pt-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 mt-auto space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <Users size={14} />
                        {t('products.agents')}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.agentsInvolved.slice(0, 3).map((agent) => (
                          <span key={agent} className="px-3 py-1 bg-brand/5 border border-brand/10 rounded-full text-xs font-medium text-brand">
                            {agent}
                          </span>
                        ))}
                        {product.agentsInvolved.length > 3 && (
                          <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-medium text-gray-400">
                            +{product.agentsInvolved.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-brand font-bold">
                        <TrendingUp size={16} />
                        <span className="text-lg">${product.price}</span>
                      </div>
                      <div className="text-brand flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {language === 'en' ? 'View Details' : '查看详情'} <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}

        {products.length === 0 && (
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

      {/* Product Stats */}
      <section className="pt-20">
        <GlassCard className="bg-brand border-none text-white p-12 overflow-visible relative rounded-[2.5rem]">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-light/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold">18</div>
              <div className="text-white/70 text-sm font-medium uppercase tracking-widest">{t('products.stat.total')}</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">94%</div>
              <div className="text-white/70 text-sm font-medium uppercase tracking-widest">{t('products.stat.success')}</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">4.8/5</div>
              <div className="text-white/70 text-sm font-medium uppercase tracking-widest">{t('products.stat.rating')}</div>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
