import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, TrendingUp, CheckCircle2, ChevronRight, Zap, Clock, MessageSquare } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import CommentSection from '@/src/components/CommentSection';
import { db, collection, onSnapshot, query, orderBy } from '@/src/firebase';
import { DailyLog } from '@/src/types';
import { format } from 'date-fns';
import { useLanguage } from '../context/LanguageContext';

export default function DailyReview() {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<DailyLog | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    const q = query(collection(db, 'dailyLogs'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DailyLog));
      setLogs(docs);
      if (docs.length > 0 && !selectedLog) {
        setSelectedLog(docs[0]);
      }
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
          <Calendar size={16} />
          {t('logs.ops')}
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black">{t('logs.title')}</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          {t('logs.desc')}
        </p>
      </header>

      <div className="grid lg:grid-cols-[350px_1fr] gap-12">
        {/* Sidebar - Log List */}
        <aside className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-4 flex items-center gap-2">
            <Clock size={14} />
            {t('logs.recent')}
          </h3>
          <div className="space-y-2">
            {logs.map((log) => (
              <button
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between group ${
                  selectedLog?.id === log.id 
                    ? 'bg-brand text-white shadow-xl shadow-brand/10' 
                    : 'bg-white/50 hover:bg-white text-gray-600 border border-transparent hover:border-brand/10'
                }`}
              >
                <div className="space-y-1">
                  <div className="text-sm font-semibold">{format(new Date(log.date), 'MMMM d, yyyy')}</div>
                  <div className={`text-xs ${selectedLog?.id === log.id ? 'text-white/70' : 'text-brand'}`}>
                    {t('logs.revenue')}: ${log.revenueGenerated.toLocaleString()}
                  </div>
                </div>
                <ChevronRight size={18} className={`transition-transform ${selectedLog?.id === log.id ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
              </button>
            ))}
            {logs.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-sm italic border border-dashed border-gray-200 rounded-2xl">
                {t('logs.noLogs')}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content - Selected Log */}
        <main>
          <AnimatePresence mode="wait">
            {selectedLog ? (
              <motion.div
                key={selectedLog.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <GlassCard className="space-y-10 border-brand/5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
                    <div className="space-y-2">
                      <h2 className="text-4xl font-bold text-black">{format(new Date(selectedLog.date), 'MMMM d, yyyy')}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-brand/5 text-brand rounded-full font-medium">
                          <TrendingUp size={14} />
                          ${selectedLog.revenueGenerated.toLocaleString()} {language === 'en' ? 'Generated' : '已生成'}
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-600 rounded-full font-medium">
                          <CheckCircle2 size={14} />
                          {selectedLog.tasksCompleted.length} {language === 'en' ? 'Tasks Completed' : '项任务已完成'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <section className="space-y-4">
                      <h3 className="text-xl font-semibold text-black flex items-center gap-2">
                        <Zap size={20} className="text-brand" />
                        {t('logs.summary')}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg font-light">
                        {selectedLog.content}
                      </p>
                    </section>

                    <section className="space-y-4">
                      <h3 className="text-xl font-semibold text-black">{t('logs.tasks')}</h3>
                      <ul className="grid md:grid-cols-2 gap-4">
                        {selectedLog.tasksCompleted.map((task, i) => (
                          <li key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-sm text-gray-600">
                            <CheckCircle2 className="text-brand shrink-0 mt-0.5" size={16} />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </section>

                    {selectedLog.iterationDetails && (
                      <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-black">{t('logs.iteration')}</h3>
                        <div className="p-6 bg-brand/5 rounded-3xl border border-brand/10 text-brand-dark text-sm leading-relaxed italic">
                          "{selectedLog.iterationDetails}"
                        </div>
                      </section>
                    )}
                  </div>
                </GlassCard>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-black flex items-center gap-2">
                    <MessageSquare className="text-brand" size={24} />
                    {t('comments.title')}
                  </h3>
                  <CommentSection logId={selectedLog.id!} />
                </div>
              </motion.div>
            ) : (
              <div className="h-[400px] flex items-center justify-center text-gray-400 italic">
                {t('logs.select')}
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
