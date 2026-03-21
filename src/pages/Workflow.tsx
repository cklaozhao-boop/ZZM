import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Search, Video, FileText, ArrowRight, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/src/components/GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { db, collection, getDocs } from '@/src/firebase';
import { Workflow as WorkflowType } from '@/src/types';

const iconMap: Record<string, React.ReactNode> = {
  'Search': <Search className="text-brand" />,
  'Video': <Video className="text-brand" />,
  'FileText': <FileText className="text-brand" />,
};

export default function Workflow() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState<WorkflowType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkflows = async () => {
      const querySnapshot = await getDocs(collection(db, 'workflows'));
      const workflowsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WorkflowType));
      setWorkflows(workflowsData);
      setLoading(false);
    };
    fetchWorkflows();
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
          <Zap size={16} />
          {language === 'en' ? 'Our Workflows' : '我们的工作流'}
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black">
          {language === 'en' ? 'Specialized AI Workflows' : '专业 AI 工作流'}
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          {language === 'en' 
            ? 'Choose a workflow to see how our agents collaborate to solve specific problems.'
            : '选择一个工作流，查看我们的智能体如何协作解决特定问题。'}
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {workflows.map((wf, index) => (
          <motion.div
            key={wf.id}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/workflow/${wf.id}`)}
            className="cursor-pointer group"
          >
            <GlassCard delay={index * 0.1} className="flex flex-col h-full border-brand/5 group-hover:border-brand/30 transition-all">
              <div className="p-4 bg-brand/5 rounded-2xl w-fit mb-6 group-hover:bg-brand/10 transition-colors">
                {iconMap[wf.icon] || <Zap className="text-brand" />}
              </div>
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl font-bold text-black">{wf.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{wf.description}</p>
              </div>
              
              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest">
                  <Layers size={14} />
                  {wf.steps.length} {language === 'en' ? 'Steps' : '个步骤'}
                </div>
                <div className="text-brand flex items-center gap-1 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {language === 'en' ? 'View Details' : '查看详情'} <ArrowRight size={14} />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Case Study Section */}
      <section className="pt-20 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-black">
            {language === 'en' ? 'Case Study: PixelFlow Launch' : '案例研究：PixelFlow 发布'}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'See how OpenClaw agents collaborated to bring a product from idea to $1.2k/mo revenue in just 7 days.'
              : '了解 OpenClaw 智能体如何协作，在短短 7 天内将一个产品从构思推向每月 1.2k 美元的收入。'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <CaseStep 
            day="Day 1-2"
            title={language === 'en' ? 'Market Discovery' : '市场发现'}
            desc={language === 'en' 
              ? 'Analyst identified a gap in "no-code design systems". Architect drafted the technical specs.'
              : '分析师发现了“无代码设计系统”中的空白。架构师起草了技术规范。'}
          />
          <CaseStep 
            day="Day 3-5"
            title={language === 'en' ? 'Rapid Build' : '快速构建'}
            desc={language === 'en' 
              ? 'Visionary created the UI kit. Builder generated the core React components and API.'
              : '愿景家创建了 UI 套件。构建者生成了核心 React 组件和 API。'}
          />
          <CaseStep 
            day="Day 6-7"
            title={language === 'en' ? 'Launch & Scale' : '发布与扩展'}
            desc={language === 'en' 
              ? 'Growth agent launched on Product Hunt and Twitter. Reached #3 Product of the Day.'
              : '增长官在 Product Hunt 和 Twitter 上发布。成为当日产品第 3 名。'}
          />
        </div>
      </section>
    </div>
  );
}

function CaseStep({ day, title, desc }: { day: string; title: string; desc: string }) {
  return (
    <GlassCard className="space-y-4 border-brand/5">
      <div className="text-xs font-bold text-brand uppercase tracking-widest">{day}</div>
      <h4 className="text-xl font-bold text-black">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </GlassCard>
  );
}
