import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Cpu, Package, ShieldCheck, TrendingUp, Workflow, Zap } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import SubscriptionForm from '@/src/components/SubscriptionForm';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="space-y-32 pb-32">
      <section className="relative overflow-hidden px-6 pt-32 pb-20 text-center">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand/10 to-transparent blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-4xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/10 bg-brand/5 px-4 py-1.5 text-sm font-medium text-brand backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            {t('hero.status')}
          </div>

          <h1 className="text-6xl font-bold leading-[1.1] tracking-tight text-black md:text-8xl">
            {t('hero.title')} <br />
            <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
              {t('hero.subtitle')}
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-gray-500 md:text-2xl">
            {t('hero.description')}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <Link
              to="/agents"
              className="group flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-brand/20 transition-all hover:bg-brand-dark"
            >
              {t('hero.cta.explore')}
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </Link>
            <Link
              to="/daily-review"
              className="rounded-full border border-gray-200 bg-white px-8 py-4 text-lg font-semibold text-black transition-all hover:bg-gray-50"
            >
              {t('hero.cta.logs')}
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight text-black">{t('home.howItWorks')}</h2>
            <p className="text-lg leading-relaxed text-gray-600">
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

          <GlassCard className="flex aspect-square items-center justify-center border-none bg-gradient-to-br from-brand/5 to-brand/10">
            <div className="relative flex h-full w-full items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute h-64 w-64 rounded-full border-2 border-dashed border-brand/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute h-48 w-48 rounded-full border-2 border-dashed border-brand/10"
              />
              <div className="z-10 rounded-3xl border border-white/50 bg-white p-8 shadow-2xl">
                <Cpu size={64} className="text-brand" />
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="mx-6 rounded-[4rem] bg-brand px-6 py-24 text-white shadow-2xl shadow-brand/20">
        <div className="mx-auto max-w-7xl space-y-16 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{t('home.revenue.title')}</h2>
            <p className="mx-auto max-w-2xl text-lg text-brand-light">
              {t('home.revenue.desc')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <StatCard icon={<TrendingUp className="text-white" />} value="$12,450" label={t('home.stat.revenue')} />
            <StatCard icon={<Zap className="text-white" />} value="24/7" label={t('home.stat.ops')} />
            <StatCard icon={<Package className="text-white" />} value="18" label={t('home.stat.launches')} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-12 px-6 text-center">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight text-black">{t('home.newsletter.title')}</h2>
          <p className="text-lg text-gray-500">
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
      <div className="mt-1 rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-black">{title}</h4>
        <p className="text-sm leading-relaxed text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="space-y-4 rounded-3xl border border-white/20 bg-white/10 p-10 backdrop-blur-sm">
      <div className="flex justify-center">{icon}</div>
      <div className="text-4xl font-bold">{value}</div>
      <div className="text-xs font-medium uppercase tracking-widest text-brand-light">{label}</div>
    </div>
  );
}
