import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Video, FileText, CheckCircle2, Users, Layers, Zap } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import { db, doc, getDoc } from '@/src/firebase';
import { Workflow } from '@/src/types';
import { useLanguage } from '../context/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  'Search': <Search className="text-brand" />,
  'Video': <Video className="text-brand" />,
  'FileText': <FileText className="text-brand" />,
};

export default function WorkflowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkflow = async () => {
      if (!id) return;
      const docRef = doc(db, 'workflows', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setWorkflow({ id: docSnap.id, ...docSnap.data() } as Workflow);
      }
      setLoading(false);
    };
    fetchWorkflow();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand/10 border-t-brand rounded-full animate-spin" />
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="pt-32 pb-32 text-center">
        <h2 className="text-2xl font-bold">Workflow not found</h2>
        <button onClick={() => navigate('/workflow')} className="mt-4 text-brand flex items-center gap-2 mx-auto">
          <ArrowLeft size={20} /> Back to Workflows
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 max-w-5xl mx-auto space-y-12">
      <button onClick={() => navigate('/workflow')} className="text-gray-500 hover:text-brand flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} /> {language === 'en' ? 'Back to Workflows' : '返回工作流列表'}
      </button>

      <header className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="p-6 bg-brand/5 rounded-3xl border border-brand/10">
            {iconMap[workflow.icon] || <Zap size={48} className="text-brand" />}
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-black">{workflow.title}</h1>
            <p className="text-xl text-gray-500 mt-2">{workflow.description}</p>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold text-black flex items-center gap-3">
            <Layers className="text-brand" />
            {language === 'en' ? 'Collaboration Framework' : '协作框架'}
          </h2>
          
          <div className="relative space-y-12">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-brand/10 -z-10" />
            {workflow.steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-8"
              >
                <div className="w-16 h-16 bg-white border-4 border-brand/10 rounded-full shadow-lg flex items-center justify-center shrink-0 z-10">
                  <span className="text-lg font-bold text-brand">{index + 1}</span>
                </div>
                <GlassCard className="flex-1 space-y-4 border-brand/5 hover:border-brand/20 transition-all">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black">{step.title}</h3>
                    <span className="px-3 py-1 bg-brand/5 rounded-full text-xs font-bold text-brand uppercase tracking-widest">
                      {step.agent}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  <div className="pt-4 flex items-center gap-2 text-sm font-medium text-brand">
                    <CheckCircle2 size={16} />
                    {language === 'en' ? 'Output' : '产出'}: {step.output}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-black flex items-center gap-3">
            <Users className="text-brand" />
            {language === 'en' ? 'Involved Agents' : '参与智能体'}
          </h2>
          <div className="space-y-4">
            {Array.from(new Set(workflow.steps.map(s => s.agent))).map(agentName => (
              <GlassCard key={agentName} className="p-4 flex items-center gap-4 border-brand/5">
                <div className="w-12 h-12 bg-brand/5 rounded-xl flex items-center justify-center font-bold text-brand">
                  {agentName[0]}
                </div>
                <div>
                  <h4 className="font-bold text-black">{agentName}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Active Participant</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
