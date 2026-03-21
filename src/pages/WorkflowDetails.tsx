import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Boxes, FileOutput, GitBranch, Workflow as WorkflowIcon } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import { findWorkflow, getAgentLabel, localize } from '@/src/data/showcase';
import { useLanguage } from '../context/LanguageContext';

export default function WorkflowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const workflow = findWorkflow(id);

  if (!workflow) {
    return (
      <div className="pt-32 pb-32 px-6 text-center">
        <h2 className="text-3xl font-bold">{language === 'zh' ? '未找到这个工作流' : 'Workflow not found'}</h2>
        <button onClick={() => navigate('/workflow')} className="mt-6 inline-flex items-center gap-2 text-brand font-semibold">
          <ArrowLeft size={18} />
          {language === 'zh' ? '返回工作流列表' : 'Back to workflows'}
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto space-y-10">
      <button onClick={() => navigate('/workflow')} className="inline-flex items-center gap-2 text-gray-500 hover:text-brand transition-colors">
        <ArrowLeft size={18} />
        {language === 'zh' ? '返回工作流列表' : 'Back to workflows'}
      </button>

      <header className="max-w-4xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">
          {language === 'zh' ? 'Workflow Detail' : 'Workflow detail'}
        </p>
        <h1 className="text-5xl font-bold tracking-tight">{localize(workflow.title, language)}</h1>
        <p className="text-xl text-gray-500">{localize(workflow.description, language)}</p>
      </header>

      <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        <GlassCard className="border-brand/10">
          <div className="flex items-center gap-3">
            <GitBranch className="text-brand" size={18} />
            <h2 className="text-2xl font-bold">
              {language === 'zh' ? '左侧流程图：各个 Agent 如何协调' : 'Left-side flow: how the agents coordinate'}
            </h2>
          </div>

          <div className="mt-8 space-y-6">
            {workflow.stages.map((stage, index) => (
              <div key={`${workflow.id}-${index}`} className="grid grid-cols-[64px_1fr] gap-5">
                <div className="relative flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-brand/10 bg-white text-brand font-bold shadow-sm">
                    {index + 1}
                  </div>
                  {index < workflow.stages.length - 1 && (
                    <div className="absolute top-14 h-[calc(100%+24px)] w-px bg-brand/10" />
                  )}
                </div>
                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{localize(stage.title, language)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-500">{localize(stage.description, language)}</p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-brand font-semibold border border-brand/10">
                      {getAgentLabel(stage.agentId, language)}
                    </div>
                  </div>

                  <div className="mt-5 grid md:grid-cols-2 gap-3">
                    <MiniIO label="Input" value={stage.input} />
                    <MiniIO label="Output" value={stage.output} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="border-brand/5 bg-gradient-to-br from-brand/5 to-white">
          <div className="flex items-center gap-3">
            <WorkflowIcon className="text-brand" size={18} />
            <h2 className="text-2xl font-bold">
              {language === 'zh' ? '这个工作流的作用' : 'Why this workflow exists'}
            </h2>
          </div>

          <p className="mt-5 text-gray-600 leading-relaxed">{localize(workflow.scenario, language)}</p>

          <div className="mt-6 grid gap-3">
            {workflow.highlights.map((item) => (
              <div key={localize(item, language)} className="rounded-2xl border border-gray-100 bg-white p-4 text-sm text-gray-600">
                {localize(item, language)}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
        <GlassCard className="border-brand/5">
          <div className="flex items-center gap-3">
            <Boxes className="text-brand" size={18} />
            <h2 className="text-2xl font-bold">
              {language === 'zh' ? '详细介绍与实现方式' : 'Detailed explanation and implementation'}
            </h2>
          </div>

          <div className="mt-6 grid gap-3">
            {workflow.implementationNotes.map((note) => (
              <div key={localize(note, language)} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
                {localize(note, language)}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-brand/10 bg-brand/5 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {language === 'zh' ? '最终交付' : 'Final deliverables'}
            </h3>
            <ul className="mt-3 grid gap-2 text-sm text-gray-700">
              {workflow.deliverables.map((item) => (
                <li key={localize(item, language)}>{localize(item, language)}</li>
              ))}
            </ul>
          </div>
        </GlassCard>

        <GlassCard className="border-brand/5">
          <div className="flex items-center gap-3">
            <FileOutput className="text-brand" size={18} />
            <h2 className="text-2xl font-bold">
              {language === 'zh' ? '输入内容与输出成果演示' : 'Input content and output demonstration'}
            </h2>
          </div>

          <div className="mt-6 grid gap-5">
            <CodeBlock title="Input" value={workflow.inputExample} />
            <CodeBlock title="Output" value={workflow.outputExample} />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function MiniIO({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white bg-white p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">{label}</div>
      <div className="mt-2 text-sm text-gray-700 break-words">{value}</div>
    </div>
  );
}

function CodeBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
      <div className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">{title}</div>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-sm leading-relaxed text-gray-700">{value}</pre>
    </div>
  );
}
