import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, CreditCard, CheckCircle2, Users, ShieldCheck, Code, Palette, Megaphone, Search } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import { db, doc, getDoc } from '@/src/firebase';
import { Product } from '@/src/types';
import { useLanguage } from '../context/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  'Architect': <ShieldCheck size={16} className="text-brand" />,
  'Builder': <Code size={16} className="text-brand" />,
  'Visionary': <Palette size={16} className="text-brand" />,
  'Growth': <Megaphone size={16} className="text-brand" />,
  'Analyst': <Search size={16} className="text-brand" />,
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand/10 border-t-brand rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-32 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button onClick={() => navigate('/products')} className="mt-4 text-brand flex items-center gap-2 mx-auto">
          <ArrowLeft size={20} /> Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 max-w-6xl mx-auto space-y-12">
      <button onClick={() => navigate('/products')} className="text-gray-500 hover:text-brand flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} /> {language === 'en' ? 'Back to Products' : '返回产品列表'}
      </button>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-brand/10">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white">{product.name}</h1>
                <p className="text-white/80 mt-2">{product.description}</p>
              </div>
              <div className="text-3xl font-bold text-white">${product.price}</div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black">{language === 'en' ? 'Overview' : '产品概览'}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.longDescription || product.description}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black">{language === 'en' ? 'Key Features' : '核心功能'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.features?.map((feature) => (
                <div key={feature} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <CheckCircle2 className="text-brand shrink-0" size={20} />
                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8 sticky top-32"
        >
          <GlassCard className="p-8 space-y-8 border-brand/10">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-black">{language === 'en' ? 'Purchase Product' : '购买产品'}</h3>
              <p className="text-gray-500 text-sm">
                {language === 'en' 
                  ? 'Get instant access to the product and all future updates.' 
                  : '立即获取产品访问权限及所有未来更新。'}
              </p>
            </div>

            <div className="flex items-center justify-between p-6 bg-brand/5 rounded-3xl border border-brand/10">
              <div className="text-brand font-bold text-4xl">${product.price}</div>
              <div className="text-xs font-bold text-brand uppercase tracking-widest">One-time Payment</div>
            </div>

            <div className="space-y-4">
              <a 
                href={product.paymentLink}
                className="w-full py-4 bg-brand text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
              >
                <CreditCard size={20} />
                {language === 'en' ? 'Buy Now' : '立即购买'}
              </a>
              <a 
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-white border border-brand/20 text-brand rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand/5 transition-all"
              >
                <ExternalLink size={20} />
                {language === 'en' ? 'Live Demo' : '在线演示'}
              </a>
            </div>

            <div className="pt-8 border-t border-gray-100 space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Users size={14} />
                {language === 'en' ? 'Built by Agents' : '由智能体构建'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.agentsInvolved.map((agentName) => (
                  <div key={agentName} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-xs font-medium text-gray-600">
                    {iconMap[agentName] || <ShieldCheck size={14} />}
                    {agentName}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
