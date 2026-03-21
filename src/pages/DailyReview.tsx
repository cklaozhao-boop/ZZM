import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Calendar, TrendingUp, CheckCircle2, ChevronRight, Coins, MessageSquare } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import GlassCard from '@/src/components/GlassCard';
import CommentSection from '@/src/components/CommentSection';
import { useLanguage } from '../context/LanguageContext';
import { allDailyLogs, getLogById, localize } from '../lib/content';
import type { DailyLog } from '../types';

export default function DailyReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [selectedLog, setSelectedLog] = useState<DailyLog | null>(getLogById(id) || allDailyLogs[0] || null);

  useEffect(() => {
    setSelectedLog(getLogById(id) || allDailyLogs[0] || null);
  }, [id]);

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto space-y-20">
      <header className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 rounded-full text-sm font-medium text-brand border border-brand/10"
        >
          <Calendar size={16} />
          {t('logs.ops')}
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black">{t('logs.title')}</h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">{t('logs.desc')}</p>
      </header>

      <div className="grid lg:grid-cols-[350px_1fr] gap-12">
        <aside className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-4">
            {t('logs.recent')}
          </h3>
          <div className="space-y-2">
            {allDailyLogs.map((log) => (
              <button
                key={log.id}
                onClick={() => {
                  setSelectedLog(log);
                  navigate(`/daily-review/${log.id}`);
                }}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between group ${
                  selectedLog?.id === log.id
                    ? 'bg-brand text-white shadow-xl shadow-brand/10'
                    : 'bg-white/50 hover:bg-white text-gray-600 border border-transparent hover:border-brand/10'
                }`}
              >
                <div className="space-y-1">
                  <div className="text-sm font-semibold">{log.date}</div>
                  <div className={`text-xs ${selectedLog?.id === log.id ? 'text-white/70' : 'text-brand'}`}>
                    ${log.revenueGenerated.toLocaleString()} / {Math.round(log.tokenCost / 1000)}k tokens
                  </div>
                </div>
                <ChevronRight size={18} className={`transition-transform ${selectedLog?.id === log.id ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
              </button>
            ))}
            {allDailyLogs.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-sm italic border border-dashed border-gray-200 rounded-2xl">
                {t('logs.noLogs')}
              </div>
            )}
          </div>
        </aside>

        <main>
          <AnimatePresence mode="wait">
            {selectedLog ? (
              <motion.div
                key={selectedLog.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <GlassCard className="space-y-10 border-brand/5">
                  <div className="space-y-4 border-b border-gray-100 pb-8">
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand">{selectedLog.date}</div>
                    <h2 className="text-4xl font-bold text-black">{localize(selectedLog.title, language)}</h2>
                    <p className="text-lg leading-relaxed text-gray-500">{localize(selectedLog.summary, language)}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="inline-flex items-center gap-2 rounded-full bg-brand/5 px-3 py-1 text-brand font-medium">
                        <TrendingUp size={14} />
                        ${selectedLog.revenueGenerated.toLocaleString()}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-gray-600 font-medium">
                        <Coins size={14} />
                        {selectedLog.tokenCost.toLocaleString()} tokens
                      </span>
                    </div>
                  </div>

                  <LogSection title={language === 'en' ? 'What we did' : '今日做了什么'} items={selectedLog.whatWeDid.map((item) => localize(item, language))} />
                  <LogSection title={language === 'en' ? 'Difficulties' : '遇到了哪些困难'} items={selectedLog.difficulties.map((item) => localize(item, language))} />
                  <LogSection title={language === 'en' ? 'Solutions' : '如何解决'} items={selectedLog.solutions.map((item) => localize(item, language))} />

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-black">{language === 'en' ? 'Outputs' : '最终产出'}</h3>
                    <ul className="grid gap-4 md:grid-cols-2">
                      {selectedLog.outputs.map((item) => (
                        <li key={item.zh} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
                          <CheckCircle2 className="text-brand shrink-0 mt-0.5" size={16} />
                          {localize(item, language)}
                        </li>
                      ))}
                    </ul>
                  </section>
                </GlassCard>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-black flex items-center gap-2">
                    <MessageSquare className="text-brand" size={24} />
                    {t('comments.title')}
                  </h3>
                  <CommentSection logId={selectedLog.id} />
                </div>
              </motion.div>
            ) : (
              <div className="h-[400px] flex items-center justify-center text-gray-400 italic">{t('logs.select')}</div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function LogSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold text-black">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm leading-relaxed text-gray-600">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
