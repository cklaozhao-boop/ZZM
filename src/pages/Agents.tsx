import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Code, Palette, Megaphone, Search, ShieldCheck, ArrowRight, Download, FileText, MessageSquare, CheckCircle, Database, ShieldAlert, Server } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import GlassCard from '@/src/components/GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { db, collection, getDocs } from '@/src/firebase';
import { Agent } from '@/src/types';

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

export default function Agents() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      const querySnapshot = await getDocs(collection(db, 'agents'));
      const agentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Agent));
      setAgents(agentsData);
      setLoading(false);
    };
    fetchAgents();
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
      <header className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 rounded-full text-sm font-medium text-brand border border-brand/10"
        >
          <Users size={16} />
          {t('agents.meet')}
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black">{t('agents.title')}</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          {t('agents.desc')}
        </p>
        <div className="pt-4">
          <Link 
            to="/agents/downloads" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-full font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
          >
            <Download size={18} />
            {language === 'en' ? 'Download Agent Configs' : '下载智能体配置'}
          </Link>
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/agents/${agent.id}`)}
            className="cursor-pointer group"
          >
            <GlassCard delay={index * 0.1} className="flex flex-col h-full border-brand/5 group-hover:border-brand/30 transition-all">
              <div className="p-4 bg-brand/5 rounded-2xl w-fit mb-6 group-hover:bg-brand/10 transition-colors">
                {iconMap[agent.name] || <ShieldCheck className="text-brand" />}
              </div>
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl font-bold text-black">{agent.name}</h3>
                <p className="text-sm font-medium text-brand uppercase tracking-widest">{agent.role}</p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                {agent.description}
              </p>
              
              <div className="space-y-6">
                {agent.achievements && agent.achievements.length > 0 && (
                  <div className="p-4 bg-brand/5 rounded-2xl border border-brand/10">
                    <h4 className="text-[10px] font-bold text-brand uppercase tracking-widest mb-2">
                      {language === 'en' ? 'Recent Achievement' : '最近成就'}
                    </h4>
                    <p className="text-xs text-brand-dark italic">"{agent.achievements[0]}"</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {agent.skills.slice(0, 2).map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-medium text-gray-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="text-brand flex items-center gap-1 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {language === 'en' ? 'Details' : '详情'} <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
