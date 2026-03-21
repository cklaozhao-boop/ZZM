import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Boxes, Sparkles, Workflow as WorkflowIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/src/components/GlassCard';
import { getAgentLabel, localize, workflows } from '@/src/data/showcase';
import { useLanguage } from '../context/LanguageContext';

export default function Workflow() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto space-y-14">
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">
          {language === 'zh' ? 'Workflow' : 'Workflow'}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          {language === 'zh' ? '工作流会展示成一张张长卡片' : 'Workflows are presented as long cards'}
        </h1>
        <p className="text-xl text-gray-500">
          {language === 'zh'
            ? '每张卡片都会介绍它的功能、参与 Agent、输入输出，以及为什么它值得单独成为一个产品能力。'
            : 'Each card explains the workflow’s function, the participating agents, the input/output path, and why it stands alone as a product capability.'}
        </p>
      </header>

      <div className="grid gap-6">
        {workflows.map((workflow, index) => (
          <motion.div key={workflow.id} whileHover={{ y: -4 }} onClick={() => navigate(`/workflow/${workflow.id}`)} className="cursor-pointer">
            <GlassCard delay={index * 0.06} className="border-brand/5 hover:border-brand/20 transition-all">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
                <div className="space-y-5">
                  <div className="flex items-center gap-3 text-brand">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/5">
                      <WorkflowIcon size={20} />
                    </div>
                    <p className="text-xs uppercase tracking-[0.22em] font-semibold">
                      {language === 'zh' ? '工作流案例' : 'Workflow case'}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">{localize(workflow.title, language)}</h2>
                    <p className="mt-3 text-gray-500 leading-relaxed">{localize(workflow.description, language)}</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <MetaBlock
                      label={language === 'zh' ? '适用场景' : 'Best for'}
                      value={localize(workflow.scenario, language)}
                    />
                    <MetaBlock
                      label={language === 'zh' ? '参与 Agent' : 'Agents'}
                      value={workflow.stages.map((stage) => getAgentLabel(stage.agentId, language)).join(' / ')}
                    />
                    <MetaBlock
                      label={language === 'zh' ? '步骤数量' : 'Stages'}
                      value={`${workflow.stages.length}`}
                    />
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
                      <Sparkles size={14} className="text-brand" />
                      {language === 'zh' ? '这个工作流做什么' : 'What it does'}
                    </div>
                    <ul className="grid gap-2 text-sm text-gray-600">
                      {workflow.highlights.map((item) => (
                        <li key={localize(item, language)}>{localize(item, language)}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-gray-100 bg-white p-5">
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
                      <Boxes size={14} className="text-brand" />
                      {language === 'zh' ? '输入 / 输出' : 'Input / Output'}
                    </div>
                    <p className="text-sm text-gray-600"><strong>Input:</strong> {workflow.inputExample.split('\n')[0]}</p>
                    <p className="mt-2 text-sm text-gray-600"><strong>Output:</strong> {workflow.outputExample.split('\n')[0]}</p>
                  </div>

                  <div className="inline-flex items-center gap-2 font-semibold text-brand">
                    {language === 'zh' ? '点击进入详情页' : 'Open the detail page'} <ArrowRight size={16} />
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

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">{label}</div>
      <div className="mt-2 text-sm leading-relaxed text-gray-700">{value}</div>
    </div>
  );
}
