import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Workflow as WorkflowIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/src/components/GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { allAgents, allWorkflows, getAgentById, localize } from '../lib/content';

export default function Workflow() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto space-y-20">
      <header className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 rounded-full text-sm font-medium text-brand border border-brand/10"
        >
          <WorkflowIcon size={16} />
          {language === 'en' ? 'Operational workflows' : '运营工作流'}
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black">
          {language === 'en' ? 'Workflow library' : '工作流总览'}
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          {language === 'en'
            ? 'Each long card explains what a workflow is for, who participates, and how to inspect its implementation.'
            : '每张长卡片都解释这个工作流是做什么的、谁参与，以及如何查看它的实现方式。'}
        </p>
      </header>

      <div className="space-y-8">
        {allWorkflows.map((workflow, index) => (
          <motion.div key={workflow.id} whileHover={{ y: -4 }} onClick={() => navigate(`/workflow/${workflow.id}`)} className="cursor-pointer group">
            <GlassCard delay={index * 0.05} className="border-brand/5 transition-all group-hover:border-brand/30">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-5">
                  <div className="inline-flex rounded-full border border-brand/10 bg-brand/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-brand">
                    {language === 'en' ? 'Workflow' : '工作流'}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-black">{localize(workflow.title, language)}</h3>
                    <p className="text-base leading-relaxed text-gray-600">{localize(workflow.description, language)}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-500">{localize(workflow.objective, language)}</p>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-gray-400">
                    {language === 'en' ? 'Participating agents' : '参与智能体'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(workflow.steps.map((step) => step.agentId))).map((agentId) => {
                      const agent = getAgentById(agentId);
                      return (
                        <span key={agentId} className="rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                          {agent ? localize(agent.name, language) : agentId}
                        </span>
                      );
                    })}
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-gray-400">
                      {language === 'en' ? 'Flow length' : '流程长度'}
                    </div>
                    <div className="mt-2 text-2xl font-bold text-black">{workflow.steps.length}</div>
                    <div className="mt-1 text-sm text-gray-500">
                      {language === 'en' ? 'coordinated stages' : '个协作阶段'}
                    </div>
                  </div>

                  <div className="flex items-center justify-end text-brand text-sm font-bold">
                    {language === 'en' ? 'Open detail page' : '查看详情页'}
                    <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <GlassCard className="border-brand/10 bg-brand/5">
        <div className="grid gap-6 md:grid-cols-3">
          <SummaryStat value={String(allWorkflows.length)} label={language === 'en' ? 'Published workflows' : '已发布工作流'} />
          <SummaryStat value={String(allAgents.length)} label={language === 'en' ? 'Mapped agents' : '已接入智能体'} />
          <SummaryStat value="Input / Output" label={language === 'en' ? 'Every flow includes demos' : '每个流程都含输入输出演示'} />
        </div>
      </GlassCard>
    </div>
  );
}

function SummaryStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/40 bg-white/60 p-6 text-center">
      <div className="text-3xl font-bold text-black">{value}</div>
      <div className="mt-2 text-sm text-gray-500">{label}</div>
    </div>
  );
}
