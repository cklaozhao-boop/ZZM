import React from 'react';
import { FileCode2, PlayCircle, ScrollText, TerminalSquare, Workflow } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { assetUrl } from '../lib/content';

const commands = [
  'npm run content:new -- agents <slug>',
  'npm run content:new -- workflows <slug>',
  'npm run content:new -- logs <slug>',
  'npm run content:new -- products <slug>',
  'npm run content:validate',
  'npm run content:publish',
  'npm run build',
];

export default function Admin() {
  const { language } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 pt-32 pb-32">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/10 bg-brand/5 px-4 py-1.5 text-sm font-medium text-brand">
          <Workflow size={16} />
          {language === 'en' ? 'Libu control room' : '礼部控制台'}
        </div>
        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight text-black">{language === 'en' ? 'Run the blog through Libu scripts' : '用礼部脚本接管博客'}</h1>
          <p className="max-w-4xl text-lg leading-relaxed text-gray-500">
            {language === 'en'
              ? 'The browser admin path is no longer the primary workflow. Libu now operates the site through the content repository, validation scripts, and build pipeline.'
              : '网页登录后台已经不再是主流程。现在由礼部通过内容仓库、校验脚本和构建流水线来运维整个站点。'}
          </p>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="space-y-6 border-brand/10">
          <div className="flex items-center gap-3 text-brand">
            <PlayCircle size={20} />
            <h2 className="text-2xl font-bold text-black">{language === 'en' ? 'Operating flow' : '主流程'}</h2>
          </div>
          <ol className="space-y-4">
            {[
              language === 'en' ? 'Libu creates a new JSON entry from a template.' : '礼部先用模板创建一个新的 JSON 条目。',
              language === 'en' ? 'Fill Chinese and English fields and attach download assets if needed.' : '补齐中英文字段，并在需要时准备下载资产。',
              language === 'en' ? 'Run validation. Yushitai blocks malformed content.' : '执行校验。御史台会拦截格式不正确的内容。',
              language === 'en' ? 'Publish generated content and rebuild the site.' : '发布生成内容并重新构建站点。',
              language === 'en' ? 'Commit and push so GitHub Pages updates the public site.' : '提交并推送，由 GitHub Pages 更新线上站点。'
            ].map((step, index) => (
              <li key={step} className="flex gap-4 rounded-3xl border border-gray-100 bg-gray-50 p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {index + 1}
                </div>
                <div className="text-sm leading-relaxed text-gray-600">{step}</div>
              </li>
            ))}
          </ol>
        </GlassCard>

        <div className="space-y-8">
          <GlassCard className="space-y-4 border-brand/5">
            <div className="flex items-center gap-3 text-brand">
              <TerminalSquare size={20} />
              <h2 className="text-2xl font-bold text-black">{language === 'en' ? 'Commands' : '命令'}</h2>
            </div>
            <div className="space-y-3">
              {commands.map((command) => (
                <pre key={command} className="overflow-x-auto rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                  {command}
                </pre>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-4 border-brand/5">
            <div className="flex items-center gap-3 text-brand">
              <FileCode2 size={20} />
              <h2 className="text-2xl font-bold text-black">{language === 'en' ? 'Managed directories' : '受管目录'}</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <code className="block rounded-2xl bg-gray-50 px-4 py-3">content/agents</code>
              <code className="block rounded-2xl bg-gray-50 px-4 py-3">content/workflows</code>
              <code className="block rounded-2xl bg-gray-50 px-4 py-3">content/logs</code>
              <code className="block rounded-2xl bg-gray-50 px-4 py-3">content/products</code>
              <code className="block rounded-2xl bg-gray-50 px-4 py-3">public/downloads/agents</code>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4 border-brand/5">
            <div className="flex items-center gap-3 text-brand">
              <ScrollText size={20} />
              <h2 className="text-2xl font-bold text-black">{language === 'en' ? 'Architecture report' : '架构报告'}</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              {language === 'en'
                ? 'The downloadable HTML report still serves as the complete written blueprint for the Libu operating system.'
                : '下载区里的 HTML 报告仍然保留了礼部博客操作系统的完整书面蓝图。'}
            </p>
            <a
              href={assetUrl('downloads/libu-blog-operating-system-report.html')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark"
            >
              {language === 'en' ? 'Open report' : '打开报告'}
            </a>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
