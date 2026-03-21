import React, { useMemo, useState } from 'react';
import { CalendarRange, CheckCircle2, CircleAlert, Lightbulb, ReceiptText } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import { dailyLogs, getAgentLabel, localize } from '@/src/data/showcase';
import { useLanguage } from '../context/LanguageContext';

export default function DailyReview() {
  const { language } = useLanguage();
  const [selectedId, setSelectedId] = useState(dailyLogs[0]?.id ?? '');
  const selectedLog = useMemo(
    () => dailyLogs.find((log) => log.id === selectedId) ?? dailyLogs[0],
    [selectedId],
  );

  if (!selectedLog) return null;

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto space-y-12">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">
          {language === 'zh' ? '日记' : 'Journal'}
        </p>
        <h1 className="text-5xl font-bold tracking-tight">
          {language === 'zh' ? 'OpenClaw 的成长日记' : 'OpenClaw growth journal'}
        </h1>
        <p className="text-xl text-gray-500">
          {language === 'zh'
            ? '每天工作结束后，我们会记录今天做了什么、遇到了什么问题，以及最后是怎么解决的。'
            : 'At the end of each day, we record what got done, what went wrong, and how the problems were solved.'}
        </p>
      </header>

      <div className="grid lg:grid-cols-[320px_1fr] gap-8">
        <aside className="space-y-3">
          {dailyLogs.map((log) => (
            <button
              key={log.id}
              onClick={() => setSelectedId(log.id)}
              className={`w-full rounded-3xl border p-5 text-left transition-all ${
                selectedId === log.id
                  ? 'border-brand/20 bg-brand text-white shadow-xl shadow-brand/10'
                  : 'border-gray-100 bg-white hover:border-brand/15'
              }`}
            >
              <div className={`text-xs uppercase tracking-[0.2em] font-semibold ${selectedId === log.id ? 'text-white/70' : 'text-brand'}`}>
                {log.date}
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                {localize(log.title, language)}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${selectedId === log.id ? 'text-white/80' : 'text-gray-500'}`}>
                {localize(log.summary, language)}
              </p>
            </button>
          ))}
        </aside>

        <main className="space-y-8">
          <GlassCard className="border-brand/10 bg-gradient-to-br from-brand/5 to-white">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-brand font-semibold uppercase tracking-[0.2em]">
                  <CalendarRange size={16} />
                  {selectedLog.date}
                </div>
                <h2 className="mt-3 text-4xl font-bold tracking-tight">{localize(selectedLog.title, language)}</h2>
                <p className="mt-4 max-w-3xl text-gray-500 leading-relaxed">{localize(selectedLog.summary, language)}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 min-w-[280px]">
                <TopMetric label={language === 'zh' ? 'Token 消耗' : 'Token cost'} value={selectedLog.tokenCost} />
                <TopMetric label={language === 'zh' ? '经营影响' : 'Revenue impact'} value={selectedLog.revenueImpact} />
              </div>
            </div>
          </GlassCard>

          <div className="grid md:grid-cols-2 gap-6">
            <LogPanel
              icon={<CheckCircle2 className="text-brand" size={18} />}
              title={language === 'zh' ? '今日我们做了什么' : 'What we did today'}
              items={selectedLog.whatWeDid.map((item) => localize(item, language))}
            />
            <LogPanel
              icon={<CircleAlert className="text-brand" size={18} />}
              title={language === 'zh' ? '遇到了哪些困难' : 'What difficulties we hit'}
              items={selectedLog.challenges.map((item) => localize(item, language))}
            />
            <LogPanel
              icon={<Lightbulb className="text-brand" size={18} />}
              title={language === 'zh' ? '如何解决的' : 'How we solved them'}
              items={selectedLog.solutions.map((item) => localize(item, language))}
            />
            <LogPanel
              icon={<ReceiptText className="text-brand" size={18} />}
              title={language === 'zh' ? '输出成果' : 'Outcomes'}
              items={selectedLog.outcomes.map((item) => localize(item, language))}
            />
          </div>

          <GlassCard className="border-brand/5">
            <h3 className="text-2xl font-bold">
              {language === 'zh' ? '这篇日志涉及到的 Agent' : 'Agents involved in this log'}
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {selectedLog.agentsInvolved.map((agentId) => (
                <span key={agentId} className="rounded-full border border-brand/10 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
                  {getAgentLabel(agentId, language)}
                </span>
              ))}
            </div>
          </GlassCard>
        </main>
      </div>
    </div>
  );
}

function TopMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">{label}</div>
      <div className="mt-2 text-sm font-semibold text-gray-800">{value}</div>
    </div>
  );
}

function LogPanel({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <GlassCard className="border-brand/5">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
            {item}
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
