import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Code, Palette, Megaphone, Search, ArrowLeft, Download, Star, Award, FileText, MessageSquare, CheckCircle, Database, ShieldAlert, Server } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import { db, doc, getDoc } from '@/src/firebase';
import { Agent } from '@/src/types';
import { useLanguage } from '../context/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  'Architect': <ShieldCheck className="text-brand" />,
  'Builder': <Code className="text-brand" />,
  'Visionary': <Palette className="text-brand" />,
  'Growth': <Megaphone className="text-brand" />,
  'Analyst': <Search className="text-brand" />,
  'Researcher': <Search className="text-brand" />,
  'Content Creator': <FileText className="text-brand" />,
  'Customer Support': <MessageSquare className="text-brand" />,
  'Quality Assurance': <CheckCircle className="text-brand" />,
  'Data Scientist': <Database className="text-brand" />,
  'Security Expert': <ShieldAlert className="text-brand" />,
  'DevOps Engineer': <Server className="text-brand" />,
};

export default function AgentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      if (!id) return;
      const docRef = doc(db, 'agents', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAgent({ id: docSnap.id, ...docSnap.data() } as Agent);
      }
      setLoading(false);
    };
    fetchAgent();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand/10 border-t-brand rounded-full animate-spin" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="pt-32 pb-32 text-center">
        <h2 className="text-2xl font-bold">Agent not found</h2>
        <button onClick={() => navigate('/agents')} className="mt-4 text-brand flex items-center gap-2 mx-auto">
          <ArrowLeft size={20} /> Back to Agents
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 max-w-4xl mx-auto space-y-12">
      <button onClick={() => navigate('/agents')} className="text-gray-500 hover:text-brand flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} /> {language === 'en' ? 'Back to Agents' : '返回智能体列表'}
      </button>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-1/3"
        >
          <GlassCard className="p-8 flex flex-col items-center text-center space-y-6 border-brand/10">
            <div className="p-6 bg-brand/5 rounded-3xl">
              {iconMap[agent.name] || <ShieldCheck size={48} className="text-brand" />}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">{agent.name}</h1>
              <p className="text-brand font-medium uppercase tracking-widest text-sm">{agent.role}</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <a 
              href={agent.downloadUrl} 
              className="w-full py-3 bg-brand text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
            >
              <Download size={18} />
              {language === 'en' ? 'Download Config' : '下载配置'}
            </a>
          </GlassCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-8"
        >
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">{language === 'en' ? 'About' : '关于'}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {agent.longDescription || agent.description}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">{language === 'en' ? 'Core Skills' : '核心技能'}</h2>
            <div className="flex flex-wrap gap-3">
              {agent.skills.map((skill) => (
                <span key={skill} className="px-4 py-2 bg-brand/5 border border-brand/10 rounded-full text-sm font-medium text-brand">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {agent.achievements && agent.achievements.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">{language === 'en' ? 'Key Achievements' : '主要成就'}</h2>
              <div className="space-y-4">
                {agent.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 italic text-gray-600">
                    <Award className="text-brand shrink-0" size={24} />
                    <p>{achievement}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </div>
    </div>
  );
}
