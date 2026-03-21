import React from 'react';
import { Download, ArrowLeft, ExternalLink, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/src/components/GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { allAgents, assetUrl, localize, repoBlobUrl } from '../lib/content';

export default function AgentDownloads() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <button onClick={() => navigate('/agents')} className="text-gray-500 hover:text-brand flex items-center gap-2 mx-auto transition-colors">
          <ArrowLeft size={20} />
          {language === 'en' ? 'Back to Agents' : '返回智能体列表'}
        </button>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black">
          {language === 'en' ? 'Agent download center' : '智能体下载中心'}
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          {language === 'en'
            ? 'Configs and scales live in the repository and can be downloaded directly from this page.'
            : '每个智能体的配置和 Scale 都已经入库，你可以从这里直接下载。'}
        </p>
      </header>

      <GlassCard className="border-brand/10 bg-brand/5">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-brand">
              {language === 'en' ? 'Operations report' : '运营总报告'}
            </div>
            <h2 className="text-2xl font-bold text-black">
              {language === 'en' ? 'Libu operating system report' : '礼部博客操作系统报告'}
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-gray-600">
              {language === 'en'
                ? 'This HTML report explains the complete architecture: front-end, back-end agents, scripts, scales, and page-level content design.'
                : '这份 HTML 报告完整说明了前端、后端 Agent、脚本、Scale 和各页面内容设计。'}
            </p>
          </div>
          <a
            href={assetUrl('downloads/libu-blog-operating-system-report.html')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark"
          >
            <FileText size={18} />
            {language === 'en' ? 'Open report' : '打开报告'}
          </a>
        </div>
      </GlassCard>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {allAgents.map((agent) => (
          <GlassCard key={agent.id} className="flex flex-col h-full border-brand/5 hover:border-brand/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-brand/10 bg-brand/5 text-2xl font-bold text-brand">
                {agent.avatar}
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">{localize(agent.name, language)}</h3>
                <p className="text-xs font-medium text-brand uppercase tracking-widest">{localize(agent.role, language)}</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
              {localize(agent.configSummary, language)}
            </p>

            <div className="space-y-3">
              <a
                href={assetUrl(agent.downloadPath)}
                className="w-full py-3 bg-brand text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
              >
                <Download size={18} />
                {language === 'en' ? 'Download config' : '下载配置'}
              </a>
              <a
                href={assetUrl(agent.scalePath)}
                className="w-full py-3 bg-white border border-brand/20 text-brand rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand/5 transition-all"
              >
                <FileText size={18} />
                {language === 'en' ? 'Open scale' : '打开 Scale'}
              </a>
              <a
                href={repoBlobUrl(agent.githubPath)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
              >
                <ExternalLink size={18} />
                {language === 'en' ? 'View source' : '查看源文件'}
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
