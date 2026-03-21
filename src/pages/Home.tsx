import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Cpu, Package, ShieldCheck, TrendingUp, Workflow, Zap } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import SubscriptionForm from '@/src/components/SubscriptionForm';
import { useLanguage } from '../context/LanguageContext';
import { allAgents, allDailyLogs, allProducts, allWorkflows, localize, site } from '../lib/content';

export default function Home() {
  const { language, t } = useLanguage();
  const latestLog = allDailyLogs[0];

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
            {localize(site.heroBadge, language)}
          </div>

          <h1 className="text-6xl font-bold leading-[1.1] tracking-tight text-black md:text-8xl">
            {localize(site.heroTitle, language)} <br />
            <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
              {localize(site.heroHighlight, language)}
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-xl font-light leading-relaxed text-gray-500 md:text-2xl">
            {localize(site.heroDescription, language)}
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
            <h2 className="text-4xl font-bold tracking-tight text-black">{localize(site.overviewTitle, language)}</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              {localize(site.overviewDescription, language)}
            </p>

            <div className="space-y-6">
              <FeatureItem
                icon={<Cpu className="text-brand" />}
                title={localize(site.features[0].title, language)}
                description={localize(site.features[0].description, language)}
              />
              <FeatureItem
                icon={<Workflow className="text-brand" />}
                title={localize(site.features[1].title, language)}
                description={localize(site.features[1].description, language)}
              />
              <FeatureItem
                icon={<ShieldCheck className="text-brand" />}
                title={localize(site.features[2].title, language)}
                description={localize(site.features[2].description, language)}
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
              <div className="z-10 space-y-3 rounded-3xl border border-white/50 bg-white p-8 text-center shadow-2xl">
                <Cpu size={52} className="mx-auto text-brand" />
                <div className="text-2xl font-bold text-black">{site.brandName}</div>
                <div className="max-w-[220px] text-sm leading-relaxed text-gray-500">
                  {localize(site.brandSubtitle, language)}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="mx-6 rounded-[4rem] bg-brand px-6 py-24 text-white shadow-2xl shadow-brand/20">
        <div className="mx-auto max-w-7xl space-y-16 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{localize(site.metricsTitle, language)}</h2>
            <p className="mx-auto max-w-2xl text-lg text-brand-light">
              {localize(site.metricsDescription, language)}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {site.metrics.map((metric, index) => (
              <div key={metric.value}>
                <StatCard
                  icon={index === 0 ? <TrendingUp className="text-white" /> : index === 1 ? <Zap className="text-white" /> : <Package className="text-white" />}
                  value={metric.value}
                  label={localize(metric.label, language)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
              {language === 'en' ? 'Current surface' : '当前看板'}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-black">
              {language === 'en' ? 'Visitors can immediately inspect the whole operating system' : '访客现在可以直接查看整套运营系统'}
            </h2>
          </div>
          {latestLog && (
            <Link to="/daily-review" className="text-sm font-medium text-brand transition-colors hover:text-brand-dark">
              {language === 'en' ? 'Latest journal' : '最新日志'}: {localize(latestLog.title, language)}
            </Link>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <PreviewCard
            title={language === 'en' ? 'Agents' : '智能体'}
            value={String(allAgents.length)}
            description={language === 'en' ? 'Each one includes config, scale, and delivery notes.' : '每个条目都带有配置、Scale 和交付说明。'}
            href="/agents"
          />
          <PreviewCard
            title={language === 'en' ? 'Workflows' : '工作流'}
            value={String(allWorkflows.length)}
            description={language === 'en' ? 'Detailed collaboration flows with input/output demos.' : '每个流程都有协作图、输入输出演示和实现说明。'}
            href="/workflow"
          />
          <PreviewCard
            title={language === 'en' ? 'Products' : '产品'}
            value={String(allProducts.length)}
            description={language === 'en' ? 'Real deliverables framed as sellable cases.' : '真实交付物被整理成可销售的案例页。'}
            href="/products"
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-12 px-6 text-center">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight text-black">{localize(site.newsletterTitle, language)}</h2>
          <p className="text-lg text-gray-500">
            {localize(site.newsletterDescription, language)}
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

function PreviewCard({ title, value, description, href }: { title: string; value: string; description: string; href: string }) {
  return (
    <GlassCard className="space-y-4 border-brand/5">
      <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand">{title}</div>
      <div className="text-4xl font-bold text-black">{value}</div>
      <p className="text-sm leading-relaxed text-gray-500">{description}</p>
      <Link to={href} className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand-dark">
        Explore
        <ArrowRight size={16} />
      </Link>
    </GlassCard>
  );
}
