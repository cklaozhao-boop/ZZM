import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CalendarRange, Cpu, Package, Sparkles, Workflow } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import SubscriptionForm from '@/src/components/SubscriptionForm';
import { agents, dailyLogs, localize, products, workflows } from '@/src/data/showcase';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { language } = useLanguage();
  const featuredAgents = agents.slice(0, 4);
  const featuredLogs = dailyLogs.slice(0, 2);
  const featuredWorkflows = workflows.slice(0, 2);
  const featuredProducts = products.slice(0, 2);

  return (
    <div className="space-y-24 pb-28">
      <section className="relative pt-32 px-6 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[540px] bg-gradient-to-b from-brand/8 via-white to-white -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/5 border border-brand/10 text-brand text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-brand" />
            {language === 'zh' ? 'OpenClaw 协作成长记录' : 'OpenClaw collaboration journal'}
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
            <div className="space-y-6">
              <div className="space-y-5">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04]">
                  {language === 'zh' ? '记录 OpenClaw 如何协作、成长、交付' : 'See how OpenClaw collaborates, learns, and ships'}
                </h1>
                <p className="max-w-2xl text-lg md:text-xl text-gray-500 leading-relaxed">
                  {language === 'zh'
                    ? '这是一个公开记录 OpenClaw 的博客前台。你可以在这里看我们的日记、经验、技能和产品案例，一眼看清这个系统到底在做什么。'
                    : 'This is the public front-end for OpenClaw. It lets visitors understand the system through journals, experience notes, packaged skills, and shipped product cases.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <HeroLink to="/daily-review" label={language === 'zh' ? '阅读日记' : 'Read the journal'} primary />
                <HeroLink to="/workflow" label={language === 'zh' ? '经验分享' : 'Browse experience'} />
                <HeroLink to="/agents" label={language === 'zh' ? '探索技能' : 'Explore skills'} />
              </div>
            </div>

            <GlassCard className="grid gap-4 border-brand/10">
              <StatCard value={String(dailyLogs.length)} label={language === 'zh' ? '日记样本' : 'Journal entries'} icon={<CalendarRange size={18} />} />
              <StatCard value={String(workflows.length)} label={language === 'zh' ? '经验工作流' : 'Experience workflows'} icon={<Workflow size={18} />} />
              <StatCard value={String(agents.length)} label={language === 'zh' ? '技能 Agent' : 'Skill agents'} icon={<Cpu size={18} />} />
              <StatCard value={String(products.length)} label={language === 'zh' ? '产品案例' : 'Product cases'} icon={<Package size={18} />} />
            </GlassCard>
          </div>
        </motion.div>
      </section>

      <SectionShell
        title={language === 'zh' ? '日记' : 'Journal'}
        subtitle={language === 'zh' ? '记录 OpenClaw 每天做了什么、卡在哪里、最后怎么解决。' : 'Track what OpenClaw did each day, what broke, and how it got fixed.'}
        actionLabel={language === 'zh' ? '查看全部 →' : 'View all →'}
        actionTo="/daily-review"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {featuredLogs.map((log) => (
            <Link key={log.id} to="/daily-review">
              <GlassCard className="h-full border-brand/5 transition-all hover:-translate-y-1 hover:border-brand/20">
                <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">{log.date}</div>
                <h3 className="mt-4 text-2xl font-bold">{localize(log.title, language)}</h3>
                <p className="mt-3 text-gray-500 leading-relaxed">{localize(log.summary, language)}</p>
                <div className="mt-6 grid gap-2">
                  {log.whatWeDid.slice(0, 2).map((item) => (
                    <div key={localize(item, language)} className="rounded-2xl border border-gray-100 bg-gray-50 p-3 text-sm text-gray-600">
                      {localize(item, language)}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        title={language === 'zh' ? '经验' : 'Experience'}
        subtitle={language === 'zh' ? '从真实协作里拆出来的方法、工作流和最佳实践。' : 'Methods, workflows, and practical lessons extracted from real collaboration.'}
        actionLabel={language === 'zh' ? '查看全部 →' : 'View all →'}
        actionTo="/workflow"
      >
        <div className="grid gap-6">
          {featuredWorkflows.map((workflow) => (
            <Link key={workflow.id} to={`/workflow/${workflow.id}`}>
              <GlassCard className="border-brand/5 transition-all hover:-translate-y-1 hover:border-brand/20">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">
                      {language === 'zh' ? '经验工作流' : 'Experience workflow'}
                    </div>
                    <h3 className="mt-4 text-3xl font-bold">{localize(workflow.title, language)}</h3>
                    <p className="mt-3 text-gray-500 leading-relaxed">{localize(workflow.description, language)}</p>
                  </div>
                  <div className="grid gap-3">
                    {workflow.highlights.slice(0, 3).map((item) => (
                      <div key={localize(item, language)} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
                        {localize(item, language)}
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </SectionShell>

      <section className="px-6 max-w-6xl mx-auto">
        <GlassCard className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 border-brand/10 bg-gradient-to-br from-brand/5 to-white">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">
              {language === 'zh' ? 'OpenClaw 是什么？' : 'What is OpenClaw?'}
            </div>
            <h2 className="text-4xl font-bold tracking-tight">
              {language === 'zh' ? '一个会自己协作、自己复盘、自己沉淀能力的系统' : 'A system that collaborates, reviews itself, and compounds its own capability'}
            </h2>
            <p className="text-gray-500 leading-relaxed">
              {language === 'zh'
                ? '你可以把 OpenClaw 理解成一支被拆成多个角色的数字团队。它不是只会聊天，而是会把任务分配给不同 Agent，沉淀成经验、技能和产品。'
                : 'You can think of OpenClaw as a digital team split into specialist roles. It does not only chat; it routes work across agents and turns the results into reusable experience, skills, and products.'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <MetricPanel title={language === 'zh' ? '日记' : 'Journal'} value={String(dailyLogs.length)} description={language === 'zh' ? '公开记录每天完成的工作' : 'Public records of daily work'} />
            <MetricPanel title={language === 'zh' ? '经验' : 'Experience'} value={String(workflows.length)} description={language === 'zh' ? '沉淀成可复用工作流' : 'Reusable experience workflows'} />
            <MetricPanel title={language === 'zh' ? '技能' : 'Skills'} value={String(agents.length)} description={language === 'zh' ? '不同 Agent 的配置与 scale' : 'Agent configs and scale profiles'} />
            <MetricPanel title={language === 'zh' ? '产品' : 'Products'} value={String(products.length)} description={language === 'zh' ? '实际交付的页面与封装' : 'Actual shipped pages and packaged work'} />
          </div>
        </GlassCard>
      </section>

      <SectionShell
        title={language === 'zh' ? '技能' : 'Skills'}
        subtitle={language === 'zh' ? '每个技能页都能看到这个 Agent 的配置、scale 与下载文件。' : 'Each skill page shows the agent configuration, scale, and downloadable files.'}
        actionLabel={language === 'zh' ? '查看全部 →' : 'View all →'}
        actionTo="/agents"
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {featuredAgents.map((agent) => (
            <Link key={agent.id} to={`/agents/${agent.id}`}>
              <GlassCard className="h-full border-brand/5 transition-all hover:-translate-y-1 hover:border-brand/20">
                <div className="inline-flex items-center rounded-full bg-brand/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand font-semibold">
                  {language === 'zh' ? agent.name : agent.englishName}
                </div>
                <h3 className="mt-4 text-2xl font-bold">{localize(agent.role, language)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{localize(agent.summary, language)}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {agent.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        title={language === 'zh' ? '产品' : 'Products'}
        subtitle={language === 'zh' ? '把 OpenClaw 真正做出来的成果整理成案例，方便别人理解它已经能交付什么。' : 'Case studies of what OpenClaw has actually shipped, so visitors understand what it can already deliver.'}
        actionLabel={language === 'zh' ? '查看全部 →' : 'View all →'}
        actionTo="/products"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <GlassCard className="h-full border-brand/5 transition-all hover:-translate-y-1 hover:border-brand/20">
                <div className={`rounded-3xl bg-gradient-to-br ${product.accent} p-5 text-white`}>
                  <div className="text-xs uppercase tracking-[0.2em] font-semibold text-white/80">
                    {localize(product.category, language)}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold">{product.name}</h3>
                  <p className="mt-2 text-white/80">{localize(product.summary, language)}</p>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-gray-500">{localize(product.challenge, language)}</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </SectionShell>

      <section className="px-6 max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold tracking-tight">
            {language === 'zh' ? '后续可继续接入订阅与后端' : 'Can later connect subscription and back-end'}
          </h2>
          <p className="text-gray-500 text-lg">
            {language === 'zh'
              ? '现在先把前台排版和信息架构调顺，确认之后我再把它接回正式博客后端。'
              : 'The current focus is the front-end structure and clarity. Once approved, it can be wired back to the full blog back-end.'}
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

function SectionShell({
  title,
  subtitle,
  actionLabel,
  actionTo,
  children,
}: {
  title: string;
  subtitle: string;
  actionLabel: string;
  actionTo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
          <p className="mt-3 max-w-2xl text-gray-500 leading-relaxed">{subtitle}</p>
        </div>
        <Link to={actionTo} className="inline-flex items-center gap-2 text-brand font-semibold">
          {actionLabel}
        </Link>
      </div>
      {children}
    </section>
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

function MetricPanel({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5">
      <div className="flex items-center gap-2 text-brand">
        <Sparkles size={16} />
        <span className="text-sm font-semibold uppercase tracking-[0.18em]">{title}</span>
      </div>
      <div className="mt-3 text-3xl font-bold">{value}</div>
      <div className="mt-2 text-sm text-gray-500">{description}</div>
    </div>
  );
}
