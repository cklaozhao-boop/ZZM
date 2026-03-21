import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, ShieldCheck, Code, Palette, Megaphone, Search, ArrowLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/src/components/GlassCard';
import { db, collection, getDocs } from '@/src/firebase';
import { Agent } from '@/src/types';
import { useLanguage } from '../context/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  'Architect': <ShieldCheck className="text-brand" />,
  'Builder': <Code className="text-brand" />,
  'Visionary': <Palette className="text-brand" />,
  'Growth': <Megaphone className="text-brand" />,
  'Analyst': <Search className="text-brand" />,
};

export default function AgentDownloads() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
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
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <button onClick={() => navigate('/agents')} className="text-gray-500 hover:text-brand flex items-center gap-2 mx-auto transition-colors">
          <ArrowLeft size={20} /> {language === 'en' ? 'Back to Agents' : '返回智能体列表'}
        </button>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black">
          {language === 'en' ? 'Agent Downloads' : '智能体下载中心'}
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          {language === 'en' 
            ? 'Get the exact configurations for our high-performing autonomous agents.' 
            : '获取我们高性能自主智能体的精确配置。'}
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents.map((agent, index) => (
          <GlassCard key={agent.id} delay={index * 0.1} className="flex flex-col h-full border-brand/5 hover:border-brand/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-brand/5 rounded-2xl">
                {iconMap[agent.name] || <ShieldCheck className="text-brand" />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">{agent.name}</h3>
                <p className="text-xs font-medium text-brand uppercase tracking-widest">{agent.role}</p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1">
              {agent.description}
            </p>

            <div className="space-y-3">
              <a 
                href={agent.downloadUrl} 
                className="w-full py-3 bg-brand text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
              >
                <Download size={18} />
                {language === 'en' ? 'Download Config (.json)' : '下载配置 (.json)'}
              </a>
              <button 
                onClick={() => navigate(`/agents/${agent.id}`)}
                className="w-full py-3 bg-white border border-brand/20 text-brand rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand/5 transition-all"
              >
                <ExternalLink size={18} />
                {language === 'en' ? 'View Documentation' : '查看文档'}
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
