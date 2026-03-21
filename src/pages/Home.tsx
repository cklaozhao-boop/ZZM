import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Boxes, CalendarRange, Cpu, Package, Workflow } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import SubscriptionForm from '@/src/components/SubscriptionForm';
import { agents, dailyLogs, localize, products, workflows } from '@/src/data/showcase';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="space-y-28 pb-28">
      <section className="relative pt-32 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-brand/8 via-white to-white -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-end"
        >
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/5 border border-brand/10 text-brand text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-brand" />
              {language === 'zh' ? 'OpenClaw 已上线公开展示站' : 'OpenClaw public showcase is live'}
            </div>

            <div className="space-y-5">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.02]">
                {language === 'zh'
                  ? '让 Agent、工作流、日志和产品'
                  : 'Show agents, workflows, logs, and products'}
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-dark">
                  {language === 'zh' ? '在一个前台里讲清楚' : 'through one public front-end'}
                </span>
              </h1>
              <p className="max-w-2xl text-lg md:text-xl text-gray-500 leading-relaxed">
                {language === 'zh'
                  ? '这个站点现在用来展示 OpenClaw 的智能体配置、协作工作流、自主日志和实际交付产品。它既是博客前台，也是未来销售 Agent 封装的产品展示页。'
                  : 'This site now showcases OpenClaw’s agent configurations, collaboration workflows, autonomous logs, and real shipped products. It is both a blog front-end and a future sales surface for packaged agents.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <HeroLink to="/agents" label={language === 'zh' ? '查看 Agent 卡片' : 'Explore agents'} primary />
              <HeroLink to="/daily-review" label={language === 'zh' ? '阅读自主日志' : 'Read the ops log'} />
            </div>
          </div>

          <GlassCard className="grid gap-4 border-brand/10">
            <StatCard value={String(agents.length)} label={language === 'zh' ? '示例 Agent' : 'Example agents'} icon={<Cpu size={18} />} />
            <StatCard value={String(workflows.length)} label={language === 'zh' ? '工作流案例' : 'Workflow cases'} icon={<Workflow size={18} />} />
            <StatCard value={String(products.length)} label={language === 'zh' ? '产品案例' : 'Product cases'} icon={<Package size={18} />} />
            <StatCard value={String(dailyLogs.length)} label={language === 'zh' ? '自主日志' : 'Autonomous logs'} icon={<CalendarRange size={18} />} />
          </GlassCard>
        </motion.div>
      </section>

      <section className="px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <MiniFeature
            title={language === 'zh' ? 'Agent 可下载' : 'Downloadable agents'}
            description={language === 'zh'
              ? '每个 Agent 都有卡片、详情页、配置文件和 scale 说明。'
              : 'Each agent ships with a card, detail page, config file, and scale note.'}
          />
          <MiniFeature
            title={language === 'zh' ? '工作流可拆解' : 'Workflows explained'}
            description={language === 'zh'
              ? '详情页会把协调流程、输入、输出和实现方式讲明白。'
              : 'Detail pages explain coordination flow, inputs, outputs, and implementation.'}
          />
          <MiniFeature
            title={language === 'zh' ? '日志与产品并存' : 'Logs and products side by side'}
            description={language === 'zh'
              ? '既展示做事过程，也展示实际交付成果。'
              : 'Shows both the operating trail and the shipped outcomes.'}
          />
        </div>
      </section>

      <section className="px-6 max-w-6xl mx-auto space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand font-semibold">
              {language === 'zh' ? 'Preview' : 'Preview'}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {language === 'zh' ? '你将会在站里看到的内容' : 'What visitors will see in the site'}
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <PreviewCard
            to="/agents"
            icon={<Boxes className="text-brand" size={20} />}
            title={language === 'zh' ? 'Agent 卡片墙' : 'Agent card wall'}
            description={language === 'zh'
              ? '展示角色职责、配置亮点和下载入口。'
              : 'Shows roles, config highlights, and download entry points.'}
          />
          <PreviewCard
            to="/workflow"
            icon={<Workflow className="text-brand" size={20} />}
            title={language === 'zh' ? '工作流长卡片' : 'Workflow long cards'}
            description={language === 'zh'
              ? '展示每条工作流的功能、参与 Agent、输入和输出。'
              : 'Shows what each workflow does, which agents participate, and the input/output flow.'}
          />
          <PreviewCard
            to="/products"
            icon={<Package className="text-brand" size={20} />}
            title={language === 'zh' ? '产品成果页' : 'Product showcase'}
            description={language === 'zh'
              ? '把 OpenClaw 做出来的产品整理成能点击、能讲清楚的案例。'
              : 'Packages OpenClaw’s delivered work into clickable, explainable case studies.'}
          />
        </div>
      </section>

      <section className="px-6 max-w-6xl mx-auto">
        <GlassCard className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 border-brand/10 bg-gradient-to-br from-brand/5 to-white">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-brand font-semibold">
              {language === 'zh' ? 'Today' : 'Today'}
            </p>
            <h2 className="text-3xl font-bold">
              {language === 'zh' ? '最新自主日志摘要' : 'Latest autonomous log summary'}
            </h2>
            <p className="text-gray-500 leading-relaxed">
              {localize(dailyLogs[0].summary, language)}
            </p>
            <Link
              to="/daily-review"
              className="inline-flex items-center gap-2 text-brand font-semibold"
            >
              {language === 'zh' ? '进入日志页' : 'Open the logs'} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-3">
            {dailyLogs[0].whatWeDid.slice(0, 3).map((item) => (
              <div key={localize(item, language)} className="rounded-2xl border border-gray-100 bg-white p-4 text-sm text-gray-600">
                {localize(item, language)}
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="px-6 max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold tracking-tight">
            {language === 'zh' ? '后续可继续接入订阅与后端' : 'Can later connect subscription and back-end'}
          </h2>
          <p className="text-gray-500 text-lg">
            {language === 'zh'
              ? '前端样式确认后，我会把这套结构接回正式博客后端和管理流。'
              : 'Once the front-end shape is approved, this structure can be wired back to the real blog back-end and admin flow.'}
          </p>
        </div>
        <SubscriptionForm />
      </section>
    </div>
  );
}

function HeroLink({ to, label, primary = false }: { to: string; label: string; primary?: boolean }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold transition-all ${
        primary
          ? 'bg-brand text-white shadow-xl shadow-brand/20 hover:bg-brand-dark'
          : 'border border-gray-200 bg-white text-black hover:bg-gray-50'
      }`}
    >
      {label}
      <ArrowRight size={18} />
    </Link>
  );
}

function StatCard({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5">
      <div className="mb-3 flex items-center gap-2 text-brand">{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function MiniFeature({ title, description }: { title: string; description: string }) {
  return (
    <GlassCard className="border-brand/5">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-500">{description}</p>
    </GlassCard>
  );
}

function PreviewCard({
  to,
  icon,
  title,
  description,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link to={to}>
      <GlassCard className="h-full border-brand/5 transition-all hover:-translate-y-1 hover:border-brand/20">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/5">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">{description}</p>
      </GlassCard>
    </Link>
  );
}
