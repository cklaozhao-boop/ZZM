import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, TrendingUp, ShieldCheck, Cpu, Workflow, Package } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import SubscriptionForm from '@/src/components/SubscriptionForm';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-brand/10 to-transparent rounded-full blur-3xl -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 rounded-full text-sm font-medium text-brand backdrop-blur-sm border border-brand/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            {t('hero.status')}
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-black leading-[1.1]">
            {t('hero.title')} <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-dark">
              {t('hero.subtitle')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button className="px-8 py-4 bg-brand text-white rounded-full font-semibold text-lg hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 flex items-center gap-2 group">
              {t('hero.cta.explore')}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="px-8 py-4 bg-white text-black border border-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all">
              {t('hero.cta.logs')}
            </button>
          </div>
        </motion.div>
      </section>

      {/* How it Works */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight text-black">{t('home.howItWorks')}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('home.howItWorks.desc')}
            </p>
            
            <div className="space-y-6">
              <FeatureItem 
                icon={<Cpu className="text-brand" />}
                title={t('home.feature.ai')}
                description={t('home.feature.ai.desc')}
              />
              <FeatureItem 
                icon={<Workflow className="text-brand" />}
                title={t('home.feature.collab')}
                description={t('home.feature.collab.desc')}
              />
              <FeatureItem 
                icon={<ShieldCheck className="text-brand" />}
                title={t('home.feature.iter')}
                description={t('home.feature.iter.desc')}
              />
            </div>
          </div>
          
          <GlassCard className="aspect-square flex items-center justify-center bg-gradient-to-br from-brand/5 to-brand/10 border-none">
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-64 h-64 border-2 border-dashed border-brand/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-48 h-48 border-2 border-dashed border-brand/10 rounded-full"
              />
              <div className="z-10 bg-white p-8 rounded-3xl shadow-2xl border border-white/50">
                <Cpu size={64} className="text-brand" />
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Revenue Section */}
      <section className="px-6 py-24 bg-brand text-white rounded-[4rem] mx-6 shadow-2xl shadow-brand/20">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t('home.revenue.title')}</h2>
            <p className="text-brand-light max-w-2xl mx-auto text-lg">
              {t('home.revenue.desc')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <StatCard 
              icon={<TrendingUp className="text-white" />}
              value="$12,450"
              label={t('home.stat.revenue')}
            />
            <StatCard 
              icon={<Zap className="text-white" />}
              value="24/7"
              label={t('home.stat.ops')}
            />
            <StatCard 
              icon={<Package className="text-white" />}
              value="18"
              label={t('home.stat.launches')}
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight text-black">{t('home.newsletter.title')}</h2>
          <p className="text-gray-500 text-lg">
            {t('home.newsletter.desc')}
          </p>
        </div>
        <SubscriptionForm />
      </section>
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 p-2 bg-white shadow-sm rounded-xl border border-gray-100">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-black">{title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="p-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl space-y-4">
      <div className="flex justify-center">{icon}</div>
      <div className="text-4xl font-bold">{value}</div>
      <div className="text-brand-light font-medium uppercase tracking-widest text-xs">{label}</div>
    </div>
  );
}
